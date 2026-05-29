import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface LineConfig {
  key: string
  label: string
  color: string
  dot?: boolean
  strokeWidth?: number
  dashed?: boolean
}

interface SmartLineChartProps {
  data: Record<string, unknown>[]
  xAxisKey: string
  lines: LineConfig[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  formatTooltipValue?: (value: number, key: string) => string
}

export const SmartLineChart: React.FC<SmartLineChartProps> = ({
  data,
  xAxisKey,
  lines,
  height = 250,
  showGrid = true,
  showLegend = false,
  formatTooltipValue,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        )}
        <XAxis
          dataKey={xAxisKey}
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
          formatter={(value: any, name: any) => [
            formatTooltipValue ? formatTooltipValue(Number(value), String(name)) : value,
            lines.find(l => l.key === name)?.label ?? name,
          ]}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            iconType="circle"
            iconSize={8}
          />
        )}
        {lines.map(line => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={line.strokeWidth ?? 2}
            dot={line.dot ? { fill: line.color, r: 3 } : false}
            strokeDasharray={line.dashed ? '5 5' : undefined}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
