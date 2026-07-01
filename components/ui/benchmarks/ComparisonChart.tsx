"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from "recharts";

interface ComparisonChartProps {
  data: { category: string; withCodeBroker: number; withoutCodeBroker: number }[];
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-2xl font-mono text-sm">
          <p className="text-[#E5E5E5] mb-3 uppercase tracking-widest text-xs border-b border-white/10 pb-2">{label}</p>
          <div className="flex flex-col gap-2">
            <p className="text-[#FF6A2D]">
              CodeBroker: <span className="text-white font-semibold">{payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-[#5B7CFF]">
              Traditional: <span className="text-white font-semibold">{payload[1].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, index } = props;
    const dataEntry = data[index];
    const reduction = Math.round(((dataEntry.withoutCodeBroker - dataEntry.withCodeBroker) / dataEntry.withoutCodeBroker) * 100);
    return (
      <text 
        x={x + width / 2} 
        y={y - 8} 
        fill="#FF6A2D" 
        textAnchor="middle" 
        fontSize="11" 
        fontFamily="monospace"
      >
        ▼{reduction}%
      </text>
    );
  };

  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 30, right: 0, left: -20, bottom: 20 }}
          barGap={4}
        >
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          
          <XAxis 
            dataKey="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#E5E5E5", fontSize: 11, fontFamily: "monospace" }}
            dy={16}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#E5E5E5", fontSize: 11, fontFamily: "monospace" }}
            tickFormatter={(value) => value === 0 ? "0k" : `${value / 1000}k`}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
          
          <Bar 
            dataKey="withCodeBroker" 
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-cb-${index}`} fill="#FF6A2D" />
            ))}
            <LabelList content={<CustomLabel />} />
          </Bar>

          <Bar 
            dataKey="withoutCodeBroker" 
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-tr-${index}`} fill="#5B7CFF" opacity={0.9} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
