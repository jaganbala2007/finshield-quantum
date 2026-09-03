class AdaptiveFirewallPolicyEngine:
    """
    4-Tier Adaptive Firewall Policy Engine:
    - 0 - 29: ALLOW (Green)
    - 30 - 59: VERIFY (Yellow - OTP challenge / quick security query)
    - 60 - 84: PAUSE (Orange - Interstitial safety reflection hold with SHAP reasons)
    - 85 - 100: HOLD (Red - Block transfer, trigger human review / notify trusted contact)
    """
    def evaluate_policy(self, risk_fusion_output, reasons_list, cust_profile=None):
        score = risk_fusion_output["manipulation_risk_score"]
        breakdown = risk_fusion_output["breakdown"]
        
        if score < 30.0:
            decision = "ALLOW"
            action_code = 0
            user_title = "Payment Approved"
            user_message = "Transaction passed all security checks."
            recommendation = "Proceed with payment."
        elif score < 60.0:
            decision = "VERIFY"
            action_code = 1
            user_title = "Step-Up Verification Required"
            user_message = "Unusual payment pattern detected. Please verify your identity via OTP."
            recommendation = "Enter 6-digit OTP sent to your registered mobile."
        elif score < 85.0:
            decision = "PAUSE"
            action_code = 2
            user_title = "⚠ Safety Pause: Potential Scam Warning"
            user_message = "FinShield detected strong manipulation indicators for this payment."
            recommendation = "Take 60 seconds to reflect. Contact your bank directly or verify with family before proceeding."
        else:
            decision = "HOLD"
            action_code = 3
            user_title = "⛔ Payment Blocked: High Fraud Risk"
            user_message = "Payment held to protect your funds from confirmed social engineering scam patterns."
            recommendation = "Transfer blocked. Trusted contact notified. Call official bank helpline immediately."

        # Compile explainable reasons
        explanation_items = list(reasons_list)
        if breakdown["transaction_risk"] > 70:
            explanation_items.append("Transaction amount significantly exceeds normal baseline")
        if breakdown["behavior_risk"] > 70:
            explanation_items.append("First-time beneficiary at unusual transaction hour")
        if breakdown["social_risk"] > 60:
            explanation_items.append("High urgency language detected in recent SMS/Call transcript")
        if breakdown["graph_risk"] > 60:
            explanation_items.append("Payee account associated with reported fraud networks")

        return {
            "decision": decision,
            "action_code": action_code,
            "manipulation_risk_score": score,
            "breakdown": breakdown,
            "user_title": user_title,
            "user_message": user_message,
            "recommendation": recommendation,
            "reasons": list(set(explanation_items))
        }
