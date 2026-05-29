import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';

interface ChatMessageBubbleProps {
  sender: 'ai' | 'user';
  message: string;
  timestamp: string;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ sender, message, timestamp }) => {
  const isAI = sender === 'ai';
  return (
    <div className={`flex gap-3.5 ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div className="w-8 h-8 rounded-xl bg-indigo-550 text-white flex items-center justify-center shadow-md shadow-indigo-500/10">
          <Bot className="w-4.5 h-4.5" />
        </div>
      )}
      <div className={`max-w-[75%] flex flex-col gap-1 p-3.5 rounded-2xl text-sm leading-relaxed border ${
        isAI 
          ? 'bg-slate-50 dark:bg-slate-900 border-slate-150 dark:border-slate-850 text-slate-750 dark:text-slate-350' 
          : 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-650/15'
      }`}>
        <p className="whitespace-pre-line">{message}</p>
        <span className={`text-[9px] self-end mt-1 font-medium ${isAI ? 'text-slate-400' : 'text-indigo-200'}`}>
          {timestamp}
        </span>
      </div>
      {!isAI && (
        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
          <User className="w-4.5 h-4.5" />
        </div>
      )}
    </div>
  );
};\n