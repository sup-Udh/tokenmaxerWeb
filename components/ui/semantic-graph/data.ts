import { FileCode2, Braces, Waypoints, Network, Search, Package } from "lucide-react";

export interface PipelineStageData {
  id: string;
  title: string;
  name: string;
  icon: any;
  description: string;
  metrics: { label: string }[];
}

export const PIPELINE_STAGES: PipelineStageData[] = [
  {
    id: "files",
    title: "Repository Scan",
    name: "Files",
    icon: FileCode2,
    description: "CodeBroker recursively scans every source file while respecting language boundaries and ignored paths.",
    metrics: [
      { label: "327 Files" },
      { label: "4 Languages" },
      { label: "98ms Scan Time" }
    ]
  },
  {
    id: "symbols",
    title: "Symbol Extraction",
    name: "Symbols",
    icon: Braces,
    description: "Functions, classes, interfaces, variables and exports are extracted into a deterministic symbol table.",
    metrics: [
      { label: "2,431 Symbols" },
      { label: "Tree-sitter Parsing" },
      { label: "Zero AI Used" }
    ]
  },
  {
    id: "relationships",
    title: "Relationship Discovery",
    name: "Relationships",
    icon: Waypoints,
    description: "Imports, calls, inheritance, implementations and references are connected into a semantic graph.",
    metrics: [
      { label: "18,903 Edges" },
      { label: "100% Deterministic" },
      { label: "Duplicate Detection" }
    ]
  },
  {
    id: "semantic-graph",
    title: "Knowledge Graph",
    name: "Semantic Graph",
    icon: Network,
    description: "Every discovered relationship is stored as a connected graph that enables precise reasoning across the repository.",
    metrics: [
      { label: "SQLite Graph" },
      { label: "PageRank" },
      { label: "Community Detection" }
    ]
  },
  {
    id: "retrieval",
    title: "Graph Retrieval",
    name: "Retrieval",
    icon: Search,
    description: "Instead of searching text, CodeBroker traverses the semantic graph to gather only the required context.",
    metrics: [
      { label: "Dependency Traversal" },
      { label: "Impact Analysis" },
      { label: "Context Compression" }
    ]
  },
  {
    id: "context-capsule",
    title: "Context Capsules",
    name: "Context Capsule",
    icon: Package,
    description: "The final output is a compact, dependency-aware context package ready for any LLM.",
    metrics: [
      { label: "Token Optimized" },
      { label: "Fully Traceable" },
      { label: "Hallucination Resistant" }
    ]
  }
];
