// ============================================
// APP-WIDE CONSTANTS & ENUMS
// ============================================

export const APP_NAME = 'SmartBasket'
export const APP_VERSION = '2.0.0'
export const APP_TAGLINE = 'AI-Powered Smart Shopping'

// ============================================
// ROUTES
// ============================================
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  ORDERS: '/orders',
  ASSISTANT: '/assistant',
  NUTRITION: '/nutrition',
  SCANNER: '/scanner',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  WISHLIST: '/wishlist',
  COMPARE: '/compare',
  ADMIN: '/admin',
} as const

// ============================================
// PAGINATION
// ============================================
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]
export const DEFAULT_PAGE_SIZE = 20

// ============================================
// PRODUCT CATEGORIES
// ============================================
export const PRODUCT_CATEGORIES = [
  { slug: 'all', label: 'All Products', icon: '🛒' },
  { slug: 'fresh-produce', label: 'Fresh Produce', icon: '🥑' },
  { slug: 'dairy-eggs', label: 'Dairy & Eggs', icon: '🥛' },
  { slug: 'meat-seafood', label: 'Meat & Seafood', icon: '🐟' },
  { slug: 'bakery', label: 'Bakery', icon: '🍞' },
  { slug: 'pantry', label: 'Pantry', icon: '🥫' },
  { slug: 'beverages', label: 'Beverages', icon: '☕' },
  { slug: 'snacks', label: 'Snacks', icon: '🍿' },
  { slug: 'organic-natural', label: 'Organic & Natural', icon: '🌿' },
] as const

export type ProductCategorySlug = typeof PRODUCT_CATEGORIES[number]['slug']

// ============================================
// SORT OPTIONS
// ============================================
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'health-desc', label: 'Best Health Score' },
  { value: 'newest', label: 'Newest First' },
  { value: 'discount', label: 'Best Discount' },
] as const

// ============================================
// ORDER STATUS CONFIG
// ============================================
export const ORDER_STATUS_CONFIG = {
  PENDING: { label: 'Pending', color: '#f59e0b', icon: '⏳' },
  CONFIRMED: { label: 'Confirmed', color: '#06b6d4', icon: '✅' },
  PROCESSING: { label: 'Processing', color: '#7c3aed', icon: '⚙️' },
  SHIPPED: { label: 'Shipped', color: '#8b5cf6', icon: '📦' },
  DELIVERED: { label: 'Delivered', color: '#10b981', icon: '🎉' },
  CANCELLED: { label: 'Cancelled', color: '#ef4444', icon: '❌' },
  REFUNDED: { label: 'Refunded', color: '#64748b', icon: '↩️' },
} as const

// ============================================
// DIETARY TAGS
// ============================================
export const DIETARY_TAGS = [
  { slug: 'organic', label: 'Organic', icon: '🌿' },
  { slug: 'vegan', label: 'Vegan', icon: '🌱' },
  { slug: 'gluten-free', label: 'Gluten Free', icon: '🚫🌾' },
  { slug: 'keto', label: 'Keto', icon: '🥑' },
  { slug: 'paleo', label: 'Paleo', icon: '🦴' },
  { slug: 'dairy-free', label: 'Dairy Free', icon: '🚫🥛' },
  { slug: 'high-protein', label: 'High Protein', icon: '💪' },
  { slug: 'low-sodium', label: 'Low Sodium', icon: '🧂' },
] as const

// ============================================
// TAX RATE & DELIVERY
// ============================================
export const TAX_RATE = 0.08 // 8%
export const FREE_DELIVERY_THRESHOLD = 35 // $35+
export const DELIVERY_FEE = 4.99

// ============================================
// AI CONFIG
// ============================================
export const AI_MAX_MESSAGES = 50
export const AI_SUGGESTION_DELAY_MS = 800
export const AI_MAX_RESPONSE_LENGTH = 500

// ============================================
// HEALTH SCORE THRESHOLDS
// ============================================
export const HEALTH_SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
  POOR: 0,
}

// ============================================
// NOTIFICATION TYPES
// ============================================
export const NOTIFICATION_TYPES = {
  ORDER_SHIPPED: 'order_shipped',
  PRICE_DROP: 'price_drop',
  BUDGET_ALERT: 'budget_alert',
  AI_RECOMMENDATION: 'ai_recommendation',
  HEALTH_INSIGHT: 'health_insight',
  PROMOTION: 'promotion',
} as const

// ============================================
// ANIMATION DURATIONS
// ============================================
export const ANIMATION = {
  FAST: 0.15,
  NORMAL: 0.3,
  SLOW: 0.6,
  SPRING: { type: 'spring' as const, damping: 20, stiffness: 300 },
}
