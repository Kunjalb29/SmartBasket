import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, X, ShoppingCart } from 'lucide-react'
import { CartItemRow } from '@/components/cart/CartItemRow'
import { CartSummary } from '@/components/cart/CartSummary'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { useCart } from '@/hooks/useCart'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export const CartPage: React.FC = () => {
  const { items, clearCart, isEmpty, healthScore, itemCount } = useCart()

  const handleCheckout = () => {
    toast.success('Redirecting to checkout...', { icon: '🛒' })
    // TODO: Integrate Stripe
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-100">Your Cart</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} · Cart Health Score: {healthScore}/100
            </p>
          </div>
          {!isEmpty && (
            <button onClick={clearCart} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-rose-400 transition-colors">
              <X className="w-4 h-4" /> Clear Cart
            </button>
          )}
        </div>
      </motion.div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            description="Add some healthy products to get started. Our AI assistant can help you find the best options!"
            action={
              <Link to="/products">
                <Button icon={<ShoppingCart className="w-4 h-4" />} size="lg">Browse Products</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {/* Health Alert */}
            {healthScore < 60 && (
              <Alert variant="warning" title="Low Health Score">
                Your cart has a health score of {healthScore}/100. Consider adding more fruits and vegetables! 🥗
              </Alert>
            )}
            {healthScore >= 80 && (
              <Alert variant="success" title="Excellent Choices!">
                Your cart has a health score of {healthScore}/100. Great job picking nutritious foods! 🌿
              </Alert>
            )}

            {items.map(item => (
              <CartItemRow key={item.id} item={item} />
            ))}

            {/* AI Suggestions */}
            <div className="glass-card p-4 border-violet-500/20">
              <p className="text-xs font-semibold text-violet-400 mb-2">🤖 AI Recommendations</p>
              <p className="text-sm text-slate-400">
                Based on your cart, you might also like: <span className="text-violet-400 cursor-pointer hover:underline">Organic Avocados</span>, <span className="text-violet-400 cursor-pointer hover:underline">Greek Yogurt</span>, and <span className="text-violet-400 cursor-pointer hover:underline">Chia Seeds</span>.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>
      )}
    </div>
  )
}
