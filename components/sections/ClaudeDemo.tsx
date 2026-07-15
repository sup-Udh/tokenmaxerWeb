"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileCode2,
  Network,
  Play,
  RotateCcw,
  CornerDownRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ClaudeCodeIcon } from "@/components/ui/harness-icons";

/* ------------------------------------------------------------------ */
/*  Scenario data                                                      */
/*                                                                     */
/*  Token counts are illustrative and sized to the 3x-context /        */
/*  60%-fewer-tokens figures published in the Benchmarks section.      */
/* ------------------------------------------------------------------ */

type StepKind = "grep" | "read" | "broker";

interface Step {
  /** ms into the run when this step lands */
  at: number;
  kind: StepKind;
  text: string;
  meta: string;
  tokens: number;
}

interface Side {
  steps: Step[];
  answerAt: number;
  answer: string;
  files: number;
  seconds: number;
}

interface Scenario {
  id: string;
  question: string;
  short: string;
  baseline: Side;
  broker: Side;
}

const SCENARIOS: Scenario[] = [
  {
    id: "auth",
    short: "Find a feature",
    question: "Where is authentication handled in this repo?",
    baseline: {
      steps: [
        { at: 200, kind: "grep", text: 'grep -r "auth" .', meta: "412 matches · 63 files", tokens: 2400 },
        { at: 1500, kind: "grep", text: 'glob "**/*auth*"', meta: "18 files", tokens: 900 },
        { at: 2700, kind: "read", text: "read middleware.ts", meta: "840 lines", tokens: 9100 },
        { at: 4100, kind: "read", text: "read auth/provider.ts", meta: "1,204 lines", tokens: 12600 },
        { at: 5500, kind: "read", text: "read auth/session.ts", meta: "612 lines", tokens: 6300 },
        { at: 6700, kind: "read", text: "read auth.config.ts", meta: "180 lines", tokens: 1900 },
        { at: 7700, kind: "grep", text: 'grep -r "createSession"', meta: "22 matches", tokens: 1200 },
        { at: 8700, kind: "read", text: "read api/login/route.ts", meta: "310 lines", tokens: 4000 },
      ],
      answerAt: 10000,
      answer:
        "Auth seems to live across middleware.ts and a few files under auth/. I read what looked relevant — there may be more I haven't opened.",
      files: 12,
      seconds: 31,
    },
    broker: {
      steps: [
        {
          at: 200,
          kind: "broker",
          text: 'search_codebase("authentication")',
          meta: "3 ranked files",
          tokens: 3100,
        },
        { at: 1500, kind: "broker", text: 'get_context("createSession")', meta: "callers + callees", tokens: 4200 },
        {
          at: 2700,
          kind: "broker",
          text: 'read_symbol_source("createSession")',
          meta: "exact body",
          tokens: 8100,
        },
      ],
      answerAt: 4000,
      answer:
        "provider.ts creates sessions, middleware.ts validates them on each request, and auth.config.ts holds provider settings. createSession() is called from 2 routes.",
      files: 4,
      seconds: 6,
    },
  },
  {
    id: "impact",
    short: "Check impact",
    question: "What breaks if I change createSession()?",
    baseline: {
      steps: [
        { at: 200, kind: "grep", text: 'grep -r "createSession"', meta: "22 matches", tokens: 1800 },
        { at: 1400, kind: "read", text: "read auth/session.ts", meta: "612 lines", tokens: 6300 },
        { at: 2700, kind: "read", text: "read api/login/route.ts", meta: "310 lines", tokens: 4000 },
        { at: 3900, kind: "read", text: "read api/refresh/route.ts", meta: "286 lines", tokens: 3600 },
        { at: 5100, kind: "read", text: "read middleware.ts", meta: "840 lines", tokens: 9100 },
        { at: 6400, kind: "read", text: "read tests/session.test.ts", meta: "440 lines", tokens: 5400 },
        { at: 7600, kind: "grep", text: 'grep -r "session("', meta: "61 matches", tokens: 1400 },
      ],
      answerAt: 8900,
      answer:
        "I found several call sites by searching for the name. Dynamic or re-exported callers wouldn't show up in a text search, so treat this as a partial list.",
      files: 9,
      seconds: 27,
    },
    broker: {
      steps: [
        { at: 200, kind: "broker", text: 'get_context("createSession")', meta: "4 callers", tokens: 4200 },
        { at: 1500, kind: "broker", text: "explore_graph(depth: 2)", meta: "reverse deps", tokens: 5100 },
        { at: 2700, kind: "broker", text: 'get_edit_context("createSession")', meta: "exact line bounds", tokens: 3300 },

      ],
      answerAt: 4000,
      answer:
        "4 direct callers: login and refresh routes, middleware.ts, and session.test.ts. Changing the return type breaks middleware.ts:42 — it destructures .expiresAt.",
      files: 3,
      seconds: 5,
    },
  },
  {
    id: "feature",
    short: "Ship a change",
    question: "Add rate limiting to the API routes.",
    baseline: {
      steps: [
        { at: 200, kind: "grep", text: 'glob "app/api/**/*.ts"', meta: "24 files", tokens: 1100 },
        { at: 1400, kind: "read", text: "read api/login/route.ts", meta: "310 lines", tokens: 4000 },
        { at: 2600, kind: "read", text: "read api/refresh/route.ts", meta: "286 lines", tokens: 3600 },
        { at: 3800, kind: "read", text: "read api/users/route.ts", meta: "352 lines", tokens: 4400 },
        { at: 5000, kind: "read", text: "read middleware.ts", meta: "840 lines", tokens: 9100 },
        { at: 6200, kind: "grep", text: 'grep -r "rateLimit"', meta: "0 matches", tokens: 900 },
        { at: 7200, kind: "read", text: "read lib/redis.ts", meta: "220 lines", tokens: 2900 },
      ],
      answerAt: 8400,
      answer:
        "I'll add a rate limiter to each route file I opened. I'm not sure whether this repo already has a middleware pipeline I should hook into instead.",
      files: 8,
      seconds: 24,
    },
    broker: {
      steps: [
        { at: 200, kind: "broker", text: 'search_codebase("api middleware")', meta: "pipeline found", tokens: 2900 },
        { at: 1500, kind: "broker", text: 'subsystem_communication("app/api")', meta: "24 routes → 1 entry", tokens: 3400 },
        { at: 2700, kind: "broker", text: 'get_edit_context("middleware")', meta: "insert point + deps", tokens: 4100 },
      ],
      answerAt: 4000,
      answer:
        "All 24 routes already flow through middleware.ts. Add the limiter there at line 28 — one edit covers every route, and lib/redis.ts is already wired for it.",
      files: 3,
      seconds: 5,
    },
  },
];

