import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', options ?? {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(d)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return `${str.slice(0, length)}...`
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100)
}

export function calculateHealthScore(nutritionData: {
  calories: number
  protein: number
  fat: number
  fiber: number
  sugar: number
}): number {
  let score = 100
  if (nutritionData.calories > 500) score -= 15
  if (nutritionData.fat > 20) score -= 10
  if (nutritionData.sugar > 15) score -= 15
  if (nutritionData.protein > 15) score += 10
  if (nutritionData.fiber > 5) score += 10
  return Math.max(0, Math.min(100, score))
}

export function getHealthLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Excellent', color: '#10b981' }
  if (score >= 60) return { label: 'Good', color: '#06b6d4' }
  if (score >= 40) return { label: 'Fair', color: '#f59e0b' }
  return { label: 'Poor', color: '#ef4444' }
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: '#f59e0b',
    processing: '#06b6d4',
    shipped: '#7c3aed',
    delivered: '#10b981',
    cancelled: '#ef4444',
    active: '#10b981',
    inactive: '#ef4444',
    in_stock: '#10b981',
    low_stock: '#f59e0b',
    out_of_stock: '#ef4444',
  }
  return map[status.toLowerCase().replace(' ', '_')] ?? '#94a3b8'
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key])
    if (!acc[groupKey]) acc[groupKey] = []
    acc[groupKey].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(arr: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}
