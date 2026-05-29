import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  trend?: number // percent change, positive = up, negative = down
  trendLabel?: string
  icon?: React.ReactNode
  iconBg?: string
  iconColor?: string
  description?: string
  badge?: { label: string; color: string }
  className?: string
  animate?: boolean
  delay?: number
  onClick?: () => void
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  trendLabel,
  icon,
  iconBg = 'rgba(124,58,237,0.15)',
  iconColor = '#a78bfa',
  description,
  badge,
  className,
  animate = true,
  delay = 0,
  onClick,
}) => {
  const trendIsPositive = (trend ?? 0) > 0
  const trendIsNeutral = trend === 0 || trend === undefined

  const TrendIcon = trendIsNeutral ? Minus : trendIsPositive ? TrendingUp : TrendingDown
  const trendColor = trendIsNeutral ? '#64748b' : trendIsPositive ? '#10b981' : '#ef4444'

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { delay, duration: 0.4 } : undefined}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      onClick={onClick}
      className={cn(
        'glass-card p-5',
        onClick ? 'cursor-pointer' : 'cursor-default',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <div className="flex items-center gap-2">
          {badge && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ color: badge.color, background: `${badge.color}15` }}
            >
              {badge.label}
            </span>
          )}
          {icon && (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: iconBg, color: iconColor }}
            >
              {icon}
            </div>
          )}
        </div>
      </div>

      <p className="text-2xl font-bold font-display text-slate-100 mb-1.5">
        {typeof value === 'number' ? formatNumber(value) : value}
      </p>

      {description && (
        <p className="text-xs text-slate-500 mb-2">{description}</p>
      )}

      {trend !== undefined && (
        <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: trendColor }}>
          <TrendIcon className="w-3 h-3" />
          <span>
            {trendIsNeutral ? 'No change' : `${Math.abs(trend).toFixed(1)}% ${trendIsPositive ? 'increase' : 'decrease'}`}
          </span>
          {trendLabel && <span className="text-slate-500 font-normal ml-1">{trendLabel}</span>}
        </div>
      )}
    </motion.div>
  )
}
