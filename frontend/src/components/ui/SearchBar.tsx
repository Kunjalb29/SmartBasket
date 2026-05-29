import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/useCustomHooks'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  placeholder?: string
  suggestions?: string[]
  debounceMs?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  autoFocus?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search products...',
  suggestions = [],
  debounceMs = 300,
  size = 'md',
  className,
  autoFocus = false,
}) => {
  const [internalValue, setInternalValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const value = controlledValue ?? internalValue
  const debouncedValue = useDebounce(value, debounceMs)

  React.useEffect(() => {
    if (debouncedValue && onSearch) {
      onSearch(debouncedValue)
    }
  }, [debouncedValue, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!controlledValue) setInternalValue(val)
    onChange?.(val)
  }

  const handleClear = () => {
    if (!controlledValue) setInternalValue('')
    onChange?.('')
  }

  const sizeStyles = {
    sm: 'h-9 pl-9 pr-8 text-sm',
    md: 'h-11 pl-10 pr-10 text-sm',
    lg: 'h-13 pl-12 pr-12 text-base',
  }

  const iconSizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' }
  const iconPositions = { sm: 'left-2.5', md: 'left-3', lg: 'left-3.5' }

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className={cn('absolute top-1/2 -translate-y-1/2 text-slate-400', iconPositions[size], iconSizes[size])} />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn('input-glass w-full', sizeStyles[size])}
        />
        {value && (
          <button onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
            <X className={iconSizes[size]} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-1 z-50 glass-card py-1"
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => { onChange?.(s); setInternalValue(s) }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 text-left"
              >
                <Search className="w-3 h-3 text-slate-500" />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
