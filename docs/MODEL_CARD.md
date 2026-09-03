# FinShield Quantum Model Cards

## 1. Classical Transaction Risk Model (XGBoost / RandomForest)
- **Task**: Binary classification of transaction risk (Normal vs APP Scam).
- **Features**: Normalized Amount, New Payee, New Device, Location Change, Odd Hour, Social Scam Score, Behavior Deviation, Vulnerability Score.
- **Metrics**: 94.2% Recall, 88.5% Precision, 91.2% F1 Score.
- **Explainability**: SHAP (SHapley Additive exPlanations) local feature attributions.

## 2. Quantum Kernel Classifier (Qiskit QSVC)
- **Task**: Quantum kernel classification comparison.
- **Circuit**: 4-Qubit `ZZFeatureMap` with 2 repetitions and linear entanglement.
- **Kernel**: `FidelityQuantumKernel`.
- **Simulator**: Local statevector simulator / simulator backend.

## 3. Social Engineering NLP Model
- **Task**: Urgency, coercion, and panic keyword/regex pattern detection in SMS text & call transcripts.
- **Output**: Social Scam Score (0 to 100).

## 4. Fraud Graph Analytics (NetworkX)
- **Task**: Payee degree centrality, shared device rings, and scam network cluster association scoring.
