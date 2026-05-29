import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Package, ShoppingBag, Activity, BarChart2, Settings, Plus, Search, Download, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsCard } from '@/components/ui/StatsCard'
import { Tabs } from '@/components/ui/Tabs'
import { SearchBar } from '@/components/ui/SearchBar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SmartLineChart } from '@/components/ui/LineChart'
import toast from 'react-hot-toast'

const TABS = [
  { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
  { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
]

const signupTrend = [
  { day: 'Mon', users: 24 },
  { day: 'Tue', users: 38 },
  { day: 'Wed', users: 31 },
  { day: 'Thu', users: 47 },
  { day: 'Fri', users: 52 },
  { day: 'Sat', users: 68 },
  { day: 'Sun', users: 43 },
]

const mockUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'USER', status: 'Active', joined: '2024-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'ADMIN', status: 'Active', joined: '2024-01-10' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'USER', status: 'Inactive', joined: '2024-02-01' },
  { id: '4', name: 'David Lee', email: 'david@example.com', role: 'MANAGER', status: 'Active', joined: '2024-02-14' },
  { id: '5', name: 'Emma Brown', email: 'emma@example.com', role: 'USER', status: 'Active', joined: '2024-03-05' },
]

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [search, setSearch] = useState('')

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Admin Panel"
        description="Platform management and system analytics"
        badge={<Badge variant="rose">Admin Only</Badge>}
        actions={
          <Button size="sm" icon={<Settings className="w-4 h-4" />}>
            System Settings
          </Button>
        }
      />

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard title="Total Users" value="14,231" trend={8.3} icon={<Users className="w-4 h-4" />} iconBg="rgba(124,58,237,0.15)" iconColor="#a78bfa" />
            <StatsCard title="Total Products" value="2,847" trend={2.1} icon={<Package className="w-4 h-4" />} iconBg="rgba(6,182,212,0.15)" iconColor="#22d3ee" delay={0.1} />
            <StatsCard title="Orders Today" value="342" trend={15.4} icon={<ShoppingBag className="w-4 h-4" />} iconBg="rgba(16,185,129,0.15)" iconColor="#34d399" delay={0.2} />
            <StatsCard title="System Health" value="99.8%" trend={0.1} icon={<Activity className="w-4 h-4" />} iconBg="rgba(245,158,11,0.15)" iconColor="#fbbf24" delay={0.3} />
          </div>
          <div className="glass-card p-5">
            <h3 className="font-semibold text-slate-200 font-display mb-4">New User Signups (This Week)</h3>
            <SmartLineChart data={signupTrend} xAxisKey="day" lines={[{ key: 'users', label: 'New Users', color: '#7c3aed', dot: true }]} height={220} />
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search users..." className="flex-1" />
            <Button size="sm" icon={<Plus className="w-4 h-4" />}>Add User</Button>
            <Button size="sm" variant="secondary" icon={<Download className="w-4 h-4" />}>Export</Button>
          </div>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">{user.name}</td>
                    <td className="py-3 px-4 text-slate-400">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.role === 'ADMIN' ? 'violet' : user.role === 'MANAGER' ? 'cyan' : 'emerald'} size="sm">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.status === 'Active' ? 'emerald' : 'rose'} size="sm">{user.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{user.joined}</td>
                    <td className="py-3 px-4">
                      <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="glass-card p-8 text-center">
          <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Product management panel coming soon</p>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="glass-card p-8 text-center">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Order management panel coming soon</p>
        </div>
      )}
    </div>
  )
}
