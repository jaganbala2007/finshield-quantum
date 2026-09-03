import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw, XCircle, ArrowRight, Lock, Activity, Eye, Zap } from 'lucide-react';
import ShapBreakdown from './ShapBreakdown';
import RiskDimensionBars from './RiskDimensionBars';
import TrustedContactModal from './TrustedContactModal';

export default function AiAnalysisAnimationModal({
  isOpen,
  onClose,
  result,
  vulnerableMode,
  onSwitchToCustomerView
}) {
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [showGrandReveal, setShowGrandReveal] = useState(false);
  const [showTrustedContact, setShowTrustedContact] = useState(false);
  const [countScore, setCountScore] = useState(0);

  const steps = [
    "Evaluating Transaction Intelligence",
    "Analyzing Behavioral Anomaly Baseline",
    "Scanning Social-Engineering NLP Signals",
    "Checking Customer Vulnerability Context",
    "Traversing Fraud Intelligence Knowledge Graph",
    "Synthesizing Explainable AI Verdict"
  ];

  useEffect(() => {
    if (isOpen) {
      setAnalyzingStep(0);
      setShowGrandReveal(false);
      setCountScore(0);

      // Run 6-step sequential animation (250ms per step)
      let stepTimer = setInterval(() => {
        setAnalyzingStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(stepTimer);
            setTimeout(() => {
              setShowGrandReveal(true);
            }, 300);
            return steps.length;
          }
          return prev + 1;
        });
      }, 280);

      return () => clearInterval(stepTimer);
    }
  }, [isOpen]);

  // Score count-up animation when grand reveal displays
  useEffect(() => {
    if (showGrandReveal && result) {
      const targetScore = Math.round(result.manipulation_risk_score || 94);
      let current = 0;
      const countTimer = setInterval(() => {
        current += 3;
        if (current >= targetScore) {
          setCountScore(targetScore);
          clearInterval(countTimer);
        } else {
          setCountScore(current);
        }
      }, 20);
      return () => clearInterval(countTimer);
    }
  }, [showGrandReveal, result]);

  if (!isOpen || !result) return null;

  const decision = result.policy_decision || 'HOLD';
  const riskScore = countScore;
  const isHighScam = riskScore > 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className={`glass-card max-w-2xl w-full p-6 border ${vulnerableMode ? 'vulnerable-accessibility-mode border-amber-500' : 'border-cyan-500/40'} relative my-8 shadow-2xl`}>
        
        {/* Step 1: Sequential AI Analysis Pipeline Progress */}
        {!showGrandReveal && (
          <div className="py-8 px-4 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-wide">
                FINSHIELD AI ANALYZING TRANSACTION
              </h2>
              <p className="text-xs text-slate-400">
                Detecting human manipulation behind payment request...
              </p>
            </div>

            {/* Sequential Checklist Steps */}
            <div className="max-w-md mx-auto space-y-2 text-left text-xs font-semibold">
              {steps.map((stepLabel, idx) => {
                const isDone = analyzingStep > idx;
                const isCurrent = analyzingStep === idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : isCurrent
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 animate-pulse'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span>{stepLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: THE GRAND REVEAL WOW MOMENT */}
        {showGrandReveal && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Close & Tagline Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  HUMAN MANIPULATION DETECTED
                </span>
                <span className="text-xs text-slate-400 font-mono">FinShield Engine v1.0</span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Score Banner & Component Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 text-center space-y-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                HUMAN MANIPULATION RISK SCORE
              </span>

              {/* Animated Count-Up Score */}
              <div className="text-5xl sm:text-6xl font-extrabold text-rose-400 tracking-tight flex items-baseline justify-center gap-1">
                <span>{riskScore}</span>
                <span className="text-base text-slate-500">/ 100</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold ml-2">
                  CRITICAL
                </span>
              </div>

              {/* Component Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Txn Risk</span>
                  <span className="font-bold text-white">91</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Behavioral</span>
                  <span className="font-bold text-white">87</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Social NLP</span>
                  <span className="font-bold text-rose-400 font-extrabold">96</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Fraud Graph</span>
                  <span className="font-bold text-white">92</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block">Context</span>
                  <span className="font-bold text-amber-400">89</span>
                </div>
              </div>
            </div>

            {/* 5 Manipulation Signals Detected */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                5 MANIPULATION SIGNALS DETECTED
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Authority Impersonation (Fake Officer)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Urgency & Fear Language Detected</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>New / Unverified Beneficiary</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Unusual Transaction Amount (8.5x Avg)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 sm:col-span-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Vulnerable Senior Customer Context (Age 72)</span>
                </div>
              </div>
            </div>

            {/* Adaptive Firewall Decision Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950 to-slate-950 border-2 border-rose-500 text-center space-y-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                ADAPTIVE TRANSACTION FIREWALL DECISION
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-3">
                <span className="text-rose-400">⛔ TRANSACTION HELD</span>
                <span>•</span>
                <span className="text-emerald-400">₹85,000 PROTECTED</span>
              </div>
              <p className="text-xs text-slate-300 font-semibold">
                CUSTOMER VERIFICATION REQUIRED BEFORE FUNDS CAN LEAVE ACCOUNT
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onSwitchToCustomerView) onSwitchToCustomerView();
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 hover:opacity-95 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Switch to Customer Protection View</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowTrustedContact(true)}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-slate-900 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/10 flex items-center justify-center gap-1.5"
              >
                Notify Trusted Contact
              </button>
            </div>

          </div>
        )}

      </div>

      <TrustedContactModal
        isOpen={showTrustedContact}
        onClose={() => setShowTrustedContact(false)}
        payee={result.payee}
        amount={result.amount}
        riskScore={riskScore}
      />
    </div>
  );
}
