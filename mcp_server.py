import os
import sys
from typing import List, Dict
import pandas as pd
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP
from exocore_storage import append_signal, deduct_inventory as deduct_stock, read_signals

# Load environment variables
load_dotenv()

# Add the PrepFlow Logic path to the system so we can import the brain
sys.path.append(os.path.join(os.path.dirname(__file__), 'siblings', 'prepflow-os', 'scripts'))
from prepflow_engine import process_message

# Initialize FastMCP Server
mcp = FastMCP("ExoCore Systems WebMCP Server", host="127.0.0.1", port=8000)

# Helper paths
PREPFLOW_DIR = os.path.join(os.path.dirname(__file__), 'siblings', 'prepflow-os')
INVENTORY_PATH = os.path.join(PREPFLOW_DIR, 'master_inventory.csv')
LOG_PATH = os.path.join(PREPFLOW_DIR, 'inventory_log.csv')
PENDING_ORDERS_PATH = os.path.join(PREPFLOW_DIR, 'pending_orders.json')

@mcp.tool()
def process_inbound_signal(message: str) -> Dict:
    """
    Processes a raw inbound message (e.g. from WhatsApp or DMs) using Gemini AI
    to extract customer name, order items, deadline, urgency, and inventory impact.
    """
    result = process_message(message)
    if not result:
        return {"error": "Failed to process message or missing API key."}
    
    # Save to pending orders list if successfully parsed
    try:
        import time
        signal_entry = {
            "timestamp": time.time(),
            "raw_text": message,
            "processed": result
        }
        
        append_signal(PENDING_ORDERS_PATH, signal_entry)
    except Exception as e:
        return {"error": f"Signal was processed but could not be persisted: {e}"}
        
    return result

@mcp.tool()
def get_inventory() -> Dict:
    """
    Reads the master inventory CSV and returns current stock levels of ingredients.
    """
    if not os.path.exists(INVENTORY_PATH):
        return {"error": f"Inventory file not found at {INVENTORY_PATH}"}
    
    try:
        df = pd.read_csv(INVENTORY_PATH)
        inventory_dict = df.set_index('Item')['Current_Stock'].to_dict()
        return {"inventory": inventory_dict}
    except Exception as e:
        return {"error": f"Failed to read inventory: {str(e)}"}

@mcp.tool()
def deduct_inventory(item: str, qty: float) -> Dict:
    """
    Deducts the specified quantity from the stock room inventory for a given ingredient.
    """
    if not os.path.exists(INVENTORY_PATH):
        return {"error": f"Inventory file not found at {INVENTORY_PATH}"}
    
    try:
        return deduct_stock(INVENTORY_PATH, LOG_PATH, item, float(qty))
    except Exception as e:
        return {"error": f"Failed to deduct stock: {str(e)}"}

@mcp.tool()
def get_pending_signals() -> List[Dict]:
    """
    Retrieves the list of unprocessed/pending inbound signal logs.
    """
    if not os.path.exists(PENDING_ORDERS_PATH):
        return []
    try:
        return read_signals(PENDING_ORDERS_PATH)
    except Exception as e:
        return [{"error": f"Failed to read pending signals: {str(e)}"}]

if __name__ == "__main__":
    # Start the FastMCP server with SSE transport
    mcp.run(transport="sse")
