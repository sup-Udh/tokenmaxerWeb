"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/docs/ui/CodeBlock";
import { Callout } from "@/components/docs/ui/Callout";

export default function InstallationPage() {
  const [activeTab, setActiveTab] = useState<"cli" | "vscode" | "source">("cli");

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Installation</h1>
      <p className="text-lg text-white/60 mb-10">
        Choose your preferred method to install CodeBroker. We recommend using the CLI for automated CI/CD workflows, and the VS Code Extension for daily development.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#232323] mb-8">
        {(["cli", "vscode", "source"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "border-[var(--color-brand)] text-white"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            {tab === "cli" ? "CLI" : tab === "vscode" ? "VS Code" : "Build from Source"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "cli" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 id="install-cli" className="text-2xl font-semibold text-white mb-4">Command Line Interface</h2>
            <p className="text-white/70 mb-4">The easiest way to install the CLI is using Cargo (Rust's package manager) or NPM.</p>
            
            <h3 id="using-cargo" className="text-xl font-medium text-white mt-8 mb-4">Using Cargo (Recommended)</h3>
            <CodeBlock code="cargo install codebroker" language="bash" filename="Terminal" />
            
            <h3 id="using-npm" className="text-xl font-medium text-white mt-8 mb-4">Using NPM</h3>
            <CodeBlock code="npm install -g codebroker" language="bash" filename="Terminal" />

            <Callout type="info" title="Requirements">
              CodeBroker CLI requires Rust 1.70+ or Node.js 18+ depending on the installation method chosen.
            </Callout>
          </div>
        )}

        {activeTab === "vscode" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 id="install-vscode" className="text-2xl font-semibold text-white mb-4">VS Code Extension</h2>
            <p className="text-white/70 mb-4">
              Get intelligent context directly in your editor. The extension bundles the CodeBroker Engine, so no separate CLI installation is required.
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-white/80 marker:text-white/40 mb-6">
              <li>Open Visual Studio Code</li>
              <li>Navigate to the Extensions view (<kbd className="bg-white/10 px-1 py-0.5 rounded text-xs mx-1">Ctrl+Shift+X</kbd>)</li>
              <li>Search for "CodeBroker"</li>
              <li>Click <strong>Install</strong></li>
            </ol>
            <Callout type="tip" title="Quick Install">
              You can also install it directly from the command line by running:
            </Callout>
            <CodeBlock code="code --install-extension codebroker.codebroker" language="bash" filename="Terminal" />
          </div>
        )}

        {activeTab === "source" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 id="build-source" className="text-2xl font-semibold text-white mb-4">Build from Source</h2>
            <p className="text-white/70 mb-4">For developers who want the absolute latest features or wish to contribute.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-white/50 mb-2 uppercase tracking-wider">1. Clone the repository</h3>
                <CodeBlock code="git clone https://github.com/codebroker/codebroker.git&#10;cd codebroker" language="bash" filename="Terminal" />
              </div>
              
              <div>
                <h3 className="text-sm text-white/50 mb-2 uppercase tracking-wider">2. Build the release binary</h3>
                <CodeBlock code="cargo build --release" language="bash" filename="Terminal" />
              </div>
              
              <div>
                <h3 className="text-sm text-white/50 mb-2 uppercase tracking-wider">3. Install to your PATH</h3>
                <CodeBlock code="cargo install --path ." language="bash" filename="Terminal" />
              </div>
            </div>

            <Callout type="warning" title="Bleeding Edge">
              Building from the `main` branch means you are using unreleased code which may contain bugs. For production use, please checkout a stable release tag.
            </Callout>
          </div>
        )}
      </div>
    </div>
  );
}
