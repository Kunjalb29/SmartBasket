import React from 'react';
import { ShoppingBasket, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
            <span className="text-lg font-bold tracking-tight text-slate-850 dark:text-white">SmartBasket</span>
          </div>
          <p className="text-xs text-slate-550 dark:text-slate-500">
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
          <p className="text-xs text-slate-550 dark:text-slate-500 mb-2">
            Fully open-source enterprise smart shopping application.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://github.com/Kunjalb29/SmartBasket" target="_blank" rel="noreferrer" className="text-slate-450 hover:text-slate-700 dark:hover:text-white">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
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
};
