import pytest
import sys
import os
from fastapi.testclient import TestClient

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.main import app
from app.engine.feature_extractor import FeatureExtractor
from app.engine.social_model import SocialEngineeringModel
from app.engine.behavior_model import BehaviorAnomalyModel
from app.engine.risk_fusion import MultimodalRiskFusionEngine
from app.engine.policy_engine import AdaptiveFirewallPolicyEngine
from app.pqc_module.ml_kem import PostQuantumCryptoKEM
from app.quantum_module.qsvc_classifier import QuantumKernelClassifier
from app.quantum_module.qaoa_optimizer import QAOAInvestigatorOptimizer

client = TestClient(app)

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

def test_hero_scenario_run():
    response = client.get("/api/scenarios/run/1")
    assert response.status_code == 200
    data = response.json()
    assert data["policy_decision"] == "HOLD"
    assert data["manipulation_risk_score"] >= 85.0
    assert "decision_id" in data

def test_analyst_hitl_decision():
    # Run analysis first to get decision ID
    analyze_resp = client.post("/api/transaction/analyze", json={
        "user_id": 7701,
        "amount": 85000.0,
        "payee": "Rahul Traders",
        "message": "URGENT: Transfer immediately to safe vault",
        "call_transcript": "Officer Sharma speaking. Do not hang up."
    })
    assert analyze_resp.status_code == 200
    analyze_data = analyze_resp.json()
    decision_id = analyze_data["decision_id"]

    # Record analyst approval override
    analyst_resp = client.post("/api/analyst/decision", json={
        "decision_id": decision_id,
        "txn_id": decision_id,
        "analyst_id": "ANALYST-904",
        "action": "APPROVE",
        "notes": "Verified customer verbally via dual-channel call."
    })
    assert analyst_resp.status_code == 200
    analyst_data = analyst_resp.json()
    assert analyst_data["status"] == "success"
    assert analyst_data["audit_entry"]["action"] == "APPROVE"

def test_reset_demo_state():
    resp = client.post("/api/reset")
    assert resp.status_code == 200
    assert resp.json()["status"] == "success"

def test_copilot_sandboxed_explain():
    resp = client.post("/api/copilot/explain", json={
        "query": "Why was this transaction paused?",
        "risk_score": 94.0,
        "decision": "HOLD",
        "reasons": ["Urgency language detected", "First-time beneficiary transfer"]
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "copilot_response" in data
    assert "VERIFIED" in data["security_sandbox_status"]

