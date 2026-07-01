import Link from "next/link";
import { Terminal, AppWindow, Cpu } from "lucide-react";
import { FeatureCard } from "@/components/docs/ui/FeatureCard";
import { Button } from "@/components/ui/Button";

export default function DocsHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="mb-16">
        <p className="text-[var(--color-brand)] text-sm font-semibold tracking-wider uppercase mb-4">Documentation</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
          Everything you need to integrate CodeBroker into your development workflow.
        </h1>
        <p className="text-lg text-white/60 mb-8 max-w-2xl leading-relaxed">
          Index repositories. Build deterministic semantic graphs. Retrieve exactly the context your AI needs.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/docs/quick-start">
            <Button>Get Started</Button>
          </Link>
          <Link href="/docs/installation">
            <Button variant="outline" className="border-white/10 text-white/80 hover:bg-white/5 hover:text-white">
              Install CLI
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="CLI"
          description="Powerful command line interface for indexing and querying repositories."
          icon={Terminal}
          href="/docs/cli"
        />
        <FeatureCard
          title="VS Code Extension"
          description="Native editor integration with semantic navigation and context retrieval."
          icon={AppWindow}
          href="/docs/vscode-extension"
        />
        <FeatureCard
          title="Core Engine"
          description="Deterministic graph builder powered by Tree-sitter and Rust."
          icon={Cpu}
          href="/docs/core-concepts"
        />
      </div>
    </div>
  );
}
