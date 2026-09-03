import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
try:
    from xgboost import XGBClassifier
    HAS_XGBOOST = True
except ImportError:
    HAS_XGBOOST = False

class TransactionRiskModel:
    def __init__(self):
        if HAS_XGBOOST:
            self.model = XGBClassifier(n_estimators=50, max_depth=4, learning_rate=0.1, random_state=42)
        else:
            self.model = RandomForestClassifier(n_estimators=50, max_depth=6, random_state=42)
        self.is_trained = False
        
    def fit(self, X, y):
        self.model.fit(X, y)
        self.is_trained = True

    def train_on_csv(self, csv_path="data/transactions.csv"):
        if not os.path.exists(csv_path):
            print(f"CSV not found at {csv_path}. Using fallback rule weights.")
            return False
            
        df = pd.read_csv(csv_path)
        
        # Build features from CSV
        X = []
        y = df["label_is_fraud"].values.astype(int)
        
        for _, row in df.iterrows():
            amt_norm = min(5.0, row["amount"] / 500.0) / 5.0
            new_p = float(row["is_new_payee"])
            new_d = float(row["is_new_device"])
            loc_c = float(row["is_loc_changed"])
            odd_h = 1.0 if (row["hour_of_day"] < 6 or row["hour_of_day"] > 22) else 0.0
            soc_s = float(row["social_scam_score"]) / 100.0
            beh_d = float(row["behavior_deviation"]) / 10.0
            vuln  = 0.5 # average proxy
            
            vec = [amt_norm, new_p, new_d, loc_c, odd_h, soc_s, beh_d, vuln]
            X.append(vec)
            
        X = np.array(X, dtype=np.float32)
        self.fit(X, y)
        print("Transaction Risk Model trained successfully on synthetic dataset.")
        return True

    def predict_risk(self, feature_vector):
        """
        Returns risk score 0 to 100
        """
        if self.is_trained:
            prob = self.model.predict_proba(feature_vector.reshape(1, -1))[0][1]
            return float(np.round(prob * 100.0, 2))
        else:
            # Heuristic fallback if not trained yet
            # feature_vector = [amt_norm, new_p, new_d, loc_c, odd_h, soc_s, beh_d, vuln]
            weights = np.array([0.25, 0.20, 0.10, 0.10, 0.10, 0.15, 0.05, 0.05])
            score = np.dot(feature_vector, weights) * 100.0
            return float(np.round(np.clip(score, 0.0, 100.0), 2))
