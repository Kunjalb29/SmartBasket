import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  animate?: boolean
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = 'lg',
  animate = true,
}) => {
  const roundedMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }

  return (
    <div
      className={cn(
        'shimmer',
        roundedMap[rounded],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        animation: animate ? undefined : 'none',
      }}
    />
  )
}

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => (
  <div className="glass-card p-0 overflow-hidden">
    <Skeleton height={200} rounded="2xl" className="rounded-b-none" />
    <div className="p-4 space-y-2">
      <Skeleton height={16} width="80%" />
      <Skeleton height={12} width="60%" />
      <div className="flex items-center justify-between mt-3">
        <Skeleton height={20} width={60} />
        <Skeleton height={32} width={80} rounded="xl" />
      </div>
    </div>
  </div>
)

// Dashboard Stat Skeleton
export const StatCardSkeleton: React.FC = () => (
  <div className="glass-card p-5 space-y-3">
    <div className="flex items-center justify-between">
      <Skeleton height={16} width="50%" />
      <Skeleton height={36} width={36} rounded="xl" />
    </div>
    <Skeleton height={32} width="70%" />
    <Skeleton height={12} width="40%" />
  </div>
)

// Table Row Skeleton
export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 5 }) => (
  <tr>
    {Array(cols).fill(0).map((_, i) => (
      <td key={i} className="p-4">
        <Skeleton height={14} width={`${60 + Math.random() * 40}%`} />
      </td>
    ))}
  </tr>
)

// Chat Message Skeleton
export const ChatMessageSkeleton: React.FC = () => (
  <div className="flex gap-3 items-start">
    <Skeleton height={32} width={32} rounded="full" />
    <div className="space-y-2 flex-1">
      <Skeleton height={14} width="80%" />
      <Skeleton height={14} width="60%" />
      <Skeleton height={14} width="70%" />
    </div>
  </div>
)
