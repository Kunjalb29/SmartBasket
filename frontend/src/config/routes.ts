export const ROUTES = {
  DASHBOARD: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  SCANNER: '/scanner',
  COMPARE: '/compare',
  NUTRITION: '/nutrition',
  ANALYTICS: '/analytics',
  AI_ASSISTANT: '/ai-assistant',
  WISHLIST: '/wishlist',
  SETTINGS: '/settings',
  ADMIN: '/admin'
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
