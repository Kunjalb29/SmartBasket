import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v2`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor — Attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('smartbasket-auth')
    if (stored) {
      try {
        const { state } = JSON.parse(stored)
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`
        }
      } catch {
        // Ignore parse errors
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor — Handle 401, retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    if (status === 401) {
      localStorage.removeItem('smartbasket-auth')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
