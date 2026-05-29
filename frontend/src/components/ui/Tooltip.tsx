import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [active, setActive] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom': return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left': return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right': return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'top':
      default: return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  return (
    <div 
      className="relative inline-block" 
      onMouseEnter={() => setActive(true)} 
      onMouseLeave={() => setActive(false)}
    >
      {children}
      {active && (
        <div className={`absolute z-50 px-2.5 py-1.5 text-xs text-white bg-slate-900 dark:bg-slate-800 rounded-md shadow-lg border border-slate-700/30 whitespace-nowrap transition-all duration-200 ${getPositionClasses()}`}>
          {content}
        </div>
      )}
    </div>
  );
};\n