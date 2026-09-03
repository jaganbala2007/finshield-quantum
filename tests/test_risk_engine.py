import pytest
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.engine.feature_extractor import FeatureExtractor
from app.engine.social_model import SocialEngineeringModel
from app.engine.behavior_model import BehaviorAnomalyModel
from app.engine.risk_fusion import MultimodalRiskFusionEngine
from app.engine.policy_engine import AdaptiveFirewallPolicyEngine
from app.pqc_module.ml_kem import PostQuantumCryptoKEM
from app.quantum_module.qsvc_classifier import QuantumKernelClassifier
from app.quantum_module.qaoa_optimizer import QAOAInvestigatorOptimizer

def test_social_engineering_nlp():
    social_model = SocialEngineeringModel()
    score, reasons = social_model.analyze_communication(
        message_text="URGENT: Your account will be frozen! Transfer funds immediately to safe vault account.",
        call_transcript="Hello, I am Officer Sharma from Bank Security. Do not hang up!"
    )
    assert score >= 75.0
    assert len(reasons) > 0

def test_risk_fusion_and_policy_decision():
    fusion_engine = MultimodalRiskFusionEngine()
    policy_engine = AdaptiveFirewallPolicyEngine()
    
    # High risk inputs
    fusion_res = fusion_engine.fuse_risks(
        txn_risk=92.0,
        behavior_risk=85.0,
        social_risk=95.0,
        graph_risk=88.0,
        vulnerability_score=0.8
    )
    assert fusion_res["manipulation_risk_score"] >= 85.0
    
    policy_res = policy_engine.evaluate_policy(fusion_res, ["Urgency language detected"], {"age": 72})
    assert policy_res["decision"] == "HOLD"
    assert policy_res["action_code"] == 3

def test_pqc_ml_kem_handshake():
    pqc = PostQuantumCryptoKEM(algorithm="ML-KEM-512")
    res = pqc.execute_handshake_demo()
    assert res["handshake_verified"] is True
    assert "ML-KEM" in res["algorithm"]

def test_quantum_qsvc_and_qaoa():
    qsvc = QuantumKernelClassifier(num_qubits=4)
    assert qsvc.num_qubits == 4
    
    qaoa = QAOAInvestigatorOptimizer()
    cases = [
        {"txn_id": "T1", "risk_score": 95, "amount": 100000.0, "vulnerability": 0.9},
        {"txn_id": "T2", "risk_score": 90, "amount": 50000.0, "vulnerability": 0.8}
    ]
    res = qaoa.solve_prioritization(cases, capacity_limit=1)
    assert len(res["classical_greedy"]["selected_cases"]) == 1
