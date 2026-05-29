import React from 'react';
import { ShoppingBag, Heart, ShieldCheck } from 'lucide-react';

interface CartSummaryCardProps {
  itemCount: number;
  subtotal: number;
  healthScore: number;
  onCheckout: () => void;
  savings: number;
}

export const CartSummaryCard: React.FC<CartSummaryCardProps> = ({
  itemCount,
  subtotal,
  healthScore,
  onCheckout,
  savings
}) => {
  const getHealthBg = (score: number) => {
    if (score >= 80) return 'from-emerald-500/20 to-emerald-600/5 dark:from-emerald-500/10 dark:to-transparent';
    if (score >= 50) return 'from-amber-500/20 to-amber-600/5 dark:from-amber-500/10 dark:to-transparent';
    return 'from-rose-500/20 to-rose-600/5 dark:from-rose-500/10 dark:to-transparent';
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm sticky top-6">
      <h3 className="font-bold text-slate-850 dark:text-white text-base mb-4 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
        <span>Cart Summary</span>
      </h3>
      <div className="space-y-3.5 text-sm mb-5 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex justify-between text-slate-550 dark:text-slate-450">
          <span>Items total</span>
          <span>{itemCount} items</span>
        </div>
        <div className="flex justify-between text-emerald-600 dark:text-emerald-450 font-medium">
          <span>AI Optimization Savings</span>
          <span>-${savings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-extrabold text-slate-850 dark:text-white">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <div className={`p-4 rounded-xl bg-gradient-to-r ${getHealthBg(healthScore)} border border-slate-250/20 dark:border-slate-800/60 mb-5 flex items-start gap-3`}>
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250">Average Health Score: {healthScore}/100</h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">Your basket is certified healthy! AI optimized alternatives applied.</p>
        </div>
      </div>
      <button 
        onClick={onCheckout} 
        disabled={itemCount === 0}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-250 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-650 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Checkout</span>
      </button>
    </div>
  );
};
