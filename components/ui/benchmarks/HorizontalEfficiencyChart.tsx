"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

interface HorizontalEfficiencyChartProps {
  data: { phase: string; withCodeBroker: number; withoutCodeBroker: number }[];
}

export function HorizontalEfficiencyChart({ data }: HorizontalEfficiencyChartProps) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          barCategoryGap="20%"
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis 
            type="category" 
            dataKey="phase" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Inter, sans-serif", fontWeight: 300 }}
            width={120}
          />
          
          <Bar 
            dataKey="withoutCodeBroker" 
            fill="#3b82f6" 
            radius={[0, 4, 4, 0]}
            barSize={12}
            isAnimationActive={true}
            animationDuration={2000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-hor-tr-${index}`} fill="#3b82f6" opacity={0.6} />
            ))}
          </Bar>
          
          <Bar 
            dataKey="withCodeBroker" 
            fill="var(--color-brand)" 
            radius={[0, 4, 4, 0]}
            barSize={12}
            isAnimationActive={true}
            animationDuration={2000}
            animationBegin={500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
