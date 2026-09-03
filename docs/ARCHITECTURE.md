# FinShield Quantum Architecture Specification

## Overview
FinShield Quantum is an AI-powered defense layer designed to detect authorized-push-payment (APP) scams by focusing on **human manipulation cues** rather than just technical transaction anomalies.

```
+------------------+         +----------------------------+
| Customer App /   | ------> | FastAPI Gateway            |
| Web Simulator    |         | /api/transaction/analyze   |
+------------------+         +----------------------------+
                                           |
                                           v
                             +----------------------------+
                             | Multimodal Risk Engine     |
                             +----------------------------+
                               /     |            \      \
                              /      |             \      \
                             v       v              v      v
                    +----------+ +-----------+ +------+ +--------+
                    | XGBoost  | | Z-Score   | | NLP  | | Graph  |
                    | Txn Model| | Behavior  | | Text | | Network|
                    +----------+ +-----------+ +------+ +--------+
                               \     |            /      /
                                \    |           /      /
                                 v   v          v      v
                             +----------------------------+
                             | Multimodal Risk Fusion     |
                             | Human Manipulation Score   |
                             +----------------------------+
                                           |
                                           v
                             +----------------------------+
                             | Adaptive Firewall Policy   |
                             | (ALLOW/VERIFY/PAUSE/HOLD)  |
                             +----------------------------+
                                           |
                                           v
                             +----------------------------+
                             | SHAP Reason Explainer &    |
                             | Accessible UI Alert Modal  |
                             +----------------------------+
```

## Advanced Quantum & PQC Layers
1. **Qiskit QSVC Quantum Classifier**: 4-qubit `ZZFeatureMap` kernel benchmarked against classical XGBoost/SVM.
2. **QAOA Investigation Prioritization**: Max-weight QUBO solver allocating top-K fraud analyst capacity.
3. **NIST ML-KEM-512 (Kyber)**: Quantum-resistant key encapsulation mechanism for secure banking channels.
