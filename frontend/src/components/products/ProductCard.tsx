import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Zap, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RatingStars, ProgressBar } from '@/components/ui/Display'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatCurrency, getHealthLabel, truncate } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  index?: number
  view?: 'grid' | 'list'
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, view = 'grid' }) => {
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)
  const healthLabel = getHealthLabel(product.healthScore)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist ❤️')
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success('Added to cart! 🛒')
  }

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-4">
          <Link to={`/products/${product.id}`} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
            {product.isOnSale && (
              <div className="absolute top-1 left-1">
                <Badge variant="rose" size="sm">-{product.discount}%</Badge>
              </div>
            )}
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/products/${product.id}`}>
              <p className="font-semibold text-slate-200 hover:text-violet-400 transition-colors">{product.name}</p>
            </Link>
            <p className="text-xs text-slate-500 mb-1">{product.brand} · {product.category}</p>
            <RatingStars rating={product.rating} size="sm" />
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs" style={{ color: healthLabel.color }}>Health: {product.healthScore}/100</span>
              <ProgressBar value={product.healthScore} size="sm" color={product.healthScore >= 80 ? 'emerald' : product.healthScore >= 60 ? 'cyan' : 'amber'} />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-lg font-bold text-emerald-400">{formatCurrency(product.price)}</p>
            {product.isOnSale && <p className="text-xs text-slate-500 line-through">{formatCurrency(product.originalPrice)}</p>}
            <div className="flex gap-2">
              <button onClick={handleWishlist} className={`p-2 rounded-lg transition-colors ${inWishlist ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'}`}>
                <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <Button size="sm" icon={<ShoppingCart className="w-3.5 h-3.5" />} onClick={handleAddToCart}>Add</Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden group hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isOnSale && <Badge variant="rose">-{product.discount}% OFF</Badge>}
          {product.isOrganic && <Badge variant="emerald" size="sm">Organic</Badge>}
        </div>

        {/* Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleWishlist} className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${inWishlist ? 'text-rose-400 bg-rose-500/20' : 'text-white bg-black/40 hover:text-rose-400 hover:bg-rose-500/20'}`}>
            <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <Link to={`/products/${product.id}`} className="p-1.5 rounded-lg backdrop-blur-sm text-white bg-black/40 hover:text-violet-400 hover:bg-violet-500/20 transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* AI Score */}
        {product.aiScore >= 90 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-bold text-amber-400">{product.aiScore}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-slate-200 hover:text-violet-400 transition-colors text-sm mb-0.5">
            {truncate(product.name, 40)}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mb-2">{product.brand}</p>

        <div className="flex items-center justify-between mb-2">
          <RatingStars rating={product.rating} size="sm" />
          <span className="text-xs font-semibold" style={{ color: healthLabel.color }}>
            {product.healthScore}/100
          </span>
        </div>

        <ProgressBar value={product.healthScore} size="sm" color={product.healthScore >= 80 ? 'emerald' : product.healthScore >= 60 ? 'cyan' : 'amber'} className="mb-3" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-emerald-400">{formatCurrency(product.price)}</p>
            {product.isOnSale && <p className="text-xs text-slate-500 line-through">{formatCurrency(product.originalPrice)}</p>}
          </div>
          <Button size="sm" icon={<ShoppingCart className="w-3.5 h-3.5" />} onClick={handleAddToCart}>Add</Button>
        </div>
      </div>
    </motion.div>
  )
}
