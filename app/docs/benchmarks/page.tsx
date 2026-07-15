import { TokenReductionChart } from "@/components/docs/ui/TokenReductionChart";

export default function BenchmarksPage() {
  const stats = [
    { label: "Graph Integrity", value: "100%" },
    { label: "Embedding Coverage", value: "100%" },
    { label: "Relationships Indexed", value: "3.4M+" },
    { label: "Avg Build Time (1k files)", value: "1.2s" },
    { label: "Avg Context Retrieval", value: "45ms" },
    { label: "Token Reduction", value: "85%" }
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Benchmarks</h1>
      <p className="text-lg text-white/60 mb-10">
        CodeBroker is built in Rust for extreme precision and minimal overhead. Here are our latest benchmarks against a standard 1,000 file typescript repository.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="text-3xl md:text-4xl font-light text-white mb-2">{stat.value}</div>
            <div className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 id="token-reduction" className="text-2xl font-semibold text-white mb-6">Token Reduction</h2>
      <TokenReductionChart />
    </div>
  );
}
