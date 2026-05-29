import { useState, useEffect, useCallback, useRef } from 'react'

// ============================================
// useDebounce — Debounce a rapidly changing value
// ============================================
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// ============================================
// useLocalStorage — Persistent state in localStorage
// ============================================
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      // Ignore errors
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

// ============================================
// useMediaQuery — Responsive breakpoint detection
// ============================================
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet = () => useMediaQuery('(max-width: 1024px)')

// ============================================
// useClickOutside — Detect clicks outside a ref
// ============================================
export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [callback])
  return ref
}

// ============================================
// useIntersectionObserver — Lazy loading / scroll animations
// ============================================
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])
  return { ref, isIntersecting }
}

// ============================================
// usePrevious — Access the previous value of a state
// ============================================
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => { ref.current = value }, [value])
  return ref.current
}

// ============================================
// useCounter — Increment/decrement state counter
// ============================================
export function useCounter(initialValue = 0, { min = 0, max = Infinity } = {}) {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount(c => Math.min(c + 1, max)), [max])
  const decrement = useCallback(() => setCount(c => Math.max(c - 1, min)), [min])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const set = useCallback((value: number) => setCount(Math.max(min, Math.min(max, value))), [min, max])
  return { count, increment, decrement, reset, set }
}

// ============================================
// useAsync — Async operation with loading/error state
// ============================================
export function useAsync<T>(asyncFn: () => Promise<T>, immediate = false) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setData(null)
    setError(null)
    try {
      const result = await asyncFn()
      setData(result)
      setStatus('success')
      return result
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)))
      setStatus('error')
    }
  }, [asyncFn])

  useEffect(() => { if (immediate) execute() }, [execute, immediate])

  return { execute, status, data, error, isLoading: status === 'pending', isError: status === 'error', isSuccess: status === 'success' }
}
