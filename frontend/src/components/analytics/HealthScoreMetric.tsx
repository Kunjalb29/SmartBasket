import React from 'react';
import { ProgressRing } from '../ui/ProgressRing';
import { ShieldCheck, TrendingUp } from 'lucide-react';

interface HealthScoreMetricProps {
  score: number;
  previousScore: number;
}

export const HealthScoreMetric: React.FC<HealthScoreMetricProps> = ({ score, previousScore }) => {
  const diff = score - previousScore;
  const isUp = diff >= 0;

  const getProgressColor = (val: number) => {
    if (val >= 80) return 'stroke-emerald-500';
    if (val >= 50) return 'stroke-amber-500';
    return 'stroke-rose-500';
  };

  return (
    <div className="flex items-center justify-between p-4.5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl gap-4">
      <div className="flex-1">
        <h4 className="text-xs uppercase font-bold tracking-widest text-slate-450 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Basket Health index</span>
        </h4>
        <p className="text-2xl font-extrabold text-slate-850 dark:text-white mt-2">{score}/100</p>
        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
          <TrendingUp className={`w-3.5 h-3.5 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`} />
          <span className={isUp ? 'text-emerald-500' : 'text-rose-500'}>
            {isUp ? '+' : ''}{diff.toFixed(1)}% this week
          </span>
        </div>
      </div>
      <ProgressRing 
        size={85} 
        strokeWidth={7.5} 
        progress={score} 
        color={getProgressColor(score)}
      >
        <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{score}%</span>
      </ProgressRing>
    </div>
  );
};\n