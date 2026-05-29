import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ChevronRight, CheckCircle, Truck, Clock, X, RotateCcw, Search, Filter } from 'lucide-react'
import { orders } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'

const statusConfig: Record<string, { label: string; color: 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate'; icon: React.ReactNode }> = {
  pending: { label: 'Pending', color: 'amber', icon: <Clock className="w-3.5 h-3.5" /> },
  confirmed: { label: 'Confirmed', color: 'cyan', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  processing: { label: 'Processing', color: 'violet', icon: <Package className="w-3.5 h-3.5" /> },
  shipped: { label: 'Shipped', color: 'cyan', icon: <Truck className="w-3.5 h-3.5" /> },
  delivered: { label: 'Delivered', color: 'emerald', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  cancelled: { label: 'Cancelled', color: 'rose', icon: <X className="w-3.5 h-3.5" /> },
  refunded: { label: 'Refunded', color: 'slate', icon: <RotateCcw className="w-3.5 h-3.5" /> },
}

const statusSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

export const OrdersPage: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false
    if (search && !o.id.includes(search) && !o.items.some(i => i.productName.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-100">Order History</h1>
        <p className="text-slate-400 mt-1">Track and manage your orders</p>
      </motion.div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." className="input-glass pl-10 w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${filter === s ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-slate-200'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Orders', value: orders.length, color: 'violet' },
          { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: 'amber' },
          { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'emerald' },
          { label: 'Total Spent', value: formatCurrency(orders.reduce((s, o) => s + o.total, 0)), color: 'cyan' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 text-center">
            <p className={`text-xl font-bold font-display ${s.color === 'violet' ? 'text-violet-400' : s.color === 'amber' ? 'text-amber-400' : s.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order, i) => {
            const statusCfg = statusConfig[order.status] ?? statusConfig.pending
            const isExpanded = expandedOrder === order.id
            const stepIdx = statusSteps.indexOf(order.status)

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card overflow-hidden"
              >
                {/* Order Header */}
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-slate-200 text-sm">{order.id.toUpperCase()}</span>
                      <Badge variant={statusCfg.color} icon={statusCfg.icon}>{statusCfg.label}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {order.items.length} items · {formatDate(order.createdAt)} · {order.paymentMethod}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-100">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-slate-500">{formatRelativeTime(order.createdAt)}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-white/[0.06] p-5 space-y-5"
                  >
                    {/* Progress Steps */}
                    {order.status !== 'cancelled' && order.status !== 'refunded' && (
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          {statusSteps.map((step, i) => {
                            const done = i <= stepIdx
                            const active = i === stepIdx
                            return (
                              <div key={step} className="flex flex-col items-center gap-1 flex-1">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${done ? 'bg-violet-600 border-violet-600' : 'bg-transparent border-slate-700'}`}>
                                  {done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <span className={`text-[10px] capitalize text-center ${done ? 'text-violet-400' : 'text-slate-600'}`}>{step}</span>
                              </div>
                            )
                          })}
                        </div>
                        <div className="absolute top-3 left-0 right-0 h-px bg-slate-800 -z-10" />
                        <div className="absolute top-3 left-0 h-px bg-violet-600 -z-10 transition-all duration-700" style={{ width: `${(stepIdx / (statusSteps.length - 1)) * 100}%` }} />
                      </div>
                    )}

                    {/* Items */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 py-2">
                            <img src={item.productImage} alt={item.productName} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-slate-200">{item.productName}</p>
                              <p className="text-xs text-slate-500">Qty: {item.quantity} × {formatCurrency(item.unitPrice)}</p>
                            </div>
                            <p className="text-sm font-semibold text-slate-200">{formatCurrency(item.totalPrice)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary + Tracking */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-semibold text-slate-200 mb-2">Order Summary</h4>
                        {[
                          { label: 'Subtotal', value: formatCurrency(order.subtotal) },
                          { label: 'Discount', value: `-${formatCurrency(order.discount)}`, color: 'text-emerald-400' },
                          { label: 'Tax', value: formatCurrency(order.tax) },
                          { label: 'Delivery', value: order.deliveryFee === 0 ? 'FREE' : formatCurrency(order.deliveryFee), color: order.deliveryFee === 0 ? 'text-emerald-400' : undefined },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="flex justify-between text-xs">
                            <span className="text-slate-400">{label}</span>
                            <span className={color ?? 'text-slate-200'}>{value}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-white/[0.06] mt-1.5">
                          <span className="text-slate-200">Total</span>
                          <span className="text-slate-100">{formatCurrency(order.total)}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200 mb-2">Delivery Details</h4>
                        {order.trackingNumber && (
                          <p className="text-xs text-violet-400 mb-1">Tracking: {order.trackingNumber}</p>
                        )}
                        <p className="text-xs text-slate-400">{order.deliveryAddress.name}</p>
                        <p className="text-xs text-slate-400">{order.deliveryAddress.street}</p>
                        <p className="text-xs text-slate-400">{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
                        {order.estimatedDelivery && (
                          <p className="text-xs text-emerald-400 mt-2">
                            {order.actualDelivery ? '✅ Delivered: ' : '📅 Est: '}
                            {formatDate(order.actualDelivery ?? order.estimatedDelivery)}
                          </p>
                        )}
                      </div>
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
