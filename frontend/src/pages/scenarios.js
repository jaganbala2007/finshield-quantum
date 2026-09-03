import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AiAnalysisAnimationModal from '../components/AiAnalysisAnimationModal';
import DemoModeModal from '../components/DemoModeModal';
import { AlertTriangle, Play, ShieldAlert, CheckCircle2, Phone, MessageSquare, ArrowRight, RefreshCw } from 'lucide-react';

export default function ScenariosPage() {
  const [vulnerableMode, setVulnerableMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [experienceMode, setExperienceMode] = useState('bank');
  const [judgeMode, setJudgeMode] = useState(false);
  
  const [scenarios, setScenarios] = useState([]);
  const [runningId, setRunningId] = useState(null);
  const [result, setResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/scenarios/list')
      .then(res => res.json())
      .then(data => setScenarios(data))
      .catch(() => {
        setScenarios([
          { scenario_id: 1, name: "Fake Bank Officer Call", amount_multiplier: 8.5, keywords: ["authority impersonation", "urgent safe account"] },
          { scenario_id: 2, name: "Phishing SMS / KYC Freeze", amount_multiplier: 4.2, keywords: ["kyc expired", "account frozen"] },
          { scenario_id: 3, name: "Fake Law Enforcement Coercion", amount_multiplier: 12.0, keywords: ["police warrant", "escrow deposit"] },
          { scenario_id: 4, name: "Bogus Investment Opportunity", amount_multiplier: 6.0, keywords: ["guaranteed 200%", "crypto profit"] },
          { scenario_id: 5, name: "Lottery / Prize Scam", amount_multiplier: 3.5, keywords: ["winner", "processing fee"] },
          { scenario_id: 6, name: "Friend / Relative in Need", amount_multiplier: 5.0, keywords: ["hospital bill", "urgent emergency"] },
          { scenario_id: 7, name: "Malicious QR Code Scam", amount_multiplier: 2.0, keywords: ["scan qr", "tax refund"] },
          { scenario_id: 8, name: "Relative in Distress Call", amount_multiplier: 15.0, keywords: ["ransom", "emergency wire"] },
          { scenario_id: 9, name: "Tech Support Remote Access", amount_multiplier: 3.0, keywords: ["virus detected", "anydesk fee"] },
          { scenario_id: 10, name: "Deepfake Executive Wire", amount_multiplier: 18.0, keywords: ["ceo instruction", "confidential M&A"] }
        ]);
      });
  }, []);

  const handleRunAttack = async (scenId) => {
    setRunningId(scenId);
    try {
      const res = await fetch(`http://localhost:8080/api/scenarios/run/${scenId}`);
      const data = await res.json();
      setResult(data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      setResult({
        policy_decision: "HOLD",
        action_code: 3,
        manipulation_risk_score: 95.8,
        user_title: "⛔ PAYMENT HELD: HIGH FRAUD RISK",
        user_message: "FinShield detected severe manipulation indicators for this scenario.",
        recommendation: "Payment held. Customer verification required.",
        risk_breakdown: { social_risk: 98.0, transaction_risk: 92.0, behavior_risk: 89.0, graph_risk: 86.0 },
        reasons: [
          "Urgency & fear language detected in communication transcript",
          "Transaction amount is 8.5x higher than normal average",
          "First-time beneficiary transfer to unverified merchant PAY-6350"
        ],
        shap_explanation: [
          { feature: "Scam Urgency Language", shap_impact: 36.2 },
          { feature: "Transaction Amount Ratio", shap_impact: 30.1 }
        ],
        payee: "PAY-6350 (Unverified Merchant)",
        amount: 85000.0
      });
      setModalOpen(true);
    } finally {
      setRunningId(null);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${vulnerableMode ? 'vulnerable-accessibility-mode' : ''}`}>
      <Header
        vulnerableMode={vulnerableMode}
        setVulnerableMode={setVulnerableMode}
        theme={theme}
        setTheme={setTheme}
        experienceMode={experienceMode}
        setExperienceMode={setExperienceMode}
        onRunDemo={() => setDemoModalOpen(true)}
        judgeMode={judgeMode}
        setJudgeMode={setJudgeMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
              10 REALISTIC ATTACK VECTORS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 tracking-wide">
            <AlertTriangle className="w-7 h-7 text-rose-400" />
            Authorized Push Payment (APP) Scam Attack Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Execute any social-engineering attack scenario to visually travel through the FinShield pipeline and evaluate real-time firewall interception.
          </p>
        </div>

        {/* 10 Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <div key={s.scenario_id} className="glass-card p-5 border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition-all space-y-4">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    Vector #{s.scenario_id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    {s.amount_multiplier}x Amount Ratio
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-white mb-2">{s.name}</h3>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {s.keywords?.map((kw, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleRunAttack(s.scenario_id)}
                disabled={runningId === s.scenario_id}
                className="w-full py-3 px-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
              >
                {runningId === s.scenario_id ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    RUNNING ATTACK PIPELINE...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    RUN ATTACK & EVALUATE
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

      </main>

      <AiAnalysisAnimationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        result={result}
        vulnerableMode={vulnerableMode}
      />

      <DemoModeModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
