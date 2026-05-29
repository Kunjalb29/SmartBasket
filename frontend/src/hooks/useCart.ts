import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

/**
 * Convenience hook wrapping the cart store with derived values.
 */
export function useCart() {
  const store = useCartStore()

  const isEmpty = store.items.length === 0
  const subtotal = store.getSubtotal()
  const discount = store.getDiscount()
  const total = store.getTotal()
  const itemCount = store.getTotalItems()
  const healthScore = store.getHealthScore()

  const isInCart = (productId: string) =>
    store.items.some(i => i.product.id === productId)

  const getItemQuantity = (productId: string) =>
    store.items.find(i => i.product.id === productId)?.quantity ?? 0

  const addOrIncrement = (product: Product) => {
    if (isInCart(product.id)) {
      const qty = getItemQuantity(product.id)
      store.updateQuantity(product.id, qty + 1)
    } else {
      store.addItem(product)
    }
  }

  return {
    ...store,
    isEmpty,
    subtotal,
    discount,
    total,
    itemCount,
    healthScore,
    isInCart,
    getItemQuantity,
    addOrIncrement,
  }
}
