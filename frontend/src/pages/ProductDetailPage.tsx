import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Shield, Truck, RotateCcw, Bot, Plus, Minus } from 'lucide-react'
import { products } from '@/data/mockData'
import { useCartStore } from '@/store/cartStore'
import { Badge, DiscountBadge, AIScoreBadge } from '@/components/ui/Badge'
import { RatingStars, ProgressBar } from '@/components/ui/Display'
import { Button } from '@/components/ui/Button'
import { formatCurrency, calculateHealthScore, getHealthLabel } from '@/lib/utils'
import toast from 'react-hot-toast'

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === id) ?? products[0]
  const { addItem } = useCartStore()
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'reviews'>('overview')

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const healthLabel = getHealthLabel(product.healthScore)

  const nutritionItems = [
    { label: 'Calories', value: product.nutrition.calories, unit: 'kcal', max: 500, color: 'violet' as const },
    { label: 'Protein', value: product.nutrition.protein, unit: 'g', max: 50, color: 'cyan' as const },
    { label: 'Total Fat', value: product.nutrition.totalFat, unit: 'g', max: 70, color: 'amber' as const },
    { label: 'Carbs', value: product.nutrition.totalCarbs, unit: 'g', max: 300, color: 'emerald' as const },
    { label: 'Fiber', value: product.nutrition.dietaryFiber, unit: 'g', max: 30, color: 'emerald' as const },
    { label: 'Sugar', value: product.nutrition.totalSugars, unit: 'g', max: 50, color: 'rose' as const },
    { label: 'Sodium', value: product.nutrition.sodium, unit: 'mg', max: 2300, color: 'amber' as const },
  ]

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <Link to="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600/10 to-cyan-600/10 h-80 mb-3 border border-white/[0.06]">
            <img src={product.images[activeImage] ?? product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
            {product.isOnSale && <DiscountBadge discount={product.discount} className="absolute top-4 left-4 text-sm px-3 py-1" />}
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-violet-500' : 'border-transparent hover:border-violet-500/40'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="slate">{product.category}</Badge>
              {product.isOrganic && <Badge variant="emerald">🌱 Organic</Badge>}
              <AIScoreBadge score={product.aiScore} />
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-100 mb-1">{product.name}</h1>
            <p className="text-slate-400 text-sm">{product.brand} · {product.weight}</p>
          </div>

          <div className="flex items-center gap-3">
            <RatingStars rating={product.rating} size="md" showValue showCount reviewCount={product.reviewCount} />
          </div>

          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold text-slate-100">{formatCurrency(product.price)}</p>
            {product.originalPrice > product.price && (
              <>
                <p className="text-slate-500 line-through text-lg">{formatCurrency(product.originalPrice)}</p>
                <Badge variant="rose">Save {formatCurrency(product.originalPrice - product.price)}</Badge>
              </>
            )}
          </div>

          {/* Health Score */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-200">Health Score</span>
              <span className="font-bold text-lg" style={{ color: healthLabel.color }}>{product.healthScore}/100</span>
            </div>
            <ProgressBar value={product.healthScore} color={product.healthScore >= 80 ? 'emerald' : product.healthScore >= 60 ? 'cyan' : 'amber'} size="md" />
            <p className="text-xs text-slate-400 mt-1.5">
              🤖 AI Analysis: <span style={{ color: healthLabel.color }}>{healthLabel.label}</span> — {product.healthScore >= 80 ? 'Highly recommended for your health goals!' : 'Good option, consider moderation.'}
            </p>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map(tag => (
              <span key={tag} className="tag-pill active">{tag}</span>
            ))}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-slate-200">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              className="flex-1"
              icon={<ShoppingCart className="w-4 h-4" />}
              onClick={() => { addItem(product, qty); toast.success(`${qty}x ${product.name} added! 🛒`) }}
            >
              Add to Cart · {formatCurrency(product.price * qty)}
            </Button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`p-3 rounded-xl border transition-all ${wishlist ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-rose-400'}`}
            >
              <Heart className={`w-5 h-5 ${wishlist ? 'fill-rose-400' : ''}`} />
            </button>
            <button className="p-3 rounded-xl border bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'On orders $35+' },
              { icon: RotateCcw, label: 'Easy Returns', sub: '30-day policy' },
              { icon: Shield, label: 'Quality Assured', sub: 'AI verified' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <Icon className="w-4 h-4 text-violet-400 mx-auto mb-1" />
                <p className="text-xs font-medium text-slate-200">{label}</p>
                <p className="text-[10px] text-slate-500">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05] w-fit mb-6">
        {(['overview', 'nutrition', 'reviews'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
            {tab === 'nutrition' ? '🥗 Nutrition Facts' : tab === 'reviews' ? '⭐ Reviews' : '📋 Overview'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'nutrition' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 max-w-2xl">
          <h3 className="font-bold text-slate-200 font-display mb-1">Nutrition Facts</h3>
          <p className="text-xs text-slate-500 mb-5">Serving size: {product.nutrition.servingSize}</p>
          <div className="space-y-3">
            {nutritionItems.map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="text-sm text-slate-400 w-20 flex-shrink-0">{item.label}</span>
                <div className="flex-1">
                  <ProgressBar value={(item.value / item.max) * 100} color={item.color} size="sm" />
                </div>
                <span className="text-sm font-semibold text-slate-200 w-20 text-right">{item.value}{item.unit}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-violet-500/[0.08] border border-violet-500/20">
            <p className="text-xs text-violet-400">
              🤖 <strong>AI Insight:</strong> {product.nutrition.protein > 15 ? 'High protein content — great for muscle recovery.' : ''} {product.nutrition.dietaryFiber > 5 ? 'Excellent fiber source for digestive health.' : ''} {product.nutrition.totalSugars < 5 ? 'Low sugar — ideal for blood sugar management.' : ''}
            </p>
          </div>
        </motion.div>
      )}

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 max-w-2xl">
          <h3 className="font-bold text-slate-200 font-display mb-4">Product Overview</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{product.description}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Brand', value: product.brand },
              { label: 'Category', value: product.category },
              { label: 'Weight', value: product.weight },
              { label: 'Unit', value: product.unit },
              { label: 'Stock', value: product.inStock ? `${product.stockCount} left` : 'Out of stock' },
              { label: 'Barcode', value: product.barcode },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-xs text-slate-500">{label}</span>
                <span className="text-xs font-medium text-slate-300">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'reviews' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-2xl">
          {[
            { name: 'Sarah M.', rating: 5, date: '2 days ago', text: 'Absolutely love this product! The quality is outstanding and it arrived fresh.', verified: true },
            { name: 'John K.', rating: 4, date: '1 week ago', text: 'Great product, exactly as described. Will definitely reorder next week.', verified: true },
            { name: 'Priya L.', rating: 5, date: '2 weeks ago', text: 'SmartBasket AI recommended this and it was spot on! Perfect for my health goals.', verified: false },
          ].map((review, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{review.name}</p>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={review.rating} size="sm" />
                      {review.verified && <Badge variant="emerald" size="sm">Verified</Badge>}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{review.date}</span>
              </div>
              <p className="text-sm text-slate-300">{review.text}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold font-display text-slate-200 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="glass-card hover:border-violet-500/30 transition-all group">
                <div className="h-32 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 overflow-hidden">
                  <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-200 truncate">{p.name}</p>
                  <p className="text-sm font-bold text-emerald-400 mt-1">{formatCurrency(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
