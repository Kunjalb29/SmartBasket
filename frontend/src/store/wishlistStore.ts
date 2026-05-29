import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  getCount: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().items.find(i => i.id === product.id)) return
        set(state => ({ items: [...state.items, product] }))
      },

      removeItem: (productId) =>
        set(state => ({ items: state.items.filter(i => i.id !== productId) })),

      isInWishlist: (productId) => !!get().items.find(i => i.id === productId),

      clearWishlist: () => set({ items: [] }),

      getCount: () => get().items.length,
    }),
    { name: 'smartbasket-wishlist' }
  )
)
