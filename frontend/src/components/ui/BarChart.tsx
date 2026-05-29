import React from 'react'
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { cn } from '@/lib/utils'

interface BarData {
  [key: string]: string | number
}

interface BarChartProps {
  data: BarData[]
  dataKey: string
  nameKey?: string
  height?: number
  color?: string
  gradient?: boolean
  rounded?: boolean
  className?: string
  showGrid?: boolean
  formatTooltip?: (value: number) => string
  colors?: string[]
}

const defaultColors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export const SmartBarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  nameKey = 'name',
  height = 300,
  color = '#7c3aed',
  gradient = true,
  rounded = true,
  className,
  showGrid = true,
  formatTooltip,
  colors,
}) => {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          {gradient && (
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                <stop offset="95%" stopColor={color} stopOpacity={0.4} />
              </linearGradient>
            </defs>
          )}
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />}
          <XAxis
            dataKey={nameKey}
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(26,31,53,0.95)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '13px',
            }}
            formatter={(value) => [formatTooltip ? formatTooltip(Number(value)) : value, dataKey]}
          />
          <Bar
            dataKey={dataKey}
            fill={gradient ? 'url(#barGradient)' : color}
            radius={rounded ? [6, 6, 0, 0] : undefined}
          >
            {colors && data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
            {!colors && data.map((_, i) => (
              <Cell key={i} fill={colors ? colors[i % defaultColors.length] : color} />
            ))}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}
