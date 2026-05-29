import apiClient from '@/lib/apiClient'
import type { Product } from '@/types'

/**
 * Product API service — all product-related HTTP calls
 */
export const productService = {
  /** Get products with filters and pagination */
  getProducts: async (params: {
    category?: string
    search?: string
    sort?: string
    page?: number
    size?: number
    minPrice?: number
    maxPrice?: number
    organic?: boolean
    vegan?: boolean
    onSale?: boolean
    minHealthScore?: number
  } = {}) => {
    const { data } = await apiClient.get('/products', { params })
    return data
  },

  /** Get single product by ID */
  getProduct: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`)
    return data
  },

  /** Scan barcode to get product */
  scanBarcode: async (barcode: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/barcode/${barcode}`)
    return data
  },

  /** Get featured products for dashboard */
  getFeatured: async (limit = 8): Promise<Product[]> => {
    const { data } = await apiClient.get('/products/featured', { params: { limit } })
    return data
  },

  /** Get AI-recommended products */
  getRecommended: async (limit = 10): Promise<Product[]> => {
    const { data } = await apiClient.get('/products/recommended', { params: { limit } })
    return data
  },

  /** Quick search (typeahead) */
  quickSearch: async (q: string, limit = 10): Promise<Product[]> => {
    const { data } = await apiClient.get('/products/search', { params: { q, limit } })
    return data
  },
}

/**
 * Order API service
 */
export const orderService = {
  getOrders: async (page = 0, size = 10) => {
    const { data } = await apiClient.get('/orders', { params: { page, size } })
    return data
  },

  getOrder: async (id: string) => {
    const { data } = await apiClient.get(`/orders/${id}`)
    return data
  },

  placeOrder: async (orderData: unknown) => {
    const { data } = await apiClient.post('/orders', orderData)
    return data
  },

  cancelOrder: async (id: string) => {
    const { data } = await apiClient.post(`/orders/${id}/cancel`)
    return data
  },
}

/**
 * Auth API service
 */
export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password })
    return data
  },

  register: async (name: string, email: string, password: string) => {
    const { data } = await apiClient.post('/auth/register', { name, email, password })
    return data
  },

  getMe: async () => {
    const { data } = await apiClient.get('/auth/me')
    return data
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('sb_token')
    localStorage.removeItem('sb_refresh_token')
  },

  forgotPassword: async (email: string) => {
    await apiClient.post('/auth/forgot-password', null, { params: { email } })
  },
}

/**
 * AI Assistant API service
 */
export const aiService = {
  chat: async (message: string, conversationId?: string) => {
    const { data } = await apiClient.post('/ai/chat', { message, conversationId })
    return data
  },

  getRecommendations: async (limit = 10) => {
    const { data } = await apiClient.get('/ai/recommendations', { params: { limit } })
    return data
  },

  analyzeCart: async (cartItems: unknown[]) => {
    const { data } = await apiClient.post('/ai/analyze-cart', { items: cartItems })
    return data
  },

  getMealPlan: async (days = 7, targetCalories = 2000) => {
    const { data } = await apiClient.get('/ai/meal-plan', { params: { days, targetCalories } })
    return data
  },
}

/**
 * Analytics API service (admin)
 */
export const analyticsService = {
  getDashboard: async () => {
    const { data } = await apiClient.get('/analytics/dashboard')
    return data
  },

  getRevenue: async (period = '30d') => {
    const { data } = await apiClient.get('/analytics/revenue', { params: { period } })
    return data
  },

  getTopProducts: async (limit = 10) => {
    const { data } = await apiClient.get('/analytics/products/top', { params: { limit } })
    return data
  },
}
