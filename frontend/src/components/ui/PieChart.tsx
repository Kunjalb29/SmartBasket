import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DataPoint {
  name: string
  value: number
  color: string
}

interface SmartPieChartProps {
  data: DataPoint[]
  height?: number
  showLegend?: boolean
  innerRadius?: string | number
  outerRadius?: string | number
}

export const SmartPieChart: React.FC<SmartPieChartProps> = ({
  data,
  height = 250,
  showLegend = false,
  innerRadius = '45%',
  outerRadius = '75%',
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'rgba(26,31,53,0.95)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '12px',
            color: '#f8fafc',
            fontSize: '13px',
          }}
          formatter={(value: number, name: string) => [`${value}%`, name]}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8', paddingTop: '8px' }}
            iconType="circle"
            iconSize={8}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}
