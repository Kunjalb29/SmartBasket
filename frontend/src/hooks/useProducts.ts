import { useState, useMemo } from 'react'
import { products } from '@/data/mockData'
import type { Product } from '@/types'
import { useDebounce } from '@/hooks/useCustomHooks'

interface UseProductsOptions {
  initialCategory?: string
  initialSort?: string
  pageSize?: number
}

export function useProducts({
  initialCategory = 'all',
  initialSort = 'relevance',
  pageSize = 20,
}: UseProductsOptions = {}) {
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState(initialSort)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [filters, setFilters] = useState<{
    organic?: boolean
    vegan?: boolean
    onSale?: boolean
    minHealthScore?: number
  }>({})

  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    let result: Product[] = [...products]

    // Category filter
    if (category !== 'all') {
      result = result.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === category)
    }

    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Dietary filters
    if (filters.organic) result = result.filter(p => p.isOrganic)
    if (filters.vegan) result = result.filter(p => p.isVegan)
    if (filters.onSale) result = result.filter(p => p.isOnSale)
    if (filters.minHealthScore) result = result.filter(p => p.healthScore >= (filters.minHealthScore ?? 0))

    // Sort
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break
      case 'health-desc': result.sort((a, b) => b.healthScore - a.healthScore); break
      case 'discount': result.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)); break
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
      default: break // relevance — keep original order
    }

    return result
  }, [category, sort, debouncedSearch, priceRange, filters])

  const paginated = filtered.slice(0, page * pageSize)
  const hasMore = paginated.length < filtered.length

  const loadMore = () => setPage(p => p + 1)
  const reset = () => {
    setCategory('all')
    setSort('relevance')
    setSearch('')
    setPage(1)
    setPriceRange([0, 100])
    setFilters({})
  }

  return {
    products: paginated,
    allProducts: filtered,
    totalCount: filtered.length,
    category, setCategory,
    sort, setSort,
    search, setSearch,
    page,
    priceRange, setPriceRange,
    filters, setFilters,
    hasMore,
    loadMore,
    reset,
    isLoading: false, // Mock — always instant for local data
  }
}
