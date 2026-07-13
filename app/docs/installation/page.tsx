import Link from "next/link";
import { CodeBlock } from "@/components/docs/ui/CodeBlock";
import { Callout } from "@/components/docs/ui/Callout";

export default function InstallationPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Installation</h1>
      <p className="text-lg text-white/60 mb-10">
        CodeBroker is available as a CLI. We recommend it for CI/CD workflows and daily
        development alike.
      </p>

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
  );
}
