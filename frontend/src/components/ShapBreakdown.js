import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';

export default function ShapBreakdown({ shapData = [] }) {
  if (!shapData || shapData.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
        No specific risk factors triggered for this transaction.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          SHAP Feature Risk Impact Breakdown
        </span>
        <span className="text-[10px] text-slate-400">Additive Risk Points</span>
      </div>

      <div className="space-y-2">
        {shapData.map((item, idx) => {
          const impact = item.shap_impact || 0;
          const maxImpact = 40.0;
          const pct = Math.min(100, (impact / maxImpact) * 100);

          return (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-200">{item.feature}</span>
                <span className="font-semibold text-rose-400">+{impact} pts</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
