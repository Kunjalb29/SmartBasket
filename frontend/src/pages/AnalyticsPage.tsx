import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Package, DollarSign, ShoppingCart, Bot, ArrowUpRight, ArrowDownRight, BarChart2 } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts'
import { revenueData, ordersData, categoryData, userGrowthData } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatNumber } from '@/lib/utils'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs border border-violet-500/20">
        <p className="text-slate-400 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.name?.includes('Revenue') || p.name?.includes('value') ? formatCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const topProducts = [
  { name: 'Organic Avocado Pack', revenue: 18400, orders: 2341, growth: 24 },
  { name: 'Wild Caught Salmon', revenue: 15800, orders: 1218, growth: 18 },
  { name: 'Greek Yogurt 32oz', revenue: 12600, orders: 1941, growth: -5 },
  { name: 'Vitamin D3 Gummies', revenue: 11200, orders: 748, growth: 31 },
  { name: 'Almond Butter 16oz', revenue: 9800, orders: 980, growth: 12 },
]

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('1y')

  const kpis = [
    { label: 'Total Revenue', value: formatCurrency(104000), change: '+16.7%', up: true, icon: DollarSign, color: 'violet' },
    { label: 'Total Orders', value: '4,281', change: '+12.3%', up: true, icon: ShoppingCart, color: 'cyan' },
    { label: 'Active Users', value: '16.8K', change: '+18.3%', up: true, icon: Users, color: 'emerald' },
    { label: 'Avg Order Value', value: '$43.20', change: '+4.1%', up: true, icon: TrendingUp, color: 'amber' },
    { label: 'Products Listed', value: '2,847', change: '+8.2%', up: true, icon: Package, color: 'rose' },
    { label: 'AI Recommendations', value: '48.2K', change: '+34%', up: true, icon: Bot, color: 'violet' },
  ]

  const colorMap: Record<string, string> = {
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-100">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-1">Real-time business intelligence and AI insights</p>
        </div>
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map(t => (
            <button key={t} onClick={() => setTimeRange(t)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${timeRange === t ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-slate-200'}`}>{t}</button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass-card p-4">
              <div className={`p-2 rounded-xl border w-fit mb-2.5 ${colorMap[kpi.color]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-slate-100 font-display leading-none">{kpi.value}</p>
              <p className="text-[11px] text-slate-400 mt-1">{kpi.label}</p>
              <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-semibold ${kpi.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-200 font-display">Revenue Overview</h3>
              <p className="text-xs text-slate-500 mt-0.5">Monthly revenue vs previous year</p>
            </div>
            <Badge variant="emerald">+16.7% YoY</Badge>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#475569" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Revenue 2024" stroke="#7c3aed" fill="url(#revGrad)" strokeWidth={2.5} dot={false} />
                <Area type="monotone" dataKey="previousValue" name="Revenue 2023" stroke="#475569" fill="url(#prevGrad)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-slate-200 font-display mb-5">Revenue by Category</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                  {categoryData.map((_, i) => <Cell key={i} fill={_.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <span className="text-xs text-slate-400 flex-1">{c.name}</span>
                <span className="text-xs font-semibold text-slate-200">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders & Users & Top Products */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Orders */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-slate-200 font-display mb-5">Orders This Week</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
                <Bar dataKey="value" name="Orders" fill="#06b6d4" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-slate-200 font-display mb-5">User Growth</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
                <Tooltip contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
                <Line type="monotone" dataKey="value" name="Users" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-slate-200 font-display mb-5">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-500 w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-500">{p.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-100">{formatCurrency(p.revenue)}</p>
                  <p className={`text-[10px] font-semibold ${p.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {p.growth > 0 ? '+' : ''}{p.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 border-violet-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <Bot className="w-6 h-6 text-violet-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-slate-200 font-display">AI Business Insights</h3>
              <Badge variant="violet" dot>Live Analysis</Badge>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { insight: "Revenue peak is Saturday (+38% vs weekday avg). Consider targeted promotions on Friday evening.", icon: '📈' },
                { insight: "Organic products show 31% higher margins. Expanding this category could boost revenue by 12%.", icon: '🌱' },
                { insight: "Users who interact with AI recommendations spend 2.4x more than average users.", icon: '🤖' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
