import React from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, Search, X } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  onClear?: () => void
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  icon,
  iconRight,
  onClear,
  className,
  value,
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {props.required && <span className="text-rose-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'input-glass',
            icon && 'pl-10',
            (iconRight || onClear) && 'pr-10',
            error && 'border-rose-500/50 focus:border-rose-500 focus:shadow-rose-500/10',
            className
          )}
          value={value}
          {...props}
        />
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {iconRight && !onClear && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [show, setShow] = React.useState(false)
  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      iconRight={
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-slate-400 hover:text-slate-200 transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  )
}

interface SearchInputProps extends Omit<InputProps, 'icon'> {
  onSearch?: (value: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onChange, value, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onSearch?.(e.target.value)
  }

  return (
    <Input
      icon={<Search className="w-4 h-4" />}
      onClear={value ? () => onSearch?.('') : undefined}
      value={value}
      onChange={handleChange}
      placeholder="Search products, brands, categories..."
      {...props}
    />
  )
}
