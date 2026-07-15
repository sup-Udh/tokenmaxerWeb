"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  LabelList,
} from "recharts";

interface Row {
  name: string;
  tokens: number;
  note: string;
}

const data: Row[] = [
  { name: "Raw Files", tokens: 100000, note: "whole repo in context" },
  { name: "Vector Search", tokens: 40000, note: "nearest-neighbour chunks" },
  { name: "CodeBroker", tokens: 15000, note: "graph-ranked context" },
];

const BASELINE = data[0].tokens;

const fmt = (n: number) => (n >= 1000 ? `${n / 1000}k` : `${n}`);

interface TooltipPayload {
  payload: Row;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const cut = Math.round(((BASELINE - row.tokens) / BASELINE) * 100);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4 font-mono text-sm shadow-2xl">
      <p className="mb-2 border-b border-white/10 pb-2 text-xs uppercase tracking-widest text-[#E5E5E5]">
        {row.name}
      </p>
      <p className="text-white">
        {row.tokens.toLocaleString()}{" "}
        <span className="text-white/40">tokens</span>
      </p>
      <p className="mt-1 text-xs text-white/40">{row.note}</p>
      {cut > 0 && (
        <p className="mt-2 text-xs text-[var(--color-brand)]">▼ {cut}% vs raw files</p>
      )}
    </div>
  );
}

export function TokenReductionChart() {
  return (
    <div className="mb-12 w-full rounded-xl border border-[#232323] bg-[#0A0A0A] p-4 pt-6 md:p-6 md:pt-8">
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 28, right: 8, left: -12, bottom: 8 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "monospace" }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="tokens" radius={[6, 6, 0, 0]} maxBarSize={90} animationDuration={900}>
              <LabelList
                dataKey="tokens"
                position="top"
                formatter={(label: unknown) => fmt(Number(label))}
                style={{
                  fill: "rgba(255,255,255,0.5)",
                  fontSize: 11,
                  fontFamily: "monospace",
                }}
              />
              {data.map((row) => (
                <Cell
                  key={row.name}
                  fill={
                    row.name === "CodeBroker"
                      ? "var(--color-brand)"
                      : "rgba(255,255,255,0.16)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 border-t border-white/5 pt-4 text-center font-mono text-xs text-white/35">
        Tokens sent to the model to answer one question · 1,000-file TypeScript repository
      </p>
    </div>
  );
}
