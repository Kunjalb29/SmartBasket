import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Package, ShoppingCart, TrendingUp, Bot, Shield, Plus, Trash2, Edit2, Search, MoreVertical, CheckCircle, X, Activity } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { adminUsers, adminStats } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Display'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'system', label: 'System', icon: Shield },
]

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [search, setSearch] = useState('')

  const filteredUsers = adminUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold font-display text-slate-100">Admin Panel</h1>
            <Badge variant="rose" dot>Admin Only</Badge>
          </div>
          <p className="text-slate-400">Platform management and system monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald" dot>System Healthy</Badge>
          <Badge variant="violet">v2.0.0</Badge>
        </div>
      </motion.div>

      {/* Tab Nav */}
      <div className="flex gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-slate-200'}`}>
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {adminStats.map((stat, i) => {
              const colMap: Record<string, string> = { violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20', cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
                  <div className={`p-2 rounded-xl border w-fit mb-3 ${colMap[stat.color]}`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100 font-display">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                  <p className={`text-xs font-semibold mt-1 ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{stat.change}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Live Traffic */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-200 font-display">Platform Activity</h3>
                <Badge variant="emerald" dot>Live</Badge>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { time: '00:00', users: 124 }, { time: '03:00', users: 87 }, { time: '06:00', users: 203 },
                    { time: '09:00', users: 512 }, { time: '12:00', users: 843 }, { time: '15:00', users: 921 },
                    { time: '18:00', users: 1104 }, { time: '21:00', users: 834 }, { time: 'Now', users: 692 },
                  ]}>
                    <defs>
                      <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="users" name="Active Users" stroke="#10b981" fill="url(#trafficGrad)" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System Health */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-slate-200 font-display mb-4">System Health</h3>
              <div className="space-y-4">
                {[
                  { name: 'API Server', status: 'healthy', latency: '42ms', uptime: '99.98%' },
                  { name: 'Database (PostgreSQL)', status: 'healthy', latency: '8ms', uptime: '99.99%' },
                  { name: 'Redis Cache', status: 'healthy', latency: '2ms', uptime: '100%' },
                  { name: 'AI Service', status: 'healthy', latency: '180ms', uptime: '99.91%' },
                  { name: 'CDN', status: 'healthy', latency: '12ms', uptime: '99.99%' },
                ].map(svc => (
                  <div key={svc.name} className="flex items-center gap-3 py-2 border-b border-white/[0.04]">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-200">{svc.name}</p>
                    </div>
                    <span className="text-xs text-slate-400">{svc.latency}</span>
                    <span className="text-xs text-emerald-400 font-semibold">{svc.uptime}</span>
                    <Badge variant="emerald" size="sm">OK</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="input-glass pl-10 w-full" />
            </div>
            <Button icon={<Plus className="w-4 h-4" />} size="sm" onClick={() => toast.success('Add user modal coming soon!')}>Add User</Button>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-white/[0.06] text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span className="col-span-2">User</span>
              <span>Role</span>
              <span>Status</span>
              <span>Joined</span>
              <span>Actions</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {filteredUsers.map((user, i) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-6 gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar src={user.avatar} name={user.name} size="sm" showStatus status={user.isActive ? 'online' : 'offline'} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-200 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <Badge variant={user.role === 'ADMIN' ? 'rose' : user.role === 'VENDOR' ? 'amber' : 'slate'} size="sm">{user.role}</Badge>
                  </div>
                  <div>
                    <Badge variant={user.isActive ? 'emerald' : 'slate'} size="sm">{user.isActive ? 'Active' : 'Inactive'}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{formatRelativeTime(user.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toast('Edit user coming soon!')} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-violet-400 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => toast.error('Delete user disabled in demo')} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-slate-200 font-display mb-4">Environment Variables</h3>
            <div className="space-y-2">
              {[
                { key: 'NODE_ENV', value: 'production' },
                { key: 'API_VERSION', value: 'v2' },
                { key: 'AI_MODEL', value: 'gemini-2.5-pro' },
                { key: 'DB_POOL_SIZE', value: '20' },
                { key: 'CACHE_TTL', value: '3600' },
              ].map(env => (
                <div key={env.key} className="flex items-center gap-3 py-2 px-4 rounded-xl bg-white/[0.03] border border-white/[0.05] font-mono">
                  <span className="text-xs text-cyan-400">{env.key}</span>
                  <span className="text-xs text-slate-500">=</span>
                  <span className="text-xs text-emerald-400">{env.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-slate-200 font-display mb-4">System Actions</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Clear Cache', color: 'secondary' as const },
                { label: 'Rebuild AI Index', color: 'secondary' as const },
                { label: 'Export DB Backup', color: 'secondary' as const },
                { label: 'Flush Redis', color: 'danger' as const },
              ].map(({ label, color }) => (
                <Button key={label} variant={color} size="sm" onClick={() => toast.success(`${label} initiated!`)}>
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
