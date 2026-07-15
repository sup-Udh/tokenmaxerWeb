import Link from "next/link";
import {
  Terminal,
  Cpu,
  Download,
  Rocket,
  Network,
  BookOpen,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/docs/ui/CodeBlock";
import { CodeGraphCanvas } from "@/components/ui/CodeGraphCanvas";

/* The three steps that take someone from nothing to a working setup. */
const path = [
  {
    step: "01",
    title: "Install the CLI",
    description: "One script for macOS, Linux or Windows. No toolchain to set up.",
    href: "/docs/installation",
    icon: Download,
  },
  {
    step: "02",
    title: "Index & bind your repo",
    description: "Run init and bind — CodeBroker maps the repo and connects to your AI tools.",
    href: "/docs/quick-start",
    icon: Rocket,
  },
  {
    step: "03",
    title: "Ask your AI",
    description: "Your agent now queries the graph instead of guessing its way around.",
    href: "/docs/examples",
    icon: Network,
  },
];

const reference = [
  {
    title: "CLI",
    description: "Powerful command line interface for indexing and querying repositories.",
    href: "/docs/cli",
    icon: Terminal,
  },
  {
    title: "Core Engine",
    description: "Deterministic graph builder powered by Tree-sitter and Rust.",
    href: "/docs/core-concepts",
    icon: Cpu,
  },
  {
    title: "Architecture",
    description: "How the indexer, graph store and MCP server fit together.",
    href: "/docs/architecture",
    icon: Network,
  },
  {
    title: "Examples",
    description: "Real prompts and the context CodeBroker returns for them.",
    href: "/docs/examples",
    icon: BookOpen,
  },
  {
    title: "Benchmarks",
    description: "Index times, retrieval latency and token reduction figures.",
    href: "/docs/benchmarks",
    icon: BarChart3,
  },
  {
    title: "Installation",
    description: "Install scripts, PATH setup and upgrading between versions.",
    href: "/docs/installation",
    icon: Download,
  },
];

export default function DocsHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="relative mb-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-12 md:px-10 md:py-14">
        <div className="mask-radial-fade pointer-events-none absolute inset-0 opacity-70">
          <CodeGraphCanvas density={28} intensity={0.75} interactive={false} />
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--color-brand)]/[0.12] blur-[90px]" />

        <div className="relative">
          <p className="mb-4 font-mono text-sm uppercase tracking-wider text-[var(--color-brand)]">
            Documentation
          </p>
          <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Everything you need to integrate CodeBroker into your development workflow.
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
            Index repositories. Build deterministic semantic graphs. Retrieve exactly
            the context your AI needs.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/docs/quick-start">
              <Button className="bg-[var(--color-brand)] text-black transition-all duration-300 hover:bg-[var(--color-brand-soft)] hover:shadow-[0_0_28px_rgba(255,90,31,0.4)]">
                Get Started
              </Button>
            </Link>
            <Link href="/docs/installation">
              <Button
                variant="outline"
                className="border-white/10 text-white/80 hover:bg-white/5 hover:text-white"
              >
                Install CLI
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Start here */}
      <section className="mb-16">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 id="start-here" className="text-2xl font-semibold text-white">
            Start here
          </h2>
          <span className="font-mono text-xs uppercase tracking-wider text-white/30">
            about a minute
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {path.map(({ step, title, description, href, icon: Icon }) => (
            <Link key={step} href={href} className="group relative block">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[var(--color-brand)]/30 hover:bg-[var(--color-brand)]/[0.03]">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/50 transition-all duration-300 group-hover:border-[var(--color-brand)]/40">
                    <Icon className="h-4 w-4 text-white/60 transition-colors duration-300 group-hover:text-[var(--color-brand)]" />
                  </span>
                  <span className="font-mono text-xs text-white/25">{step}</span>
                </div>
                <h3 className="mb-2 font-medium text-white">{title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-white/50">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-brand)] opacity-70 transition-opacity group-hover:opacity-100">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Install in one line */}
      <section className="mb-16">
        <h2 id="install-in-one-line" className="mb-2 text-2xl font-semibold text-white">
          Install in one line
        </h2>
        <p className="mb-5 text-white/60">
          macOS and Linux. On Windows, see the{" "}
          <Link href="/docs/installation" className="text-[var(--color-brand)] hover:underline">
            installation guide
          </Link>
          .
        </p>
        <CodeBlock
          code="curl -fsSL https://www.codebroker.space/install.sh | bash"
          language="bash"
          filename="Terminal"
        />
      </section>

      {/* Reference */}
      <section>
        <h2 id="explore-the-docs" className="mb-6 text-2xl font-semibold text-white">
          Explore the docs
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reference.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="group block">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/50 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-4 w-4 text-white/60 transition-colors group-hover:text-[var(--color-brand)]" />
                </span>
                <div className="min-w-0">
                  <h3 className="mb-1 font-medium text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{description}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-brand)]" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
