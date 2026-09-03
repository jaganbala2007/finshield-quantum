# FinShield Quantum - 5-Minute Hackathon Judge Demo Script

## 1. Problem Introduction (1 Minute)
"Hello judges. Authorized Push Payment (APP) scams are exploding globally—loss estimates reach $6.8 Billion by 2027. Elderly and digitally inexperienced users are tricked by fake bank officers, phishing texts, and police impersonators into authorizing transfers. Traditional fraud filters fail because the OTP and device are valid. FinShield Quantum solves this by detecting **human manipulation** behind the payment."

## 2. Normal Transaction Demonstration (1 Minute)
1. Open the [Customer App Portal](http://localhost:3000).
2. Click **Normal Payment Preset** (₹2,500 to Electric Utility Corp).
3. Click **Analyze & Authorize Transfer**.
4. Show the instant green **ALLOW** badge. FinShield validates low risk score (<20) and allows smooth checkout.

## 3. APP Scam Attack Interception (2 Minutes)
1. Click **Scam Attack Preset** (Fake Bank Officer Call - ₹85,000 to PAY-6350).
2. Show the populated SMS ("Account frozen immediately") and Call Transcript ("Officer Sharma: Transfer funds to safe vault account PAY-6350").
3. Click **Analyze & Authorize Transfer**.
4. The red **HOLD / PAUSE** modal pops up instantly:
   - **Human Manipulation Risk Score**: **94.2 / 100**.
   - Highlight the **SHAP Explanation**: "Scam Urgency Language (+34.5 pts)", "Amount 8.5x average (+28.2 pts)", "First-time payee".
   - Click **Read Aloud** to showcase the voice TTS accessibility for senior users.
   - Click **Notify Trusted Contact** to show the family SMS alert workflow.

## 4. Quantum & PQC Showcase (1 Minute)
1. Navigate to **Quantum Lab**: Show the empirical benchmark table (Classical SVM vs Qiskit 4-Qubit QSVC and QAOA case prioritization).
2. Navigate to **PQC Security**: Click **Run ML-KEM Handshake** to show NIST FIPS 203 ML-KEM-512 key encapsulation and verified shared secret.
3. Conclude with **System Metrics**: 94.2% Fraud Recall Rate, <3.8% False Alarm Rate, sub-50ms API latency.
