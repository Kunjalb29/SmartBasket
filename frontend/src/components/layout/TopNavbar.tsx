import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Bell, Sun, Moon, Bot, Menu, X,
  ShoppingCart, Settings, LogOut, User, ChevronRight, Check
} from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { useAIStore } from '@/store/aiStore'
import { Avatar } from '@/components/ui/Display'
import { formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

export const TopNavbar: React.FC = () => {
  const { theme, toggleTheme, notifications, notificationPanelOpen, toggleNotificationPanel, markAllRead, markNotificationRead, getUnreadCount, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const { openChat } = useAIStore()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const unreadCount = getUnreadCount()
  const cartItems = getTotalItems()

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const notifIcons: Record<string, string> = {
    order: '📦',
    recommendation: '🤖',
    price_drop: '💰',
    health: '💚',
    promo: '🛍️',
    system: '⚙️',
  }

  return (
    <header className="top-navbar left-0 w-full h-16 px-4 flex items-center justify-between gap-4">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className={cn('relative flex-1 max-w-xl transition-all duration-300', searchFocused ? 'max-w-2xl' : '')}>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search products, brands, nutrition..."
            className="input-glass pl-10 pr-4 py-2.5 text-sm w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {/* Search Dropdown */}
          <AnimatePresence>
            {searchFocused && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full mt-2 left-0 right-0 glass-card p-2 z-50 border border-violet-500/20"
              >
                <p className="text-xs text-slate-500 px-2 py-1">Press Enter to search for "{searchQuery}"</p>
                <button
                  onClick={() => { navigate(`/products?q=${searchQuery}`); setSearchFocused(false) }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-left"
                >
                  <Search className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-slate-300">Search for <strong>"{searchQuery}"</strong></span>
                  <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* AI Assistant Quick Button */}
        <button
          onClick={openChat}
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all text-violet-400 text-sm font-medium"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden md:block">Ask AI</span>
        </button>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItems > 0 && (
            <span className="notif-dot">{cartItems > 9 ? '9+' : cartItems}</span>
          )}
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotificationPanel}
            className="relative p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="notif-dot">{unreadCount}</span>
            )}
          </button>

          <AnimatePresence>
            {notificationPanelOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass-card z-50 overflow-hidden border border-violet-500/20"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                  <h3 className="font-semibold text-sm text-slate-200">Notifications</h3>
                  <button onClick={markAllRead} className="text-xs text-violet-400 hover:text-violet-300">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 6).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={cn(
                        'w-full flex items-start gap-3 p-3.5 hover:bg-white/5 transition-colors text-left border-b border-white/[0.03]',
                        !n.read && 'bg-violet-500/[0.04]'
                      )}
                    >
                      <span className="text-lg flex-shrink-0">{notifIcons[n.type] ?? '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs font-semibold', n.read ? 'text-slate-400' : 'text-slate-200')}>
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-slate-600 mt-1">{formatRelativeTime(n.createdAt)}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="p-3 border-t border-white/[0.06]">
                  <Link
                    to="/settings"
                    onClick={toggleNotificationPanel}
                    className="w-full text-center text-xs text-violet-400 hover:text-violet-300 block"
                  >
                    View all notifications →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-200 leading-none">{user?.name?.split(' ')[0]}</p>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5 capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-12 w-52 glass-card z-50 p-1.5 border border-violet-500/20"
              >
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <p className="text-xs font-semibold text-slate-200">{user?.name}</p>
                  <p className="text-[10px] text-slate-500">{user?.email}</p>
                </div>
                {[
                  { icon: User, label: 'Profile', path: '/settings' },
                  { icon: Settings, label: 'Settings', path: '/settings' },
                  { icon: ShoppingCart, label: 'My Cart', path: '/cart' },
                ].map(({ icon: Icon, label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </Link>
                ))}
                <div className="border-t border-white/[0.06] mt-1 pt-1">
                  <button
                    onClick={() => { logout(); navigate('/login') }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
