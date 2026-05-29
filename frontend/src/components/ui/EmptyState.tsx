import React from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode | string
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: { container: 'py-8', iconSize: 'text-3xl', titleSize: 'text-base', descSize: 'text-xs' },
    md: { container: 'py-16', iconSize: 'text-5xl', titleSize: 'text-lg', descSize: 'text-sm' },
    lg: { container: 'py-24', iconSize: 'text-7xl', titleSize: 'text-2xl', descSize: 'text-base' },
  }

  const styles = sizeStyles[size]

  return (
    <div className={cn('flex flex-col items-center justify-center text-center', styles.container, className)}>
      {icon && (
        <div className={cn('mb-4', styles.iconSize)}>
          {typeof icon === 'string' ? (
            <span>{icon}</span>
          ) : (
            <div className="opacity-30">{icon}</div>
          )}
        </div>
      )}
      <h3 className={cn('font-semibold text-slate-300 font-display mb-2', styles.titleSize)}>
        {title}
      </h3>
      {description && (
        <p className={cn('text-slate-500 max-w-sm leading-relaxed mb-6', styles.descSize)}>
          {description}
        </p>
      )}
      {action}
    </div>
  )
}
