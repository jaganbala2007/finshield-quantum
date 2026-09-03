import os
import json
import random
import numpy as np
import pandas as pd

def generate_synthetic_data(output_dir="data"):
    os.makedirs(output_dir, exist_ok=True)
    np.random.seed(42)
    random.seed(42)

    print("Generating synthetic customers...")
    num_customers = 10000
    customers = []
    
    first_names = ["Aarav", "Sunita", "Rajesh", "Meena", "Ramesh", "Priya", "Vikram", "Lakshmi", "Anish", "Kavita", "Arthur", "Eleanor", "George", "Martha", "Devi", "Suresh"]
    last_names = ["Sharma", "Patel", "Verma", "Rao", "Gupta", "Nair", "Singhania", "Deshmukh", "Smith", "Johnson", "Williams", "Taylor", "Kumar", "Joshi"]

    for cid in range(1001, 1001 + num_customers):
        age = int(np.random.choice(range(18, 92), p=np.hstack([np.full(42, 0.65/42), np.full(32, 0.35/32)])))
        
        # Digital skill level inversely correlated with age on average
        if age > 65:
            skill = int(np.clip(np.random.normal(3.5, 1.2), 1, 10))
            is_vulnerable = True
        else:
            skill = int(np.clip(np.random.normal(7.5, 1.5), 1, 10))
            is_vulnerable = bool(skill < 4)
            
        avg_amt = float(np.round(np.random.lognormal(mean=7.5, sigma=0.8), 2))
        std_amt = float(np.round(avg_amt * np.random.uniform(0.2, 0.6), 2))
        
        cust_name = f"{random.choice(first_names)} {random.choice(last_names)}"
        typical_hours = [int(h) for h in range(8, 22)]
        primary_device = f"DEV-{cid:04d}-A"
        trusted_contact = f"+91 98765 {random.randint(10000, 99999)}" if is_vulnerable else ""
        
        customers.append({
            "customer_id": cid,
            "name": cust_name,
            "age": age,
            "digital_skill_level": skill,
            "vulnerability_flag": is_vulnerable,
            "avg_txn_amount": avg_amt,
            "std_txn_amount": std_amt,
            "primary_device": primary_device,
            "trusted_contact": trusted_contact,
            "account_created_days": random.randint(30, 3650)
        })

    customers_df = pd.DataFrame(customers)
    customers_df.to_csv(os.path.join(output_dir, "customers.csv"), index=False)

    print("Generating payees...")
    num_payees = 1500
    payees = []
    merchant_types = ["Grocery", "Utilities", "E-commerce", "Travel", "Healthcare", "Peer-Transfer", "Cryptocurrency", "Unverified Merchant"]
    
    for pid in range(5001, 5001 + num_payees):
        is_high_risk = (pid > 6300) # 200 payees associated with scam networks
        ptype = "Cryptocurrency" if is_high_risk and random.random() > 0.5 else random.choice(merchant_types)
        payees.append({
            "payee_id": f"PAY-{pid}",
            "payee_name": f"Merchant_{pid}" if pid % 2 == 0 else f"Account_{pid}",
            "payee_type": ptype,
            "is_suspicious_network": is_high_risk,
            "historical_fraud_count": random.randint(5, 50) if is_high_risk else 0
        })

    payees_df = pd.DataFrame(payees)
    payees_df.to_csv(os.path.join(output_dir, "payees.csv"), index=False)

    # 10 Attack Scenarios Templates
    scam_scenarios_templates = [
        {
            "scenario_id": 1,
            "name": "Fake Bank Officer Call",
            "keywords": ["urgent", "bank security", "account blocked", "transfer now", "safe account"],
            "message": "SECURITY ALERT: Your bank account is under unauthorized access. Call 1800-SAFE-BANK immediately to prevent asset lock.",
            "transcript": "Hello, I am Officer Sharma from National Bank Security. We detected a suspicious login from Russia on your account. To protect your money, you must immediately transfer your funds to our temporary safe vault account PAY-6350. Do not hang up or contact anyone.",
            "amount_multiplier": 8.5
        },
        {
            "scenario_id": 2,
            "name": "Phishing SMS / KYC Freeze",
            "keywords": ["kyc expired", "account frozen", "verify link", "immediate action"],
            "message": "URGENT: Your KYC status expired today. Your account will be frozen in 2 hours. Click http://bank-kyc-verify.com to complete verification and update payee.",
            "transcript": "",
            "amount_multiplier": 4.2
        },
        {
            "scenario_id": 3,
            "name": "Fake Law Enforcement Coercion",
            "keywords": ["police", "cbi", "warrant", "bail", "legal action", "confidential"],
            "message": "LEGAL NOTICE: High Court warrant issued against your Aadhaar/SSN for money laundering. Contact Inspector Verma immediately.",
            "transcript": "This is Inspector Verma from Crime Branch. Your name is linked to a seized cartel account. You must deposit ₹150,000 to government court escrow PAY-6380 for audit before 5 PM to avoid instant arrest.",
            "amount_multiplier": 12.0
        },
        {
            "scenario_id": 4,
            "name": "Bogus Investment Scheme",
            "keywords": ["guaranteed 200%", "crypto profit", "limited slot", "wealth broker"],
            "message": "Exclusive Offer: Double your savings in 7 days with AI Quantum Trading. Wire initial deposit now to reserve slot.",
            "transcript": "Sir, this is Apex Crypto Wealth. If you transfer ₹50,000 today to PAY-6410, our AI bot guarantees 250% return by Friday. Hundreds of users are already withdrawing profits.",
            "amount_multiplier": 6.0
        },
        {
            "scenario_id": 5,
            "name": "Lottery / Prize Scam",
            "keywords": ["winner", "lottery", "processing fee", "claim cash"],
            "message": "CONGRATULATIONS! You won ₹25,00,000 in the International Mega Draw. Pay ₹25,000 processing tax to claim reward.",
            "transcript": "Congratulations ma'am! You are our lucky grand winner. Just transfer the government customs clearance fee of ₹25,000 to PAY-6320 and ₹25 Lakhs will be credited to your account within 10 minutes.",
            "amount_multiplier": 3.5
        },
        {
            "scenario_id": 6,
            "name": "Friend / Relative in Need Impersonation",
            "keywords": ["emergency", "hospital bill", "urgent loan", "stranded", "dont tell mom"],
            "message": "Hey uncle, it's Rahul. I got into an accident in Delhi and need ₹45,000 urgently for hospital deposit. Please send to PAY-6390.",
            "transcript": "Hi uncle, I lost my wallet and my car broke down. The hospital needs a cash deposit for my friend's treatment right now. Please don't call my parents, just send money to PAY-6390 urgently!",
            "amount_multiplier": 5.0
        },
        {
            "scenario_id": 7,
            "name": "Malicious QR Code Scam",
            "keywords": ["scan qr", "city tax refund", "receive money"],
            "message": "Municipal Tax Department: You have a tax refund of ₹12,500 pending. Scan QR code and approve transfer to claim.",
            "transcript": "",
            "amount_multiplier": 2.0
        },
        {
            "scenario_id": 8,
            "name": "Relative in Distress Call",
            "keywords": ["kidnapped", "ransom", "emergency wire", "police impossible"],
            "message": "We have your family member. Send money now or face consequences.",
            "transcript": "Listen carefully! We have your son in custody. If you want him back safe, transfer ₹200,000 to PAY-6370 within 30 minutes. Do not call the police or hang up!",
            "amount_multiplier": 15.0
        },
        {
            "scenario_id": 9,
            "name": "Tech Support Remote Access Scam",
            "keywords": ["virus detected", "microsoft security", "anydesk", "cleanup fee"],
            "message": "CRITICAL ERROR: Windows Trojan detected! Call Microsoft Support 1800-444-TECH immediately.",
            "transcript": "Sir, your computer is broadcasting malware to bank servers. Install AnyDesk and transfer ₹35,000 security patch license fee to PAY-6340 to prevent bank account suspension.",
            "amount_multiplier": 3.0
        },
        {
            "scenario_id": 10,
            "name": "Deepfake Executive Wire Call",
            "keywords": ["ceo instruction", "confidential M&A", "urgent wire", "audit secret"],
            "message": "CONFIDENTIAL: Execute M&A deposit wire immediately per CEO direct memo.",
            "transcript": "This is Chief Executive Officer David. We are closing a secret acquisition today. Wire ₹300,000 immediately to PAY-6400. Do not mention this to colleagues until press release.",
            "amount_multiplier": 18.0
        }
    ]

    with open(os.path.join(output_dir, "scam_templates.json"), "w") as f:
        json.dump(scam_scenarios_templates, f, indent=2)

    print("Generating transactions & scam instances...")
    transactions = []
    messages = []
    
    # 1. Generate 49,500 normal transactions
    for tid in range(100001, 100001 + 49500):
        cust = random.choice(customers)
        payee = random.choice(payees[:1300]) # normal payees
        
        # Normal amount centered around user's average
        amount = max(50.0, float(np.round(np.random.normal(cust["avg_txn_amount"], cust["std_txn_amount"]), 2)))
        hour = int(np.random.choice(range(7, 23)))
        
        is_new_payee = random.random() < 0.15
        is_new_device = random.random() < 0.05
        is_loc_changed = random.random() < 0.04
        
        transactions.append({
            "txn_id": f"TXN-{tid}",
            "customer_id": cust["customer_id"],
            "payee_id": payee["payee_id"],
            "amount": amount,
            "hour_of_day": hour,
            "is_new_payee": is_new_payee,
            "is_new_device": is_new_device,
            "is_loc_changed": is_loc_changed,
            "valid_otp": True,
            "social_scam_score": float(np.round(np.random.beta(0.5, 5.0) * 15, 2)), # Low social score
            "behavior_deviation": float(np.round(np.random.normal(1.0, 0.5), 2)),
            "label_is_fraud": False,
            "scam_scenario_id": 0
        })

    # 2. Inject 500 High-Risk APP Scam Transactions
    for sid in range(1, 501):
        scen = random.choice(scam_scenarios_templates)
        # Select vulnerable customer with higher probability
        vulnerable_custs = [c for c in customers if c["vulnerability_flag"]]
        cust = random.choice(vulnerable_custs) if random.random() < 0.75 else random.choice(customers)
        
        payee = random.choice([p for p in payees if p["is_suspicious_network"]])
        
        # Large amount based on scam multiplier
        amount = float(np.round(cust["avg_txn_amount"] * scen["amount_multiplier"] * np.random.uniform(0.9, 1.3), 2))
        hour = int(np.random.choice([23, 0, 1, 2, 3, 4, 5, 14, 15])) # often odd hours or sudden panic
        
        # High social scam score from text/call urgency
        social_score = float(np.round(np.random.uniform(75.0, 99.0), 2))
        behavior_dev = float(np.round(np.random.uniform(3.5, 8.5), 2))
        
        tx_id = f"TXN-SCAM-{sid:04d}"
        transactions.append({
            "txn_id": tx_id,
            "customer_id": cust["customer_id"],
            "payee_id": payee["payee_id"],
            "amount": amount,
            "hour_of_day": hour,
            "is_new_payee": True,
            "is_new_device": random.random() < 0.4,
            "is_loc_changed": random.random() < 0.3,
            "valid_otp": True, # OTP is valid! Customer was manipulated into providing/entering it!
            "social_scam_score": social_score,
            "behavior_deviation": behavior_dev,
            "label_is_fraud": True,
            "scam_scenario_id": scen["scenario_id"]
        })
        
        # Log message/transcript
        messages.append({
            "message_id": f"MSG-{sid:04d}",
            "txn_id": tx_id,
            "customer_id": cust["customer_id"],
            "scam_scenario": scen["name"],
            "sms_text": scen["message"],
            "call_transcript": scen["transcript"]
        })

    tx_df = pd.DataFrame(transactions)
    tx_df.to_csv(os.path.join(output_dir, "transactions.csv"), index=False)
    
    msg_df = pd.DataFrame(messages)
    msg_df.to_csv(os.path.join(output_dir, "messages.csv"), index=False)

    print(f"Dataset generated successfully in '{output_dir}':")
    print(f" - Customers: {len(customers_df)}")
    print(f" - Payees: {len(payees_df)}")
    print(f" - Total Transactions: {len(tx_df)} (Scams: {tx_df['label_is_fraud'].sum()})")
    print(f" - Logged Scam Messages: {len(msg_df)}")

if __name__ == "__main__":
    generate_synthetic_data()
