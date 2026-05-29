import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, CreditCard, Globe, Moon, Sun, Trash2, Save, Camera, Bot, Zap } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Avatar } from '@/components/ui/Display'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'ai', label: 'AI Preferences', icon: Bot },
]

const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Sodium', 'Dairy-Free', 'Nut-Free']
const allergenOptions = ['Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Wheat', 'Soy']

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore()
  const { theme, toggleTheme } = useUIStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [budget, setBudget] = useState(user?.monthlyBudget?.toString() ?? '500')
  const [dietary, setDietary] = useState<string[]>(['Vegetarian'])
  const [allergens, setAllergens] = useState<string[]>([])
  const [notifs, setNotifs] = useState({ orders: true, aiRecommendations: true, priceDrops: true, weeklyReport: true, marketing: false })

  const toggleDietary = (d: string) => setDietary(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  const toggleAllergen = (a: string) => setAllergens(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-100">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account, preferences, and privacy</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-slate-200 font-display mb-5">Personal Information</h3>
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <Avatar src={user?.avatar} name={user?.name} size="xl" showStatus />
                      <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-violet-600 border-2 border-slate-900 flex items-center justify-center hover:bg-violet-500 transition-colors">
                        <Camera className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200">{user?.name}</p>
                      <p className="text-sm text-slate-400">{user?.email}</p>
                      <Badge variant="violet" className="mt-1.5">{user?.role}</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', value: name, setter: setName, type: 'text', placeholder: 'Your name' },
                      { label: 'Email Address', value: email, setter: setEmail, type: 'email', placeholder: 'your@email.com' },
                    ].map(({ label, value, setter, type, placeholder }) => (
                      <div key={label}>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                        <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} className="input-glass w-full" />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Monthly Budget ($)</label>
                      <input type="number" value={budget} onChange={e => setBudget(e.target.value)} className="input-glass w-full" min={0} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Theme</label>
                      <button onClick={toggleTheme} className="flex items-center gap-2 input-glass w-full text-left">
                        {theme === 'dark' ? <Moon className="w-4 h-4 text-violet-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                        <span className="capitalize text-slate-300">{theme} Mode</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-slate-200 font-display mb-4">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {dietaryOptions.map(d => (
                      <button key={d} onClick={() => toggleDietary(d)} className={`tag-pill ${dietary.includes(d) ? 'active' : ''}`}>{d}</button>
                    ))}
                  </div>
                  <h3 className="font-semibold text-slate-200 font-display mb-3">Allergen Alerts</h3>
                  <div className="flex flex-wrap gap-2">
                    {allergenOptions.map(a => (
                      <button key={a} onClick={() => toggleAllergen(a)} className={`tag-pill ${allergens.includes(a) ? 'border-rose-500/50 bg-rose-500/10 text-rose-400' : ''}`}>{a}</button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="secondary" onClick={() => toast('Changes discarded')}>Cancel</Button>
                  <Button icon={<Save className="w-4 h-4" />} onClick={() => toast.success('Profile saved! ✅')}>Save Changes</Button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="glass-card p-6 space-y-5">
                <h3 className="font-semibold text-slate-200 font-display">Notification Preferences</h3>
                {[
                  { key: 'orders', label: 'Order Updates', desc: 'Track your orders in real-time' },
                  { key: 'aiRecommendations', label: 'AI Recommendations', desc: 'Personalized product suggestions' },
                  { key: 'priceDrops', label: 'Price Drop Alerts', desc: 'When wishlist items go on sale' },
                  { key: 'weeklyReport', label: 'Weekly Health Report', desc: 'Summary of your nutrition and spending' },
                  { key: 'marketing', label: 'Marketing Emails', desc: 'Promotions and newsletters' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{label}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifs] }))}
                      className={`relative w-10 h-6 rounded-full transition-all duration-300 ${notifs[key as keyof typeof notifs] ? 'bg-violet-600' : 'bg-slate-700'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${notifs[key as keyof typeof notifs] ? 'left-5' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
                <Button icon={<Save className="w-4 h-4" />} onClick={() => toast.success('Notifications saved!')}>Save Preferences</Button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-slate-200 font-display mb-4">Change Password</h3>
                  <div className="space-y-3 max-w-md">
                    {['Current Password', 'New Password', 'Confirm New Password'].map(l => (
                      <div key={l}>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">{l}</label>
                        <input type="password" placeholder="••••••••" className="input-glass w-full" />
                      </div>
                    ))}
                    <Button icon={<Shield className="w-4 h-4" />} onClick={() => toast.success('Password updated! 🔒')}>Update Password</Button>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-slate-200 font-display mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-300">Authenticator App</p>
                      <p className="text-xs text-slate-500">Use Google Authenticator or similar</p>
                    </div>
                    <Badge variant="rose">Disabled</Badge>
                  </div>
                  <Button variant="secondary" className="mt-4" onClick={() => toast('2FA setup coming soon!')}>Enable 2FA</Button>
                </div>
                <div className="glass-card p-6 border-rose-500/20">
                  <h3 className="font-semibold text-rose-400 font-display mb-3">Danger Zone</h3>
                  <p className="text-sm text-slate-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} onClick={() => toast.error('Account deletion disabled in demo.')}>Delete Account</Button>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-4">
                <div className="glass-card p-6 border-violet-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-200 font-display">Current Plan</h3>
                    <Badge variant="violet">Pro</Badge>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold text-slate-100">$9.99</span>
                    <span className="text-slate-400 mb-1">/month</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">Next billing date: January 1, 2025</p>
                  <Button variant="secondary" onClick={() => toast('Plan management coming soon!')}>Manage Plan</Button>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-slate-200 font-display mb-4">Payment Methods</h3>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-12 h-8 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs text-white font-bold">VISA</div>
                    <div>
                      <p className="text-sm text-slate-200">Visa ending in 4242</p>
                      <p className="text-xs text-slate-500">Expires 12/27</p>
                    </div>
                    <Badge variant="emerald" className="ml-auto">Default</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3" onClick={() => toast('Add card coming soon!')}>+ Add Payment Method</Button>
                </div>
              </div>
            )}

            {/* AI Tab */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                      <Bot className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 font-display">AI Preferences</h3>
                      <p className="text-xs text-slate-500">Personalize how Basket AI helps you</p>
                    </div>
                  </div>
                  {[
                    { label: 'Personalized Recommendations', desc: 'AI analyzes your history for better suggestions', enabled: true },
                    { label: 'Health Goal Optimization', desc: 'Prioritize products matching your health goals', enabled: true },
                    { label: 'Budget Intelligence', desc: 'AI helps you stay within budget automatically', enabled: true },
                    { label: 'Smart Cart Optimization', desc: 'Auto-suggest healthier/cheaper alternatives', enabled: false },
                    { label: 'Learning from Purchases', desc: 'AI learns from what you buy for better recommendations', enabled: true },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <div className={`relative w-10 h-6 rounded-full transition-all duration-300 ${item.enabled ? 'bg-violet-600' : 'bg-slate-700'}`}>
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${item.enabled ? 'left-5' : 'left-1'}`} />
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 p-3 rounded-xl bg-violet-500/[0.08] border border-violet-500/20">
                    <p className="text-xs text-violet-400">
                      <Zap className="w-3 h-3 inline mr-1" />
                      AI Score: <strong>94/100</strong> — Basket AI is well calibrated to your preferences
                    </p>
                  </div>
                  <Button icon={<Save className="w-4 h-4" />} className="mt-4" onClick={() => toast.success('AI preferences saved! 🤖')}>Save AI Settings</Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
