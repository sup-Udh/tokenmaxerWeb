"use client";

import { useState } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/ui/CodeBlock";
import { Callout } from "@/components/docs/ui/Callout";

const tabs: {
  id: "cli" | "vscode";
  label: string;
  disabled?: boolean;
  tooltip?: string;
}[] = [
  { id: "cli", label: "CLI" },
  { id: "vscode", label: "VS Code", disabled: true, tooltip: "Coming soon" },
];

export default function InstallationPage() {
  const [activeTab, setActiveTab] = useState<"cli" | "vscode">("cli");

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Installation</h1>
      <p className="text-lg text-white/60 mb-10">
        CodeBroker is currently available as a CLI. We recommend it for CI/CD workflows and daily
        development alike — the VS Code Extension is on its way.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#232323] mb-8">
        {tabs.map((tab) => (
          <div key={tab.id} className="group relative">
            <button
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              disabled={tab.disabled}
              aria-disabled={tab.disabled}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                tab.disabled
                  ? "border-transparent text-white/30 cursor-not-allowed"
                  : activeTab === tab.id
                  ? "border-[var(--color-brand)] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
            {tab.disabled && tab.tooltip && (
              <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap rounded-md border border-[#232323] bg-[#0a0a0a] px-2 py-1 text-xs text-white/70 opacity-0 transition-opacity group-hover:opacity-100 z-10">
                {tab.tooltip}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "cli" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 id="install-cli" className="text-2xl font-semibold text-white mb-4">Command Line Interface</h2>
            <p className="text-white/70 mb-4">
              The fastest way to get set up is the install script for your platform. It&apos;s fully
              automated — no separate toolchain or configuration required.
            </p>

            <h3 id="macos-linux" className="text-xl font-medium text-white mt-8 mb-4">macOS / Linux</h3>
            <CodeBlock code="curl -fsSL https://www.codebroker.space/install.sh | bash" language="bash" filename="Terminal" />

            <h3 id="windows" className="text-xl font-medium text-white mt-8 mb-4">Windows</h3>
            <p className="text-white/70 mb-4">Run this in PowerShell:</p>
            <CodeBlock code="irm https://www.codebroker.space/install.ps1 | iex" language="powershell" filename="PowerShell" />

            <h3 id="package-managers" className="text-xl font-medium text-white mt-8 mb-4">Package Managers</h3>
            <p className="text-white/70 mb-4">Prefer Cargo or NPM? Both are supported too.</p>
            <CodeBlock code="cargo install codebroker" language="bash" filename="Terminal" />
            <CodeBlock code="npm install -g codebroker" language="bash" filename="Terminal" />

            <h2 id="setup" className="text-2xl font-semibold text-white mt-12 mb-4">Setup</h2>
            <p className="text-white/70 mb-4">
              Once installed, initialize CodeBroker in your project. This sets up the database and
              indexes your codebase.
            </p>
            <CodeBlock code="codebroker init" language="bash" filename="Terminal" />

            <p className="text-white/70 mb-4 mt-6">
              Then bind it to your AI coding tools — this instantly hooks up Claude Desktop and
              Antigravity to the current directory.
            </p>
            <CodeBlock code="codebroker bind" language="bash" filename="Terminal" />

            <Callout type="tip" title="All commands">
              Run <code>codebroker help</code> to see every available command, or check the{" "}
              <Link href="/docs/cli" className="underline hover:text-white">CLI reference</Link>{" "}
              for the full list.
            </Callout>
          </div>
        )}
      </div>
    </div>
  );
}
