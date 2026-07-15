import os
import sys
import json
import csv
from datetime import datetime
from typing import List, Dict, Optional
import pandas as pd
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

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
        
        if os.path.exists(PENDING_ORDERS_PATH):
            with open(PENDING_ORDERS_PATH, 'r') as f:
                signals = json.load(f)
        else:
            signals = []
            
        signals.append(signal_entry)
        
        with open(PENDING_ORDERS_PATH, 'w') as f:
            json.dump(signals, f, indent=2)
            
    except Exception as e:
        print(f"Error saving signal to pending log: {e}")
        
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
        df = pd.read_csv(INVENTORY_PATH)
        mask = df['Item'].str.lower() == item.lower()
        if not mask.any():
            return {"error": f"Ingredient '{item}' not found in inventory."}
            
        current_stock = df.loc[mask, 'Current_Stock'].values[0]
        new_stock = max(0.0, float(current_stock) - float(qty))
        df.loc[mask, 'Current_Stock'] = new_stock
        df.to_csv(INVENTORY_PATH, index=False)
        
        # Log the transaction
        file_exists = os.path.isfile(LOG_PATH)
        with open(LOG_PATH, mode='a', newline='') as file:
            writer = csv.writer(file)
            if not file_exists:
                writer.writerow(['Timestamp', 'Customer', 'Items', 'Deadline', 'Urgency', 'Risk'])
            writer.writerow([
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "MCP Agent",
                f"{item} ({qty})",
                "Immediate",
                10,
                "Deduction"
            ])
            
        return {
            "success": True,
            "item": item,
            "previous_stock": float(current_stock),
            "new_stock": float(new_stock)
        }
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
        with open(PENDING_ORDERS_PATH, 'r') as f:
            return json.load(f)
    except Exception as e:
        return [{"error": f"Failed to read pending signals: {str(e)}"}]

if __name__ == "__main__":
    # Start the FastMCP server with SSE transport
    mcp.run(transport="sse")
