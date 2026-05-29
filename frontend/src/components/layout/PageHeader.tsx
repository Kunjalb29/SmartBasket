import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  badge?: React.ReactNode
  className?: string
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

  const labelMap: Record<string, string> = {
    dashboard: 'Dashboard',
    products: 'Products',
    cart: 'Cart',
    assistant: 'AI Assistant',
    nutrition: 'Nutrition',
    scanner: 'Scanner',
    analytics: 'Analytics',
    orders: 'Orders',
    settings: 'Settings',
    admin: 'Admin',
    wishlist: 'Wishlist',
    compare: 'Compare',
  }

  let path = ''
  segments.forEach((segment, i) => {
    path += `/${segment}`
    const label = labelMap[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ label, href: i < segments.length - 1 ? path : undefined })
  })

  return breadcrumbs
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
  className,
}) => {
  const location = useLocation()
  const crumbs = breadcrumbs ?? generateBreadcrumbs(location.pathname)

  return (
    <div className={cn('mb-6', className)}>
      {/* Breadcrumbs */}
      {crumbs.length > 1 && (
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-slate-300 transition-colors flex items-center gap-1">
                  {i === 0 && <Home className="w-3 h-3" />}
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-400">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title Row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold font-display text-slate-100">{title}</h1>
          {badge}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {description && (
        <p className="text-slate-400 text-sm mt-1 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
