import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ANSI Colors for Signal Reveal
RED_BOLD = "\033[1;31m"
RESET = "\033[0m"
GREEN = "\033[0;32m"
CYAN = "\033[0;36m"
YELLOW = "\033[1;33m"

def print_plate_lock_header(title):
    width = 60
    print(f"{CYAN}╔{'═' * (width - 2)}╗{RESET}")
    print(f"{CYAN}║{title.center(width - 2)}║{RESET}")
    print(f"{CYAN}╚{'═' * (width - 2)}╝{RESET}")

def print_plate_lock_section(title, content):
    width = 60
    print(f"\n{YELLOW}┌── {title} {'─' * (width - len(title) - 5)}{RESET}")
    if isinstance(content, dict):
        for k, v in content.items():
            print(f"│ {k.ljust(20)}: {v}")
    else:
        print(f"│ {content}")
    print(f"{YELLOW}└{'─' * (width - 1)}{RESET}")

def signal_reveal_error(message):
    print(f"\n{RED_BOLD}⚠️  SIGNAL DETECTED: CRITICAL ERROR{RESET}")
    print(f"{RED_BOLD}   {message}{RESET}")
    print(f"{RED_BOLD}   Please create a .env file with GOOGLE_API_KEY=your_key_here{RESET}\n")

def process_message(raw_text):
    api_key = os.getenv("GOOGLE_API_KEY")
    
    if not api_key:
        signal_reveal_error("Missing Google Generative AI API Key.")
        return None

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')

        system_instruction = """
        You are the PrepFlow OS AI Brain. Your task is to extract structured variables from raw inbound messages.
        
        Analyze the following text and return a valid JSON object with these exact keys:
        - "customer_name": Name of the requester (or "Unknown").
        - "order_items": List of specific items/services requested.
        - "deadline": Specific date or time mentioned (or "None").
        - "inventory_needed": List of raw ingredients/materials likely needed for these items.
        - "urgency_score": Integer 1-10 based on deadline proximity and tone.
        - "user_queries": List of specific questions or requests (e.g., "price?", "can we change location?").
        - "missing_info": List of critical details NOT provided. CRITICAL: If a user mentions a location change but does not provide the specific address, you MUST list "specific delivery address" here.
        - "suggested_response": A polite, professional message ready for the business owner to send back to the client, addressing their questions and requesting any missing info.
        - "resource_risk": If any single item order quantity exceeds 100 units, flag it here (e.g., "High Volume: [Item Name]"). Otherwise, set to null.
        - "inventory_impact": A list of objects representing ingredients to deduct from master inventory. Master items are: ["Flour", "Meat", "Rice", "Spices", "Oil"]. Example: [{"item": "Rice", "qty": 50}, {"item": "Meat", "qty": 10}]. Only include these keys if applicable.
        
        Do not return markdown formatting like ```json. Return ONLY the raw JSON string.
        """
        
        prompt = f"{system_instruction}\n\nINBOUND MESSAGE:\n{raw_text}"
        
        response = model.generate_content(prompt)
        cleaned_text = response.text.strip().replace("```json", "").replace("```", "")
        return json.loads(cleaned_text)

    except Exception as e:
        print(f"{RED_BOLD}Error processing message: {e}{RESET}")
        return None

if __name__ == "__main__":
    print_plate_lock_header("PREPFLOW ENGINE v1.0")

    # Simulated Input
    sample_text = "Hi! It's Grace. For the brunch this Sunday at 11am, can we do 25 portions of the spicy chicken pasta and maybe 15 of those mini fruit platters? Oh, and I forgot to say we moved it to my office address, not the house. Let me know the price so I can pay!"
    
    print_plate_lock_section("INBOUND SIGNAL", sample_text)

    # Process
    print("\n   [ Processing Signal... ]")
    result = process_message(sample_text)

    if result:
        print_plate_lock_section("TRANSLATED OUTPUT", result)
