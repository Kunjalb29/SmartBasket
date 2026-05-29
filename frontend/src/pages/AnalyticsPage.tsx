import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RevenueChart } from '@/components/analytics/RevenueChart'
import { CategoryBreakdown } from '@/components/analytics/CategoryBreakdown'
import { StatsCard } from '@/components/ui/StatsCard'
import { Tabs } from '@/components/ui/Tabs'
import { PageHeader } from '@/components/layout/PageHeader'
import { BarChart2, ShoppingBag, Users, TrendingUp, Activity, Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SmartLineChart } from '@/components/ui/LineChart'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
  { id: 'revenue', label: 'Revenue', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'products', label: 'Products', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
]

const healthTrend = [
  { week: 'W1', score: 68, target: 75 },
  { week: 'W2', score: 71, target: 75 },
  { week: 'W3', score: 74, target: 75 },
  { week: 'W4', score: 79, target: 75 },
  { week: 'W5', score: 82, target: 75 },
  { week: 'W6', score: 78, target: 75 },
  { week: 'W7', score: 84, target: 75 },
  { week: 'W8', score: 87, target: 75 },
]

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Analytics"
        description="Platform insights, revenue trends and product performance"
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={() => toast.success('Report downloading...', { icon: '📊' })}
          >
            Export Report
          </Button>
        }
      />

      {/* Period Tabs */}
      <div className="flex items-center justify-between mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <select className="input-glass text-sm px-3 py-1.5">
          <option value="7d" style={{ background: '#1a1f35' }}>Last 7 days</option>
          <option value="30d" style={{ background: '#1a1f35' }}>Last 30 days</option>
          <option value="90d" style={{ background: '#1a1f35' }}>Last 90 days</option>
          <option value="1y" style={{ background: '#1a1f35' }}>Last year</option>
        </select>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Revenue" value="$185.4K" trend={18.2} trendLabel="vs last month" icon={<TrendingUp className="w-4 h-4" />} iconBg="rgba(124,58,237,0.15)" iconColor="#a78bfa" />
        <StatsCard title="Total Orders" value="2,847" trend={12.5} trendLabel="vs last month" icon={<ShoppingBag className="w-4 h-4" />} iconBg="rgba(6,182,212,0.15)" iconColor="#22d3ee" delay={0.1} />
        <StatsCard title="Active Users" value="14,231" trend={8.3} trendLabel="vs last month" icon={<Users className="w-4 h-4" />} iconBg="rgba(16,185,129,0.15)" iconColor="#34d399" delay={0.2} />
        <StatsCard title="Avg Health Score" value="78/100" trend={4.1} trendLabel="vs last month" icon={<Activity className="w-4 h-4" />} iconBg="rgba(245,158,11,0.15)" iconColor="#fbbf24" delay={0.3} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <CategoryBreakdown />
        </div>
      </div>

      {/* Health Trend Chart */}
      <div className="glass-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-200 font-display">User Health Score Trend</h3>
            <p className="text-xs text-slate-500 mt-0.5">Weekly average health score across all carts</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-emerald-400">87</p>
            <p className="text-xs text-emerald-400">+19 since W1</p>
          </div>
        </div>
        <SmartLineChart
          data={healthTrend}
          xAxisKey="week"
          lines={[
            { key: 'score', label: 'Avg Health Score', color: '#10b981', dot: true },
            { key: 'target', label: 'Target (75)', color: '#64748b', strokeWidth: 1 },
          ]}
          height={220}
          showGrid
        />
      </div>

      {/* Top Products Table */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-200 font-display">Top Performing Products</h3>
          <span className="text-xs text-slate-500">Last 30 days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Product', 'Category', 'Units Sold', 'Revenue', 'Health Score', 'Trend'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Organic Avocado', cat: 'Fresh Produce', units: 847, rev: '$5,073', health: 92, trend: '+12%' },
                { name: 'Wild Caught Salmon', cat: 'Meat & Seafood', units: 634, rev: '$8,234', health: 96, trend: '+8%' },
                { name: 'Greek Yogurt', cat: 'Dairy & Eggs', units: 1240, rev: '$8,055', health: 88, trend: '+15%' },
                { name: 'Organic Spinach', cat: 'Fresh Produce', units: 935, rev: '$4,661', health: 98, trend: '+22%' },
                { name: 'Whole Grain Oats', cat: 'Pantry', units: 712, rev: '$6,401', health: 90, trend: '+5%' },
              ].map((p, i) => (
                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-200">{p.name}</td>
                  <td className="py-3 px-4 text-slate-500">{p.cat}</td>
                  <td className="py-3 px-4 text-slate-300">{p.units.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-400">{p.rev}</td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-400 font-semibold">{p.health}/100</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{p.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
