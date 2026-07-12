import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/harness-icons";

export function CTA() {
  return (
    <section className="py-40 md:py-48 relative overflow-hidden">
      {/* Ember glow rising from below */}
      <div className="pointer-events-none absolute bottom-[-40%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[var(--color-brand)]/[0.09] blur-[140px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />

      <Container className="relative flex flex-col items-center justify-center text-center">
        <Reveal>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter leading-[1.05] mb-12">
            Stop giving AI <br />
            <span className="text-white/40">your repository.</span> <br />
            Give it{" "}
            <span className="bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-ember)] bg-clip-text text-transparent">
              understanding.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border-shimmer inline-flex flex-col items-center gap-6 rounded-3xl bg-black/50 px-8 py-8 md:px-14 md:py-10 backdrop-blur-sm">
            <code className="font-mono text-sm md:text-base text-white/60">
              <span className="text-[var(--color-brand)]">$</span> claude mcp add codebroker
            </code>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/docs/quick-start">
                <Button
                  size="lg"
                  className="group px-12 bg-[var(--color-brand)] text-black hover:bg-[var(--color-brand-soft)] hover:shadow-[0_0_36px_rgba(255,90,31,0.45)] transition-all duration-300"
                >
                  Get Started
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Link>
              <Link href="https://github.com/codebroker" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 gap-2.5 border-white/20 hover:bg-white/[0.05]"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
