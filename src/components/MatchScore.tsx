
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface MatchScoreProps {
  score: number;
  label: string;
  color: 'indigo' | 'emerald' | 'amber';
}

const MatchScore: React.FC<MatchScoreProps> = ({ score, label, color }) => {
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  const COLORS = {
    indigo: ['#4f46e5', '#eef2ff'],
    emerald: ['#10b981', '#ecfdf5'],
    amber: ['#f59e0b', '#fffbeb'],
  };

  const TEXT_COLORS = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
  };

  return (
    <div className="bg-white rounded-2xl border p-4 shadow-sm flex flex-col items-center justify-center">
      <div className="w-full h-24 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={35}
              outerRadius={50}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={COLORS[color][0]} />
              <Cell fill={COLORS[color][1]} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-lg font-black ${TEXT_COLORS[color]}`}>
          {score}%
        </div>
      </div>
      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
};

export default MatchScore;
