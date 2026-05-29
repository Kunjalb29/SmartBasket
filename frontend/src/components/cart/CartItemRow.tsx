import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
}

export const CartItemRow: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore()
  const { product, quantity } = item

  const totalPrice = product.price * quantity
  const savings = (product.originalPrice - product.price) * quantity

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, height: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start gap-4 p-4 glass-card"
      >
        {/* Product Image */}
        <Link to={`/products/${product.id}`} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
          {product.isOnSale && (
            <div className="absolute top-1 left-1">
              <Badge variant="rose" size="sm">-{product.discount}%</Badge>
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/products/${product.id}`}>
            <h4 className="font-semibold text-slate-200 hover:text-violet-400 transition-colors text-sm leading-tight mb-0.5">
              {product.name}
            </h4>
          </Link>
          <p className="text-xs text-slate-500 mb-2">{product.brand} · Health: {product.healthScore}/100</p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a78bfa' }}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-bold text-slate-200 min-w-[1.5rem] text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a78bfa' }}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Price & Remove */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <p className="text-base font-bold text-emerald-400">{formatCurrency(totalPrice)}</p>
          {savings > 0 && (
            <p className="text-xs text-slate-500 line-through">{formatCurrency(product.originalPrice * quantity)}</p>
          )}
          {savings > 0 && (
            <p className="text-xs text-emerald-400 font-semibold">-{formatCurrency(savings)}</p>
          )}
          <button
            onClick={() => removeItem(product.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
