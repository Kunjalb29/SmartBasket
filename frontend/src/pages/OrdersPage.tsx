import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, ChevronRight, Download, RefreshCw, Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { SearchBar } from '@/components/ui/SearchBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { formatDate } from '@/lib/formatters'
import { ORDER_STATUS_CONFIG } from '@/lib/constants'

type OrderStatus = keyof typeof ORDER_STATUS_CONFIG

interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  total: number
  itemCount: number
  placedAt: string
  items: Array<{ name: string; thumbnail: string; quantity: number; price: number }>
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#SB-A1B2C3D4',
    status: 'DELIVERED',
    total: 67.34,
    itemCount: 5,
    placedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { name: 'Organic Avocado', thumbnail: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=60', quantity: 2, price: 5.99 },
      { name: 'Greek Yogurt', thumbnail: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=60', quantity: 1, price: 6.49 },
    ],
  },
  {
    id: '2',
    orderNumber: '#SB-E5F6G7H8',
    status: 'SHIPPED',
    total: 124.50,
    itemCount: 8,
    placedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { name: 'Wild Caught Salmon', thumbnail: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=60', quantity: 2, price: 12.99 },
      { name: 'Organic Spinach', thumbnail: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=60', quantity: 3, price: 4.99 },
    ],
  },
  {
    id: '3',
    orderNumber: '#SB-I9J0K1L2',
    status: 'PROCESSING',
    total: 43.15,
    itemCount: 3,
    placedAt: new Date().toISOString(),
    items: [
      { name: 'Whole Grain Oats', thumbnail: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=60', quantity: 1, price: 8.99 },
    ],
  },
]

export const OrdersPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = mockOrders.filter(o =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader
        title="My Orders"
        description="Track and manage your order history"
        actions={
          <Button variant="secondary" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
            Refresh
          </Button>
        }
      />

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} placeholder="Search by order number or status..." className="mb-5" />

      {/* Order Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Total Orders', value: mockOrders.length, color: '#7c3aed' },
          { label: 'Delivered', value: mockOrders.filter(o => o.status === 'DELIVERED').length, color: '#10b981' },
          { label: 'In Progress', value: mockOrders.filter(o => ['PROCESSING', 'SHIPPED', 'CONFIRMED'].includes(o.status)).length, color: '#06b6d4' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className="text-2xl font-bold font-display" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <EmptyState icon={<Package />} title="No orders found" description="Your order history will appear here." />
      ) : (
        <div className="space-y-3">
          {filtered.map(order => {
            const config = ORDER_STATUS_CONFIG[order.status]
            const isExpanded = expanded === order.id
            return (
              <motion.div
                key={order.id}
                layout
                className="glass-card overflow-hidden"
              >
                {/* Order Header */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                  className="w-full p-4 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${config.color}15` }}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-200 text-sm">{order.orderNumber}</p>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: config.color, background: `${config.color}15` }}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{order.itemCount} items · Placed {formatDate(order.placedAt, 'relative')}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-emerald-400">{formatCurrency(order.total)}</p>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ml-auto mt-1 ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 pb-4 border-t border-white/[0.06] pt-4"
                  >
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img src={item.thumbnail} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="text-sm text-slate-300">{item.name}</p>
                            <p className="text-xs text-slate-500">×{item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-slate-300">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" variant="secondary" icon={<Download className="w-3.5 h-3.5" />}>Invoice</Button>
                      <Button size="sm" variant="secondary" icon={<RefreshCw className="w-3.5 h-3.5" />}>Reorder</Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
