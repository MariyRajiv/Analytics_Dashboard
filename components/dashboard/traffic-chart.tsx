"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { ChartContainer } from './chart-container'
import { ChartDataPoint } from '@/lib/mock-data'

interface TrafficChartProps {
  data: ChartDataPoint[]
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <ChartContainer 
      title="Traffic Sources" 
      description="Distribution of website traffic by source"
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                stroke="var(--background)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string) => [`${value}%`, name]}
            contentStyle={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-current text-sm font-medium">
            Traffic Sources
          </text>
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px' }}
            formatter={(value, entry) => `${value} (${entry.payload.value}%)`}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}