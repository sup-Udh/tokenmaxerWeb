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
        <div className="mb-32 max-w-4xl">
          <SectionNumber number="03" className="mb-6 inline-block text-[var(--color-brand)] border border-[var(--color-brand)]/20 px-3 py-1 rounded-full bg-[var(--color-brand)]/10" />
          <SectionTitle 
            title="Graph Benchmarks"
            className="mt-6"
          />
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-[var(--color-brand)] font-medium mt-8">
              Measure understanding, not just speed.
            </p>
            <p className="text-xl md:text-2xl text-white/60 font-light mt-4 leading-relaxed max-w-3xl">
              CodeBroker builds a deterministic semantic graph that dramatically reduces token usage while improving architectural understanding for AI agents.
            </p>
          </Reveal>
        </div>

        {/* Block 1: Token Consumption */}
        <div className="mb-48">
          <Reveal>
            <h3 className="text-3xl font-semibold tracking-tight mb-12 flex items-center gap-4">
              Token Consumption <span className="text-white/20 font-mono text-sm tracking-widest uppercase">vs Brute Force</span>
            </h3>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <BenchmarkTable 
              title="With CodeBroker" 
              data={TOKEN_CONSUMPTION.withCodeBroker} 
              total={TOKEN_CONSUMPTION.totals.withCodeBroker}
              highlight={true}
            />
            <BenchmarkTable 
              title="Without CodeBroker" 
              data={TOKEN_CONSUMPTION.withoutCodeBroker} 
              total={TOKEN_CONSUMPTION.totals.withoutCodeBroker}
            />
          </div>
          
          <Reveal delay={0.4} className="mt-12 text-center">
            <div className="inline-block px-8 py-4 rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 text-[var(--color-brand)] font-mono tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(255,90,31,0.15)]">
              {TOKEN_CONSUMPTION.reduction} Token Reduction
            </div>
          </Reveal>
        </div>

        {/* Block 2: Interactive Benchmark Graph */}
        <div className="mb-48">
          <Reveal>
            <h3 className="text-3xl font-semibold tracking-tight mb-12">Category Performance <span className="text-white/40 font-light text-xl ml-2">(Token Usage)</span></h3>
          </Reveal>
          
          <div className="rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-12 shadow-2xl relative">
            {/* Custom Legend */}
            <div className="flex gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_rgba(255,90,31,0.5)]" />
                <span className="font-mono text-sm uppercase tracking-widest text-white/80">With CodeBroker</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <span className="font-mono text-sm uppercase tracking-widest text-white/50">Traditional</span>
              </div>
            </div>
            
            <ComparisonChart data={CATEGORY_COMPARISON} />
          </div>
        </div>

        {/* Block 3: Phase-by-Phase Efficiency */}
        <div className="mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4">
              <Reveal>
                <h3 className="text-3xl font-semibold tracking-tight mb-6">Phase-by-Phase Efficiency</h3>
                <p className="text-white/50 font-light leading-relaxed mb-8">
                  CodeBroker dominates in Graph Analysis and Core Architecture mapping, providing deep contextual understanding without the massive overhead of traditional text-search baselines.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 rounded bg-[var(--color-brand)]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/80">CodeBroker Score</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 rounded bg-blue-500" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/50">Baseline Score</span>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-8 bg-[#050505] border border-white/5 p-6 md:p-8 rounded-3xl">
              <HorizontalEfficiencyChart data={EFFICIENCY_PHASES} />
            </div>
          </div>
        </div>

        {/* Block 4: Benchmark Cards */}
        <div className="mb-48">
          <Reveal>
            <h3 className="text-3xl font-semibold tracking-tight mb-12">Feature Deep Dive</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {BENCHMARK_CARDS.map((card, i) => (
              <BenchmarkCard key={card.id} {...card} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Block 5: Performance Metrics */}
        <div className="mb-48 border-y border-white/10 py-24 bg-white/[0.01]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {PERFORMANCE_METRICS.map((metric, i) => (
              <MetricCounter key={metric.label} {...metric} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Block 6: Quote */}
        <div className="py-24 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter leading-[1.05] mb-12">
              Stop sending your <br />
              <span className="text-white/30">repository.</span> <br />
              Start sending <br className="md:hidden" />
              <span className="text-[var(--color-brand)]">understanding.</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl leading-relaxed">
              Deterministic graph retrieval beats brute-force context injection every time. Give your AI agents the exact architecture map they need.
            </p>
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
