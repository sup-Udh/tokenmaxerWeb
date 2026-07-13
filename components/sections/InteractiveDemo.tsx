"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TerminalSquare,
  MessageSquare,
  LayoutDashboard,
  Loader2,
  CheckCircle2,
  FileCode2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ClaudeCodeIcon } from "@/components/ui/harness-icons";

/* ---------------------------------------------------------------- */
/*  Shared bits                                                      */
/* ---------------------------------------------------------------- */

function TypedText({
  text,
  className,
  charMs = 32,
  onComplete,
}: {
  text: string;
  className?: string;
  charMs?: number;
  onComplete?: () => void;
}) {
  return (
    <span
      className={cn("typewriter font-mono", className)}
      style={
        {
          animationDuration: `${Math.max(text.length, 1) * charMs}ms`,
          "--steps": Math.max(text.length, 1),
        } as CSSProperties
      }
      onAnimationEnd={onComplete}
    >
      {text}
    </span>
  );
}

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="h-11 border-b border-white/10 flex items-center px-5 gap-2 bg-white/5 shrink-0">
      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <span className="ml-3 font-mono text-xs text-white/30">{title}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Scene 1 — Terminal: init + bind                                  */
/* ---------------------------------------------------------------- */

function TerminalScene() {
  const [phase, setPhase] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <WindowChrome title="terminal" />
      <div className="flex-1 p-6 md:p-8 font-mono text-[13px] md:text-sm leading-relaxed overflow-hidden">
        <div className="flex gap-2 text-white/80">
          <span className="text-[var(--color-brand)]">$</span>
          <TypedText text="codebroker init" onComplete={() => setPhase((p) => Math.max(p, 1))} />
        </div>

        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            onAnimationComplete={() => setTimeout(() => setPhase((p) => Math.max(p, 2)), 650)}
            className="pl-5 mt-1 text-emerald-400/90"
          >
            ✓ Initialized CodeBroker configuration in .codebroker.json
          </motion.div>
        )}

        {phase >= 2 && (
          <div className="flex gap-2 text-white/80 mt-4">
            <span className="text-[var(--color-brand)]">$</span>
            <TypedText text="codebroker bind" onComplete={() => setPhase((p) => Math.max(p, 3))} />
          </div>
        )}

        {phase >= 3 && (
          <div className="pl-5 mt-1 space-y-1">
            {["✓ Bound CodeBroker to Claude", "✓ Bound CodeBroker to Gemini"].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-emerald-400/90"
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-white/40 pt-1"
            >
              Ready — your AI tools can now query this repository&apos;s graph
              <span className="inline-block w-[7px] h-[14px] bg-[var(--color-brand)] ml-1.5 align-middle animate-pulse" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Scene 2 — Editor: chatting with Claude, tool call in flight      */
/* ---------------------------------------------------------------- */

const CHAT_FILES = ["auth/provider.ts", "middleware.ts", "auth.config.ts"];

function ChatScene() {
  const [phase, setPhase] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <WindowChrome title="auth/provider.ts — Editor" />
      <div className="flex flex-1 min-h-0">
        {/* Fake file rail */}
        <div className="hidden sm:flex w-11 shrink-0 flex-col items-center gap-3 border-r border-white/10 bg-white/[0.02] py-4">
          <FileCode2 className="h-4 w-4 text-white/25" />
          <FileCode2 className="h-4 w-4 text-white/15" />
          <FileCode2 className="h-4 w-4 text-white/15" />
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col p-5 md:p-7 min-w-0">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
              <ClaudeCodeIcon className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium text-white/70">Claude</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/25 border border-white/10 rounded-full px-2 py-0.5">
              via MCP
            </span>
          </div>

          {/* User message */}
          <div className="flex justify-end mb-4">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-white/[0.06] px-4 py-2.5 text-sm text-white/80">
              Where&apos;s authentication handled in this repo?
            </div>
          </div>

          {/* Assistant response */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onAnimationComplete={() => setTimeout(() => setPhase((p) => Math.max(p, 1)), 1200)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 font-mono text-xs text-white/50 w-fit"
          >
            {phase < 1 ? (
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[var(--color-brand)]" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400/90" />
            )}
            codebroker.search_codebase(&quot;authentication&quot;)
            {phase >= 1 && <span className="text-white/30">· 3 files found</span>}
          </motion.div>

          {phase >= 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onAnimationComplete={() => setTimeout(() => setPhase((p) => Math.max(p, 2)), 100)}
              className="mt-4 text-sm text-white/70 leading-relaxed max-w-[85%]"
            >
              <TypedText
                charMs={14}
                text="Found it — provider.ts handles session creation, middleware.ts validates requests, and auth.config.ts holds your provider settings."
              />
            </motion.p>
          )}

          {phase >= 2 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {CHAT_FILES.map((file, i) => (
                <motion.span
                  key={file}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/50"
                >
                  <span className="h-1 w-1 rounded-full bg-[var(--color-brand)]/70" />
                  {file}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Scene 3 — Dashboard: fake analytics                              */
/* ---------------------------------------------------------------- */

const STATS = [
  { label: "Files indexed", value: "1,245" },
  { label: "Graph nodes", value: "3,412" },
  { label: "Graph edges", value: "12,844" },
  { label: "Avg query time", value: "38ms" },
];

const TOP_FILES = [
  { file: "middleware.ts", count: 58 },
  { file: "provider.ts", count: 44 },
  { file: "auth.config.ts", count: 31 },
  { file: "routes.ts", count: 19 },
];
const MAX_COUNT = Math.max(...TOP_FILES.map((f) => f.count));

const SPARK_POINTS = [8, 14, 11, 20, 26, 24, 34];
const SPARK_W = 220;
const SPARK_H = 48;
function sparkPath() {
  const max = Math.max(...SPARK_POINTS);
  const step = SPARK_W / (SPARK_POINTS.length - 1);
  return SPARK_POINTS.map((v, i) => {
    const x = i * step;
    const y = SPARK_H - (v / max) * (SPARK_H - 6) - 3;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function DashboardScene() {
  return (
    <div className="flex h-full flex-col">
      <WindowChrome title="CodeBroker · Dashboard" />
      <div className="flex-1 p-5 md:p-7 overflow-hidden">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3"
            >
              <div className="text-lg md:text-xl font-semibold text-white tabular-nums">{stat.value}</div>
              <div className="text-[10px] md:text-xs text-white/40 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar list */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/35 mb-3">
              Most queried files
            </h4>
            <div className="space-y-2.5">
              {TOP_FILES.map((row, i) => (
                <div key={row.file} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 truncate font-mono text-[11px] text-white/50">
                    {row.file}
                  </span>
                  <div className="h-1.5 flex-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: row.count / MAX_COUNT }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "left" }}
                      className="h-full rounded-full bg-[var(--color-brand)]"
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right font-mono text-[11px] text-white/40 tabular-nums">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sparkline */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/35 mb-3">
              Queries this week
            </h4>
            <svg
              viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
              className="w-full h-16 md:h-20"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${sparkPath()} L${SPARK_W},${SPARK_H} L0,${SPARK_H} Z`}
                fill="url(#sparkFill)"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              />
              <motion.path
                d={sparkPath()}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <p className="mt-2 text-[11px] text-white/30 font-mono flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse-dot" />
              index: up to date
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Orchestrator                                                     */
/* ---------------------------------------------------------------- */

const STEPS = [
  { label: "Initialize & bind", icon: TerminalSquare, duration: 6200, Scene: TerminalScene },
  { label: "Ask your AI", icon: MessageSquare, duration: 7200, Scene: ChatScene },
  { label: "See the graph", icon: LayoutDashboard, duration: 5600, Scene: DashboardScene },
];

export function InteractiveDemo() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  const advance = () => setActive((a) => (a + 1) % STEPS.length);

  return (
    <motion.div
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === active;
          return (
            <button
              key={step.label}
              onClick={() => setActive(i)}
              className={cn(
                "group relative flex-1 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-colors overflow-hidden",
                isActive
                  ? "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-[var(--color-brand)]" : "text-white/40 group-hover:text-white/60"
                )}
              />
              <span
                className={cn(
                  "text-xs md:text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/50 group-hover:text-white/70"
                )}
              >
                {step.label}
              </span>

              {/* Progress fill */}
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
                {isActive && started && (
                  <motion.span
                    key={active}
                    className="block h-full bg-[var(--color-brand)]"
                    style={{ transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: step.duration / 1000, ease: "linear" }}
                    onAnimationComplete={advance}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scene window */}
      <div className="border-shimmer rounded-3xl bg-black shadow-2xl overflow-hidden min-h-[420px] md:min-h-[440px]">
        <AnimatePresence mode="wait">
          {started && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-[420px] md:h-[440px]"
            >
              {(() => {
                const Scene = STEPS[active].Scene;
                return <Scene />;
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
