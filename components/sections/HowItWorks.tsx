"use client";

import { motion } from "framer-motion";
import { Network, Terminal, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";

const steps = [
  {
    icon: Network,
    step: "01",
    title: "It maps your repo",
    body: "CodeBroker lives in your codebase and keeps a live map of every file, symbol and dependency — updated as your code changes.",
  },
  {
    icon: Terminal,
    step: "02",
    title: "Your AI asks it",
    body: "Claude Code, Cursor or any MCP client asks questions like “where is auth handled?” or “what breaks if I change this?”",
  },
  {
    icon: Zap,
    step: "03",
    title: "It returns the right context",
    body: "Only the files and symbols that matter come back — a small, focused context window instead of the whole repository.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 md:py-36">
      <Container>
        <div className="mb-16 md:mb-20 max-w-3xl">
          <SectionNumber number="01" />
          <SectionTitle
            title={
              <>
                Three steps.{" "}
                <span className="text-white/40">Zero guesswork.</span>
              </>
            }
            subtitle="Your AI is great at writing code. It's bad at finding it. CodeBroker handles the finding."
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connector line behind the cards (desktop) */}
          <div className="pointer-events-none absolute top-12 left-[12%] right-[12%] hidden md:block h-px overflow-hidden">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-transparent via-[var(--color-brand)]/50 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>

          {steps.map(({ icon: Icon, step, title, body }, i) => (
            <Reveal key={step} delay={0.12 * i}>
              <div className="group relative h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-500 hover:border-[var(--color-brand)]/30 hover:bg-[var(--color-brand)]/[0.03]">
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/60 transition-all duration-500 group-hover:border-[var(--color-brand)]/40 group-hover:shadow-[0_0_24px_rgba(255,90,31,0.25)]">
                    <Icon className="h-5 w-5 text-white/60 transition-colors duration-500 group-hover:text-[var(--color-brand)]" />
                  </span>
                  <span className="font-mono text-sm text-white/25">{step}</span>
                </div>
                <h3 className="mb-3 text-xl font-medium tracking-tight">{title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-white/50 font-light">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Interactive walkthrough */}
        <div id="demo" className="mt-24 md:mt-32 scroll-mt-24">
          <Reveal>
            <div className="flex flex-col items-center text-center mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-mono text-white/40 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse-dot" />
                Live walkthrough
              </span>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                See it end to end.
              </h3>
              <p className="mt-4 text-white/50 max-w-lg font-light">
                From a cold repo to your AI answering with the right files — watch the whole loop, or click through it yourself.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <InteractiveDemo />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
