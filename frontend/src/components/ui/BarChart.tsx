import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface SmartBarChartProps {
  data: Record<string, unknown>[]
  dataKey: string
  nameKey: string
  height?: number
  color?: string
  gradient?: boolean
  showGrid?: boolean
  formatTooltip?: (value: number) => string
}

const GRADIENT_COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed']

export const SmartBarChart: React.FC<SmartBarChartProps> = ({
  data,
  dataKey,
  nameKey,
  height = 250,
  color = '#7c3aed',
  gradient = false,
  showGrid = true,
  formatTooltip,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        )}
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
          formatter={(value: any) => [formatTooltip ? formatTooltip(Number(value)) : value, dataKey]}
        />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} maxBarSize={48}>
          {gradient
            ? data.map((_, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={GRADIENT_COLORS[i % GRADIENT_COLORS.length]}
                />
              ))
            : <Cell fill={color} />}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
