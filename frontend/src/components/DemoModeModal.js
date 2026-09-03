import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ShieldCheck, ShieldAlert, ArrowRight, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';

export default function DemoModeModal({ isOpen, onClose, onRunScamScenario, onResetDemo }) {
  const [demoStep, setDemoStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setDemoStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
      <div className="glass-card max-w-3xl w-full p-6 border border-cyan-500/50 relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Play className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">AUTOMATED HACKATHON DEMO SEQUENCE</h3>
              <p className="text-xs text-slate-400">60-Second Live Walkthrough: Normal Txn vs. APP Scam Attack Interception</p>
            </div>
          </div>
          
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Demo Progress Steps Timeline */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          <div className={`p-2 rounded-xl border ${demoStep >= 1 ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' : 'bg-slate-950 text-slate-500'}`}>
            1. Normal Txn (ALLOW)
          </div>
          <div className={`p-2 rounded-xl border ${demoStep >= 2 ? 'bg-purple-500/10 border-purple-500/40 text-purple-300' : 'bg-slate-950 text-slate-500'}`}>
            2. Scam Attack Preset
          </div>
          <div className={`p-2 rounded-xl border ${demoStep >= 3 ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : 'bg-slate-950 text-slate-500'}`}>
            3. AI Pipeline (94/100)
          </div>
          <div className={`p-2 rounded-xl border ${demoStep >= 4 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-slate-950 text-slate-500'}`}>
            4. Customer Warning
          </div>
        </div>

        {/* Dynamic Step Content */}
        {demoStep === 1 && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 1: Normal Legitimate Transaction</span>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="text-slate-300 font-semibold">User: Standard Customer • Amount: ₹5,000 • Payee: Electric Utility Corp</div>
              <div className="text-emerald-400 font-bold">Risk Score: 08 / 100 (LOW) ➔ Decision: ALLOW</div>
            </div>
            <button
              onClick={() => {
                setDemoStep(2);
                if (onRunScamScenario) onRunScamScenario();
              }}
              className="w-full py-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg flex items-center justify-center gap-2"
            >
              <span>Next: Launch APP Scam Attack Preset</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {demoStep === 2 && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Step 2: Social Engineering Scam Attack Vector</span>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="text-slate-200 font-semibold">Victim: Sunita Sharma (Age 72, Digital Skill 3/10) • Transfer: ₹85,000</div>
              <div className="text-amber-400 font-medium">SMS: "SECURITY ALERT: Account frozen. Transfer immediately to safe vault account PAY-6350."</div>
              <div className="text-rose-400 font-medium">Call: "Officer Sharma from Bank Security: Transfer funds to temporary safe account PAY-6350!"</div>
            </div>
            <button
              onClick={() => {
                setDemoStep(3);
                onClose();
              }}
              className="w-full py-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-purple-500 to-rose-600 text-white shadow-lg flex items-center justify-center gap-2"
            >
              <span>Run Multimodal AI Pipeline & Reveal WOW Moment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              setDemoStep(1);
              if (onResetDemo) onResetDemo();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 border border-slate-800 hover:text-white flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RESET DEMO
          </button>

          <span className="text-[10px] text-slate-500">60-90 Second Hackathon Demo Mode</span>
        </div>

      </div>
    </div>
  );
}
