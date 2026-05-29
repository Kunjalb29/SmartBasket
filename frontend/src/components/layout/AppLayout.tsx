import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { TopNavbar } from './TopNavbar'
import { FloatingChatbot } from '@/components/ai/FloatingChatbot'
import { useUIStore } from '@/store/uiStore'
import { Toaster } from 'react-hot-toast'
import { cn } from '@/lib/utils'

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed } = useUIStore()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-base flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-64'
        )}
      >
        {/* Top Navbar */}
        <TopNavbar />

        {/* Page Content */}
        <main className="flex-1 pt-16 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating AI Chatbot */}
      <FloatingChatbot />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(var(--bg-card), 0.95)',
            color: 'rgb(var(--text-primary))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: 'rgb(var(--bg-base))' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: 'rgb(var(--bg-base))' },
          },
        }}
      />
    </div>
  )
}
