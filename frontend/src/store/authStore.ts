import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState, LoginCredentials, RegisterData } from '@/types'
import { currentUser } from '@/data/mockData'

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true })
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200))
        
        if (credentials.email && credentials.password) {
          const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock'
          set({
            user: currentUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }
        set({ isLoading: false })
        return false
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (data.email && data.password && data.name) {
          const newUser: User = {
            ...currentUser,
            id: `user-${Date.now()}`,
            name: data.name,
            email: data.email,
            joinedAt: new Date().toISOString(),
            stats: { totalOrders: 0, totalSpent: 0, savedAmount: 0, productsScanned: 0, healthGoalsMet: 0, streakDays: 0 },
          }
          set({
            user: newUser,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newuser',
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }
        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },
    }),
    { name: 'smartbasket-auth' }
  )
)
