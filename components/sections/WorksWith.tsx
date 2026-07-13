"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { harnesses } from "@/components/ui/harness-icons";

function MarqueeRow() {
  // Track is duplicated once; the marquee keyframe translates -50%
  // so the loop is seamless.
  const items = [...harnesses, ...harnesses];

  return (
    <div className="marquee-track relative w-full overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-10 bg-gradient-to-r from-[#060505] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-10 bg-gradient-to-l from-[#060505] to-transparent" />

      <div className="animate-marquee flex w-max items-stretch gap-4 md:gap-6 py-2">
        {items.map(({ name, tagline, Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-4 transition-all duration-500 hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-brand)]/[0.06]"
          >
            <Icon className="h-7 w-7 shrink-0 text-white/45 transition-colors duration-500 group-hover:text-[var(--color-brand)]" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white/80 whitespace-nowrap transition-colors group-hover:text-white">
                {name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 whitespace-nowrap">
                {tagline}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorksWith() {
  return (
    <section id="works-with" className="relative py-24 md:py-32 overflow-hidden">
      {/* Faint horizon glow behind the strip */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[300px] rounded-full bg-[var(--color-brand)]/[0.05] blur-[120px]" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center mb-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse-dot" />
              One MCP server, every agent
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-2xl">
              Lives in your repo. <br className="hidden md:block" />
              <span className="text-white/45">Speaks to every coding agent.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-base md:text-lg text-white/50 font-light">
              CodeBroker connects over the Model Context Protocol, so whichever
              tool you code with, it already knows its way around your repo.
            </p>
          </Reveal>
        </div>
      </Container>

      <Reveal delay={0.15}>
        <MarqueeRow />
      </Reveal>

      {/* Hub line: agents ── MCP ── your repo */}
      <Container className="relative mt-16">
        <Reveal delay={0.1}>
          <div className="mx-auto hidden sm:flex max-w-3xl items-center justify-center gap-3 md:gap-5 text-xs md:text-sm font-mono text-white/40">
            <span className="whitespace-nowrap">your agent</span>
            <span className="relative h-px flex-1 bg-gradient-to-r from-white/5 via-[var(--color-brand)]/60 to-white/5 overflow-hidden">
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] shadow-[0_0_8px_rgba(255,90,31,0.9)]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="rounded-md border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 px-3 py-1.5 text-[var(--color-brand)] whitespace-nowrap">
              CodeBroker MCP
            </span>
            <span className="relative h-px flex-1 bg-gradient-to-r from-white/5 via-[var(--color-brand)]/60 to-white/5 overflow-hidden">
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] shadow-[0_0_8px_rgba(255,90,31,0.9)]"
                animate={{ left: ["100%", "0%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="whitespace-nowrap">your repo</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
