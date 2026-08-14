// components/AnalyticsChart.tsx
'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface ChartDataPoint {
  date: string;
  views: number;
}

export default function AnalyticsChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#52525b" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#52525b" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#09090b',
              border: '1px solid #27272a',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#viewsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}