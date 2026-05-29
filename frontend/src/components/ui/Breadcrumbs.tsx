import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-500 mb-4">
      <Link to="/" className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-350">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          {item.path && index < items.length - 1 ? (
            <Link to={item.path} className="hover:text-slate-700 dark:hover:text-slate-350">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-slate-300 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
