import React from 'react';
import { Sparkles, ShoppingBag, ShieldAlert, BadgeDollarSign } from 'lucide-react';

interface AIPromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const AIPromptSuggestions: React.FC<AIPromptSuggestionsProps> = ({ onSelectPrompt }) => {
  const prompts = [
    { text: "Find healthy organic milk alternatives", icon: <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> },
    { text: "Suggest dynamic swap to save $15", icon: <BadgeDollarSign className="w-3.5 h-3.5 text-emerald-500" /> },
    { text: "Analyze allergens in my shopping cart", icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-500" /> },
    { text: "Build weekly healthy keto meal plan", icon: <ShoppingBag className="w-3.5 h-3.5 text-amber-500" /> }
  ];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-450">Suggested Prompts</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {prompts.map((p, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(p.text)}
            className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-150 dark:border-slate-850 hover:border-indigo-250 dark:hover:border-indigo-900 bg-white dark:bg-slate-900 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 transition hover:shadow-sm"
          >
            {p.icon}
            <span className="truncate">{p.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
