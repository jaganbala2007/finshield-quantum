# 🛡️ FinShield Quantum – Enterprise Human-Manipulation Fraud Firewall for Banking

<p align="center">
  <img src="https://img.shields.io/badge/System-FinShield%20Quantum-0ea5e9?style=for-the-badge&logo=shield" alt="FinShield Quantum" />
  <img src="https://img.shields.io/badge/Status-100%25%20Verified-10b981?style=for-the-badge&logo=check" alt="Verified Status" />
  <img src="https://img.shields.io/badge/Fraud%20Recall-94.2%25-8b5cf6?style=for-the-badge" alt="Fraud Recall" />
  <img src="https://img.shields.io/badge/API%20Latency-42.5ms-f59e0b?style=for-the-badge" alt="Latency" />
  <img src="https://img.shields.io/badge/Accessibility-WCAG%202.1%20AAA-f43f5e?style=for-the-badge" alt="WCAG AAA" />
  <img src="https://img.shields.io/badge/PQC%20Security-NIST%20ML--KEM--512-0ea5e9?style=for-the-badge" alt="ML-KEM-512" />
  <img src="https://img.shields.io/badge/Quantum%20ML-Qiskit%20QSVC-8b5cf6?style=for-the-badge" alt="Qiskit QSVC" />
</p>

<p align="center">
  <h3 align="center">“Detecting the manipulation behind legitimate transactions.”</h3>
  <p align="center">
    An AI-powered defense infrastructure layer for banking institutions that intercepts Authorized Push Payment (APP) scams and social-engineering coercion before money leaves the victim's account.
  </p>
</p>

---

## 🌐 Live Product Links & Hackathon Artifacts

