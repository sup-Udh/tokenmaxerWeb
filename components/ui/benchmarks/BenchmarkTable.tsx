import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface BenchmarkTableProps {
  title: string;
  data: { label: string; value: number }[];
  total: number;
  highlight?: boolean;
}

export function BenchmarkTable({ title, data, total, highlight }: BenchmarkTableProps) {
  return (
    <div className={cn(
      "flex flex-col border rounded-2xl overflow-hidden bg-[#0a0a0a] transition-colors",
      highlight ? "border-[var(--color-brand)]/50 shadow-[0_0_30px_rgba(255,90,31,0.1)]" : "border-white/10"
    )}>
      <div className={cn(
        "px-6 py-4 border-b text-sm font-mono tracking-widest uppercase",
        highlight ? "border-[var(--color-brand)]/30 text-[var(--color-brand)] bg-[var(--color-brand)]/5" : "border-white/10 text-white/50 bg-white/[0.02]"
      )}>
        {title}
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col font-mono text-sm md:text-base space-y-4">
        {data.map((row, i) => (
          <Reveal key={row.label} delay={i * 0.05} direction="up" className="flex justify-between items-center group">
            <span className="text-white/70 group-hover:text-white transition-colors">
              {row.label}
              <span className="hidden sm:inline-block ml-4 text-white/20 tracking-[4px]">..................</span>
            </span>
            <span className={cn(
              "font-semibold",
              highlight ? "text-[var(--color-brand)]" : "text-white/90"
            )}>
              {row.value.toLocaleString()}
            </span>
          </Reveal>
        ))}
      </div>

      <div className={cn(
        "p-6 md:p-8 border-t flex justify-between items-end",
        highlight ? "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5" : "border-white/10 bg-white/[0.02]"
      )}>
        <span className="text-white/50 text-sm font-mono uppercase tracking-widest">Total</span>
        <div className="flex flex-col items-end">
          <span className={cn(
            "text-3xl md:text-4xl font-light tracking-tighter",
            highlight ? "text-white" : "text-white/70"
          )}>
            {total.toLocaleString()}
          </span>
          <span className="text-white/40 text-xs font-mono uppercase mt-1">tokens</span>
        </div>
      </div>
    </div>
  );
}
