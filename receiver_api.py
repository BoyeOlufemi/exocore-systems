from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sys
import os

# Signal Engine Integration
# Add the PrepFlow Logic path to the system so we can import the brain
sys.path.append(os.path.join(os.path.dirname(__file__), 'siblings', 'prepflow-os', 'scripts'))
from prepflow_engine import process_message
from exocore_storage import append_signal

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 64 * 1024
CORS(
    app,
    resources={
        r"/inbound": {
            "origins": os.getenv("EXOCORE_ALLOWED_ORIGIN", "http://localhost:5001")
        }
    },
)

@app.route('/llms.txt')
def serve_llms_txt():
    return send_from_directory(os.path.dirname(__file__), 'llms.txt')

@app.route('/.well-known/mcp.json')
def serve_mcp_json():
    return send_from_directory(os.path.join(os.path.dirname(__file__), '.well-known'), 'mcp.json')


@app.route('/inbound', methods=['POST'])
def inbound():
    receiver_token = os.getenv("EXOCORE_RECEIVER_TOKEN")
    if not receiver_token:
        return jsonify(error="Receiver is not configured"), 503
    if request.headers.get("Authorization") != f"Bearer {receiver_token}":
        return jsonify(error="Unauthorized"), 401
    if request.mimetype not in {"text/plain", "application/json"}:
        return jsonify(error="Content-Type must be text/plain or application/json"), 415

    # 1. Capture the raw signal
    raw_data = request.get_data(as_text=True).strip()
    if not raw_data:
        return jsonify(error="Inbound message is required"), 400

    # 2. Pass to the AI Brain
    result = process_message(raw_data)
    
    # 2.5 Persistence (The Bridge to Dashboard)
    import time
    
    # Path to shared signal log
    log_path = os.path.join(os.path.dirname(__file__), 'siblings', 'prepflow-os', 'pending_orders.json')
    
    signal_entry = {
        "timestamp": time.time(),
        "raw_text": raw_data,
        "processed": result
    }
    
    try:
        append_signal(log_path, signal_entry)
    except Exception as e:
        return jsonify(error=f"Signal persistence failed: {e}"), 500

    # 3. Log the structured result to terminal (optional, for visibility)
    if result:
        print(">> SIGNAL PROCESSED SUCCESSFULLY")
        print(f">> Urgency: {result.get('urgency_score')}/10")
    
    # 4. Acknowledge receipt
    if not result:
        return jsonify(error="Signal processing failed"), 502
    return jsonify(status="received", processed=result), 200

if __name__ == '__main__':
    print("🛡️  ExoCore Receiver Active on Port 5001...")
    app.run(port=5001)