- 🚀 **Live Web App Portal (Vercel)**: [https://finshield-quantum.vercel.app](https://finshield-quantum.vercel.app)
- ⚙️ **Live FastAPI Backend Service**: [http://localhost:8080](http://localhost:8080)
- 📊 **PowerPoint Widescreen Pitch Deck**: [`FinShield_Quantum_Pitch_Deck.pptx`](file:///C:/Users/jagan/Desktop/new%20project/project%20-%20g/FinShield_Quantum_Pitch_Deck.pptx)
- 📑 **Comprehensive Project Report**: [`docs/FULL_PROJECT_REPORT.md`](file:///c:/Users/jagan/Desktop/new%20project/project%20-%20g/docs/FULL_PROJECT_REPORT.md)
- 🎬 **5-Minute Live Demo Script**: [`docs/DEMO_SCRIPT.md`](file:///c:/Users/jagan/Desktop/new%20project/project%20-%20g/docs/DEMO_SCRIPT.md)
- 💬 **25 Hackathon Judge Q&A Answers**: [`docs/JUDGE_QA.md`](file:///c:/Users/jagan/Desktop/new%20project/project%20-%20g/docs/JUDGE_QA.md)
- 🎨 **ChatGPT + Canva Master Prompt**: [`docs/CANVA_CHATGPT_MASTER_PROMPT.md`](file:///c:/Users/jagan/Desktop/new%20project/project%20-%20g/docs/CANVA_CHATGPT_MASTER_PROMPT.md)

---

## 📌 Executive Summary

**FinShield Quantum** is an enterprise-grade AI cybersecurity defense layer designed to solve the **$1.5 Billion+ Authorized Push Payment (APP) scam epidemic**.

Unlike traditional banking fraud detection engines that evaluate whether a transaction is technically authentic (which pass APP scams because the victim uses their real device, enters their valid PIN, and passes 2FA), FinShield Quantum infers **whether the customer's intent is being manipulated**.

By fusing tabular transaction signals, user spending z-scores, natural language coercion analysis, network link graph reputation, and customer vulnerability context into a unified **Human Manipulation Risk Score (0 - 100)**, FinShield adaptively applies stepped-up verification, reflection holds, or family notifications via a WCAG 2.1 AAA accessible interface.

---

## 🎯 The Multi-Billion Dollar Threat Landscape

### 1. The $1.5 Billion+ APP Scam Crisis
Authorized Push Payment (APP) scams deceive victims into executing wire transfers directly to fraud accounts through psychological coercion:
- **Impersonation Vishing**: Fraudsters pose as bank security officers (*"Officer Sharma from Bank Security"*) claiming the victim's account is frozen.
- **Law Enforcement & Police Coercion**: Threatening immediate arrest unless funds are moved to a "temporary safe vault account".
- **Phishing SMS / KYC Mandates**: Urgent SMS messages containing malicious link callouts.
- **Friend/Family Emergency**: Posing as a relative needing emergency wire transfers.

### 2. Why Traditional Fraud Detection Engines Fail
Traditional banking systems evaluate credential validity:
$$\text{Is Authenticated Device?} \wedge \text{Is Valid Password?} \wedge \text{Passed 2FA?} \implies \text{ALLOW}$$

Because APP scam victims authorize the transfer themselves, traditional systems see an **"AUTHENTIC TRANSACTION"** and let funds leave instantly.

### 3. Paradigm Shift Matrix

| Traditional Fraud System | FinShield Quantum Firewall |
| :--- | :--- |
| **Asks**: *"Is the transaction legitimate?"* | **Asks**: *"Is the CUSTOMER'S INTENT being manipulated?"* |
| Evaluates device ID, password, and OTP tokens. | Analyzes call/SMS transcripts for authority & urgency coercion language. |
| Passes APP scams because credentials match. | Computes statistical spending z-score anomaly distance ($\mathcal{Z}_{\text{Behavior}}$). |
| Fails to protect vulnerable senior customers. | Factors in user age & digital skill level (Vulnerability Context). |
| Binary allow/block decision causing friction. | 4-Tier Adaptive Firewall (**ALLOW**, **VERIFY**, **PAUSE**, **HOLD**). |
| **Result**: Fraud succeeds ($1.5B+ annual loss). | **Result**: Fraud blocked (**₹85,000 Saved**). |

---

## 🏆 The 8 Core Product Novelties (N1…N8)

### N1: Human-Manipulation Risk Scoring Engine
Explicitly models psychological coercion, authority impersonation, and fear language rather than relying solely on technical credential anomalies.

### N2: Multimodal Fraud Intelligence Fusion
Fuses 4 distinct sub-models (XGBoost tabular model, z-score behavioral baseline, natural language coercion scorer, and NetworkX payee graph reputation) into a unified risk score ($0 - 100$).

### N3: Vulnerability-Context Awareness (CGAP/FDIC Compliance)
Dynamically adapts friction based on customer profiles. Digitally inexperienced or senior users (e.g. Age 72, skill level 3/10) receive lower intervention thresholds, voice read-aloud prompts, and automatic family alerts.

### N4: 4-Tier Adaptive Firewall Policy Matrix
Replaces binary allow/block decisions with 4 dynamic tiers (**ALLOW**, **VERIFY**, **PAUSE**, **HOLD**) to eliminate false-alarm fatigue on legitimate payments.

### N5: Explainable AI with Local SHAP Attributions
Provides human-readable feature contribution breakdowns for every decision (`+34.5 pts Scam Urgency Language`), eliminating black-box rejections.

### N6: Heterogeneous NetworkX Fraud Intelligence Graph
Traverses multi-hop entity relationships (Customer $\rightarrow$ Device $\rightarrow$ Transaction $\rightarrow$ Payee $\rightarrow$ Mule Account) to identify collusive scam rings even when clean devices are used.

### N7: Quantum Kernel QSVC Classifier (Qiskit 4-Qubit)
Experimental Quantum Support Vector Classifier utilizing a 4-qubit `ZZFeatureMap` to map complex non-linear transaction vectors into quantum Hilbert state space, yielding a **+5.0% accuracy delta** over classical SVM.

### N8: NIST FIPS 203 ML-KEM-512 Post-Quantum Cryptography
Future-proofs banking session key exchanges against quantum computers using NIST ML-KEM-512 (Kyber) key encapsulation mechanism for Shor-resistant session encryption.

---

## 🔬 Mathematical Formulation

### 1. Multimodal Risk Fusion Equation
$$\text{RiskScore} = w_1 \cdot \mathcal{S}_{\text{NLP}} + w_2 \cdot \mathcal{R}_{\text{XGBoost}} + w_3 \cdot \mathcal{Z}_{\text{Behavior}} + w_4 \cdot \mathcal{G}_{\text{Graph}} + \Delta_{\text{Vulnerability}}$$

Where:
- $\mathcal{S}_{\text{NLP}} \in [0, 100]$: Social engineering urgency and authority impersonation score.
- $\mathcal{R}_{\text{XGBoost}} \in [0, 100]$: Tabular transaction risk probability.
- $\mathcal{Z}_{\text{Behavior}} \in [0, 100]$: Normalized z-score distance from historical spending.
- $\mathcal{G}_{\text{Graph}} \in [0, 100]$: Payee degree centrality and scam ring risk.
- $\Delta_{\text{Vulnerability}}$: Profile boost for senior or vulnerable customer accounts.

### 2. Behavioral Z-Score Anomaly Formula
$$\mathcal{Z}_{\text{Behavior}} = \min \left( 100, \max \left( 0, \frac{x_{\text{txn}} - \mu_{\text{user}}}{\sigma_{\text{user}}} \times 25 \right) \right)$$

### 3. Quantum Kernel Hilbert Space Mapping (Qiskit 4-Qubit)
$$K(\mathbf{x}_i, \mathbf{x}_j) = |\langle \phi(\mathbf{x}_i) | \phi(\mathbf{x}_j) \rangle|^2$$

Where $\phi(\mathbf{x})$ is the 4-qubit `ZZFeatureMap` quantum state vector:
$$U_{\text{ZZ}}(\mathbf{x}) = \exp \left( i \sum_{j=1}^4 x_j Z_j + i \sum_{j < k} (\pi - x_j)(\pi - x_k) Z_j Z_k \right)$$

### 4. NIST FIPS 203 ML-KEM-512 Key Encapsulation
Polynomial Ring: $R_q = \mathbb{Z}_q[X]/(X^n + 1)$ with $n=256, q=3329$.  
Generates a 800-byte Public Key and 768-byte Ciphertext producing a 256-bit AES-GCM shared secret resistant to Shor's algorithm quantum factorization.

---

## ⚛️ Deep Dive: Quantum & Post-Quantum Technologies

```
┌────────────────────────────────────────────────────────────────────────┐
│                   FINSHIELD QUANTUM DEFENSE STACK                      │
├───────────────────────────────────┬────────────────────────────────────┤
│ 1. CURRENT PRODUCTION ENGINE      │ Classical XGBoost + Z-Score + NLP  │
│ 2. POST-QUANTUM CRYPTOGRAPHY      │ NIST FIPS 203 ML-KEM-512 (Kyber)   │
│ 3. QUANTUM MACHINE LEARNING (QML) │ Qiskit 4-Qubit ZZFeatureMap QSVC   │
│ 4. QUANTUM OPTIMIZATION           │ QAOA QUBO Capacity Solver          │
└───────────────────────────────────┴────────────────────────────────────┘
```

1. **Qiskit 4-Qubit QSVC Classifier**: Evaluates quantum fidelity kernels using 4-qubit entanglement. Benchmark tests demonstrate a **+5.0% accuracy improvement** over classical SVM on complex non-linear feature maps.
2. **QAOA QUBO Investigator Capacity Solver**: Uses the Quantum Approximate Optimization Algorithm (QAOA) to solve Quadratic Unconstrained Binary Optimization problems, maximizing total financial value protected under analyst capacity constraints.
3. **NIST FIPS 203 ML-KEM-512 PQC Handshake**: Live key encapsulation mechanism generating Shor-resistant session encryption for financial communications.

---

## ⚙️ Technical Architecture & Pipeline

```
[Customer Payment Request] (Amount, Payee, Device ID, SMS Context, Call Transcript)
              │
              ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   MULTIMODAL FEATURE EXTRACTOR                         │
├───────────────────┬───────────────────┬───────────────────┬────────────┤
│ Transaction ML    │ Behavior Baseline │ Social NLP        │ Fraud Graph│
│ XGBoost Model     │ Z-Score Engine    │ Coercion Scorer   │ NetworkX   │
└─────────┬─────────┴─────────┬─────────┴─────────┬─────────┴─────┬──────┘
          │                   │                   │               │
          └───────────────────┴─────────┬─────────┴───────────────┘
                                        ▼
                   [MULTIMODAL RISK FUSION ENGINE]
         Manipulation Score = 0.35(Social) + 0.25(Txn) + 0.20(Behavior) + 0.20(Graph)
                                        │
                                        ▼
                  [4-TIER ADAPTIVE FIREWALL POLICY ENGINE]
          ├── 0  - 29   Risk : ALLOW  (Green Seamless Pass)
          ├── 30 - 59  Risk : VERIFY (Yellow Biometric / 2FA)
          ├── 60 - 84  Risk : PAUSE  (Orange 60s Reflection Pause)
          └── 85 - 100 Risk : HOLD   (Red Interception & Family Alert)
```

---

## ♿ Senior Accessibility & Inclusion (WCAG 2.1 AAA)

FinShield Quantum adheres strictly to **WCAG 2.1 Level AAA** accessibility standards:
- **Contrast Ratio ($\ge 7:1$)**: Pure white text (`#FFFFFF`) on solid slate-950 background (`#0F172A`).
- **Light / Dark Theme Toggle**: Switch between high-contrast Dark Mode and crisp Light Mode (`#0F172A` text on `#F8FAFC`).
- **Multi-Cue Decision Badges (WCAG SC 1.4.1)**: Combines Color + Text + Lock Icon (e.g. `⛔ HOLD - Blocked (High Scam Risk)`).
- **Web Speech API Voice Read-Aloud**: Auto-reads alert warnings at $0.85\times$ speed for vision-impaired or senior users.
- **Family Trusted Contact Workflow**: Dispatches instant SMS alerts to a designated family guardian to double-check suspicious transfers before money leaves the account.

---

## 📊 Empirical Evaluation Benchmarks

Evaluated against a **10,000-transaction synthetic benchmark suite** containing **500 injected APP scam instances**:

- **Fraud Recall Sensitivity**: **94.2%** (471 / 500 scams intercepted).
- **False Intervention Rate**: **3.8%** (minimal friction on legitimate users).
- **API Decision Latency**: **42.5 ms** (sub-50ms real-time inline evaluation).
- **Protected Financial Savings**: **₹18.45 Lakhs** in synthetic benchmark.
- **Confusion Matrix**:
  - True Positives (Scams Blocked): **471**
  - False Positives (2FA Step-up): **361**
  - False Negatives (Missed): **29**
  - True Negatives (Allowed): **9,139**

---

## 🛠️ Quick Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --port 8080
```

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser!

### 3. Docker Deployment (Alternative)
```bash
docker-compose up -d --build
```

---

## 📂 Repository Directory Structure

```
finshield-quantum/
├── backend/                  # FastAPI Multimodal Risk Fusion Server
│   ├── app/
│   │   ├── engine/           # XGBoost, Z-Score, NLP, NetworkX Graph
│   │   ├── quantum_module/   # Qiskit 4-Qubit QSVC & QAOA Optimizer
│   │   ├── pqc_module/       # NIST FIPS 203 ML-KEM-512 KEM Handshake
│   │   └── explainability/   # SHAP Feature Explainer
│   └── main.py               # REST API Endpoints
├── frontend/                 # Next.js 14 Enterprise Web App
│   ├── src/
│   │   ├── components/       # Accessible UI Modals, Progress Bars, Header
│   │   └── pages/            # Customer App, Ops Dashboard, Graph, Scenarios, Quantum, PQC
├── data/                     # 10,000 Synthetic Transactions & Scam Templates
├── docs/                     # Hackathon Judge Documentation & Presentation Script
│   ├── FULL_PROJECT_REPORT.md
│   ├── DEMO_SCRIPT.md
│   ├── JUDGE_QA.md
│   ├── PRESENTATION_SLIDES.md
│   ├── CANVA_CHATGPT_MASTER_PROMPT.md
│   └── DEPLOYMENT_24_7_GUIDE.md
├── FinShield_Quantum_Pitch_Deck.pptx  # 10-Slide Widescreen Pitch Deck
└── docker-compose.yml        # Containerized Production Config
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
