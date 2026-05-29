import { useAuthStore } from '@/store/authStore'

/**
 * Convenience hook wrapping the auth store.
 * Provides a clean interface for components to use auth state.
 */
export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, register, logout, updateUser } = useAuthStore()

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    isAdmin: user?.role === 'ADMIN',
    displayName: user?.name ?? 'Guest',
    avatar: user?.avatar,
    initials: user?.name
      ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'GU',
  }
}
