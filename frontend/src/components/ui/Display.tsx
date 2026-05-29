import React from 'react'
import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  showCount?: boolean
  reviewCount?: number
  className?: string
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'sm',
  showValue = false,
  showCount = false,
  reviewCount,
  className,
}) => {
  const sizeMap = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' }
  const textMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating)
    const halfFilled = !filled && i + 0.5 <= rating
    return { filled, halfFilled }
  })

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {stars.map((star, i) => (
          <span key={i} className="relative">
            {star.halfFilled ? (
              <StarHalf className={cn(sizeMap[size], 'text-amber-400 fill-amber-400')} />
            ) : (
              <Star
                className={cn(
                  sizeMap[size],
                  star.filled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-600 fill-slate-700'
                )}
              />
            )}
          </span>
        ))}
      </div>
      {showValue && (
        <span className={cn('font-semibold text-amber-400', textMap[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {showCount && reviewCount !== undefined && (
        <span className={cn('text-slate-500', textMap[size])}>
          ({reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k` : reviewCount})
        </span>
      )}
    </div>
  )
}

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  color?: 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose'
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

const colorMap = {
  violet: 'from-violet-600 to-violet-400',
  cyan: 'from-cyan-600 to-cyan-400',
  emerald: 'from-emerald-600 to-emerald-400',
  amber: 'from-amber-600 to-amber-400',
  rose: 'from-rose-600 to-rose-400',
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'violet',
  showValue = false,
  size = 'md',
  animated = false,
  className,
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-slate-400">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-slate-300">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn('rounded-full bg-slate-800/60', heights[size])}>
        <div
          className={cn(
            'rounded-full bg-gradient-to-r transition-all duration-700',
            colorMap[color],
            heights[size],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface AvatarProps {
  src?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showStatus?: boolean
  status?: 'online' | 'offline' | 'busy'
  className?: string
}

const avatarSizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  showStatus,
  status = 'online',
  className,
}) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  const statusColors = {
    online: 'bg-emerald-400',
    offline: 'bg-slate-500',
    busy: 'bg-amber-400',
  }

  return (
    <div className="relative inline-flex flex-shrink-0">
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-bold overflow-hidden border-2 border-violet-500/30',
          avatarSizes[size],
          !src && 'bg-gradient-to-br from-violet-600 to-cyan-600 text-white',
          className
        )}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-slate-900 w-2.5 h-2.5',
            statusColors[status]
          )}
        />
      )}
    </div>
  )
}