const RUN_END = 11800;

/* ------------------------------------------------------------------ */
/*  Derivation helpers — everything is a pure function of `elapsed`,   */
/*  so replay and scrubbing stay consistent.                           */
/* ------------------------------------------------------------------ */

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function tokensAt(steps: Step[], elapsed: number) {
  let total = 0;
  for (const s of steps) {
    if (elapsed <= s.at) continue;
    total += s.tokens * easeOut(Math.min(1, (elapsed - s.at) / 550));
  }
  return Math.round(total);
}

const stepsAt = (steps: Step[], elapsed: number) => steps.filter((s) => elapsed >= s.at);

/* ------------------------------------------------------------------ */
/*  Panel                                                              */
/* ------------------------------------------------------------------ */

const KIND_ICON: Record<StepKind, typeof Search> = {
  grep: Search,
  read: FileCode2,
  broker: Network,
};

function Panel({
  variant,
  side,
  elapsed,
  question,
}: {
  variant: "baseline" | "broker";
  side: Side;
  elapsed: number;
  question: string;
}) {
  const isBroker = variant === "broker";
  const visible = stepsAt(side.steps, elapsed);
  const tokens = tokensAt(side.steps, elapsed);
  const done = elapsed >= side.answerAt;
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest tool call in view as the run progresses.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible.length, done]);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border bg-black/40 overflow-hidden transition-colors duration-500",
        isBroker
          ? "border-[var(--color-brand)]/30"
          : "border-white/[0.08]"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-b px-4 py-3 md:px-5 shrink-0",
          isBroker ? "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/[0.04]" : "border-white/[0.08] bg-white/[0.02]"
        )}
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
            isBroker ? "bg-[var(--color-brand)]/15 text-[var(--color-brand)]" : "bg-white/5 text-white/50"
          )}
        >
          <ClaudeCodeIcon className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-medium text-white/85 truncate">
          {isBroker ? "Claude + CodeBroker" : "Claude on its own"}
        </span>
        {isBroker && (
          <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-brand)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse-dot" />
            MCP
          </span>
        )}
      </div>

      {/* Live token meter */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b px-4 py-2.5 md:px-5 shrink-0",
          isBroker ? "border-[var(--color-brand)]/15" : "border-white/[0.06]"
        )}
      >
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
          Context read
          <AnimatePresence>
            {done && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] tracking-wider",
                  isBroker
                    ? "bg-[var(--color-brand)]/15 text-[var(--color-brand)]"
                    : "bg-white/[0.06] text-white/40"
                )}
              >
                {isBroker ? (
                  <CheckCircle2 className="h-2.5 w-2.5" />
                ) : (
                  <AlertTriangle className="h-2.5 w-2.5" />
                )}
                done
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span
          className={cn(
            "font-mono text-sm tabular-nums transition-colors",
            isBroker ? "text-[var(--color-brand)]" : "text-white/70"
          )}
        >
          {tokens.toLocaleString()}
          <span className="text-white/30"> tokens</span>
        </span>
      </div>

      {/* Transcript */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 md:px-5 min-h-[300px] max-h-[300px] custom-scrollbar"
      >
        {/* The question, asked once */}
        <div className="mb-4 flex justify-end">
          <div className="max-w-[90%] rounded-2xl rounded-tr-sm bg-white/[0.06] px-3.5 py-2 text-[13px] leading-relaxed text-white/75">
            {question}
          </div>
        </div>

        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {visible.map((step) => {
              const Icon = KIND_ICON[step.kind];
              return (
                <motion.div
                  key={step.text}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border px-3 py-2 font-mono text-[11px] md:text-xs",
                    isBroker
                      ? "border-[var(--color-brand)]/20 bg-[var(--color-brand)]/[0.05] text-white/75"
                      : "border-white/[0.07] bg-white/[0.02] text-white/55"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isBroker ? "text-[var(--color-brand)]" : "text-white/30"
                    )}
                  />
                  <span className="truncate">{step.text}</span>
                  <span className="ml-auto shrink-0 text-[10px] text-white/30 hidden sm:inline">
                    {step.meta}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Final answer */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex gap-2.5"
            >
              <CornerDownRight
                className={cn(
                  "mt-0.5 h-3.5 w-3.5 shrink-0",
                  isBroker ? "text-[var(--color-brand)]" : "text-white/25"
                )}
              />
              <p
                className={cn(
                  "text-[13px] leading-relaxed",
                  isBroker ? "text-white/85" : "text-white/50"
                )}
              >
                {side.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Verdict strip */}
      <div
        className={cn(
          "grid grid-cols-3 border-t shrink-0 divide-x",
          isBroker
            ? "border-[var(--color-brand)]/20 divide-[var(--color-brand)]/10"
            : "border-white/[0.06] divide-white/[0.06]"
        )}
      >
        {[
          { label: "Files opened", value: done ? side.files : "—" },
          { label: "Time", value: done ? `${side.seconds}s` : "—" },
          {
            label: "Outcome",
            value: done ? (isBroker ? "Precise" : "Hedged") : "—",
          },
        ].map((cell) => (
          <div key={cell.label} className="px-3 py-2.5 text-center">
            <div
              className={cn(
                "font-mono text-sm tabular-nums transition-colors",
                !done
                  ? "text-white/20"
                  : isBroker
                    ? "text-[var(--color-brand)]"
                    : "text-white/60"
              )}
            >
              {cell.value}
            </div>
            <div className="mt-0.5 text-[9px] font-mono uppercase tracking-wider text-white/25">
              {cell.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function ClaudeDemo() {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const scenario = SCENARIOS[index];

  const run = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setElapsed(0);
    setRunning(true);
    setHasRun(true);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const e = now - startRef.current;
      if (e >= RUN_END) {
        setElapsed(RUN_END);
        setRunning(false);
        return;
      }
      setElapsed(e);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Reduced motion: skip the animation, show the finished comparison.
  const settle = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setElapsed(RUN_END);
    setRunning(false);
    setHasRun(true);
  }, []);

  const select = (i: number) => {
    if (i === index) return;
    setIndex(i);
    cancelAnimationFrame(rafRef.current);
    setElapsed(0);
    setRunning(false);
    setHasRun(false);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const finished = elapsed >= RUN_END;
  const baseTokens = tokensAt(scenario.baseline.steps, elapsed);
  const brokerTokens = tokensAt(scenario.broker.steps, elapsed);
  const saved =
    baseTokens > 0 ? Math.max(0, Math.round((1 - brokerTokens / baseTokens) * 100)) : 0;

  return (
    <section id="compare" className="relative py-28 md:py-36 scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[500px] w-[70vw] rounded-full bg-[var(--color-brand)]/[0.05] blur-[130px]" />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-24">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-white/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse-dot" />
            Try it — pick a question
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight leading-tight"
          >
            The same question.{" "}
            <span className="text-white/40">Twice.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base md:text-lg font-light text-white/50"
          >
            Watch Claude answer with nothing but grep, then with CodeBroker
            wired in. Same repo, same question — different amount of reading.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <div className="flex flex-col gap-2 sm:flex-row">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => select(i)}
                aria-pressed={i === index}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-left text-xs md:text-sm transition-all duration-300 sm:text-center",
                  i === index
                    ? "border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.08] text-white"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/80"
                )}
              >
                <span className="block font-mono text-[10px] uppercase tracking-wider text-white/30">
                  {s.short}
                </span>
                <span className="mt-0.5 block font-medium">{s.question}</span>
              </button>
            ))}
          </div>

          <button
            onClick={running ? undefined : run}
            disabled={running}
            className={cn(
              "group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 sm:ml-2",
              running
                ? "cursor-default bg-white/[0.06] text-white/40"
                : "bg-[var(--color-brand)] text-black hover:bg-[var(--color-brand-soft)] hover:shadow-[0_0_28px_rgba(255,90,31,0.4)]"
            )}
          >
            {running ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse-dot" />
                Running
              </>
            ) : hasRun ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                Run again
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                Run
              </>
            )}
          </button>
        </div>

        {/* Panels */}
        <motion.div
          onViewportEnter={() => {
            if (hasRun) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduced) settle();
            else run();
          }}
          viewport={{ once: true, amount: 0.35 }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5"
        >
          <Panel
            variant="baseline"
            side={scenario.baseline}
            elapsed={elapsed}
            question={scenario.question}
          />
          <Panel
            variant="broker"
            side={scenario.broker}
            elapsed={elapsed}
            question={scenario.question}
          />
        </motion.div>

        {/* Result bar */}
        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5"
            >
              <div className="border-shimmer flex flex-col items-center gap-4 rounded-2xl bg-black/50 px-6 py-5 text-center backdrop-blur-sm sm:flex-row sm:justify-center sm:gap-8 sm:text-left">
                <p className="text-sm text-white/60">
                  Same answer quality target — CodeBroker got there on{" "}
                  <span className="font-mono text-[var(--color-brand)]">
                    {saved}% fewer tokens
                  </span>{" "}
                  and{" "}
                  <span className="font-mono text-[var(--color-brand)]">
                    {scenario.baseline.files - scenario.broker.files} fewer files
                  </span>
                  .
                </p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/25">
                  Illustrative walkthrough
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
