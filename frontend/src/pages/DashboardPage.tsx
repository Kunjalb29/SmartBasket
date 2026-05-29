import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, Heart, ShoppingCart, DollarSign,
  Zap, Bot, ArrowRight, Star, Package, Target, Flame,
  Activity, Shield, Clock, ChevronRight, Scan
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { products, aiRecommendations, revenueData, healthTrendData, spendingData } from '@/data/mockData'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RatingStars, ProgressBar, Avatar } from '@/components/ui/Display'
import toast from 'react-hot-toast'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs border border-violet-500/20">
        <p className="text-slate-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const radarData = [
  { subject: 'Protein', A: 78, fullMark: 100 },
  { subject: 'Fiber', A: 65, fullMark: 100 },
  { subject: 'Vitamins', A: 82, fullMark: 100 },
  { subject: 'Minerals', A: 71, fullMark: 100 },
  { subject: 'Calories', A: 88, fullMark: 100 },
  { subject: 'Hydration', A: 60, fullMark: 100 },
]

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()
  const { addItem, getTotalItems } = useCartStore()

  const budgetPercent = user ? (user.spentThisMonth / user.monthlyBudget) * 100 : 0
  const remaining = user ? user.monthlyBudget - user.spentThisMonth : 0

  const stats = [
    {
      title: 'Monthly Spent',
      value: formatCurrency(user?.spentThisMonth ?? 0),
      change: '+12%',
      changeType: 'negative' as const,
      icon: DollarSign,
      color: 'cyan',
      subtitle: `$${remaining.toFixed(0)} remaining`,
    },
    {
      title: 'Health Score',
      value: `${user?.healthScore ?? 0}/100`,
      change: '+5pts',
      changeType: 'positive' as const,
      icon: Heart,
      color: 'rose',
      subtitle: 'Excellent progress!',
    },
    {
      title: 'Total Orders',
      value: user?.stats.totalOrders ?? 0,
      change: '+3',
      changeType: 'positive' as const,
      icon: Package,
      color: 'violet',
      subtitle: 'This month: 3',
    },
    {
      title: 'Amount Saved',
      value: formatCurrency(user?.stats.savedAmount ?? 0),
      change: '+$23',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'emerald',
      subtitle: 'vs. original prices',
    },
  ]

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between flex-wrap gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-100">
            Good morning, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-400 mt-1">Here's your smart shopping overview for today</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/scanner">
            <Button variant="secondary" icon={<Scan className="w-4 h-4" />} size="sm">Scan Product</Button>
          </Link>
          <Link to="/assistant">
            <Button icon={<Bot className="w-4 h-4" />} size="sm">Ask AI</Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const colorMap: Record<string, string> = {
            cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
            rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
            violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
            emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          }
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${colorMap[stat.color]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                  stat.changeType === 'positive' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xl font-bold text-slate-100 font-display">{String(stat.value)}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{stat.subtitle}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-200 font-display">Health & Calorie Trends</h3>
              <p className="text-xs text-slate-500 mt-0.5">Daily nutrition this week</p>
            </div>
            <Badge variant="violet">This Week</Badge>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthTrendData}>
                <defs>
                  <linearGradient id="calorieGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="proteinGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="calories" name="Calories" stroke="#7c3aed" fill="url(#calorieGrad)" strokeWidth={2} dot={{ fill: '#7c3aed', strokeWidth: 0, r: 3 }} />
                <Area type="monotone" dataKey="protein" name="Protein (g)" stroke="#06b6d4" fill="url(#proteinGrad)" strokeWidth={2} dot={{ fill: '#06b6d4', strokeWidth: 0, r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Nutrition Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-200 font-display">Nutrition Balance</h3>
              <p className="text-xs text-slate-500 mt-0.5">Weekly average</p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="You" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-400 text-center">
              ✅ Well-balanced diet this week!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Budget & AI + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Budget Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-200 font-display">Monthly Budget</h3>
            <Badge variant={budgetPercent > 90 ? 'rose' : budgetPercent > 70 ? 'amber' : 'emerald'}>
              {budgetPercent > 90 ? 'Near Limit' : budgetPercent > 70 ? 'On Track' : 'Good'}
            </Badge>
          </div>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold font-display text-slate-100">
              {formatCurrency(user?.spentThisMonth ?? 0)}
            </p>
            <p className="text-sm text-slate-400">of {formatCurrency(user?.monthlyBudget ?? 0)} budget</p>
          </div>
          <div className="mb-4">
            <ProgressBar
              value={budgetPercent}
              color={budgetPercent > 90 ? 'rose' : budgetPercent > 70 ? 'amber' : 'emerald'}
              size="lg"
              showLabel
            />
          </div>
          <div className="space-y-2">
            {spendingData.map((s) => (
              <div key={s.category} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-16 flex-shrink-0">{s.category}</span>
                <div className="flex-1">
                  <ProgressBar value={(s.amount / s.budget) * 100} size="sm" color={(s.amount / s.budget) > 0.9 ? 'rose' : 'violet'} />
                </div>
                <span className="text-xs text-slate-300 w-12 text-right">${s.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-200 font-display">🤖 AI Recommendations</h3>
              <p className="text-xs text-slate-500 mt-0.5">Personalized picks for you</p>
            </div>
            <Link to="/products">
              <Button variant="ghost" size="xs" iconRight={<ArrowRight className="w-3 h-3" />}>View all</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {aiRecommendations.slice(0, 3).map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-violet-500/20 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20">
                  <img src={rec.product.thumbnail} alt={rec.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">{rec.product.name}</p>
                  <p className="text-xs text-slate-500 truncate">{rec.reason}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingStars rating={rec.product.rating} size="sm" />
                    <span className="text-xs text-emerald-400 font-semibold">{formatCurrency(rec.product.price)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="violet">AI: {rec.score}</Badge>
                  <button
                    onClick={() => { addItem(rec.product); toast.success(`${rec.product.name} added to cart!`) }}
                    className="w-7 h-7 rounded-lg bg-violet-500/20 hover:bg-violet-500/40 text-violet-400 flex items-center justify-center transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Products + Activity */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass-card p-6 lg:col-span-3"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-200 font-display">Featured Products</h3>
            <Link to="/products">
              <Button variant="ghost" size="xs" iconRight={<ArrowRight className="w-3 h-3" />}>Browse all</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {products.filter(p => p.isFeatured).slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.05 }}
                className="group cursor-pointer"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.05] hover:border-violet-500/30 transition-all">
                    <div className="relative h-20 bg-gradient-to-br from-violet-600/10 to-cyan-600/10">
                      <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                      {product.isOnSale && (
                        <span className="absolute top-1.5 left-1.5 badge-rose text-[10px] px-1.5 py-0.5">-{product.discount}%</span>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-200 truncate">{product.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-emerald-400 font-bold">{formatCurrency(product.price)}</span>
                        <button
                          onClick={(e) => { e.preventDefault(); addItem(product); toast.success('Added!') }}
                          className="w-5 h-5 rounded bg-violet-500/30 hover:bg-violet-500/60 text-violet-300 flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats & Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Health Score Card */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Health Score</h4>
                <p className="text-xs text-slate-500">Based on your cart & history</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#10b981" strokeWidth="8"
                    strokeDasharray={`${(user?.healthScore ?? 0) * 2.01} 201`}
                    strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-emerald-400">{user?.healthScore}</span>
                </div>
              </div>
              <div className="flex-1">
                <Badge variant="emerald" className="mb-2">Excellent</Badge>
                <div className="space-y-1.5">
                  {[
                    { label: 'Low sugar', done: true },
                    { label: 'High protein', done: true },
                    { label: 'More fiber', done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.done ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                      <span className={`text-xs ${item.done ? 'text-slate-300' : 'text-slate-500'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Healthy Streak</h4>
                <p className="text-xs text-slate-500">Days with healthy choices</p>
              </div>
            </div>
            <p className="text-4xl font-bold font-display text-amber-400 mb-1">
              {user?.stats.streakDays ?? 0}
              <span className="text-lg text-slate-400 ml-1">days</span>
            </p>
            <p className="text-xs text-slate-500">🎯 Goal: 30 days — Keep it up!</p>
            <div className="flex gap-1 mt-3">
              {Array(14).fill(0).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-6 rounded-sm ${i < (user?.stats.streakDays ?? 0) ? 'bg-amber-500/60' : 'bg-white/[0.04]'}`}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-slate-200 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Scan Product', icon: '📷', path: '/scanner', color: 'amber' },
                { label: 'AI Chat', icon: '🤖', path: '/assistant', color: 'violet' },
                { label: 'View Cart', icon: '🛒', path: '/cart', color: 'cyan' },
                { label: 'Nutrition', icon: '🥗', path: '/nutrition', color: 'emerald' },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.path}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-violet-500/20 transition-all text-left"
                >
                  <span className="text-base">{action.icon}</span>
                  <span className="text-xs text-slate-300 font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
