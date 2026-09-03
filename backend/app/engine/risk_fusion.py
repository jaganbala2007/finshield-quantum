import numpy as np

class MultimodalRiskFusionEngine:
    """
    Fuses sub-model outputs:
    1. Transaction Risk (XGBoost / RandomForest)
    2. Behavior Anomaly (Z-score / statistical deviation)
    3. Social Engineering NLP (Scam text/call urgency)
    4. Fraud Graph Analytics (Graph network risk)
    
    Formula:
    HumanManipulationRisk = 0.35 * SocialRisk + 0.25 * TxnRisk + 0.20 * BehaviorRisk + 0.20 * GraphRisk
    """
    def __init__(self):
        self.weights = {
            "social": 0.35,
            "transaction": 0.25,
            "behavior": 0.20,
            "graph": 0.20
        }

    def fuse_risks(self, txn_risk, behavior_risk, social_risk, graph_risk, vulnerability_score=0.5):
        base_score = (
            self.weights["social"] * social_risk +
            self.weights["transaction"] * txn_risk +
            self.weights["behavior"] * behavior_risk +
            self.weights["graph"] * graph_risk
        )
        
        # Adaptive amplification for vulnerable customers (seniors / low tech skill)
        if vulnerability_score > 0.6 and base_score > 40.0:
            vulnerability_boost = (vulnerability_score - 0.6) * 20.0
            base_score += vulnerability_boost
            
        final_risk = float(np.round(np.clip(base_score, 0.0, 100.0), 2))
        
        return {
            "manipulation_risk_score": final_risk,
            "breakdown": {
                "transaction_risk": txn_risk,
                "behavior_risk": behavior_risk,
                "social_risk": social_risk,
                "graph_risk": graph_risk
            }
        }
