import streamlit as st
import sys
import os
import time
import json
import pandas as pd
from scripts.prepflow_engine import process_message

def main():
    # Page Config
    st.set_page_config(
        page_title="PrepFlow OS | ExoCore Systems",
        layout="wide",
        initial_sidebar_state="collapsed"
    )

    # Custom CSS implementation of Sphaerocoris Branding
    st.markdown("""
    <style>
        /* Global Variables */
        :root {
            --ebony: #1A1A1B;
            --green: #D0F0C0;
            --coral: #FF4D4D;
            --ochre: #E3B448;
            --text: #F4F1EA;
            --font-main: 'Montserrat', sans-serif;
        }

        /* Main Background */
        .stApp {
            background-color: var(--ebony);
            color: var(--text);
            font-family: var(--font-main);
        }

        /* Text Areas */
        .stTextArea textarea {
            background-color: rgba(255, 255, 255, 0.05);
            color: var(--green);
            border: 1px solid rgba(208, 240, 192, 0.3);
            font-family: monospace;
            border-radius: 8px;
        }
        
        /* The Shield Button */
        .stButton button {
            background-color: transparent;
            color: var(--green);
            font-weight: bold;
            border: 2px solid var(--green);
            padding: 0.5rem 2rem;
            border-radius: 0px 12px 0px 12px; /* Shield-like corners */
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .stButton button:hover {
            background-color: rgba(208, 240, 192, 0.1);
            box-shadow: 0 0 15px rgba(208, 240, 192, 0.4);
            color: #F4F1EA;
        }

        /* Headers */
        h1, h2, h3 {
            color: var(--text);
            font-family: var(--font-main);
            font-weight: 600;
        }
        
        /* Plate Containers (Cards) */
        .plate-card {
            border: 1px solid var(--green);
            background: rgba(26, 26, 27, 0.6);
            padding: 1.2rem;
            margin-bottom: 1rem;
            border-radius: 0px 15px 0px 15px; /* Shield Corners */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        
        /* Labels & Values */
        .plate-label {
            color: var(--ochre);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 0.5rem;
            border-bottom: 1px solid rgba(227, 180, 72, 0.2);
            padding-bottom: 0.2rem;
            display: inline-block;
        }
        .plate-value {
            color: var(--text);
            font-size: 1.1rem;
            font-weight: 400;
            line-height: 1.5;
        }

        /* Signal Reveal: Pulse Animation */
        @keyframes pulse-coral {
            0% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.4); border-color: var(--coral); }
            70% { box-shadow: 0 0 0 10px rgba(255, 77, 77, 0); border-color: var(--coral); }
            100% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); border-color: var(--coral); }
        }

        .high-urgency {
            border-color: var(--coral);
            animation: pulse-coral 2s infinite;
        }
        .high-urgency .plate-label {
            color: var(--coral);
            border-bottom-color: rgba(255, 77, 77, 0.3);
        }
        
        /* Warning / Missing Info */
        .warning-card {
            border: 1px dashed var(--coral);
            background: rgba(255, 77, 77, 0.05);
            border-radius: 8px;
        }
        .warning-card .plate-label {
            color: var(--coral);
        }

    </style>
    """, unsafe_allow_html=True)

    # Header
    st.title("🛡️ PrepFlow OS")
    st.caption("ExoCore Systems // Operations Module")
    st.markdown("---")

    # Callback to load signal
    def load_signal(sig_data):
        st.session_state.signal_input = sig_data['raw_text']
        st.session_state.result = sig_data['processed']

    # Callback to delete signal
    def delete_signal(idx):
        try:
            db_path = "pending_orders.json"
            if os.path.exists(db_path):
                with open(db_path, 'r') as f:
                    signals = json.load(f)
                
                if 0 <= idx < len(signals):
                    signals.pop(idx)
                    
                    with open(db_path, 'w') as f:
                        json.dump(signals, f, indent=2)
                    
                    # Clear selection if we deleted the current view (optional enhancement)
                    # st.session_state.result = None
        except Exception as e:
            st.error(f"Deletion Error: {e}")

    # Inbox Logic (Sidebar)
    with st.sidebar:
        st.header("📡 Signal Stream")
        
        # Auto-Refresh Toggle
        auto_refresh = st.checkbox("Live Monitor", value=True)
        
        db_path = "pending_orders.json"
        
        if os.path.exists(db_path):
            try:
                with open(db_path, 'r') as f:
                    signals = json.load(f)
                    
                if not signals:
                    st.caption("No active signals.")
                else:
                    st.caption(f"{len(signals)} Signals Pending")
                    # Show latest first
                    for i, sig in enumerate(reversed(signals)):
                        client = sig.get('processed', {}).get('customer_name', 'Unknown Source')
                        ts = time.strftime('%H:%M', time.localtime(sig['timestamp']))
                        
                        risk = sig.get('processed', {}).get('resource_risk')
                        risk_icon = "🔴" if risk else "🟢"
                        
                        # Layout: Signal Button (85%) | Delete Button (15%)
                        col_s, col_d = st.columns([0.85, 0.15])
                        
                        # Calculate original index (since we are iterating reversed)
                        original_idx = len(signals) - 1 - i
                        
                        with col_s:
                             st.button(f"{risk_icon} {ts} | {client}", 
                                key=f"sig_{i}", 
                                use_container_width=True, 
                                on_click=load_signal, 
                                args=(sig,))
                        
                        with col_d:
                            st.button("🗑️", 
                                key=f"del_{i}", 
                                on_click=delete_signal, 
                                args=(original_idx,),
                                help="Archive Signal")
                            
            except Exception as e:
                st.error(f"Stream Error: {e}")
        else:
            st.caption("Waiting for link...")
            

    # Layout (Standard)
    col1, col2 = st.columns([1, 1], gap="large")

    with col1:
        st.subheader("INBOUND SIGNAL")
        
        # Text Area with specific KEY for state management
        raw_input = st.text_area("Paste raw order text...", height=300, 
                               placeholder="Hi, we need 50 packs...",
                               key="signal_input")
        
        # Spacer
        st.write("")
        if st.button("EVOLVE SIGNAL"):
            with st.spinner("Initializing Plate Lock..."):
                # Store result in session state
                st.session_state.result = process_message(raw_input)

    with col2:
        st.subheader("THE PLATE (STRUCTURED)")
        
        # Check if result exists in session state
        if 'result' in st.session_state and st.session_state.result:
            result = st.session_state.result
            
            # --- PLATE DISPLAY CODE ---
            # Customer Name
            st.markdown(f"""
            <div class="plate-card">
                <div class="plate-label">Source Identity</div>
                <div class="plate-value">{result.get('customer_name', 'Unknown')}</div>
            </div>
            """, unsafe_allow_html=True)

            # Order Items
            items = result.get('order_items', [])
            items_html = "<ul style='margin-bottom:0; padding-left:1.5rem;'>" + "".join([f"<li>{item}</li>" for item in items]) + "</ul>"
            st.markdown(f"""
            <div class="plate-card">
                <div class="plate-label">Manifest Load</div>
                <div class="plate-value">{items_html}</div>
            </div>
            """, unsafe_allow_html=True)
            
            # Inventory Shield Risk
            risk = result.get('resource_risk')
            if risk:
                 st.markdown(f"""
                <div class="plate-card warning-card" style="border-color: #FF00FF; background: rgba(255, 0, 255, 0.05);">
                    <div class="plate-label" style="color: #FF00FF;">🛡️ INVENTORY SHIELD ALERT</div>
                    <div class="plate-value">{risk}</div>
                </div>
                """, unsafe_allow_html=True)

            # Urgency & Deadline
            urgency = result.get('urgency_score', 0)
            urgency_class = "high-urgency" if urgency > 7 else ""
            urgency_color = "#FF4D4D" if urgency > 7 else "#D0F0C0"
            
            st.markdown(f"""
            <div class="plate-card {urgency_class}">
                <div class="plate-label">Timeline Protocol</div>
                <div class="plate-value">
                    Due: {result.get('deadline', 'None')}<br>
                    Urgency: <strong style="color:{urgency_color}">{urgency}/10</strong>
                </div>
            </div>
            """, unsafe_allow_html=True)

            # Missing Info (Signal Reveal)
            missing = result.get('missing_info', [])
            if missing:
                missing_html = ", ".join(missing)
                st.markdown(f"""
                <div class="plate-card warning-card">
                    <div class="plate-label">⚠️ SIGNAL REVEAL: MISSING DATA</div>
                    <div class="plate-value">{missing_html}</div>
                </div>
                """, unsafe_allow_html=True)
            
            # Suggested Response
            response_text = result.get('suggested_response', "")
            if response_text:
                st.markdown(f"""
                <div class="plate-card" style="border-left-color: var(--ochre)">
                    <div class="plate-label">Draft Relay</div>
                    <div class="plate-value" style="font-size: 0.9rem; font-style: italic;">"{response_text}"</div>
                </div>
                """, unsafe_allow_html=True)

            # --- ACTION PROTOCOL ---
            st.markdown("### ACTION PROTOCOL")
            col_a, col_b = st.columns(2)
            
            # Create a unique hash for the keys to prevent ghosting
            import hashlib
            sig_hash = hashlib.md5(str(result).encode()).hexdigest()[:8]
            
            with col_a:
                if st.button("SNAP TO TASKS", key=f"snap_{sig_hash}"):
                    import csv
                    from datetime import datetime
                    import pandas as pd
                    
                    # 1. Update Master Inventory
                    inventory_path = "master_inventory.csv"
                    impact = result.get('inventory_impact', [])
                    deductions_made = []
                    
                    if os.path.exists(inventory_path) and impact:
                        try:
                            df = pd.read_csv(inventory_path)
                            # Normalize helper
                            
                            for deduction in impact:
                                item_name = deduction.get('item')
                                qty = float(deduction.get('qty', 0))
                                
                                # Find row
                                mask = df['Item'].str.lower() == item_name.lower()
                                if mask.any():
                                    current_stock = df.loc[mask, 'Current_Stock'].values[0]
                                    new_stock = max(0, current_stock - qty)
                                    df.loc[mask, 'Current_Stock'] = new_stock
                                    deductions_made.append(f"{item_name}: -{qty}")
                                    
                            df.to_csv(inventory_path, index=False)
                            st.success("Inventory Shield Updated. Stock Deducted.")
                            if deductions_made:
                                st.caption("Applied: " + ", ".join(deductions_made))
                                
                        except Exception as e:
                            st.error(f"Inventory Error: {e}")
                    elif not impact:
                        st.warning("No mappable ingredients found for deduction.")

                    # 2. Log to Inventory Log (Task Snap)
                    log_path = "inventory_log.csv"
                    file_exists = os.path.isfile(log_path)
                    
                    with open(log_path, mode='a', newline='') as file:
                        writer = csv.writer(file)
                        if not file_exists:
                            writer.writerow(['Timestamp', 'Customer', 'Items', 'Deadline', 'Urgency', 'Risk'])
                        
                        writer.writerow([
                            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                            result.get('customer_name', 'Unknown'),
                            ", ".join(result.get('order_items', [])),
                            result.get('deadline', 'None'),
                            result.get('urgency_score', 0),
                            result.get('resource_risk', 'None')
                        ])

            with col_b:
                import urllib.parse
                safe_text = urllib.parse.quote(response_text)
                whatsapp_url = f"https://wa.me/?text={safe_text}"
                
                # Custom Coral Button via HTML because st.link_button has limited styling
                st.markdown(f"""
                <a href="{whatsapp_url}" target="_blank">
                    <button style="
                        width: 100%;
                        background-color: var(--coral);
                        color: white;
                        border: none;
                        padding: 0.6rem;
                        font-weight: bold;
                        border-radius: 4px;
                        cursor: pointer;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        transition: all 0.3s ease;
                    ">
                    SIGNAL CLIENT
                    </button>
                </a>
                """, unsafe_allow_html=True)

        elif not raw_input:
            st.info("Awaiting Input Signal...")

    # Auto-refresh loop (Placed at the end to ensure UI renders first)
    if auto_refresh:
        time.sleep(5)
        st.rerun()

if __name__ == "__main__":
    main()
