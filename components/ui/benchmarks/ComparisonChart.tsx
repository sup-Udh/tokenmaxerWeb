"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Reveal } from "@/components/ui/Reveal";

interface ComparisonChartProps {
  data: { category: string; withCodeBroker: number; withoutCodeBroker: number }[];
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  // Custom tooltip to match dark theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-2xl font-mono text-sm">
          <p className="text-white/70 mb-3 uppercase tracking-widest text-xs border-b border-white/10 pb-2">{label}</p>
          <div className="flex flex-col gap-2">
            <p className="text-[var(--color-brand)]">
              CodeBroker: <span className="text-white font-semibold">{payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-blue-500">
              Traditional: <span className="text-white font-semibold">{payload[1].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          barGap={8}
        >
          <XAxis 
            dataKey="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace" }}
            dy={16}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
          
          <Bar 
            dataKey="withCodeBroker" 
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-cb-${index}`} fill="var(--color-brand)" />
            ))}
          </Bar>

          <Bar 
            dataKey="withoutCodeBroker" 
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-tr-${index}`} fill="#3b82f6" opacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
