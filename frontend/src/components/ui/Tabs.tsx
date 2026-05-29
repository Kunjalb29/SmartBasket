import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pills' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'glass',
  size = 'md',
  className,
}) => {
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  }

  if (variant === 'underline') {
    return (
      <div className={cn('flex items-center gap-1 border-b border-white/[0.06]', className)}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              'relative pb-3 flex items-center gap-1.5 font-medium transition-colors',
              sizeStyles[size],
              tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              activeTab === tab.id ? 'text-violet-400' : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-violet-500/20 text-violet-400">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500"
              />
            )}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'pills') {
    return (
      <div className={cn('flex items-center gap-2 flex-wrap', className)}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              'relative flex items-center gap-1.5 rounded-full font-medium transition-all duration-200',
              sizeStyles[size],
              tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              activeTab === tab.id
                ? 'bg-violet-600 text-white shadow-lg'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-black/20">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    )
  }

  // Glass variant (default)
  return (
    <div
      className={cn(
        'flex items-center gap-1 p-1 rounded-xl',
        className
      )}
      style={{ background: 'rgba(26,31,53,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={cn(
            'relative flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200',
            sizeStyles[size],
            tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
            activeTab === tab.id ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-glass-bg"
              className="absolute inset-0 rounded-lg"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))' }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/20">
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
