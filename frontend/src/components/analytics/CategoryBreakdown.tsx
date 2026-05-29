import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const categoryData = [
  { name: 'Fresh Produce', value: 28.4, color: '#10b981' },
  { name: 'Dairy & Eggs', value: 18.2, color: '#06b6d4' },
  { name: 'Meat & Seafood', value: 22.7, color: '#7c3aed' },
  { name: 'Pantry', value: 15.6, color: '#f59e0b' },
  { name: 'Beverages', value: 8.3, color: '#ec4899' },
  { name: 'Other', value: 6.8, color: '#64748b' },
]

const CustomLabel: React.FC<{ cx?: number; cy?: number; midAngle?: number; innerRadius?: number; outerRadius?: number; percent?: number }> = ({
  cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0
}) => {
  if (percent < 0.08) return null
  const RADIAN = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const CategoryBreakdown: React.FC = () => {
  const total = categoryData.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="glass-card p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-200 font-display">Spending by Category</h3>
        <p className="text-xs text-slate-500 mt-0.5">Category distribution this month</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={<CustomLabel />}
          >
            {categoryData.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px', color: '#f8fafc', fontSize: '13px' }}
            formatter={(value) => [`${value}%`, 'Share']}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-2 mt-2">
        {categoryData.map(cat => (
          <div key={cat.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
              <span className="text-slate-400">{cat.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: `${(cat.value / total) * 100}%`, background: cat.color }} />
              </div>
              <span className="text-slate-300 font-medium text-xs w-10 text-right">{cat.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
