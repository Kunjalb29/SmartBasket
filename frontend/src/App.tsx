import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppLayout } from '@/components/layout/AppLayout'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CartPage } from '@/pages/CartPage'
import { AIAssistantPage } from '@/pages/AIAssistantPage'
import { NutritionPage } from '@/pages/NutritionPage'
import { ScannerPage } from '@/pages/ScannerPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AdminPage } from '@/pages/AdminPage'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

// Protected route guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

// Admin route guard
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.role !== 'ADMIN') return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

function App() {
  const { theme } = useUIStore()

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected App Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="assistant" element={<AIAssistantPage />} />
          <Route path="nutrition" element={<NutritionPage />} />
          <Route path="scanner" element={<ScannerPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Admin-only routes */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
