import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  label?: string;
  unit?: string;
}

export const Slider: React.FC<SliderProps> = ({ min, max, step = 1, value, onChange, label, unit = '' }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        {label && <span className="font-medium text-slate-700 dark:text-slate-350">{label}</span>}
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
      />
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};
