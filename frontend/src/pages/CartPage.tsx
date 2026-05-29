import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Trash2, Bot, Zap, Tag, Truck, ChevronRight, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { aiRecommendations } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/Display'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal, getDiscount, getTotal, getHealthScore, getTotalItems } = useCartStore()
  const subtotal = getSubtotal()
  const discount = getDiscount()
  const tax = subtotal * 0.08
  const deliveryFee = subtotal >= 35 ? 0 : 4.99
  const total = getTotal()
  const healthScore = getHealthScore()
  const cartCount = getTotalItems()

  if (items.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold font-display text-slate-100 mb-8">Smart Cart</h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
          <div className="w-24 h-24 rounded-3xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-violet-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-200 mb-2">Your cart is empty</h2>
          <p className="text-slate-400 mb-6">Add some AI-recommended products to get started</p>
          <Link to="/products"><Button icon={<Package className="w-4 h-4" />}>Browse Products</Button></Link>
        </motion.div>

        {/* AI Recommendations when cart empty */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">🤖 AI Picks for You</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {aiRecommendations.slice(0, 4).map(rec => (
              <div key={rec.id} className="glass-card p-4 flex items-center gap-3">
                <img src={rec.product.thumbnail} alt={rec.product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">{rec.product.name}</p>
                  <p className="text-xs text-slate-500 truncate">{rec.reason}</p>
                  <p className="text-sm text-emerald-400 font-bold mt-0.5">{formatCurrency(rec.product.price)}</p>
                </div>
                <Button size="xs" onClick={() => { useCartStore.getState().addItem(rec.product); toast.success('Added!') }}>Add</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-100">Smart Cart</h1>
          <p className="text-slate-400 text-sm mt-0.5">{cartCount} items · AI cart health score: <span className="text-emerald-400 font-semibold">{healthScore}/100</span></p>
        </div>
        <Button variant="danger" size="sm" icon={<Trash2 className="w-4 h-4" />} onClick={() => { clearCart(); toast.success('Cart cleared') }}>
          Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {/* AI Cart Health Banner */}
          <div className="glass-card p-4 border-emerald-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-slate-200">AI Cart Analysis</span>
              <Badge variant="emerald">Score: {healthScore}/100</Badge>
            </div>
            <ProgressBar value={healthScore} color="emerald" size="md" />
            <p className="text-xs text-slate-400 mt-2">
              {healthScore >= 80 ? '✅ Excellent cart! Your selections align well with your health goals.' : healthScore >= 60 ? '⚡ Good cart. Consider adding more vegetables for a better health score.' : '⚠️ Try adding more whole foods to improve your cart health score.'}
            </p>
          </div>

          {/* Items */}
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                layout
                className="glass-card p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-violet-600/10 to-cyan-600/10 flex-shrink-0">
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-slate-200 truncate">{item.product.name}</h3>
                      {item.product.isOnSale && <Badge variant="rose" size="sm">-{item.product.discount}%</Badge>}
                    </div>
                    <p className="text-xs text-slate-500">{item.product.brand} · Health: {item.product.healthScore}/100</p>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">{formatCurrency(item.product.price)} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-sm text-slate-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-right min-w-16">
                      <p className="text-sm font-bold text-slate-100">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                    <button onClick={() => { removeItem(item.product.id); toast.success('Removed from cart') }} className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* AI Suggestions */}
          <div className="glass-card p-4 border-violet-500/20">
            <p className="text-xs text-violet-400 font-semibold mb-3">🤖 AI suggests adding to complete your basket:</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {aiRecommendations.filter(r => !items.find(i => i.product.id === r.productId)).slice(0, 3).map(rec => (
                <div key={rec.id} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-violet-500/30 transition-all cursor-pointer" onClick={() => { useCartStore.getState().addItem(rec.product); toast.success('Added!') }}>
                  <img src={rec.product.thumbnail} alt={rec.product.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-medium text-slate-200 whitespace-nowrap">{rec.product.name.slice(0, 20)}...</p>
                    <p className="text-xs text-emerald-400">{formatCurrency(rec.product.price)}</p>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-violet-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="glass-card p-5 sticky top-20">
            <h3 className="font-semibold text-slate-200 font-display mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              {[
                { label: `Subtotal (${cartCount} items)`, value: formatCurrency(subtotal) },
                { label: 'Discount', value: discount > 0 ? `-${formatCurrency(discount)}` : '$0.00', color: 'text-emerald-400' },
                { label: 'Tax (8%)', value: formatCurrency(tax) },
                { label: 'Delivery', value: deliveryFee === 0 ? 'FREE 🎉' : formatCurrency(deliveryFee), color: deliveryFee === 0 ? 'text-emerald-400' : undefined },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-slate-400">{label}</span>
                  <span className={color ?? 'text-slate-200'}>{value}</span>
                </div>
              ))}
            </div>

            {deliveryFee > 0 && (
              <div className="mb-4 p-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/20">
                <p className="text-xs text-amber-400">
                  🛒 Add {formatCurrency(35 - subtotal)} more for <strong>FREE delivery!</strong>
                </p>
                <ProgressBar value={(subtotal / 35) * 100} color="amber" size="sm" className="mt-1.5" />
              </div>
            )}

            <div className="section-divider my-4" />

            <div className="flex justify-between mb-5">
              <span className="font-bold text-slate-200">Total</span>
              <span className="text-xl font-bold text-slate-100">{formatCurrency(total)}</span>
            </div>

            {discount > 0 && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20">
                <p className="text-xs text-emerald-400">💰 You're saving <strong>{formatCurrency(discount)}</strong> on this order!</p>
              </div>
            )}

            {/* Promo Code */}
            <div className="flex gap-2 mb-4">
              <input placeholder="Promo code" className="input-glass flex-1 py-2 text-sm" />
              <Button variant="secondary" size="sm">Apply</Button>
            </div>

            <Button fullWidth size="lg" icon={<Zap className="w-5 h-5" />} onClick={() => toast.success('Checkout coming soon! 🚀')}>
              Proceed to Checkout
            </Button>

            <div className="flex items-center justify-center gap-4 mt-4">
              {['💳 Visa', '💳 Mastercard', '📱 Apple Pay', '🤖 GPay'].map(m => (
                <span key={m} className="text-[10px] text-slate-500">{m}</span>
              ))}
            </div>
          </div>

          {/* AI Cart Optimization */}
          <div className="glass-card p-4 border-violet-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-slate-200">AI Optimization</span>
            </div>
            <div className="space-y-2">
              {discount > 0 && (
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Tag className="w-3.5 h-3.5" />
                  AI found {formatCurrency(discount)} in savings!
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Truck className="w-3.5 h-3.5" />
                {deliveryFee === 0 ? 'Free delivery unlocked!' : `$${(35 - subtotal).toFixed(2)} away from free delivery`}
              </div>
              <div className="flex items-center gap-2 text-xs text-violet-400">
                <Zap className="w-3.5 h-3.5" />
                Cart health score: {healthScore}/100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
