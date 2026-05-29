import apiClient from './api'
import type { Product, Order, User } from '@/types'

// ============================================
// PRODUCT SERVICES
// ============================================
export const productService = {
  getAll: (params?: { category?: string; page?: number; limit?: number; search?: string; sort?: string }) =>
    apiClient.get<{ content: Product[]; totalElements: number; totalPages: number }>('/products', { params }),

  getById: (id: string) =>
    apiClient.get<Product>(`/products/${id}`),

  search: (query: string) =>
    apiClient.get<Product[]>('/products/search', { params: { q: query } }),

  getByCategory: (categorySlug: string) =>
    apiClient.get<Product[]>(`/products/category/${categorySlug}`),

  getFeatured: () =>
    apiClient.get<Product[]>('/products/featured'),

  getOnSale: () =>
    apiClient.get<Product[]>('/products/on-sale'),

  getByBarcode: (barcode: string) =>
    apiClient.get<Product>(`/products/barcode/${barcode}`),

  getRecommendations: (userId: string) =>
    apiClient.get<Product[]>(`/products/recommendations/${userId}`),
}

// ============================================
// ORDER SERVICES
// ============================================
export const orderService = {
  getAll: (userId: string) =>
    apiClient.get<Order[]>(`/orders/user/${userId}`),

  getById: (orderId: string) =>
    apiClient.get<Order>(`/orders/${orderId}`),

  create: (orderData: Partial<Order>) =>
    apiClient.post<Order>('/orders', orderData),

  cancel: (orderId: string) =>
    apiClient.patch<Order>(`/orders/${orderId}/cancel`),

  track: (orderId: string) =>
    apiClient.get<{ status: string; location: string; eta: string }>(`/orders/${orderId}/track`),
}

// ============================================
// USER SERVICES
// ============================================
export const userService = {
  getProfile: (userId: string) =>
    apiClient.get<User>(`/users/${userId}`),

  updateProfile: (userId: string, updates: Partial<User>) =>
    apiClient.put<User>(`/users/${userId}`, updates),

  updatePreferences: (userId: string, preferences: Partial<User['preferences']>) =>
    apiClient.patch<User>(`/users/${userId}/preferences`, preferences),
}

// ============================================
// AI SERVICES
// ============================================
export const aiService = {
  chat: (message: string, context?: object) =>
    apiClient.post<{ response: string; suggestions?: string[] }>('/ai/chat', { message, context }),

  analyzeCart: (productIds: string[]) =>
    apiClient.post<{ healthScore: number; insights: string[]; suggestions: string[] }>('/ai/analyze-cart', { productIds }),

  getNutritionInsights: (userId: string) =>
    apiClient.get<{ summary: string; tips: string[]; goals: object }>(`/ai/nutrition/${userId}`),

  scanProduct: (imageBase64: string) =>
    apiClient.post<{ barcode: string; product: Product | null }>('/ai/scan', { image: imageBase64 }),
}

// ============================================
// ANALYTICS SERVICES
// ============================================
export const analyticsService = {
  getRevenue: (period: string) =>
    apiClient.get<Array<{ date: string; value: number }>>('/analytics/revenue', { params: { period } }),

  getOrders: (period: string) =>
    apiClient.get<Array<{ date: string; value: number }>>('/analytics/orders', { params: { period } }),

  getUserGrowth: () =>
    apiClient.get<Array<{ date: string; value: number }>>('/analytics/user-growth'),

  getTopProducts: (limit = 10) =>
    apiClient.get<Array<{ productId: string; name: string; revenue: number }>>('/analytics/top-products', { params: { limit } }),
}
