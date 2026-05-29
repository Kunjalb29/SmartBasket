import React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate' | 'default'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  dot?: boolean
  className?: string
}

const variantMap: Record<BadgeVariant, string> = {
  violet: 'badge-violet',
  cyan: 'badge-cyan',
  emerald: 'badge-emerald',
  amber: 'badge-amber',
  rose: 'badge-rose',
  slate: 'bg-slate-500/15 border border-slate-500/30 text-slate-400',
  default: 'bg-white/10 border border-white/15 text-slate-300',
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded-full',
        variantMap[variant],
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {icon && <span>{icon}</span>}
      {children}
    </span>
  )
}

interface DiscountBadgeProps {
  discount: number
  className?: string
}

export const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount, className }) => (
  <Badge variant="rose" className={className}>
    -{discount}%
  </Badge>
)

interface AIScoreBadgeProps {
  score: number
  className?: string
}

export const AIScoreBadge: React.FC<AIScoreBadgeProps> = ({ score, className }) => {
  const variant = score >= 90 ? 'emerald' : score >= 75 ? 'cyan' : score >= 60 ? 'amber' : 'rose'
  return (
    <Badge variant={variant} className={className}>
      🤖 {score}
    </Badge>
  )
}
