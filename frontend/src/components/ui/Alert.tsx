import React from 'react'
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: React.ReactNode
  onDismiss?: () => void
  icon?: React.ReactNode
  className?: string
}

const variantConfig = {
  info: {
    icon: <Info className="w-4 h-4" />,
    colors: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    textColor: 'text-cyan-300',
  },
  success: {
    icon: <CheckCircle className="w-4 h-4" />,
    colors: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    textColor: 'text-emerald-300',
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    colors: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    textColor: 'text-amber-300',
  },
  error: {
    icon: <XCircle className="w-4 h-4" />,
    colors: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    textColor: 'text-rose-300',
  },
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  icon,
  className,
}) => {
  const config = variantConfig[variant]

  return (
    <div className={cn('flex gap-3 p-4 rounded-xl border', config.colors, className)}>
      <div className="flex-shrink-0 mt-0.5">
        {icon ?? config.icon}
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-sm mb-1">{title}</p>
        )}
        <div className={cn('text-sm', config.textColor)}>{children}</div>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="flex-shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

// Inline variant
export const InlineAlert: React.FC<{ message: string; variant?: AlertProps['variant'] }> = ({
  message,
  variant = 'error',
}) => {
  const config = variantConfig[variant]
  return (
    <div className={cn('flex items-center gap-2 text-sm', config.colors.split(' ').filter(c => c.includes('text')).join(' '))}>
      {config.icon}
      {message}
    </div>
  )
}
