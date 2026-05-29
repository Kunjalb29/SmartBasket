import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Plus, X, Bot, CheckCircle, XCircle, ShoppingCart } from 'lucide-react'
import { products } from '@/data/mockData'
import { useCartStore } from '@/store/cartStore'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/Display'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

const MAX_COMPARE = 3

const COMPARE_FIELDS: Array<{ key: string; label: string; format?: (v: unknown) => string; higher?: 'better' | 'worse' }> = [
  { key: 'price', label: 'Price', format: (v) => formatCurrency(v as number), higher: 'worse' },
  { key: 'healthScore', label: 'Health Score', format: (v) => `${v}/100`, higher: 'better' },
  { key: 'rating', label: 'Rating', format: (v) => `${v}★`, higher: 'better' },
  { key: 'reviewCount', label: 'Reviews', format: (v) => `${(v as number).toLocaleString()}`, higher: 'better' },
  { key: 'nutrition.calories', label: 'Calories', format: (v) => `${v} kcal`, higher: 'worse' },
  { key: 'nutrition.protein', label: 'Protein', format: (v) => `${v}g`, higher: 'better' },
  { key: 'nutrition.dietaryFiber', label: 'Fiber', format: (v) => `${v}g`, higher: 'better' },
  { key: 'nutrition.totalFat', label: 'Total Fat', format: (v) => `${v}g`, higher: 'worse' },
  { key: 'nutrition.totalSugars', label: 'Sugar', format: (v) => `${v}g`, higher: 'worse' },
  { key: 'nutrition.sodium', label: 'Sodium', format: (v) => `${v}mg`, higher: 'worse' },
]

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return undefined
  }, obj)
}

export const ComparisonPage: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState(products.slice(0, 2))
  const [showProductPicker, setShowProductPicker] = useState(false)
  const [search, setSearch] = useState('')
  const { addItem } = useCartStore()

  const addProduct = (p: typeof products[0]) => {
    if (selectedProducts.find(sp => sp.id === p.id)) return
    if (selectedProducts.length >= MAX_COMPARE) {
      toast.error(`Max ${MAX_COMPARE} products for comparison`)
      return
    }
    setSelectedProducts(prev => [...prev, p])
    setShowProductPicker(false)
    setSearch('')
  }

  const removeProduct = (id: string) => setSelectedProducts(prev => prev.filter(p => p.id !== id))

  const getBest = (field: typeof COMPARE_FIELDS[0]) => {
    const values = selectedProducts.map(p => Number(getNestedValue(p as unknown as Record<string, unknown>, field.key)) || 0)
    return field.higher === 'better' ? Math.max(...values) : Math.min(...values)
  }

  const filtered = products.filter(p => !selectedProducts.find(sp => sp.id === p.id) && p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-100">Product Comparison</h1>
        <p className="text-slate-400 mt-1">Compare up to {MAX_COMPARE} products side by side with AI analysis</p>
      </motion.div>

      {/* AI Recommendation Banner */}
      <div className="glass-card p-4 mb-6 border-violet-500/20">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-violet-400 flex-shrink-0" />
          <p className="text-sm text-slate-300">
            <span className="text-violet-400 font-semibold">AI Analysis:</span>{' '}
            Based on health scores and value, <strong className="text-white">{selectedProducts.sort((a, b) => b.healthScore - a.healthScore)[0]?.name}</strong> offers the best combination of nutrition and price.
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Product Headers */}
          <thead>
            <tr>
              <td className="w-40 p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</td>
              {selectedProducts.map(p => (
                <td key={p.id} className="p-3">
                  <div className="glass-card p-4 text-center relative">
                    <button onClick={() => removeProduct(p.id)} className="absolute top-2 right-2 p-1 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img src={p.thumbnail} alt={p.name} className="w-16 h-16 object-cover rounded-xl mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-200 mb-1 leading-tight">{p.name}</p>
                    <p className="text-xs text-slate-500 mb-2">{p.brand}</p>
                    <p className="text-lg font-bold text-emerald-400">{formatCurrency(p.price)}</p>
                    {p.isOnSale && <Badge variant="rose" size="sm">-{p.discount}% OFF</Badge>}
                    <Button
                      fullWidth
                      size="xs"
                      className="mt-3"
                      icon={<ShoppingCart className="w-3 h-3" />}
                      onClick={() => { addItem(p); toast.success('Added!') }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </td>
              ))}
              {/* Add Product Column */}
              {selectedProducts.length < MAX_COMPARE && (
                <td className="p-3">
                  <div className="glass-card p-4 text-center border-dashed border-white/20 hover:border-violet-500/40 transition-all cursor-pointer" onClick={() => setShowProductPicker(true)}>
                    <div className="w-16 h-16 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-3">
                      <Plus className="w-6 h-6 text-violet-400" />
                    </div>
                    <p className="text-sm text-violet-400 font-medium">Add Product</p>
                    <p className="text-xs text-slate-500 mt-1">Compare up to {MAX_COMPARE}</p>
                  </div>
                </td>
              )}
            </tr>
          </thead>

          {/* Comparison Rows */}
          <tbody>
            {COMPARE_FIELDS.map((field, rowIdx) => {
              const best = getBest(field)
              return (
                <tr key={field.key} className={rowIdx % 2 === 0 ? 'bg-white/[0.01]' : ''}>
                  <td className="p-3 text-xs font-semibold text-slate-400">{field.label}</td>
                  {selectedProducts.map(p => {
                    const val = Number(getNestedValue(p as unknown as Record<string, unknown>, field.key)) || 0
                    const isBest = val === best
                    return (
                      <td key={p.id} className="p-3 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold ${isBest ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'text-slate-300'}`}>
                          {isBest ? <CheckCircle className="w-3.5 h-3.5" /> : null}
                          {field.format ? field.format(val) : String(val)}
                        </div>
                      </td>
                    )
                  })}
                  {selectedProducts.length < MAX_COMPARE && <td />}
                </tr>
              )
            })}
            {/* Health Score Visual */}
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-xs font-semibold text-slate-400">Health Bar</td>
              {selectedProducts.map(p => (
                <td key={p.id} className="p-3">
                  <ProgressBar value={p.healthScore} color={p.healthScore >= 80 ? 'emerald' : p.healthScore >= 60 ? 'cyan' : 'amber'} size="md" />
                </td>
              ))}
              {selectedProducts.length < MAX_COMPARE && <td />}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Product Picker Modal */}
      {showProductPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 max-w-md w-full max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-200 font-display">Add Product to Compare</h3>
              <button onClick={() => setShowProductPicker(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-glass mb-4"
            />
            <div className="space-y-2 overflow-y-auto flex-1">
              {filtered.slice(0, 8).map(p => (
                <button key={p.id} onClick={() => addProduct(p)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-left transition-colors">
                  <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200 truncate">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.brand} · Health: {p.healthScore}/100</p>
                  </div>
                  <p className="text-sm font-bold text-emerald-400">{formatCurrency(p.price)}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
