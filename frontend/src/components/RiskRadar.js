import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function RiskRadar({ breakdown }) {
  if (!breakdown) return null;

  const data = [
    { subject: 'Social NLP', score: breakdown.social_risk || 0 },
    { subject: 'Transaction', score: breakdown.transaction_risk || 0 },
    { subject: 'Behavior', score: breakdown.behavior_risk || 0 },
    { subject: 'Fraud Graph', score: breakdown.graph_risk || 0 },
  ];

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
          <Radar
            name="Risk Dimensions"
            dataKey="score"
            stroke="#f43f5e"
            fill="#f43f5e"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
