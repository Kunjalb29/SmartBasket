import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategorySpendChartProps {
  data: CategoryData[];
}

export const CategorySpendChart: React.FC<CategorySpendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', padding: '8px' }}
            itemStyle={{ color: '#f8fafc', fontSize: '12px' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{value}</span>}
          />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};
