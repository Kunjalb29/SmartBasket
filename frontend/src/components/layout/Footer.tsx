import React from 'react';
import { ShoppingBasket, Github, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
            <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">SmartBasket</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Next-gen smart grocery assistant tracking nutrition, savings, and sustainability.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-450 mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">Products Grid</a></li>
            <li><a href="/compare" className="hover:text-indigo-600 dark:hover:text-indigo-400">Compare Tool</a></li>
            <li><a href="/scanner" className="hover:text-indigo-600 dark:hover:text-indigo-400">UPC Scanner</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-450 mb-3">AI & Analytics</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a href="/ai-assistant" className="hover:text-indigo-600 dark:hover:text-indigo-400">AI Assistant</a></li>
            <li><a href="/analytics" className="hover:text-indigo-600 dark:hover:text-indigo-400">Spending Trends</a></li>
            <li><a href="/nutrition" className="hover:text-indigo-600 dark:hover:text-indigo-400">Health Profile</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-450 mb-3">About</h4>
          <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">
            Fully open-source enterprise smart shopping application.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://github.com/Kunjalb29/SmartBasket" target="_blank" rel="noreferrer" className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <Github className="w-5 h-5" />
            </a>
            <a href="/settings" className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <Shield className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-100 dark:border-slate-900/60 pt-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} SmartBasket. All rights reserved.
        </p>
        <p className="text-xs text-slate-400 flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for healthy shopping.
        </p>
      </div>
    </footer>
  );
};\n