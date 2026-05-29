import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, TrendingDown, Bot, Star, AlertTriangle } from 'lucide-react'
import { products } from '@/data/mockData'
import { useCartStore } from '@/store/cartStore'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RatingStars } from '@/components/ui/Display'
import { formatCurrency, getHealthLabel } from '@/lib/utils'
import toast from 'react-hot-toast'
import React_useState from 'react'

// Mock wishlist (in production this would be from a store/API)
const initialWishlist = products.slice(0, 6)

export const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = React.useState(initialWishlist)
  const { addItem } = useCartStore()

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(p => p.id !== id))
    toast.success('Removed from wishlist')
  }

  const addAllToCart = () => {
    wishlist.forEach(p => addItem(p))
    toast.success(`Added ${wishlist.length} items to cart! 🛒`)
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-100">Wishlist</h1>
          <p className="text-slate-400 mt-1">{wishlist.length} saved items · AI price tracking enabled</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" icon={<Bot className="w-4 h-4" />}>
            AI Optimize
          </Button>
          <Button size="sm" icon={<ShoppingCart className="w-4 h-4" />} onClick={addAllToCart}>
            Add All to Cart
          </Button>
        </div>
      </motion.div>

      {/* Price Drop Alert */}
      <div className="glass-card p-4 mb-5 border-emerald-500/20">
        <div className="flex items-center gap-3">
          <TrendingDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-200">🎉 Price Drop Alert!</p>
            <p className="text-xs text-slate-400"><strong className="text-emerald-400">Organic Avocado Pack</strong> dropped from $7.99 to $5.99 — 25% off!</p>
          </div>
          <Badge variant="emerald" className="ml-auto">-25%</Badge>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-400 mb-2">Your wishlist is empty</h2>
          <p className="text-slate-500 mb-6">Save products you love and get AI price drop alerts</p>
          <Link to="/products"><Button icon={<Star className="w-4 h-4" />}>Explore Products</Button></Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product, i) => {
            const healthLabel = getHealthLabel(product.healthScore)
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    <button onClick={() => removeFromWishlist(product.id)} className="p-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-rose-400 hover:bg-rose-500/20 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {product.isOnSale && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="rose">-{product.discount}%</Badge>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">{product.name}</p>
                      <p className="text-slate-300 text-xs">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold">{formatCurrency(product.price)}</p>
                      {product.isOnSale && (
                        <p className="text-slate-400 text-xs line-through">{formatCurrency(product.originalPrice)}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <RatingStars rating={product.rating} size="sm" showValue />
                    <span className="text-xs font-semibold" style={{ color: healthLabel.color }}>
                      Health: {product.healthScore}/100
                    </span>
                  </div>

                  {product.stockCount < 20 && (
                    <div className="flex items-center gap-1.5 mb-3 text-amber-400 text-xs">
                      <AlertTriangle className="w-3 h-3" />
                      Only {product.stockCount} left in stock!
                    </div>
                  )}

                  <Button
                    fullWidth
                    size="sm"
                    icon={<ShoppingCart className="w-3.5 h-3.5" />}
                    onClick={() => { addItem(product); toast.success('Added to cart!') }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
