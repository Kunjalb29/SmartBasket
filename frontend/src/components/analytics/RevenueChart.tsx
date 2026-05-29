import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const data = [
  { month: 'Jan', revenue: 8200, orders: 142 },
  { month: 'Feb', revenue: 9800, orders: 168 },
  { month: 'Mar', revenue: 11400, orders: 195 },
  { month: 'Apr', revenue: 10600, orders: 183 },
  { month: 'May', revenue: 13200, orders: 221 },
  { month: 'Jun', revenue: 15800, orders: 267 },
  { month: 'Jul', revenue: 14100, orders: 245 },
  { month: 'Aug', revenue: 16900, orders: 290 },
  { month: 'Sep', revenue: 18400, orders: 312 },
  { month: 'Oct', revenue: 19700, orders: 334 },
  { month: 'Nov', revenue: 22300, orders: 376 },
  { month: 'Dec', revenue: 25800, orders: 432 },
]

export const RevenueChart: React.FC = () => {
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
  const lastMonth = data[data.length - 1].revenue
  const prevMonth = data[data.length - 2].revenue
  const growth = ((lastMonth - prevMonth) / prevMonth) * 100

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-200 font-display">Revenue Over Time</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly revenue trend</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-400">{formatCurrency(totalRevenue)}</p>
          <div className="flex items-center gap-1 justify-end text-emerald-400 text-xs font-semibold">
            <TrendingUp className="w-3 h-3" />
            +{growth.toFixed(1)}% this month
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip
            contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px', color: '#f8fafc', fontSize: '13px' }}
            formatter={(value, name) => [name === 'revenue' ? formatCurrency(Number(value)) : value, name === 'revenue' ? 'Revenue' : 'Orders']}
          />
          <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} fill="url(#revenueGradient)" dot={false} />
          <Area type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={2} fill="url(#ordersGradient)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
