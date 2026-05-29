import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-rose-500" />;
      default: return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30';
      case 'warning': return 'bg-amber-50 dark:bg-amber-950/20 border-amber-250 dark:border-amber-900/30';
      case 'error': return 'bg-rose-50 dark:bg-rose-950/20 border-rose-250 dark:border-rose-900/30';
      default: return 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl border shadow-lg max-w-sm transition-all duration-300 animate-slideIn ${getBgColor()}`}>
      {getIcon()}
      <p className="text-sm font-medium text-slate-750 dark:text-slate-300 flex-1">{message}</p>
      <button onClick={() => onClose(id)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-350">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};\n