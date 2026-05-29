import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'violet' | 'cyan' | 'emerald' | 'none'
  onClick?: () => void
  animate?: boolean
  delay?: number
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glow = 'none',
  onClick,
  animate = false,
  delay = 0,
}) => {
  const glowMap = {
    violet: 'hover:shadow-glow-violet',
    cyan: 'hover:shadow-glow-cyan',
    emerald: 'hover:shadow-glow-emerald',
    none: '',
  }

  const content = (
    <div
      className={cn(
        'glass-card',
        hover && 'cursor-pointer transition-all duration-300 hover:-translate-y-1',
        glowMap[glow],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  iconColor?: string
  subtitle?: string
  animate?: boolean
  delay?: number
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  iconColor = 'violet',
  subtitle,
  animate = false,
  delay = 0,
}) => {
  const colorMap: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  }

  const changeColor = {
    positive: 'text-emerald-400',
    negative: 'text-rose-400',
    neutral: 'text-slate-400',
  }

  const card = (
    <div className="glass-card p-6 group cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-2.5 rounded-xl border', colorMap[iconColor] || colorMap.violet)}>
          {icon}
        </div>
        {change && (
          <span className={cn('text-xs font-semibold px-2 py-1 rounded-lg bg-white/5', changeColor[changeType])}>
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-100 font-display">{value}</p>
        <p className="text-sm text-slate-400 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
      >
        {card}
      </motion.div>
    )
  }

  return card
}
