import React from 'react'
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { cn } from '@/lib/utils'

interface DataPoint {
  [key: string]: string | number
}

interface LineChartProps {
  data: DataPoint[]
  lines: Array<{
    key: string
    label: string
    color?: string
    strokeWidth?: number
    dot?: boolean
  }>
  xAxisKey: string
  height?: number
  className?: string
  showGrid?: boolean
  showLegend?: boolean
  formatTooltip?: (value: number, name: string) => string
  formatXAxis?: (value: string) => string
}

const CustomTooltip: React.FC<{ active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card p-3 shadow-xl border-violet-500/20">
      <p className="text-xs font-semibold text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="font-semibold text-slate-100">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export const SmartLineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisKey,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
  formatXAxis,
}) => {
  const defaultColors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          )}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatXAxis}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
          {lines.map((line, i) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label}
              stroke={line.color ?? defaultColors[i % defaultColors.length]}
              strokeWidth={line.strokeWidth ?? 2}
              dot={line.dot ? { r: 4, fill: line.color ?? defaultColors[i % defaultColors.length] } : false}
              activeDot={{ r: 6, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  )
}
