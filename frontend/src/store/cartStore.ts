import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getDiscount: () => number
  getTotal: () => number
  getHealthScore: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          const newItem: CartItem = {
            id: `cart-${Date.now()}`,
            product,
            quantity,
            addedAt: new Date().toISOString(),
            savedForLater: false,
            aiSuggested: false,
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
      },

      getDiscount: () => {
        return get().items.reduce((sum, item) => {
          const savings = (item.product.originalPrice - item.product.price) * item.quantity
          return sum + savings
        }, 0)
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const tax = subtotal * 0.08
        const delivery = subtotal >= 35 ? 0 : 4.99
        return subtotal + tax + delivery
      },

      getHealthScore: () => {
        const items = get().items
        if (items.length === 0) return 0
        const avg = items.reduce((sum, item) => sum + item.product.healthScore, 0) / items.length
        return Math.round(avg)
      },
    }),
    { name: 'smartbasket-cart' }
  )
)
