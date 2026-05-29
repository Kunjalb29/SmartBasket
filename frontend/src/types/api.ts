// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiError {
  message: string
  code: string
  status: number
  details?: Record<string, string>
}

// ============================================
// AUTH API TYPES
// ============================================

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: UserProfile
  token: string
  refreshToken: string
  expiresIn: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'USER' | 'ADMIN' | 'MANAGER'
  isEmailVerified: boolean
  joinedAt: string
}

// ============================================
// PRODUCT API TYPES
// ============================================

export interface ProductListRequest {
  page?: number
  pageSize?: number
  category?: string
  search?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
  minHealthScore?: number
  organic?: boolean
  vegan?: boolean
  onSale?: boolean
}

export interface CreateProductRequest {
  name: string
  brand: string
  description: string
  barcode?: string
  categoryId: string
  price: number
  originalPrice: number
  stockCount: number
  unit: string
  thumbnail: string
  images?: string[]
  healthScore: number
  isOrganic?: boolean
  isVegan?: boolean
  isGlutenFree?: boolean
  tags?: string[]
}

// ============================================
// ORDER API TYPES
// ============================================

export interface CreateOrderRequest {
  items: Array<{
    productId: string
    quantity: number
    unitPrice: number
  }>
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY'
  notes?: string
}

export interface Address {
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

// ============================================
// CART API TYPES
// ============================================

export interface SaveCartRequest {
  items: Array<{
    productId: string
    quantity: number
  }>
}

// ============================================
// AI ASSISTANT API TYPES
// ============================================

export interface ChatRequest {
  message: string
  conversationId?: string
  context?: {
    cartItems?: string[]
    preferences?: string[]
    budget?: number
  }
}

export interface ChatResponse {
  message: string
  conversationId: string
  suggestions?: string[]
  recommendedProducts?: string[]
  metadata?: Record<string, unknown>
}

// ============================================
// ANALYTICS API TYPES
// ============================================

export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  activeUsers: number
  averageHealthScore: number
  ordersChangePercent: number
  revenueChangePercent: number
  usersChangePercent: number
}

export interface RevenueDataPoint {
  date: string
  revenue: number
  orders: number
}

// ============================================
// NOTIFICATION API TYPES
// ============================================

export interface Notification {
  id: string
  type: string
  title: string
  body: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: string
}
