import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

// === RatingStars ===
interface RatingStarsProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  interactive?: boolean
  onChange?: (rating: number) => void
  className?: string
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onChange,
  className,
}) => {
  const [hovered, setHovered] = React.useState(0)
  const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const fill = (hovered || rating) > i
        return (
          <button
            key={i}
            disabled={!interactive}
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
          >
            <Star
              className={sizeClass}
              fill={fill ? '#f59e0b' : 'none'}
              stroke={fill ? '#f59e0b' : '#475569'}
            />
          </button>
        )
      })}
      {showValue && (
        <span className="ml-1 text-xs text-slate-400">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}

// === ProgressBar ===
interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'violet' | 'emerald' | 'cyan' | 'amber' | 'rose'
  showLabel?: boolean
  animated?: boolean
  className?: string
}

const COLOR_MAP = {
  violet: '#7c3aed',
  emerald: '#10b981',
  cyan: '#06b6d4',
  amber: '#f59e0b',
  rose: '#ef4444',
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'violet',
  showLabel = false,
  animated = false,
  className,
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const height = size === 'sm' ? '4px' : size === 'lg' ? '10px' : '6px'
  const bg = COLOR_MAP[color]

  return (
    <div className={cn('w-full', className)}>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height, background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          initial={animated ? { width: 0 } : undefined}
          animate={animated ? { width: `${pct}%` } : undefined}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ width: animated ? undefined : `${pct}%`, background: bg }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span style={{ color: bg }}>{pct.toFixed(0)}%</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}

// === Avatar ===
interface AvatarProps {
  src?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => {
  const sizeMap = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl' }
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'

  if (src) {
    return (
      <img src={src} alt={name ?? 'Avatar'} className={cn('rounded-xl object-cover', sizeMap[size], className)} />
    )
  }

  return (
    <div
      className={cn('rounded-xl flex items-center justify-center font-bold text-white bg-gradient-to-br from-violet-600 to-cyan-500', sizeMap[size], className)}
    >
      {initials}
    </div>
  )
}

// === Divider ===
export const Divider: React.FC<{ label?: string; className?: string }> = ({ label, className }) => (
  <div className={cn('flex items-center gap-3', className)}>
    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
    {label && <span className="text-xs text-slate-500">{label}</span>}
    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
  </div>
)
