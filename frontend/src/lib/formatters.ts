// ============================================
// DATA FORMATTING UTILITIES
// ============================================

// Currency formatting
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Compact number (1.4K, 2.3M)
export function formatCompactNumber(num: number): string {
  if (Math.abs(num) >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (Math.abs(num) >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toFixed(0)
}

// Percentage
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

// Weight formatting
export function formatWeight(grams: number): string {
  if (grams >= 1000) return `${(grams / 1000).toFixed(2)} kg`
  return `${grams}g`
}

// Date formatting
export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  if (format === 'relative') {
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)

    if (seconds < 60) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    if (weeks < 5) return `${weeks}w ago`
    if (months < 12) return `${months}mo ago`
    return `${Math.floor(months / 12)}y ago`
  }

  if (format === 'long') {
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Time formatting
export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

// Duration
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

// Nutrition value formatting
export function formatNutrition(value: number | null | undefined, unit: string, decimals = 1): string {
  if (value == null) return 'N/A'
  return `${value.toFixed(decimals)}${unit}`
}

// Health score label
export function formatHealthScore(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 80) return { label: 'Excellent', color: '#10b981', bgColor: 'rgba(16,185,129,0.1)' }
  if (score >= 60) return { label: 'Good', color: '#06b6d4', bgColor: 'rgba(6,182,212,0.1)' }
  if (score >= 40) return { label: 'Fair', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)' }
  return { label: 'Poor', color: '#ef4444', bgColor: 'rgba(239,68,68,0.1)' }
}

// Order number formatting
export function formatOrderNumber(id: string): string {
  return `#SB-${id.slice(-8).toUpperCase()}`
}

// File size
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// Text truncation
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - suffix.length)}${suffix}`
}

// Title case
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Barcode formatting (display)
export function formatBarcode(barcode: string): string {
  if (barcode.length === 12) {
    return `${barcode.slice(0, 1)}-${barcode.slice(1, 6)}-${barcode.slice(6, 11)}-${barcode.slice(11)}`
  }
  if (barcode.length === 13) {
    return `${barcode.slice(0, 1)}-${barcode.slice(1, 7)}-${barcode.slice(7, 12)}-${barcode.slice(12)}`
  }
  return barcode
}
