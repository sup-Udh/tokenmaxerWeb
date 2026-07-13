import { TerminalBlock } from "@/components/docs/ui/TerminalBlock";
import { Callout } from "@/components/docs/ui/Callout";
import { ArrowDown } from "lucide-react";

export default function QuickStartPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Quick Start</h1>
      <p className="text-lg text-white/60 mb-10">
        Get up and running with CodeBroker in under a minute. This guide will take you from an unindexed repository to having CodeBroker bound to your AI tools.
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
            <h2 id="go-to-your-project" className="text-2xl font-semibold text-white">Go to Your Project</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            CodeBroker indexes one project at a time, scoped to whatever directory you run it
            from. <code>cd</code> into the repository you want to index — every command below
            (<code>init</code>, <code>bind</code>, <code>update</code>) should be run from this
            same directory unless noted otherwise.
          </p>
          <div className="pl-12">
            <TerminalBlock
              command="cd /path/to/your-project"
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
            <h2 id="initialize-repository" className="text-2xl font-semibold text-white">Initialize Repository</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            From inside your project folder, initialize the CodeBroker configuration. This scans
            the codebase and creates a `.codebroker.json` file in your root directory.
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

        {/* Step 3 */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-semibold text-sm border border-[var(--color-brand)]/20">
              3
            </div>
            <h2 id="bind" className="text-2xl font-semibold text-white">Bind to Your AI Tools</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            Still in the same project directory, run the bind command to instantly connect it to
            Claude, Gemini, and your other AI coding tools.
          </p>
          <div className="pl-12">
            <TerminalBlock
              command="codebroker bind"
              output="✓ Bound CodeBroker to Claude
✓ Bound CodeBroker to Gemini
Ready — your AI tools can now query this repository's graph"
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
            <h2 id="stay-updated" className="text-2xl font-semibold text-white">Keep the CLI Updated</h2>
          </div>
          <p className="text-white/70 mb-4 pl-12">
            CodeBroker ships new releases often. Run <code>update</code> any time — from any
            directory, since it updates the CLI binary itself, not your project&apos;s index — to
            pull the latest version.
          </p>
          <div className="pl-12">
            <TerminalBlock
              command="codebroker update"
              output="✓ Already on the latest version (v0.x.x)"
            />
          </div>
        </section>
      </div>

      <Callout type="success" title="You're all set!">
        You have successfully initialized your repository and bound it to your AI tools. Head over to the <a href="/docs/core-concepts" className="text-green-400 hover:underline">Core Concepts</a> to dive deeper into how the Semantic Graph works.
      </Callout>
    </div>
  );
}
