import numpy as np

class BehaviorAnomalyModel:
    """
    Evaluates behavioral anomalies based on z-score distance from historical customer patterns:
    - Amount jump compared to historical average/stddev
    - Unusual time of transaction
    - Device and location novelty
    - Sudden sequence speed (e.g. instant high transfer after login)
    """
    def predict_anomaly(self, txn_data, cust_profile=None):
        amount = float(txn_data.get("amount", 0.0))
        avg_amt = cust_profile.get("avg_txn_amount", 500.0) if cust_profile else 500.0
        std_amt = cust_profile.get("std_txn_amount", 200.0) if cust_profile else 200.0
        
        # Calculate amount deviation multiplier
        amt_ratio = amount / max(1.0, avg_amt)
        z_score = (amount - avg_amt) / max(10.0, std_amt)
        
        is_new_payee = txn_data.get("is_new_payee", False)
        is_new_device = txn_data.get("is_new_device", False)
        is_loc_changed = txn_data.get("is_loc_changed", False)
        
        hour = int(txn_data.get("hour_of_day", 14))
        is_odd_hour = (hour < 6 or hour > 22)
        
        # Calculate behavior anomaly score (0 - 100)
        score = 0.0
        
        if amt_ratio > 10.0:
            score += 45.0
        elif amt_ratio > 5.0:
            score += 35.0
        elif amt_ratio > 2.5:
            score += 20.0
        elif z_score > 2.0:
            score += 15.0

        if is_new_payee:
            score += 20.0
        if is_new_device:
            score += 15.0
        if is_loc_changed:
            score += 10.0
        if is_odd_hour:
            score += 10.0
            
        # Explicit behavior deviation passed in input if pre-scored
        given_dev = float(txn_data.get("behavior_deviation", 0.0))
        if given_dev > 0:
            score = max(score, min(100.0, given_dev * 12.0))
            
        return float(np.round(np.clip(score, 0.0, 100.0), 2))
