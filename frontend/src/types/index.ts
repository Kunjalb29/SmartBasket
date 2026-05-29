// ===========================
// CORE ENTITY TYPES
// ===========================

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'USER' | 'ADMIN' | 'MODERATOR'
  healthScore: number
  monthlyBudget: number
  spentThisMonth: number
  joinedAt: string
  preferences: UserPreferences
  stats: UserStats
}

export interface UserPreferences {
  dietary: string[]
  allergies: string[]
  budgetPerWeek: number
  calorieGoal: number
  theme: 'dark' | 'light' | 'system'
  notifications: NotificationPreferences
  currency: string
  language: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  priceDrops: boolean
  newRecommendations: boolean
  orderUpdates: boolean
  weeklyDigest: boolean
}

export interface UserStats {
  totalOrders: number
  totalSpent: number
  savedAmount: number
  productsScanned: number
  healthGoalsMet: number
  streakDays: number
}

// ===========================
// PRODUCT TYPES
// ===========================

export interface Product {
  id: string
  name: string
  brand: string
  description: string
  price: number
  originalPrice: number
  discount: number
  category: string
  subcategory: string
  images: string[]
  thumbnail: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  barcode: string
  weight: string
  unit: string
  tags: string[]
  isOrganic: boolean
  isFeatured: boolean
  isOnSale: boolean
  aiScore: number
  healthScore: number
  nutrition: NutritionData
  createdAt: string
  updatedAt: string
}

export interface NutritionData {
  servingSize: string
  servingsPerContainer: number
  calories: number
  totalFat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  totalCarbs: number
  dietaryFiber: number
  totalSugars: number
  addedSugars: number
  protein: number
  vitaminD: number
  calcium: number
  iron: number
  potassium: number
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  productId: string
  rating: number
  title: string
  body: string
  helpful: number
  verified: boolean
  createdAt: string
  images?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  productCount: number
  description: string
}

// ===========================
// CART TYPES
// ===========================

export interface CartItem {
  id: string
  product: Product
  quantity: number
  addedAt: string
  savedForLater: boolean
  aiSuggested: boolean
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  totalItems: number
  subtotal: number
  discount: number
  tax: number
  total: number
  aiOptimized: boolean
  estimatedSavings: number
  healthScore: number
  budgetStatus: 'under' | 'on_track' | 'over'
  createdAt: string
  updatedAt: string
}

// ===========================
// ORDER TYPES
// ===========================

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: OrderStatus
  subtotal: number
  discount: number
  tax: number
  deliveryFee: number
  total: number
  paymentMethod: string
  deliveryAddress: Address
  estimatedDelivery: string
  actualDelivery?: string
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

// ===========================
// AI TYPES
// ===========================

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  products?: Product[]
  nutritionInfo?: NutritionData
  suggestions?: string[]
  isTyping?: boolean
}

export interface AIRecommendation {
  id: string
  productId: string
  product: Product
  score: number
  reason: string
  category: 'health' | 'budget' | 'trending' | 'similar' | 'reorder'
  timestamp: string
}

// ===========================
// ANALYTICS TYPES
// ===========================

export interface AnalyticsData {
  revenue: TimeSeriesData[]
  orders: TimeSeriesData[]
  users: TimeSeriesData[]
  products: ProductAnalytics[]
  categories: CategoryAnalytics[]
  aiMetrics: AIMetrics
}

export interface TimeSeriesData {
  date: string
  value: number
  previousValue?: number
}

export interface ProductAnalytics {
  productId: string
  productName: string
  sales: number
  revenue: number
  views: number
  conversionRate: number
  rating: number
  returnRate: number
}

export interface CategoryAnalytics {
  categoryId: string
  categoryName: string
  revenue: number
  orderCount: number
  percentage: number
  growth: number
}

export interface AIMetrics {
  recommendationsGenerated: number
  recommendationAcceptanceRate: number
  nutritionAnalysesPerformed: number
  chatInteractions: number
  averageHealthScoreImprovement: number
  savedAmount: number
}

// ===========================
// NOTIFICATION TYPES
// ===========================

export interface Notification {
  id: string
  type: 'order' | 'recommendation' | 'price_drop' | 'health' | 'promo' | 'system'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  icon?: string
  createdAt: string
}

// ===========================
// AUTH TYPES
// ===========================

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// ===========================
// ADMIN TYPES
// ===========================

export interface AdminStats {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  totalProducts: number
  revenueGrowth: number
  orderGrowth: number
  userGrowth: number
  averageOrderValue: number
  conversionRate: number
  refundRate: number
}

export interface InventoryItem {
  productId: string
  productName: string
  category: string
  currentStock: number
  minimumStock: number
  maxStock: number
  unitCost: number
  totalValue: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  lastRestocked: string
  supplier: string
}

// ===========================
// FILTER & SORT TYPES
// ===========================

export interface ProductFilters {
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  isOrganic?: boolean
  isOnSale?: boolean
  brands?: string[]
  tags?: string[]
  searchQuery?: string
}

export type SortOption = 
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'newest'
  | 'popularity'
  | 'health_score'
  | 'ai_score'
  | 'discount'

export interface PaginationState {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// ===========================
// API RESPONSE TYPES
// ===========================

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
  pagination?: PaginationState
}

export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}
