import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";

// Data
import { 
  TOKEN_CONSUMPTION, 
  CATEGORY_COMPARISON, 
  EFFICIENCY_PHASES, 
  BENCHMARK_CARDS, 
  PERFORMANCE_METRICS 
} from "@/lib/benchmark-data";

// Benchmark UI Components
import { BenchmarkTable } from "@/components/ui/benchmarks/BenchmarkTable";
import { ComparisonChart } from "@/components/ui/benchmarks/ComparisonChart";
import { HorizontalEfficiencyChart } from "@/components/ui/benchmarks/HorizontalEfficiencyChart";
import { BenchmarkCard } from "@/components/ui/benchmarks/BenchmarkCard";
import { MetricCounter } from "@/components/ui/benchmarks/MetricCounter";

export function GraphBenchmarks() {
  return (
    <section id="benchmarks" className="py-32 relative">
      <Container>
        {/* Section Header */}
        <div className="mb-24">
          <SectionNumber number="04" className="mb-6 inline-block text-[var(--color-brand)] border border-[var(--color-brand)]/20 px-3 py-1 rounded-full bg-[var(--color-brand)]/10" />
          <SectionTitle 
            title="Benchmark Results"
            subtitle="Measured on real-world repositories."
          />
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/60 font-light mt-4 leading-relaxed max-w-3xl">
              Less context. Better answers.
            </p>
          </Reveal>
        </div>

        {/* Big Headline */}
        <div className="flex flex-col items-center text-center mb-24">
          <Reveal>
            <h2 className="text-7xl md:text-[8rem] font-semibold tracking-tighter leading-[1.1] mb-6">
              68% <br />
              <span className="text-white/30 text-5xl md:text-7xl">Token Reduction</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl md:text-3xl font-light text-[#FF6A2D] mb-4">
              79k → 30k
            </p>
            <p className="text-sm md:text-base text-white/50 tracking-widest uppercase font-mono">
              Across a real production repository
            </p>
          </Reveal>
        </div>

        {/* Small Stat Row */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/10 border-y border-white/10 py-12 mb-24">
            <div className="flex flex-col gap-2 text-center pb-8 md:pb-0 border-b border-white/10 md:border-0">
              <span className="text-4xl md:text-5xl font-light">68%</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-mono">Token Reduction</span>
            </div>
            <div className="flex flex-col gap-2 text-center pb-8 md:pb-0 border-b border-white/10 md:border-0">
              <span className="text-4xl md:text-5xl font-light">3×</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-mono">Less Context</span>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <span className="text-4xl md:text-5xl font-light text-[#5B7CFF]">79k</span>
              <span className="text-xs uppercase tracking-widest text-[#5B7CFF]/50 font-mono">Traditional</span>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <span className="text-4xl md:text-5xl font-light text-[#FF6A2D]">30k</span>
              <span className="text-xs uppercase tracking-widest text-[#FF6A2D]/50 font-mono">CodeBroker</span>
            </div>
          </div>
        </Reveal>

        {/* Chart Area */}
        <Reveal delay={0.4}>
          <div className="rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-12 shadow-2xl relative">
            
            {/* Legend as part of heading */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight">Token Usage</h3>
                <p className="text-white/40 font-mono text-sm mt-2">Tokens Consumed</p>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF6A2D] shadow-[0_0_10px_rgba(255,106,45,0.3)]" />
                  <span className="font-mono text-sm uppercase tracking-widest text-white/80">CodeBroker</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#5B7CFF] shadow-[0_0_10px_rgba(91,124,255,0.3)]" />
                  <span className="font-mono text-sm uppercase tracking-widest text-white/50">Traditional</span>
                </div>
              </div>
            </div>
            
            <ComparisonChart data={CATEGORY_COMPARISON} />
            
            <div className="mt-16 text-center max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
                CodeBroker indexes your repository once, so AI receives only the relevant context instead of entire files.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
