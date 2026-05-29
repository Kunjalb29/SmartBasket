import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, DollarSign, Heart, LogOut, Save, Moon, Sun, Globe } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { useAuth } from '@/hooks/useAuth'
import { useUIStore } from '@/store/uiStore'
import toast from 'react-hot-toast'

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  { id: 'preferences', label: 'Preferences', icon: <Palette className="w-4 h-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  { id: 'budget', label: 'Budget', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'health', label: 'Health Goals', icon: <Heart className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
]

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const { user, logout } = useAuth()
  const { theme, setTheme } = useUIStore()

  const [profileData, setProfileData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: '',
    dateOfBirth: '',
  })

  const [budget, setBudget] = useState({ monthly: 400, weekly: 100 })
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000)
  const [notifs, setNotifs] = useState({ priceDrop: true, orderUpdates: true, aiRecommendations: true, budgetAlerts: true, promotions: false })
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(['organic'])

  const handleSave = () => toast.success('Settings saved successfully!', { icon: '✅' })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and health goals"
      />

      {/* Vertical Layout */}
      <div className="flex gap-6">
        {/* Tab Nav */}
        <div className="w-48 flex-shrink-0">
          <div className="space-y-1">
            {SETTINGS_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  activeTab === tab.id ? 'text-violet-300' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                style={activeTab === tab.id ? { background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.2)' } : { border: '1px solid transparent' }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <button onClick={logout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-all text-left mt-4">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              {/* Avatar */}
              <div className="glass-card p-5">
                <h3 className="font-semibold text-slate-200 mb-4">Profile Picture</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
                    {(user?.name ?? 'U')[0]}
                  </div>
                  <Button variant="secondary" size="sm">Upload Photo</Button>
                </div>
              </div>

              {/* Personal Info */}
              <div className="glass-card p-5 space-y-4">
                <h3 className="font-semibold text-slate-200">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email' },
                    { label: 'Phone', key: 'phone', type: 'tel' },
                    { label: 'Date of Birth', key: 'dateOfBirth', type: 'date' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={profileData[f.key as keyof typeof profileData]}
                        onChange={e => setProfileData(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="input-glass w-full text-sm"
                      />
                    </div>
                  ))}
                </div>
                <Button icon={<Save className="w-4 h-4" />} onClick={handleSave}>Save Changes</Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="glass-card p-5">
                <h3 className="font-semibold text-slate-200 mb-4">Appearance</h3>
                <div className="flex items-center gap-3">
                  {(['dark', 'light'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${theme === t ? 'text-violet-300' : 'text-slate-400 hover:text-slate-200'}`}
                      style={theme === t ? { background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {t === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass-card p-5">
                <h3 className="font-semibold text-slate-200 mb-4">Dietary Restrictions</h3>
                <div className="flex flex-wrap gap-2">
                  {['organic', 'vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'].map(r => {
                    const active = dietaryRestrictions.includes(r)
                    return (
                      <button
                        key={r}
                        onClick={() => setDietaryRestrictions(prev => active ? prev.filter(x => x !== r) : [...prev, r])}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active ? 'text-emerald-300' : 'text-slate-400 hover:text-slate-200'}`}
                        style={active ? { background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {r}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 space-y-4">
              <h3 className="font-semibold text-slate-200">Notification Preferences</h3>
              {Object.entries(notifs).map(([key, value]) => {
                const labels: Record<string, string> = {
                  priceDrop: 'Price drop alerts',
                  orderUpdates: 'Order status updates',
                  aiRecommendations: 'AI product recommendations',
                  budgetAlerts: 'Budget limit warnings',
                  promotions: 'Promotions and offers',
                }
                return (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="text-sm text-slate-200">{labels[key]}</p>
                    </div>
                    <button
                      onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-violet-600' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                )
              })}
              <Button icon={<Save className="w-4 h-4" />} onClick={handleSave}>Save Preferences</Button>
            </motion.div>
          )}

          {activeTab === 'budget' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="glass-card p-5 space-y-4">
                <h3 className="font-semibold text-slate-200">Budget Limits</h3>
                {[
                  { label: 'Monthly Budget', key: 'monthly', value: budget.monthly },
                  { label: 'Weekly Budget', key: 'weekly', value: budget.weekly },
                ].map(b => (
                  <div key={b.key}>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">{b.label}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <input
                        type="number"
                        value={b.value}
                        onChange={e => setBudget(prev => ({ ...prev, [b.key]: Number(e.target.value) }))}
                        className="input-glass w-full pl-8 text-sm"
                      />
                    </div>
                  </div>
                ))}
                <Button icon={<Save className="w-4 h-4" />} onClick={handleSave}>Save Budget</Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'health' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 space-y-4">
              <h3 className="font-semibold text-slate-200">Daily Nutrition Goals</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Daily Calorie Goal</label>
                <input
                  type="range"
                  min={1200}
                  max={3500}
                  step={50}
                  value={dailyCalorieGoal}
                  onChange={e => setDailyCalorieGoal(Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1,200 kcal</span>
                  <span className="text-violet-400 font-bold">{dailyCalorieGoal.toLocaleString()} kcal</span>
                  <span>3,500 kcal</span>
                </div>
              </div>
              <Button icon={<Save className="w-4 h-4" />} onClick={handleSave}>Save Health Goals</Button>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="glass-card p-5 space-y-4">
                <h3 className="font-semibold text-slate-200">Change Password</h3>
                {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
                    <input type="password" className="input-glass w-full text-sm" placeholder="••••••••" />
                  </div>
                ))}
                <Button icon={<Shield className="w-4 h-4" />} onClick={handleSave}>Update Password</Button>
              </div>
              <Alert variant="info">
                Two-factor authentication and session management coming soon.
              </Alert>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
