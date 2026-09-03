import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Lock, Volume2, UserCheck, XCircle, ArrowRight, Info } from 'lucide-react';
import ShapBreakdown from './ShapBreakdown';
import RiskDimensionBars from './RiskDimensionBars';
import TrustedContactModal from './TrustedContactModal';

export default function AlertModal({ result, isOpen, onClose, vulnerableMode }) {
  const [showTrustedContact, setShowTrustedContact] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  if (!isOpen || !result) return null;

  const decision = result.policy_decision || 'ALLOW';
  const riskScore = Math.round(result.manipulation_risk_score || 0);

  const getDecisionBadge = () => {
    switch (decision) {
      case 'ALLOW':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
          icon: ShieldCheck,
          label: 'ALLOW - Safe Payment'
        };
      case 'VERIFY':
        return {
          bg: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
          icon: Lock,
          label: 'VERIFY - 2FA Challenge Required'
        };
      case 'PAUSE':
        return {
          bg: 'bg-orange-500/10 border-orange-500/40 text-orange-400',
          icon: AlertTriangle,
          label: 'PAUSE - Safety Reflection Hold'
        };
      case 'HOLD':
      default:
        return {
          bg: 'bg-rose-500/10 border-rose-500/40 text-rose-400',
          icon: ShieldAlert,
          label: 'HOLD - Blocked High Scam Risk'
        };
    }
  };

  const badge = getDecisionBadge();
  const BadgeIcon = badge.icon;

  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${result.user_title}. ${result.user_message}. Key warning: ${result.reasons?.[0] || 'Unusual payment'}. We recommend: ${result.recommendation}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.85; // slightly slower for senior readability
      utterance.onend = () => setSpeechActive(false);
      setSpeechActive(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className={`glass-card max-w-2xl w-full p-6 border ${vulnerableMode ? 'vulnerable-accessibility-mode border-amber-500' : 'border-slate-800'} relative my-8 shadow-2xl`}>
          
          {/* Top Banner Decision Badge & Voice Assistant */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-extrabold ${badge.bg}`}>
              <BadgeIcon className="w-4 h-4 shrink-0" />
              <span>{badge.label}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Accessible Voice Read Aloud */}
              <button
                onClick={handleSpeak}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  speechActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 text-cyan-400 border-slate-800 hover:border-cyan-500/40'
                }`}
                title="Read Alert Aloud via Speech Synthesis"
              >
                <Volume2 className="w-4 h-4" />
                {speechActive ? 'Speaking...' : 'Listen to Alert'}
              </button>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900"
                aria-label="Close alert"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Title & Unambiguous User Guidance */}
          <div className="mb-5 space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {result.user_title}
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {result.user_message}
            </p>
          </div>

          {/* Clean High-Contrast Score Indicator (Replaces Cluttered Gauge) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">Human Manipulation Risk Index</span>
              <span className={`font-extrabold text-lg ${riskScore > 60 ? 'text-rose-400' : riskScore > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {riskScore} / 100
              </span>
            </div>
            
            {/* Horizontal Direct Progress Indicator */}
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  riskScore > 60
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                    : riskScore > 30
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, riskScore))}%` }}
              ></div>
            </div>
            
            <p className="text-[11px] text-slate-400 font-medium">
              Evaluated by multimodal AI fusing communication context, transaction baseline, and graph intelligence.
            </p>
          </div>

          {/* Multimodal Risk Dimension Progress Bars */}
          <div className="mb-6">
            <RiskDimensionBars breakdown={result.risk_breakdown} />
          </div>

          {/* Key Flagged Risk Reasons (Text + Icon) */}
          {result.reasons && result.reasons.length > 0 && (
            <div className="mb-6 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Flagged Risk Indicators</span>
              <div className="space-y-2">
                {result.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-100 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHAP Feature Impact Breakdown */}
          <div className="mb-6">
            <ShapBreakdown shapData={result.shap_explanation} />
          </div>

          {/* Unambiguous Action Buttons with Explicit Labels */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4 text-slate-400" />
              Cancel Transfer & Keep Money Safe
            </button>

            {decision !== 'ALLOW' && (
              <button
                onClick={() => setShowTrustedContact(true)}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/20 flex items-center justify-center gap-2 transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                Notify Trusted Contact
              </button>
            )}

            {decision === 'ALLOW' && (
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                Complete Payment
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Trusted Contact Modal */}
      <TrustedContactModal
        isOpen={showTrustedContact}
        onClose={() => setShowTrustedContact(false)}
        payee={result.payee}
        amount={result.amount}
        riskScore={riskScore}
      />
    </>
  );
}
