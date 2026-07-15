from flask import Flask, request, send_from_directory
from flask_cors import CORS
import sys
import os

# Signal Engine Integration
# Add the PrepFlow Logic path to the system so we can import the brain
sys.path.append(os.path.join(os.path.dirname(__file__), 'siblings', 'prepflow-os', 'scripts'))
from prepflow_engine import process_message

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/llms.txt')
def serve_llms_txt():
    return send_from_directory(os.path.dirname(__file__), 'llms.txt')

@app.route('/.well-known/mcp.json')
def serve_mcp_json():
    return send_from_directory(os.path.join(os.path.dirname(__file__), '.well-known'), 'mcp.json')


@app.route('/inbound', methods=['POST'])
def inbound():
    # 1. Capture the raw signal
    raw_data = request.data.decode('utf-8')
    print(f"\n[INBOUND SIGNAL DETECTED]:\n{raw_data}\n")

    # 2. Pass to the AI Brain
    result = process_message(raw_data)
    
    # 2.5 Persistence (The Bridge to Dashboard)
    import json
    import time
    
    # Path to shared signal log
    log_path = os.path.join(os.path.dirname(__file__), 'siblings', 'prepflow-os', 'pending_orders.json')
    
    signal_entry = {
        "timestamp": time.time(),
        "raw_text": raw_data,
        "processed": result
    }
    
    try:
        # Read or init
        if os.path.exists(log_path):
            with open(log_path, 'r') as f:
                signals = json.load(f)
        else:
            signals = []
            
        signals.append(signal_entry)
        
        # Save
        with open(log_path, 'w') as f:
            json.dump(signals, f, indent=2)
            
    except Exception as e:
        print(f"Error saving signal: {e}")

    # 3. Log the structured result to terminal (optional, for visibility)
    if result:
        print(">> SIGNAL PROCESSED SUCCESSFULLY")
        print(f">> Urgency: {result.get('urgency_score')}/10")
    
    # 4. Acknowledge receipt
    return 'Signal Received', 200

if __name__ == '__main__':
    print("🛡️  ExoCore Receiver Active on Port 5001...")
    app.run(port=5001)
