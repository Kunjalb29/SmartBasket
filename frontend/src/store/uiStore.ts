import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Notification } from '@/types'
import { notifications as mockNotifications } from '@/data/mockData'

interface UIStore {
  theme: 'dark' | 'light'
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  notifications: Notification[]
  notificationPanelOpen: boolean
  toggleTheme: () => void
  setTheme: (theme: 'dark' | 'light') => void
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  toggleNotificationPanel: () => void
  markNotificationRead: (id: string) => void
  markAllRead: () => void
  addNotification: (n: Omit<Notification, 'id' | 'createdAt'>) => void
  getUnreadCount: () => number
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      sidebarOpen: true,
      sidebarCollapsed: false,
      notifications: mockNotifications,
      notificationPanelOpen: false,

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark'
        document.documentElement.classList.toggle('light', newTheme === 'light')
        set({ theme: newTheme })
      },

      setTheme: (theme) => {
        document.documentElement.classList.toggle('light', theme === 'light')
        set({ theme })
      },

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      toggleNotificationPanel: () =>
        set((state) => ({ notificationPanelOpen: !state.notificationPanelOpen })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      addNotification: (n) =>
        set((state) => ({
          notifications: [
            {
              ...n,
              id: `notif-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
            ...state.notifications,
          ],
        })),

      getUnreadCount: () => get().notifications.filter((n) => !n.read).length,
    }),
    { name: 'smartbasket-ui', partialize: (state) => ({ theme: state.theme, sidebarCollapsed: state.sidebarCollapsed }) }
  )
)
