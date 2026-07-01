import { TerminalBlock } from "@/components/docs/ui/TerminalBlock";
import { Callout } from "@/components/docs/ui/Callout";
import { ArrowDown } from "lucide-react";

export default function QuickStartPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Quick Start</h1>
      <p className="text-lg text-white/60 mb-10">
        Get up and running with CodeBroker in less than 2 minutes. This guide will take you from an unindexed repository to running your first intelligent context query.
      </p>

      <Callout type="info" title="Prerequisites">
        Make sure you have already installed the CodeBroker CLI. If not, head over to the <a href="/docs/installation" className="text-blue-400 hover:underline">Installation guide</a>.
      </Callout>

      <div className="mt-12 space-y-16">
        {/* Step 1 */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-semibold text-sm border border-[var(--color-brand)]/20">
              1
            </div>
            <h2 id="initialize-repository" className="text-2xl font-semibold text-white">Initialize Repository</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            Navigate to your project folder and initialize the CodeBroker configuration. This creates a `.codebroker.json` file in your root directory.
          </p>
          <div className="pl-12">
            <TerminalBlock 
              command="codebroker init" 
              output="✓ Initialized CodeBroker configuration in .codebroker.json" 
            />
          </div>
        </section>

        <div className="flex justify-center text-white/20">
          <ArrowDown className="w-6 h-6" />
        </div>

        {/* Step 2 */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-semibold text-sm border border-[var(--color-brand)]/20">
              2
            </div>
            <h2 id="build-graph" className="text-2xl font-semibold text-white">Build Graph</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            Run the index command to parse your repository and build the deterministic semantic graph.
          </p>
          <div className="pl-12">
            <TerminalBlock 
              command="codebroker index" 
              output="[1/4] Parsing files... (1,245 files)
[2/4] Extracting semantic relationships...
[3/4] Building relationship graph...
[4/4] Generating vector embeddings...
✓ Graph built successfully in 1.4s" 
            />
          </div>
        </section>

        <div className="flex justify-center text-white/20">
          <ArrowDown className="w-6 h-6" />
        </div>

        {/* Step 3 */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-semibold text-sm border border-[var(--color-brand)]/20">
              3
            </div>
            <h2 id="validate" className="text-2xl font-semibold text-white">Validate</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            Ensure your graph was built correctly and check the indexing stats.
          </p>
          <div className="pl-12">
            <TerminalBlock 
              command="codebroker validate" 
              output="Graph Integrity: 100%
Nodes: 3,412
Edges: 12,844
Entrypoints: 29
Status: Ready for queries" 
            />
          </div>
        </section>

        <div className="flex justify-center text-white/20">
          <ArrowDown className="w-6 h-6" />
        </div>

        {/* Step 4 */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-semibold text-sm border border-[var(--color-brand)]/20">
              4
            </div>
            <h2 id="query" className="text-2xl font-semibold text-white">Query</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            You can now instantly query your codebase for perfect context capsules.
          </p>
          <div className="pl-12">
            <TerminalBlock 
              command='codebroker query "authentication"' 
              output="Found 3 relevant entrypoints and 14 related symbols.
Generated context capsule 'auth_context.md' (3.2k tokens)" 
            />
          </div>
        </section>

        <div className="flex justify-center text-white/20">
          <ArrowDown className="w-6 h-6" />
        </div>

        {/* Step 5 */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-semibold text-sm border border-[var(--color-brand)]/20">
              5
            </div>
            <h2 id="launch-mcp-server" className="text-2xl font-semibold text-white">Launch MCP Server</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            Start the Model Context Protocol (MCP) server to allow AI tools like Cursor or Claude to query your graph directly.
          </p>
          <div className="pl-12">
            <TerminalBlock 
              command="codebroker mcp" 
              output="Starting CodeBroker MCP Server...
Listening on stdio
Available tools:
- generate_context_capsule
- impact_analysis
- architectural_hotspots
- search_codebase" 
            />
          </div>
        </section>
      </div>

      <Callout type="success" title="You're all set!">
        You have successfully indexed your repository and learned the basic commands. Head over to the <a href="/docs/core-concepts" className="text-green-400 hover:underline">Core Concepts</a> to dive deeper into how the Semantic Graph works.
      </Callout>
    </div>
  );
}
