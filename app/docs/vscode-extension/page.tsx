import { CheckCircle2 } from "lucide-react";
import { Callout } from "@/components/docs/ui/Callout";

export default function VSCodeExtensionPage() {
  const features = [
    "Semantic Hover: See intelligent context and dependencies when hovering over symbols.",
    "Go to Symbol: Navigate deterministically without relying on fuzzy search.",
    "Context Capsules: Generate perfect markdown context for LLMs with a single click.",
    "Repository Overview: Visualize your codebase architecture directly in the sidebar.",
    "Impact Analysis: See what other files will be affected by a change before you make it.",
    "One-click Context Injection: Send context directly to Claude or GitHub Copilot."
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">VS Code Extension</h1>
      <p className="text-lg text-white/60 mb-10">
        The CodeBroker VS Code extension integrates the power of the semantic graph directly into your editor, supercharging your navigation and AI coding tools.
      </p>

      {/* Placeholder for Screenshot */}
      <div className="w-full h-[400px] rounded-xl border border-[#232323] bg-[#0A0A0A] mb-12 flex items-center justify-center overflow-hidden">
        <div className="text-white/20 font-mono flex flex-col items-center">
          <span className="text-4xl mb-4">🖼️</span>
          <span>Extension UI Screenshot Placeholder</span>
        </div>
      </div>

      <h2 id="features" className="text-2xl font-semibold text-white mb-6">Key Features</h2>
      <div className="grid gap-4 mb-12">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--color-brand)] shrink-0 mt-0.5" />
            <span className="text-white/80 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>

      <h2 id="architecture" className="text-2xl font-semibold text-white mb-6">How it Works</h2>
      <p className="text-white/70 mb-6 leading-relaxed">
        The extension bundles a lightweight version of the CodeBroker CLI. When you open a workspace, it automatically indexes the repository in the background using Tree-sitter. 
      </p>
      
      <Callout type="info" title="Performance">
        Indexing happens incrementally. After the initial build, only changed files are re-indexed, keeping CPU and memory overhead practically unnoticeable.
      </Callout>
    </div>
  );
}
