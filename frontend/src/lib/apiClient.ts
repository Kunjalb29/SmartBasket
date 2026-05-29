import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

/**
 * Axios HTTP client configured for SmartBasket API
 * - Automatic JWT token injection
 * - Response error handling with refresh logic
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sb_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle 401 with token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = localStorage.getItem('sb_refresh_token')
        if (!refreshToken) throw new Error('No refresh token')

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, null, {
          headers: { 'X-Refresh-Token': refreshToken },
        })

        localStorage.setItem('sb_token', data.token)
        localStorage.setItem('sb_refresh_token', data.refreshToken)
        original.headers.Authorization = `Bearer ${data.token}`
        return apiClient(original)
      } catch {
        // Refresh failed — clear auth and redirect
        localStorage.removeItem('sb_token')
        localStorage.removeItem('sb_refresh_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
