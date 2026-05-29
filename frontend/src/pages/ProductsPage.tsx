import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid3X3, List, SlidersHorizontal, Star, ShoppingCart, Heart, Zap, X } from 'lucide-react'
import { products, categories } from '@/data/mockData'
import { useCartStore } from '@/store/cartStore'
import { Badge, DiscountBadge, AIScoreBadge } from '@/components/ui/Badge'
import { RatingStars } from '@/components/ui/Display'
import { formatCurrency } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

const sortOptions = [
  { value: 'ai_score', label: 'AI Score' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
]

const ProductCard: React.FC<{ product: Product; view: 'grid' | 'list'; delay?: number }> = ({ product, view, delay = 0 }) => {
  const { addItem } = useCartStore()
  const [wishlist, setWishlist] = useState(false)

  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} added to cart! 🛒`, { duration: 2000 })
  }

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="glass-card hover:border-violet-500/30 transition-all duration-300 group"
      >
        <Link to={`/products/${product.id}`} className="flex items-center gap-4 p-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-violet-600/10 to-cyan-600/10 flex-shrink-0">
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap">
              <h3 className="font-semibold text-slate-200 text-sm">{product.name}</h3>
              {product.isOnSale && <DiscountBadge discount={product.discount} />}
              {product.isOrganic && <Badge variant="emerald">Organic</Badge>}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{product.brand}</p>
            <RatingStars rating={product.rating} size="sm" showValue showCount reviewCount={product.reviewCount} className="mt-1" />
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{product.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-400">{formatCurrency(product.price)}</p>
              {product.originalPrice > product.price && (
                <p className="text-xs text-slate-500 line-through">{formatCurrency(product.originalPrice)}</p>
              )}
            </div>
            <AIScoreBadge score={product.aiScore} />
            <button onClick={handleAddCart} className="btn-primary px-3 py-1.5 text-xs">
              <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
            </button>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay }}
      className="product-card group"
    >
      <Link to={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative h-44 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 overflow-hidden">
          <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
            {product.isOnSale && <DiscountBadge discount={product.discount} />}
            {product.isOrganic && <Badge variant="emerald" size="sm">🌱 Organic</Badge>}
          </div>
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlist(!wishlist) }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-violet-500/40"
          >
            <Heart className={`w-4 h-4 ${wishlist ? 'fill-rose-400 text-rose-400' : 'text-white'}`} />
          </button>
          {/* AI Score */}
          <div className="absolute bottom-2 right-2">
            <AIScoreBadge score={product.aiScore} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-slate-500 mb-0.5">{product.brand}</p>
          <h3 className="font-semibold text-sm text-slate-200 line-clamp-2 leading-snug mb-2">{product.name}</h3>
          <RatingStars rating={product.rating} size="sm" showValue showCount reviewCount={product.reviewCount} className="mb-3" />
          
          {/* Health score bar */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] text-slate-500">Health:</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700"
                style={{ width: `${product.healthScore}%` }} />
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">{product.healthScore}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-slate-100">{formatCurrency(product.price)}</p>
              {product.originalPrice > product.price && (
                <p className="text-xs text-slate-500 line-through">{formatCurrency(product.originalPrice)}</p>
              )}
            </div>
            <button
              onClick={handleAddCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all hover:scale-105"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export const ProductsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('ai_score')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50])
  const [onlyOrganic, setOnlyOrganic] = useState(false)
  const [onlySale, setOnlySale] = useState(false)
  const [minRating, setMinRating] = useState(0)

  const filtered = useMemo(() => {
    let result = [...products]
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory)
    if (onlyOrganic) result = result.filter(p => p.isOrganic)
    if (onlySale) result = result.filter(p => p.isOnSale)
    if (minRating > 0) result = result.filter(p => p.rating >= minRating)
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sortBy) {
      case 'ai_score': result.sort((a, b) => b.aiScore - a.aiScore); break
      case 'price_asc': result.sort((a, b) => a.price - b.price); break
      case 'price_desc': result.sort((a, b) => b.price - a.price); break
      case 'rating_desc': result.sort((a, b) => b.rating - a.rating); break
      case 'discount': result.sort((a, b) => b.discount - a.discount); break
    }
    return result
  }, [search, selectedCategory, sortBy, onlyOrganic, onlySale, minRating, priceRange])

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-100 mb-1">Product Catalog</h1>
        <p className="text-slate-400">Browse {products.length}+ AI-scored products with instant health insights</p>
      </motion.div>

      {/* Search & Controls */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, brands..." className="input-glass pl-10 w-full" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-glass pr-8 cursor-pointer">
          {sortOptions.map(o => <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>)}
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-violet-500/20 border-violet-500/40 text-violet-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'}`}>
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-slate-200'}`}><Grid3X3 className="w-4 h-4" /></button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-slate-200'}`}><List className="w-4 h-4" /></button>
        </div>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-card p-5 mb-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-2">Price Range: $0 – $50</label>
                <input type="range" min={0} max={50} value={priceRange[1]} onChange={e => setPriceRange([0, +e.target.value])} className="w-full accent-violet-600" />
                <p className="text-xs text-violet-400 mt-1">Up to {formatCurrency(priceRange[1])}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-2">Min Rating</label>
                <div className="flex gap-1">
                  {[0, 3, 4, 4.5].map(r => (
                    <button key={r} onClick={() => setMinRating(r)} className={`px-2 py-1 rounded-lg text-xs ${minRating === r ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                      {r === 0 ? 'All' : `${r}+★`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={onlyOrganic} onChange={e => setOnlyOrganic(e.target.checked)} className="accent-violet-600" />
                  <span className="text-sm text-slate-300">🌱 Organic only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={onlySale} onChange={e => setOnlySale(e.target.checked)} className="accent-violet-600" />
                  <span className="text-sm text-slate-300">🔥 On sale only</span>
                </label>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setSearch(''); setSelectedCategory('all'); setSortBy('ai_score'); setOnlyOrganic(false); setOnlySale(false); setMinRating(0); setPriceRange([0, 50]) }} className="btn-secondary text-xs px-4 py-2">Clear All Filters</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Pills */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2 flex-wrap mb-6">
        <button onClick={() => setSelectedCategory('all')} className={`tag-pill ${selectedCategory === 'all' ? 'active' : ''}`}>
          All Products ({products.length})
        </button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} className={`tag-pill ${selectedCategory === cat.name ? 'active' : ''}`}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">
          Showing <span className="text-slate-200 font-medium">{filtered.length}</span> products
          {search && <span> for "<span className="text-violet-400">{search}</span>"</span>}
        </p>
      </div>

      {/* Products Grid/List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">No products found</h3>
          <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4' : 'space-y-3'}>
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} view={view} delay={i * 0.04} />
          ))}
        </div>
      )}
    </div>
  )
}
