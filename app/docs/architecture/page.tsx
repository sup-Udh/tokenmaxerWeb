import { ArrowDown } from "lucide-react";

export default function ArchitecturePage() {
  const pipeline = [
    { title: "Repository", desc: "Raw source code files on disk." },
    { title: "Parser", desc: "Tree-sitter generates Abstract Syntax Trees." },
    { title: "Semantic Extraction", desc: "Identifies declarations, references, and imports." },
    { title: "Flow Analysis", desc: "Traces data flow and call graphs." },
    { title: "Relationship Resolution", desc: "Links definitions to references across files." },
    { title: "Graph Builder", desc: "Constructs the directed semantic graph." },
    { title: "Feature Extraction", desc: "Calculates PageRank and centrality metrics." },
    { title: "Embeddings", desc: "Generates vector embeddings for nodes." },
    { title: "Retrieval", desc: "Traverses graph based on query heuristics." },
    { title: "Context Capsules", desc: "Packages subgraph into LLM-ready markdown." }
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Architecture</h1>
      <p className="text-lg text-white/60 mb-10">
        CodeBroker is designed as a robust, multi-stage pipeline designed for scale and precision.
      </p>

      <div className="bg-black border border-[#232323] rounded-2xl p-8 mb-12">
        <h2 id="pipeline" className="text-xl font-semibold text-white mb-8 text-center uppercase tracking-widest text-sm">Data Pipeline</h2>
        
        <div className="max-w-md mx-auto flex flex-col items-center">
          {pipeline.map((stage, i) => (
            <div key={stage.title} className="w-full flex flex-col items-center group">
              <div className="w-full bg-[#0A0A0A] border border-[#232323] rounded-xl p-4 text-center transition-colors hover:border-[var(--color-brand)] cursor-default">
                <h3 className="text-white font-medium mb-1">{stage.title}</h3>
                <p className="text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity h-0 group-hover:h-auto overflow-hidden">
                  {stage.desc}
                </p>
              </div>
              {i < pipeline.length - 1 && (
                <div className="py-2 text-[var(--color-brand)] opacity-50">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
