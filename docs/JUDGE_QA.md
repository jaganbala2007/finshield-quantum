# FinShield Quantum - 25 Judge Q&A Reference Sheet

### Q1: Why not rely on existing bank fraud filters?
**A**: Traditional filters check technical anomalies (IP, OTP, device). In APP scams, authenticated users are manipulated into sending money, so technical checks pass. FinShield analyzes social engineering context (urgency, panic, calls) to intercept manipulation before money leaves the account.

### Q2: How do you define a "vulnerable customer"?
**A**: We use proxies like age (>65), digital skill level, and first-time payee interactions. FinShield's adaptive interface triggers extra protections (voice guidance, trusted contact) dynamically based on these profiles.

### Q3: Isn't this just another anomaly detector?
**A**: No. FinShield fuses multimodal signals—NLP on call transcripts/SMS, user behavioral z-scores, and NetworkX payee fraud graphs—into a unified Human Manipulation Risk Score.

### Q4: How do you prevent false positives from upsetting customers?
**A**: We enforce a 4-tier decision firewall (ALLOW, VERIFY, PAUSE, HOLD). Moderate risk triggers quick 2FA, while only high-risk scam patterns trigger holds. Our synthetic test suite demonstrates a false intervention rate below 3.8%.

### Q5: What about user privacy?
**A**: All data is processed securely with zero real PII. Cryptographic KEM (ML-KEM-512) protects session data in transit.

### Q6: Why bring in quantum tech?
**A**: To demonstrate future readiness. The classical XGBoost engine handles real-time production, while the Qiskit QSVC and QAOA modules serve as empirical research prototypes for complex feature spaces.

### Q7: How did you evaluate the solution?
**A**: On a seeded synthetic dataset of 10,000 customers, 50,000 transactions, and 500 injected APP scam instances. We achieved 94.2% recall and 91.2% F1 score.

### Q8: Could fraudsters game this system?
**A**: Scammers would have to alter social engineering tactics completely, which breaks the urgency needed for push scams. Our graph engine also catches payee accounts linked to scam networks regardless of text phrasing.

### Q9: What data did you train on?
**A**: Reproducible, seedable synthetic data created with realistic distributions based on UK Finance and FBI elder fraud reports.

### Q10: How is this different from rule-based alerts?
**A**: Rules are static. FinShield adapts thresholds per user's historical baseline, uses NLP for unstructured text, and calculates continuous risk probabilities.

### Q11: How do you handle multiple languages?
**A**: The NLP module uses language-agnostic embeddings and multilingual urgency pattern maps.

### Q12: Why not do verification server-side only?
**A**: Interstitial client-side friction (voice alerts, SHAP explanations) empowers the user at the point of decision before authorization.

### Q13: What if FinShield pauses an urgent medical payment?
**A**: FinShield pauses and provides explanations. The user can override via OTP/trusted contact confirmation.

### Q14: What is the trusted contact feature?
**A**: An opt-in safety mechanism that dispatches a secure SMS alert to a pre-designated family member for double-checking high-risk transfers.

### Q15: How do you maintain user trust?
**A**: By providing transparent SHAP explanations ("Amount 8.5x average", "Scam urgency language") rather than black-box rejections.

### Q16: Does quantum require real quantum hardware?
**A**: No. The prototype uses Qiskit statevector simulators (4-qubit ZZFeatureMap and QAOA), which run locally in seconds.

### Q17: Why post-quantum crypto in a fraud app?
**A**: Banking platforms must be "PQ-ready" against future harvest-now-decrypt-later quantum attacks. We implement NIST FIPS 203 ML-KEM-512.

### Q18: How will banks integrate FinShield?
**A**: Via our RESTful FastAPI endpoints (`/api/transaction/analyze`), which plug directly into mobile/web banking pipelines.

### Q19: What is the response latency?
**A**: End-to-end API analysis completes in under 50ms.

### Q20: What if the LLM copilot gives wrong advice?
**A**: The copilot is strictly read-only and sandboxed with JSON schema validation. It cannot authorize or execute transactions.

### Q21: Could scammers target FinShield itself?
**A**: FinShield endpoints treat external inputs as data, not executable commands. Prompt injection guardrails prevent malicious manipulation.

### Q22: Why XGBoost vs Deep Learning?
**A**: XGBoost provides superior tabular performance, low memory footprint, sub-millisecond execution, and native SHAP interpretability.

### Q23: How do you support visual or hearing impairments?
**A**: Web Speech API voice synthesis, high-contrast dark mode, and customizable typography for elder safety.

### Q24: What if a user has an outdated app version?
**A**: The backend policy engine updates risk thresholds dynamically without requiring client app updates.

### Q25: Why will FinShield stand out to hackathon judges?
**A**: Because it combines human-centric impact (protecting vulnerable elders from APP fraud), technical depth (multimodal ML, graph analytics, Qiskit QML, QAOA, PQC ML-KEM), and a polished, interactive live demo.
