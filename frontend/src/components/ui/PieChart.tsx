import React from 'react'
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { cn } from '@/lib/utils'

interface PieSlice {
  name: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieSlice[]
  height?: number
  innerRadius?: number | string
  outerRadius?: number | string
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
  label?: boolean
  formatTooltip?: (value: number, name: string) => string
}

const defaultColors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const CustomLabel: React.FC<{
  cx?: number; cy?: number; midAngle?: number; innerRadius?: number; outerRadius?: number; percent?: number; name?: string
}> = ({ cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0 }) => {
  if (percent < 0.08) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const SmartPieChart: React.FC<PieChartProps> = ({
  data,
  height = 300,
  innerRadius = '55%',
  outerRadius = '80%',
  showLegend = true,
  showTooltip = true,
  className,
  label = false,
  formatTooltip,
}) => {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={label ? <CustomLabel /> : undefined}
          >
            {data.map((slice, i) => (
              <Cell
                key={slice.name}
                fill={slice.color ?? defaultColors[i % defaultColors.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                background: 'rgba(26,31,53,0.95)',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '12px',
                color: '#f8fafc',
                fontSize: '13px',
              }}
              formatter={(value, name) => [
                formatTooltip ? formatTooltip(Number(value), String(name)) : value,
                name,
              ]}
            />
          )}
          {showLegend && (
            <Legend
              formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>}
            />
          )}
        </RePieChart>
      </ResponsiveContainer>
    </div>
  )
}
