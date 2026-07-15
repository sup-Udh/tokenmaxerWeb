"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Every square is a file in the repo. Both modes show what a single question
 * causes the AI to *read* — widely without a map of the repo, narrowly with
 * one. The lit counts are deliberately 3:1 to match the "3x less context
 * surfaced" figure this section reports.
 */

const COLS = 24;
const ROWS = 8;
const TOTAL = COLS * ROWS;

/** Files a scoped, graph-ranked query returns. */
const RELEVANT = [14, 27, 41, 58, 70, 87, 99, 112, 130, 145, 161, 178];

/** Everything a blind keyword sweep ends up opening — RELEVANT plus the misses. */
const WIDE = [
  ...RELEVANT,
  3, 8, 19, 22, 33, 47, 52, 62, 75, 81, 92, 105,
  108, 118, 123, 136, 141, 153, 156, 166, 171, 183, 186, 190,
];

export function ContextGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [scoped, setScoped] = useState(false);
  const [touched, setTouched] = useState(false);

  // Play the reveal once on entry, then hand control to the viewer.
  useEffect(() => {
    if (!inView || touched) return;
    const t = setTimeout(() => setScoped(true), 1800);
    return () => clearTimeout(t);
  }, [inView, touched]);

  const relevant = useMemo(() => new Set(RELEVANT), []);
  const wide = useMemo(() => new Set(WIDE), []);

  const set = (next: boolean) => {
    setTouched(true);
    setScoped(next);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8",
        className
      )}
    >
      {/* Toggle */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium tracking-tight">
            {scoped ? "What CodeBroker hands back" : "What your AI reads without it"}
          </h3>
          <p className="mt-1 font-mono text-xs text-white/35">
            {scoped
              ? `${RELEVANT.length} files read · ranked by the graph`
              : `${WIDE.length} files read · to answer one question`}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Context mode"
          className="inline-flex shrink-0 self-start rounded-xl border border-white/10 bg-black/40 p-1 sm:self-auto"
        >
          {[
            { label: "Without", value: false },
            { label: "With CodeBroker", value: true },
          ].map((opt) => (
            <button
              key={opt.label}
              role="tab"
              aria-selected={scoped === opt.value}
              onClick={() => set(opt.value)}
              className={cn(
                "relative rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-300",
                scoped === opt.value ? "text-black" : "text-white/50 hover:text-white/80"
              )}
            >
              {scoped === opt.value && (
                <motion.span
                  layoutId="contextGridPill"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="absolute inset-0 rounded-lg bg-[var(--color-brand)]"
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* File grid — the faint squares are the rest of the repository */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        aria-hidden
      >
        {Array.from({ length: TOTAL }, (_, i) => {
          const lit = scoped ? relevant.has(i) : wide.has(i);
          const isBrand = scoped && relevant.has(i);
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={inView ? { opacity: lit ? 1 : 0.06, scale: 1 } : {}}
              transition={{
                opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                scale: {
                  duration: 0.4,
                  delay: ((i % COLS) * 0.008 + Math.floor(i / COLS) * 0.02),
                },
              }}
              className={cn(
                "aspect-square rounded-[3px] transition-colors duration-500",
                isBrand
                  ? "bg-[var(--color-brand)] shadow-[0_0_10px_rgba(255,90,31,0.7)]"
                  : "bg-white"
              )}
            />
          );
        })}
      </div>

      {/* Legend + caption */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-white/30">
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-[2px]",
                scoped ? "bg-[var(--color-brand)]" : "bg-white/70"
              )}
            />
            read for this question
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-[2px] bg-white/[0.14]" />
            rest of the repo ({TOTAL} files)
          </span>
        </div>

        <motion.p
          key={scoped ? "scoped" : "full"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-light leading-relaxed text-white/45"
        >
          {scoped
            ? "The graph already knows which files answer the question, so only those are opened — a third as much reading, and nothing irrelevant reaches the context window."
            : "With no map of the repo, the search widens until something matches. Most of what gets opened is never used in the answer."}
        </motion.p>
      </div>
    </div>
  );
}
