import React from 'react'
import { cn } from '@/lib/utils'

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerVariant = 'default' | 'dots' | 'pulse' | 'bars'

interface SpinnerProps {
  size?: SpinnerSize
  variant?: SpinnerVariant
  color?: string
  className?: string
  label?: string
}

const sizeMap = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  color = '#7c3aed',
  className,
  label,
}) => {
  const px = sizeMap[size]

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1.5', className)} role="status">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="rounded-full typing-dot"
            style={{ width: px / 4, height: px / 4, background: color, animationDelay: `${delay}s` }}
          />
        ))}
        {label && <span className="sr-only">{label}</span>}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('relative', className)} role="status" style={{ width: px, height: px }}>
        <div
          className="absolute inset-0 rounded-full pulse-ring"
          style={{ background: color }}
        />
        <div className="absolute inset-0 rounded-full" style={{ background: color, transform: 'scale(0.8)' }} />
        {label && <span className="sr-only">{label}</span>}
      </div>
    )
  }

  if (variant === 'bars') {
    return (
      <div className={cn('flex items-end gap-0.5', className)} role="status" style={{ height: px }}>
        {[0, 0.15, 0.3, 0.45].map((delay, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: px / 5,
              background: color,
              animation: `typingBounce 0.8s ${delay}s infinite ease-in-out`,
              height: '100%',
            }}
          />
        ))}
        {label && <span className="sr-only">{label}</span>}
      </div>
    )
  }

  return (
    <div className={cn('animate-spin', className)} role="status" style={{ width: px, height: px }}>
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={`${color}30`} strokeWidth="3" />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  )
}

// Full Page Loading Overlay
export const PageLoader: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(10px)' }}>
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mb-4 animate-float">
      <span className="text-2xl">🛒</span>
    </div>
    <Spinner size="md" />
    <p className="text-slate-400 text-sm mt-4">{message}</p>
  </div>
)
