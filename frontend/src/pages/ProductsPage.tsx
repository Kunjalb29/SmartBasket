import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Grid3X3, List, SlidersHorizontal, X, Search } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { Tabs } from '@/components/ui/Tabs'
import { SearchBar } from '@/components/ui/SearchBar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { useProducts } from '@/hooks/useProducts'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '@/lib/constants'

const CATEGORY_TABS = PRODUCT_CATEGORIES.map(c => ({
  id: c.slug,
  label: c.label,
}))

export const ProductsPage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const {
    products,
    totalCount,
    category, setCategory,
    sort, setSort,
    search, setSearch,
    filters, setFilters,
    hasMore,
    loadMore,
    reset,
  } = useProducts()

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-100">Products</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {totalCount} products • AI-powered search & recommendations
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: 'rgba(26,31,53,0.6)' }}>
              {(['grid', 'list'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`p-2.5 transition-colors ${view === v ? 'text-violet-400' : 'text-slate-400 hover:text-slate-200'}`}
                  style={view === v ? { background: 'rgba(124,58,237,0.15)' } : {}}
                >
                  {v === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${showFilters ? 'text-violet-300' : 'text-slate-400 hover:text-slate-200'}`}
              style={{ background: showFilters ? 'rgba(124,58,237,0.15)' : 'rgba(26,31,53,0.6)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && <Badge variant="violet" size="sm">{activeFilterCount}</Badge>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search & Sort */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search 500+ products by name, brand, or nutrition..."
          className="flex-1 min-w-64"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="input-glass px-4 pr-10 appearance-none cursor-pointer text-sm min-w-[180px]"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} style={{ background: '#1a1f35' }}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category Tabs */}
      <div className="mb-5 overflow-x-auto pb-1">
        <Tabs tabs={CATEGORY_TABS} activeTab={category} onChange={setCategory} variant="pills" />
      </div>

      {/* Quick Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card p-4 mb-5"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-slate-400">Quick Filters:</span>
            {[
              { key: 'organic', label: '🌿 Organic' },
              { key: 'vegan', label: '🌱 Vegan' },
              { key: 'onSale', label: '🔥 On Sale' },
              { key: 'minHealthScore', label: '💚 Healthy (80+)', value: 80 },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilters(prev => ({ ...prev, [f.key]: prev[f.key as keyof typeof prev] ? undefined : (f.value ?? true) }))}
                className={`text-sm px-3 py-1.5 rounded-full transition-all ${
                  filters[f.key as keyof typeof filters]
                    ? 'text-violet-300 border-violet-500/40'
                    : 'text-slate-400 hover:text-slate-200 border-white/10'
                }`}
                style={{
                  background: filters[f.key as keyof typeof filters] ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid',
                }}
              >
                {f.label}
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button onClick={reset} className="text-sm text-rose-400 hover:text-rose-300 flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Products Grid/List */}
      {products.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No products found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={<Button variant="secondary" onClick={reset}>Clear Filters</Button>}
        />
      ) : (
        <>
          <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-3'}>
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} view={view} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button variant="secondary" onClick={loadMore} size="lg">Load More Products</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
