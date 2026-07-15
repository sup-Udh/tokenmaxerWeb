"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ContextGrid } from "@/components/ui/ContextGrid";

const stats = [
  { value: 3, suffix: "x", label: "Less context surfaced" },
  { value: 60, suffix: "%", label: "Fewer tokens per query" },
];

/** Counts up to `value` once the card scrolls into view. */
function StatCounter({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const spring = useSpring(0, { stiffness: 60, damping: 18, mass: 0.8 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => spring.set(value), delay * 1000);
    return () => clearTimeout(t);
  }, [inView, spring, value, delay]);

  return (
    <div
      ref={ref}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-colors duration-500 hover:border-[var(--color-brand)]/30 md:p-10"
    >
      {/* Ember bloom on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-brand)]/[0.12] opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative mb-3 flex items-baseline text-5xl font-semibold tracking-tight text-[var(--color-brand)] md:text-6xl">
        <motion.span className="tabular-nums">{display}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="relative text-sm font-light text-white/50 md:text-base">{label}</div>
    </div>
  );
}

export function Benchmarks() {
  return (
    <section id="benchmarks" className="relative py-28 md:py-36">
      <Container>
        <div className="mb-16 max-w-3xl md:mb-20">
          <SectionNumber number="02" />
          <SectionTitle
            title={
              <>
                Less context.{" "}
                <span className="text-white/40">Fewer tokens.</span>
              </>
            }
            subtitle="Instead of dumping the repo into the context window, CodeBroker hands back only what's relevant — so your AI reads less and answers faster."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {stats.map(({ value, suffix, label }, i) => (
            <Reveal key={label} delay={0.1 * i}>
              <StatCounter value={value} suffix={suffix} label={label} delay={0.1 * i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-6">
          <ContextGrid />
        </Reveal>
      </Container>
    </section>
  );
}
