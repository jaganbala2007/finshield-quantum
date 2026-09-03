import React from 'react';
import { MessageSquare, CreditCard, Activity, GitMerge } from 'lucide-react';

export default function RiskDimensionBars({ breakdown }) {
  if (!breakdown) return null;

  const dimensions = [
    { label: 'Social Engineering NLP', score: breakdown.social_risk || 0, icon: MessageSquare, desc: 'Urgency & coercion language in calls/SMS' },
    { label: 'Transaction Anomaly', score: breakdown.transaction_risk || 0, icon: CreditCard, desc: 'Amount ratio & first-time payee flags' },
    { label: 'Behavioral Deviation', score: breakdown.behavior_risk || 0, icon: Activity, desc: 'Deviation from baseline spending pattern' },
    { label: 'Fraud Graph Reputation', score: breakdown.graph_risk || 0, icon: GitMerge, desc: 'Payee degree centrality & scam ring links' },
  ];

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-slate-300 dark:text-slate-200">
        <span>Multimodal Risk Dimensions</span>
        <span className="text-[10px] text-slate-400">Score Range: 0 - 100</span>
      </div>

      <div className="space-y-2.5">
        {dimensions.map((dim, idx) => {
          const Icon = dim.icon;
          const score = Math.round(dim.score);
          const colorClass =
            score > 70
              ? 'bg-rose-500 text-rose-300 border-rose-500/30'
              : score > 40
              ? 'bg-amber-500 text-amber-300 border-amber-500/30'
              : 'bg-emerald-500 text-emerald-300 border-emerald-500/30';

          const barGradient =
            score > 70
              ? 'from-rose-500 to-red-600'
              : score > 40
              ? 'from-amber-500 to-orange-500'
              : 'from-emerald-500 to-teal-500';

          return (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/90 dark:bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold text-slate-100">{dim.label}</span>
                </div>
                <span className={`px-2 py-0.5 rounded font-bold text-xs ${colorClass}`}>
                  {score} / 100
                </span>
              </div>

              {/* High-Contrast Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-500`}
                  style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
                ></div>
              </div>

              <p className="text-[10px] text-slate-400">{dim.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
