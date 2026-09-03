import numpy as np
import pandas as pd

class FeatureExtractor:
    def __init__(self, customers_df=None, payees_df=None):
        self.customers = customers_df if customers_df is not None else pd.DataFrame()
        self.payees = payees_df if payees_df is not None else pd.DataFrame()
        
    def extract_features(self, txn_data, cust_profile=None, payee_profile=None):
        """
        Transforms raw transaction input into normalized features (8 to 16 dimensions).
        """
        amount = float(txn_data.get("amount", 0.0))
        
        # Default customer baseline if missing
        avg_amt = cust_profile.get("avg_txn_amount", 500.0) if cust_profile else 500.0
        std_amt = cust_profile.get("std_txn_amount", 200.0) if cust_profile else 200.0
        age = cust_profile.get("age", 45) if cust_profile else 45
        digital_skill = cust_profile.get("digital_skill_level", 7) if cust_profile else 7
        
        # Calculated numerical features
        txn_amount_norm = amount / max(1.0, avg_amt)
        amount_zscore = (amount - avg_amt) / max(10.0, std_amt)
        is_new_payee = 1.0 if txn_data.get("is_new_payee", False) else 0.0
        is_new_device = 1.0 if txn_data.get("is_new_device", False) else 0.0
        is_loc_changed = 1.0 if txn_data.get("is_loc_changed", False) else 0.0
        
        hour = int(txn_data.get("hour_of_day", 14))
        is_odd_hour = 1.0 if (hour < 6 or hour > 22) else 0.0
        
        # User vulnerability index (higher for seniors with low tech skill)
        vulnerability_score = float(np.clip((90 - age) / 70.0 + (10 - digital_skill) / 10.0, 0.0, 1.0))
        
        social_scam_score = float(txn_data.get("social_scam_score", 0.0)) / 100.0
        behavior_dev = float(txn_data.get("behavior_deviation", 1.0)) / 10.0
        graph_risk = float(txn_data.get("graph_risk", 0.0)) / 100.0
        
        # Vector suitable for XGBoost & QSVC (8 primary features normalized 0-1)
        feature_vector = np.array([
            min(5.0, txn_amount_norm) / 5.0, # 0: Normalized Amount
            is_new_payee,                    # 1: New Payee Flag
            is_new_device,                   # 2: New Device Flag
            is_loc_changed,                  # 3: Location Change
            is_odd_hour,                     # 4: Odd Hour Flag
            min(1.0, max(0.0, social_scam_score)), # 5: Social NLP Risk
            min(1.0, max(0.0, behavior_dev)),      # 6: Behavior Deviation
            vulnerability_score              # 7: Customer Vulnerability
        ], dtype=np.float32)
        
        feature_dict = {
            "txn_amount_norm": txn_amount_norm,
            "amount_zscore": amount_zscore,
            "is_new_payee": is_new_payee,
            "is_new_device": is_new_device,
            "is_loc_changed": is_loc_changed,
            "is_odd_hour": is_odd_hour,
            "vulnerability_score": vulnerability_score,
            "social_scam_score": social_scam_score,
            "behavior_deviation": behavior_dev,
            "graph_risk": graph_risk
        }
        
        return feature_vector, feature_dict
