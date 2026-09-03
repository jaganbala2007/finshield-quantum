import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DemoModeModal from '../components/DemoModeModal';
import { GitMerge, ShieldAlert, Users, Cpu, Layers, AlertTriangle, ArrowRight, Activity, Phone, Smartphone, User, CreditCard } from 'lucide-react';

export default function FraudGraphPage() {
  const [vulnerableMode, setVulnerableMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [experienceMode, setExperienceMode] = useState('bank');
  const [judgeMode, setJudgeMode] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Attack Path Traversal Animation State
  const [activeStep, setActiveStep] = useState(0);

  const attackNodes = [
    { id: "CALLER-6350", label: "Fake Bank Officer (Caller)", type: "caller", is_suspicious: true, info: "Spoofed Telco Number +91 1800-SAFE-BANK" },
    { id: "CUST-7701", label: "Sunita Sharma (Customer)", type: "customer", is_suspicious: false, info: "Age 72 • Digital Skill 3/10" },
    { id: "DEV-7701-A", label: "DEV-7701 (User Mobile Device)", type: "device", is_suspicious: false, info: "Legitimate Authenticated Session" },
    { id: "TXN-SCAM-001", label: "TXN ₹85,000 (Transfer Request)", type: "transaction", is_suspicious: font => true, info: "8.5x Normal Amount • 23:00 Hour" },
    { id: "PAY-6350", label: "Rahul Traders (Payee)", type: "payee", is_suspicious: true, info: "Unverified Merchant • Connected to 7 Scam Rings" },
    { id: "ACC-9988", label: "Mule Account (Destination)", type: "account", is_suspicious: true, info: "Flagged Cryptocurrency Off-ramp" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % attackNodes.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

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
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                NETWORK LINK ANALYTICS
              </span>
              <span className="text-xs text-slate-400 font-mono">Heterogeneous Knowledge Graph</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 tracking-wide">
              <GitMerge className="w-7 h-7 text-cyan-400" />
              Fraud Intelligence Knowledge Graph
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Uncovering collusive scam networks, shared device rings, and payee degree centrality anomalies across customer accounts.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>CONNECTED TO 7 HIGH-RISK ENTITIES</span>
          </div>
        </div>

        {/* Animated Attack Path Pipeline Flow Banner */}
        <div className="glass-card p-6 border-cyan-500/30 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Live Attack Path Traversal Visualization</span>
            <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" /> Animated Path Active
            </span>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 overflow-x-auto py-2">
            {attackNodes.map((n, i) => {
              const isActive = activeStep === i;
              return (
                <React.Fragment key={n.id}>
                  <div
                    className={`p-3 rounded-xl border text-xs font-bold transition-all min-w-[150px] ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/30 scale-105 border-rose-400'
                        : n.is_suspicious
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-[10px] opacity-75 uppercase">{n.type}</div>
                    <div className="font-extrabold">{n.id}</div>
                  </div>
                  {i < attackNodes.length - 1 && (
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${activeStep > i ? 'text-cyan-400' : 'text-slate-600'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Graph Network Nodes Grid */}
        <div className="glass-card p-6 border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white">Entity Network Intelligence Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {attackNodes.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border space-y-2 ${
                  n.is_suspicious
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-extrabold text-sm text-white">{n.id}</span>
                  {n.is_suspicious && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500 text-slate-950 font-bold">
                      FLAGGED THREAT
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold">{n.label}</div>
                <p className="text-[11px] opacity-80">{n.info}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <DemoModeModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
