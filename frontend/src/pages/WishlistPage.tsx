import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Trash2, ShoppingCart, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'
import { RatingStars } from '@/components/ui/Display'

export const WishlistPage: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()

  const moveToCart = (product: (typeof items)[0]) => {
    addItem(product)
    removeItem(product.id)
    toast.success('Moved to cart! 🛒')
  }

  const moveAllToCart = () => {
    items.forEach(p => addItem(p))
    clearWishlist()
    toast.success(`${items.length} items moved to cart!`)
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader
        title="My Wishlist"
        description={`${items.length} saved ${items.length === 1 ? 'item' : 'items'}`}
        actions={
          items.length > 0 ? (
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={clearWishlist} icon={<Trash2 className="w-4 h-4" />}>
                Clear All
              </Button>
              <Button size="sm" onClick={moveAllToCart} icon={<ShoppingCart className="w-4 h-4" />}>
                Move All to Cart
              </Button>
            </div>
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="Your wishlist is empty"
          description="Save products you love by clicking the heart icon while browsing."
          action={
            <Link to="/products">
              <Button icon={<ExternalLink className="w-4 h-4" />} size="lg">Discover Products</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden group hover:border-violet-500/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {product.isOnSale && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="rose">-{product.discount}% OFF</Badge>
                  </div>
                )}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Heart className="w-4 h-4" fill="currentColor" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-slate-200 hover:text-violet-400 transition-colors text-sm mb-0.5 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-slate-500 mb-2">{product.brand}</p>
                <RatingStars rating={product.rating} size="sm" />

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="font-bold text-emerald-400">{formatCurrency(product.price)}</p>
                    {product.isOnSale && (
                      <p className="text-xs text-slate-500 line-through">{formatCurrency(product.originalPrice)}</p>
                    )}
                  </div>
                  <Button size="sm" icon={<ShoppingCart className="w-3.5 h-3.5" />} onClick={() => moveToCart(product)}>
                    Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
