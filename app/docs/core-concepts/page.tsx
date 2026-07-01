import { Database, GitMerge, FileSearch, Layers } from "lucide-react";
import { Callout } from "@/components/docs/ui/Callout";

export default function CoreConceptsPage() {
  const concepts = [
    {
      title: "Repository Indexing",
      description: "CodeBroker scans your repository and parses the syntax trees of all supported source files using Tree-sitter. It extracts functions, classes, interfaces, and variables.",
      icon: Database
    },
    {
      title: "Semantic Bindings",
      description: "Unlike simple AST parsers, CodeBroker resolves imports and exports to create a unified semantic graph across your entire codebase.",
      icon: GitMerge
    },
    {
      title: "PageRank & Communities",
      description: "By applying graph algorithms like PageRank and Louvain community detection, CodeBroker identifies architectural boundaries and critical files.",
      icon: Layers
    },
    {
      title: "Context Capsules",
      description: "When an AI needs context, CodeBroker calculates the shortest paths between relevant symbols and returns a perfectly trimmed, highly relevant markdown payload.",
      icon: FileSearch
    }
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Core Concepts</h1>
      <p className="text-lg text-white/60 mb-10">
        To get the most out of CodeBroker, it helps to understand how it models your codebase under the hood.
      </p>

      <div className="grid gap-6 mb-12">
        {concepts.map((concept) => (
          <div key={concept.title} className="p-6 rounded-xl border border-[#232323] bg-white/5 flex gap-6">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
              <concept.icon className="w-6 h-6 text-[var(--color-brand)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{concept.title}</h3>
              <p className="text-white/70 leading-relaxed">{concept.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <h2 id="embeddings" className="text-2xl font-semibold text-white mb-4">Embeddings</h2>
      <p className="text-white/70 leading-relaxed mb-6">
        While the semantic graph is deterministic, CodeBroker also generates vector embeddings for every node in the graph. This hybrid approach means you can search by exact symbol name (deterministic) or by natural language concept (probabilistic), and CodeBroker will use the graph edges to fetch the related implementations.
      </p>

      <Callout type="tip" title="Hybrid Retrieval">
        When querying, use natural language. The engine automatically maps your intent to the correct semantic nodes and traverses the graph.
      </Callout>
    </div>
  );
}
