import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AiAnalysisAnimationModal from '../components/AiAnalysisAnimationModal';
import DemoModeModal from '../components/DemoModeModal';
import RiskDimensionBars from '../components/RiskDimensionBars';
import ShapBreakdown from '../components/ShapBreakdown';
import {
  BarChart3, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle, Users, DollarSign, Activity,
  Play, Building2, Eye, ShieldCheck, ArrowRight, GitMerge, Clock, Zap, User, Lock, Scale
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function FraudOpsCenter() {
  const [vulnerableMode, setVulnerableMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [experienceMode, setExperienceMode] = useState('bank');
  const [judgeMode, setJudgeMode] = useState(false);
  
  // Demo Mode & Analysis Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [activeAnalysisResult, setActiveAnalysisResult] = useState(null);

  // Hero Investigation Transaction Data (Sunita Sharma ₹85k APP Scam Attack)
  const heroTxn = {
    customer: "Sunita Sharma (Age 72)",
    customer_id: 7701,
    vulnerability_context: "Vulnerable Elder Profile (Digital Skill 3/10)",
    amount: 85000.0,
    payee: "Rahul Traders (PAY-6350)",
    payee_status: "UNVERIFIED / NEW BENEFICIARY",
    risk_score: 94.2,
    risk_level: "CRITICAL",
    decision: "HOLD",
    protected_value: 85000.0,
    message: "SECURITY ALERT: Account frozen. Transfer funds immediately to safe vault account PAY-6350.",
    call_transcript: "Hello, Officer Sharma here from Bank Security. Transfer your funds to temporary safe account PAY-6350. Do not hang up!",
    reasons: [
      "Authority impersonation detected in call transcript (Officer Sharma)",
      "Urgency & fear language detected in incoming SMS",
      "Transfer amount is 8.5x higher than user's normal average",
      "First-time beneficiary transfer to unverified merchant PAY-6350",
      "Payee account linked to 7 previously reported scam networks"
    ],
    risk_breakdown: {
      social_risk: 96.5,
      transaction_risk: 91.0,
      behavior_risk: 87.0,
      graph_risk: 92.0,
      customer_context: 89.0
    },
    shap_explanation: [
      { feature: "Scam Urgency & Impersonation NLP", shap_impact: 34.5 },
      { feature: "Transaction Amount Ratio", shap_impact: 28.2 },
      { feature: "First-Time Beneficiary Transfer", shap_impact: 18.0 },
      { feature: "Payee Fraud Network Centrality", shap_impact: 13.5 }
    ]
  };

  const mockTimeData = [
    { time: '09:00', total: 420, flagged: 12, paused: 8 },
    { time: '10:00', total: 680, flagged: 18, paused: 14 },
    { time: '11:00', total: 890, flagged: 34, paused: 28 },
    { time: '12:00', total: 950, flagged: 29, paused: 22 },
    { time: '13:00', total: 810, flagged: 21, paused: 17 },
    { time: '14:00', total: 1120, flagged: 45, paused: 39 },
    { time: '15:00', total: 1040, flagged: 38, paused: 31 },
  ];

  const mockScamDistribution = [
    { name: 'Fake Bank Officer', count: 142 },
    { name: 'Law Enforcement', count: 98 },
    { name: 'Bogus Investment', count: 85 },
    { name: 'Phishing KYC', count: 74 },
    { name: 'Friend Distress', count: 52 },
  ];

  const handleRunHeroScamAnalysis = () => {
    setActiveAnalysisResult({
      policy_decision: heroTxn.decision,
      action_code: 3,
      manipulation_risk_score: heroTxn.risk_score,
      user_title: "⛔ PAYMENT HELD: HIGH HUMAN MANIPULATION RISK",
      user_message: "FinShield detected high authority impersonation and urgency cues. ₹85,000 protected from APP scam transfer.",
      recommendation: "Customer verification required. Trusted contact notified.",
      risk_breakdown: heroTxn.risk_breakdown,
      reasons: heroTxn.reasons,
      shap_explanation: heroTxn.shap_explanation,
      payee: heroTxn.payee,
      amount: heroTxn.amount
    });
    setAnalysisModalOpen(true);
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
        
        {/* Enterprise Command Center Header & Tagline */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                ENTERPRISE BANK FRAUD OPS COMMAND CENTER
              </span>
              <span className="text-xs text-slate-400 font-mono">Live Defense Pipeline v1.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 tracking-wide">
              <Building2 className="w-7 h-7 text-cyan-400" />
              FinShield Human-Manipulation Intelligence Operations
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Detecting authorized push payment (APP) manipulation by evaluating customer intent, communication context, and graph networks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>RUN AUTOMATED 60s DEMO</span>
            </button>
          </div>
        </div>

        {/* Live Defense Status Indicators (5 Metric Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          
          <div className="glass-card p-4 border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Active Transactions</span>
            <div className="text-2xl font-extrabold text-white mt-1">50,000</div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3 animate-pulse" /> Live Stream
            </span>
          </div>

          <div className="glass-card p-4 border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">High Risk Flagged</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">471</div>
            <span className="text-[10px] text-amber-400 font-semibold mt-1">
              94.2% Fraud Recall
            </span>
          </div>

          <div className="glass-card p-4 border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Transactions Held</span>
            <div className="text-2xl font-extrabold text-rose-400 mt-1">392</div>
            <span className="text-[10px] text-rose-400 font-semibold mt-1">
              Adaptive Firewall
            </span>
          </div>

          <div className="glass-card p-4 border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Protected Value</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">₹18.45 L</div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1">
              Vulnerable Saved
            </span>
          </div>

          <div className="glass-card p-4 border-slate-800 col-span-2 lg:col-span-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Potential APP Attacks</span>
            <div className="text-2xl font-extrabold text-purple-400 mt-1">500</div>
            <span className="text-[10px] text-purple-400 font-semibold mt-1">
              10 Threat Scenarios
            </span>
          </div>

        </div>

        {/* HERO INVESTIGATION PANEL: Sunita Sharma ₹85,000 APP Scam Attack */}
        <div className="glass-card p-6 border-rose-500/40 space-y-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-extrabold">
                  HERO INVESTIGATION CASE #APP-7701
                </span>
                <span className="text-xs text-slate-400 font-mono">Real-time Interception</span>
              </div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Victim Intent Manipulation Analysis (Sunita Sharma)
              </h2>
            </div>

            <button
              onClick={handleRunHeroScamAnalysis}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg hover:opacity-95 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>RE-RUN AI MANIPULATION PIPELINE</span>
            </button>
          </div>

          {/* Hero Grid Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Customer & Transaction Attributes */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Victim Customer:</span>
                  <span className="font-extrabold text-white">{heroTxn.customer}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Vulnerability Context:</span>
                  <span className="font-bold text-amber-400">{heroTxn.vulnerability_context}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Transfer Amount:</span>
                  <span className="font-extrabold text-cyan-400 text-base">₹{heroTxn.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Target Payee:</span>
                  <span className="font-extrabold text-rose-300">{heroTxn.payee}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Payee Reputation:</span>
                  <span className="font-bold text-rose-400">{heroTxn.payee_status}</span>
                </div>
              </div>

              {/* Phishing SMS & Vishing Transcript Signals */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-cyan-400 uppercase tracking-wider block">Captured Communication Context</span>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 font-medium">
                  <strong>SMS Signal:</strong> "{heroTxn.message}"
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-300 font-medium">
                  <strong>Vishing Transcript:</strong> "{heroTxn.call_transcript}"
                </div>
              </div>
            </div>

            {/* Right Column: Manipulation Score & Adaptive Firewall Decision */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Score Banner */}
              <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Human Manipulation Risk</span>
                  <div className="text-4xl font-extrabold text-rose-400 mt-0.5">
                    94.2 <span className="text-sm text-slate-500">/ 100</span>
                  </div>
                  <span className="text-[10px] text-rose-300 font-bold px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 inline-block mt-1">
                    CRITICAL SCAM THREAT
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 text-center sm:text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Firewall Action</span>
                  <span className="text-xl font-extrabold text-rose-400 block">⛔ TRANSACTION HELD</span>
                  <span className="text-xs font-bold text-emerald-400 block mt-0.5">₹85,000 PROTECTED</span>
                </div>
              </div>

              {/* Multimodal Component Score Breakdown */}
              <RiskDimensionBars breakdown={heroTxn.risk_breakdown} />

            </div>

          </div>

          {/* 5 Manipulation Signals Detected Banner & HITL Analyst Decision Bar */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">5 MANIPULATION SIGNALS DETECTED BY AI</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {heroTxn.reasons.map((r, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>

            {/* Human-in-the-Loop Analyst Override Workflow */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs">
                <span className="text-slate-400 font-bold block">HUMAN-IN-THE-LOOP (HITL) ANALYST ACTION</span>
                <span className="text-slate-500 text-[11px]">AI Recommendation: HOLD payment. Require verbal dual-channel verification.</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    try {
                      await fetch('http://localhost:8080/api/analyst/decision', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          decision_id: 'FS-2026-HERO-001',
                          txn_id: 'TXN-7701-HERO',
                          analyst_id: 'ANALYST-904',
                          action: 'APPROVE',
                          notes: 'Verified customer Sunita Sharma verbally via official bank helpline.'
                        })
                      });
                      alert('Analyst Action: OVERRIDE APPROVE recorded in audit log FS-2026-HERO-001');
                    } catch (e) {
                      alert('Recorded Analyst Action: OVERRIDE APPROVE (Offline Demo Mode)');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>OVERRIDE & APPROVE</span>
                </button>

                <button
                  onClick={async () => {
                    try {
                      await fetch('http://localhost:8080/api/analyst/decision', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          decision_id: 'FS-2026-HERO-001',
                          txn_id: 'TXN-7701-HERO',
                          analyst_id: 'ANALYST-904',
                          action: 'REJECT',
                          notes: 'Confirmed social engineering scam. Blocked beneficiary PAY-6350 permanently.'
                        })
                      });
                      alert('Analyst Action: CONFIRM REJECT recorded in audit log FS-2026-HERO-001');
                    } catch (e) {
                      alert('Recorded Analyst Action: CONFIRM REJECT (Offline Demo Mode)');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>CONFIRM REJECT</span>
                </button>

                <button
                  onClick={async () => {
                    try {
                      await fetch('http://localhost:8080/api/analyst/decision', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          decision_id: 'FS-2026-HERO-001',
                          txn_id: 'TXN-7701-HERO',
                          analyst_id: 'ANALYST-904',
                          action: 'ESCALATE',
                          notes: 'Escalated to Cyber Fraud Response Team for ISP traceback.'
                        })
                      });
                      alert('Analyst Action: ESCALATE TO CYBER CELL recorded in audit log FS-2026-HERO-001');
                    } catch (e) {
                      alert('Recorded Analyst Action: ESCALATE (Offline Demo Mode)');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>ESCALATE TO CYBER CELL</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Ops Center Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 glass-card p-6 border-slate-800">
            <h3 className="font-bold text-sm text-white mb-4">Hourly Transaction & Scam Interception Timeline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTimeData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPaused" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                  <YAxis stroke="#475569" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Area type="monotone" dataKey="total" stroke="#0284c7" fillOpacity={1} fill="url(#colorTotal)" name="Total Txns" />
                  <Area type="monotone" dataKey="paused" stroke="#f43f5e" fillOpacity={1} fill="url(#colorPaused)" name="Scams Paused" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 glass-card p-6 border-slate-800">
            <h3 className="font-bold text-sm text-white mb-4">Interception Volume by Threat Vector</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockScamDistribution} layout="vertical">
                  <XAxis type="number" stroke="#475569" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="#cbd5e1" fontSize={10} width={110} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Interceptions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>

      {/* AI Analysis Sequential Animation Modal */}
      <AiAnalysisAnimationModal
        isOpen={analysisModalOpen}
        onClose={() => setAnalysisModalOpen(false)}
        result={activeAnalysisResult}
        vulnerableMode={vulnerableMode}
        onSwitchToCustomerView={() => {
          setExperienceMode('customer');
        }}
      />

      {/* Demo Mode Modal */}
      <DemoModeModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onRunScamScenario={handleRunHeroScamAnalysis}
        onResetDemo={() => {
          setActiveAnalysisResult(null);
        }}
      />
    </div>
  );
}
