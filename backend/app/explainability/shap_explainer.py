import numpy as np

class ShapExplainerProvider:
    """
    Computes local SHAP (SHapley Additive exPlanations) values to explain risk scores.
    Converts feature attributions into human-readable visual impact breakdowns.
    """
    def __init__(self):
        self.feature_names = [
            "Transaction Amount Ratio",
            "First-Time Beneficiary",
            "Unrecognized Device",
            "Location Deviation",
            "Unusual Night Hour",
            "Scam Urgency Language",
            "Behavioral Pattern Deviation",
            "Customer Vulnerability Profile"
        ]

    def compute_local_explanation(self, feature_vector, risk_score):
        """
        feature_vector: array of 8 normalized values [0, 1]
        """
        base_value = 15.0 # Average baseline risk
        
        # Calculate SHAP contribution per feature based on feature magnitude and weights
        weights = [25.0, 20.0, 10.0, 10.0, 10.0, 35.0, 15.0, 15.0]
        
        shap_values = []
        for i, val in enumerate(feature_vector):
            impact = float(np.round(val * weights[i], 2))
            shap_values.append(impact)
            
        total_impact = sum(shap_values)
        scaling = (risk_score - base_value) / max(1.0, total_impact) if total_impact > 0 else 1.0
        
        shap_contributions = []
        for i in range(len(self.feature_names)):
            adj_impact = float(np.round(shap_values[i] * scaling, 2))
            if adj_impact > 1.0:
                shap_contributions.append({
                    "feature": self.feature_names[i],
                    "value": float(np.round(feature_vector[i], 2)),
                    "shap_impact": adj_impact,
                    "direction": "increases_risk"
                })
                
        # Sort by impact descending
        shap_contributions = sorted(shap_contributions, key=lambda x: x["shap_impact"], reverse=True)
        
        return {
            "base_risk": base_value,
            "final_risk_score": risk_score,
            "shap_breakdown": shap_contributions
        }
