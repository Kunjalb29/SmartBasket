import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scale, Plus, X, ShoppingCart, Zap, Check, Minus } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar, RatingStars } from '@/components/ui/Display'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCartStore } from '@/store/cartStore'
import { products } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export const ComparisonPage: React.FC = () => {
  const [selected, setSelected] = React.useState(products.slice(0, 2))
  const { addItem } = useCartStore()

  const addProduct = (product: (typeof products)[0]) => {
    if (selected.length >= 4) { toast.error('Max 4 products can be compared'); return }
    if (selected.find(p => p.id === product.id)) { toast.error('Already in comparison'); return }
    setSelected(prev => [...prev, product])
  }

  const removeProduct = (id: string) => setSelected(prev => prev.filter(p => p.id !== id))

  const ATTRIBUTES = [
    { label: 'Price', render: (p: typeof products[0]) => <span className="font-bold text-emerald-400">{formatCurrency(p.price)}</span>, key: 'price' },
    { label: 'Health Score', render: (p: typeof products[0]) => <span className="font-bold text-violet-400">{p.healthScore}/100</span>, key: 'healthScore' },
    { label: 'AI Score', render: (p: typeof products[0]) => <span className="font-bold text-amber-400">⚡ {p.aiScore}</span>, key: 'aiScore' },
    { label: 'Rating', render: (p: typeof products[0]) => <RatingStars rating={p.rating} showValue size="sm" />, key: 'rating' },
    { label: 'Calories', render: (p: typeof products[0]) => `${p.nutrition.calories} kcal`, key: 'calories' },
    { label: 'Protein', render: (p: typeof products[0]) => `${p.nutrition.protein}g`, key: 'protein' },
    { label: 'Carbs', render: (p: typeof products[0]) => `${p.nutrition.totalCarbs}g`, key: 'carbs' },
    { label: 'Fat', render: (p: typeof products[0]) => `${p.nutrition.totalFat}g`, key: 'fat' },
    { label: 'Organic', render: (p: typeof products[0]) => p.isOrganic ? <Check className="w-4 h-4 text-emerald-400" /> : <Minus className="w-4 h-4 text-slate-600" />, key: 'organic' },
    { label: 'Vegan', render: (p: typeof products[0]) => p.tags.includes('vegan') ? <Check className="w-4 h-4 text-emerald-400" /> : <Minus className="w-4 h-4 text-slate-600" />, key: 'vegan' },
  ]

  const getBest = (key: string) => {
    if (!selected.length) return null
    const vals = selected.map(p => {
      if (key === 'price') return p.price
      if (key === 'healthScore') return p.healthScore
      if (key === 'aiScore') return p.aiScore
      if (key === 'rating') return p.rating
      if (key === 'calories') return p.nutrition.calories
      if (key === 'protein') return p.nutrition.protein
      if (key === 'carbs') return p.nutrition.totalCarbs
      if (key === 'fat') return p.nutrition.totalFat
      return 0
    })
    const best = key === 'price' || key === 'calories' || key === 'fat'
      ? Math.min(...vals as number[])
      : Math.max(...vals as number[])
    const idx = (vals as number[]).indexOf(best)
    return selected[idx]?.id
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Product Comparison"
        description="Compare up to 4 products side by side with AI-powered insights"
      />

      {selected.length === 0 ? (
        <EmptyState
          icon="⚖️"
          title="No products to compare"
          description="Add products from the product listing page to compare them here."
          action={<Link to="/products"><Button icon={<Plus className="w-4 h-4" />}>Browse Products</Button></Link>}
        />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Product Headers */}
            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
              <div className="flex items-end pb-4">
                <span className="text-sm font-semibold text-slate-400">Attribute</span>
              </div>
              {selected.map(product => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 relative">
                  <button onClick={() => removeProduct(product.id)} className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <img src={product.thumbnail} alt={product.name} className="w-full h-28 object-cover rounded-xl mb-3" />
                  <Link to={`/products/${product.id}`}>
                    <p className="font-semibold text-slate-200 text-sm hover:text-violet-400 transition-colors line-clamp-2 mb-1">{product.name}</p>
                  </Link>
                  <p className="text-xs text-slate-500 mb-3">{product.brand}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.isOrganic && <Badge variant="emerald" size="sm">Organic</Badge>}
                    {product.tags.includes('vegan') && <Badge variant="cyan" size="sm">Vegan</Badge>}
                    {product.isOnSale && <Badge variant="rose" size="sm">Sale</Badge>}
                  </div>
                  <Button size="sm" fullWidth icon={<ShoppingCart className="w-3.5 h-3.5" />} onClick={() => { addItem(product); toast.success('Added!') }}>
                    Add to Cart
                  </Button>
                </motion.div>
              ))}
              {selected.length < 4 && (
                <div className="glass-card p-4 border-dashed border-slate-700 flex flex-col items-center justify-center gap-2 min-h-[200px]">
                  <Plus className="w-8 h-8 text-slate-600" />
                  <p className="text-xs text-slate-500 text-center">Add product to compare</p>
                  <Link to="/products">
                    <Button size="sm" variant="secondary">Browse</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Comparison Rows */}
            <div className="space-y-1">
              {ATTRIBUTES.map(attr => {
                const bestId = getBest(attr.key)
                return (
                  <div key={attr.label} className="grid items-center gap-4 py-3 border-b border-white/[0.04]" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{attr.label}</span>
                    {selected.map(product => (
                      <div
                        key={product.id}
                        className={`text-sm text-slate-200 flex items-center justify-center p-2 rounded-lg transition-colors ${bestId === product.id ? 'bg-violet-500/10 ring-1 ring-violet-500/20' : ''}`}
                      >
                        {attr.render(product)}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

            {/* AI Winner Badge */}
            <div className="mt-6 glass-card p-4 border-violet-500/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-violet-300 mb-1">🤖 AI Recommendation</p>
                  <p className="text-sm text-slate-400">
                    Based on the comparison, <strong className="text-slate-200">{selected.sort((a, b) => (b.aiScore - a.aiScore))[0]?.name}</strong> offers the best overall value with the highest AI score, considering price, nutrition, and health benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
