import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Package, ShoppingCart, Bot, BarChart3,
  Heart, ClipboardList, Settings, Shield, LogOut,
  ChevronLeft, ChevronRight, Zap, Scan
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import { Avatar } from '@/components/ui/Display'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-violet-400' },
  { path: '/products', icon: Package, label: 'Products', color: 'text-cyan-400' },
  { path: '/cart', icon: ShoppingCart, label: 'Smart Cart', color: 'text-emerald-400', badge: true },
  { path: '/assistant', icon: Bot, label: 'AI Assistant', color: 'text-violet-400' },
  { path: '/scanner', icon: Scan, label: 'Scanner', color: 'text-amber-400' },
  { path: '/nutrition', icon: Heart, label: 'Nutrition', color: 'text-rose-400' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics', color: 'text-cyan-400' },
  { path: '/orders', icon: ClipboardList, label: 'Orders', color: 'text-emerald-400' },
  { path: '/settings', icon: Settings, label: 'Settings', color: 'text-slate-400' },
  { path: '/admin', icon: Shield, label: 'Admin', color: 'text-amber-400', adminOnly: true },
]

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()
  const { getTotalItems } = useCartStore()
  const navigate = useNavigate()
  const cartCount = getTotalItems()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.aside
      className="sidebar flex flex-col z-40"
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.06]">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm font-display gradient-text">SmartBasket</span>
                <p className="text-[10px] text-slate-500 leading-none">AI Shopping</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {sidebarCollapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto">
            <Zap className="w-4 h-4 text-white" />
          </div>
        )}
        {!sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          if (item.adminOnly && user?.role !== 'ADMIN') return null
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                  isActive
                    ? 'nav-item-active'
                    : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? item.color : 'group-hover:' + item.color)} />
                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="text-sm font-medium flex-1 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.badge && cartCount > 0 && !sidebarCollapsed && (
                    <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                  {item.badge && cartCount > 0 && sidebarCollapsed && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-violet-600 text-white text-[9px] font-bold flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 rounded-lg bg-slate-800 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-white/10">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer: User + Expand Button */}
      <div className="border-t border-white/[0.06] p-3 space-y-2">
        {!sidebarCollapsed && user && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
            <Avatar src={user.avatar} name={user.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 w-full',
            sidebarCollapsed && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-sm">Logout</span>}
        </button>

        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all w-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.aside>
  )
}
