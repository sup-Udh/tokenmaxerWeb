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

      {/* Chart Placeholder */}
      <h2 id="token-reduction" className="text-2xl font-semibold text-white mb-6">Token Reduction</h2>
      <div className="w-full h-[300px] rounded-xl border border-[#232323] bg-[#0A0A0A] flex flex-col items-center justify-center p-8 text-center mb-12">
        <div className="flex items-end gap-8 h-40 mb-4 w-full justify-center">
          {/* Dummy Bar Chart */}
          <div className="w-16 bg-white/20 rounded-t-md h-full relative group">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity">100k</div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs whitespace-nowrap">Raw Files</div>
          </div>
          <div className="w-16 bg-white/20 rounded-t-md h-[40%] relative group">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity">40k</div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs whitespace-nowrap">Vector Search</div>
          </div>
          <div className="w-16 bg-[var(--color-brand)] rounded-t-md h-[15%] relative group">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[var(--color-brand)] font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">15k</div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-xs whitespace-nowrap">CodeBroker</div>
          </div>
        </div>
      </div>
    </div>
  );
}
