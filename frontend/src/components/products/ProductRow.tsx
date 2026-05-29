import React from 'react';
import { ShoppingCart, Scale, Heart, AlertTriangle } from 'lucide-react';
import type { Product } from '@/types';

interface ProductRowProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  isInCompare: boolean;
  isInWishlist: boolean;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onAddToCart,
  onAddToCompare,
  onAddToWishlist,
  isInCompare,
  isInWishlist
}) => {
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20';
    if (score >= 50) return 'text-amber-500 bg-amber-50 dark:bg-amber-950/20';
    return 'text-rose-500 bg-rose-50 dark:bg-rose-950/20';
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl hover:shadow-md transition">
      <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-xl bg-slate-50 dark:bg-slate-950" />
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
          <h3 className="font-semibold text-slate-800 dark:text-white">{product.name}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getHealthColor(product.healthScore)}`}>
            Health: {product.healthScore}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{product.brand} &bull; {product.category}</p>
        {product.allergens && product.allergens.length > 0 && (
          <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] text-rose-500 font-semibold mt-1.5">
            <AlertTriangle className="w-3 h-3" />
            <span>Contains: {product.allergens.join(', ')}</span>
          </div>
        )}
      </div>
      <div className="flex sm:flex-col items-center sm:items-end gap-2.5">
        <span className="text-lg font-bold text-slate-800 dark:text-white">${product.price.toFixed(2)}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onAddToWishlist(product)} 
            className={`p-2 rounded-xl border transition ${isInWishlist ? 'border-rose-200 bg-rose-50 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/35' : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-350'}`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
          <button 
            onClick={() => onAddToCompare(product)} 
            className={`p-2 rounded-xl border transition ${isInCompare ? 'border-indigo-200 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:border-indigo-900/35' : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-350'}`}
          >
            <Scale className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onAddToCart(product)} 
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
