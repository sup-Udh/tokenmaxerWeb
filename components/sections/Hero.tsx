"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/harness-icons";

gsap.registerPlugin(useGSAP);

/* Faint constellation of code symbols drifting behind the headline */
const constellation = [
  { label: "auth.ts", x: "8%", y: "22%", cls: "animate-float" },
  { label: "graph.rs", x: "88%", y: "18%", cls: "animate-float-slow" },
  { label: "UserRepo", x: "14%", y: "70%", cls: "animate-float-slow" },
  { label: "resolve()", x: "84%", y: "66%", cls: "animate-float" },
  { label: "middleware", x: "50%", y: "10%", cls: "animate-float" },
];

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 16, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.15 }
    )
      .fromTo(
        ".hero-title .word",
        { opacity: 0, y: 50, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.06 },
        "-=0.4"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        ".hero-actions",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        ".hero-install",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      )
      .fromTo(
        ".hero-node",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" },
        "-=0.9"
      )
      .fromTo(
        ".hero-scroll-cue",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.3"
      );
  }, { scope: container });


  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden"
    >
      {/* Warm aurora wash */}
      <div className="absolute inset-0 bg-aurora pointer-events-none" />

      {/* Drifting constellation nodes */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        {constellation.map((node) => (
          <div
            key={node.label}
            className={`hero-node absolute flex items-center gap-2 opacity-0 ${node.cls}`}
            style={{ left: node.x, top: node.y }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]/70 shadow-[0_0_10px_rgba(255,90,31,0.6)]" />
            <span className="font-mono text-xs text-white/25 tracking-wider">{node.label}</span>
          </div>
        ))}
      </div>

      <Container className="relative flex flex-col items-center text-center">
        {/* Badge */}
        <div className="hero-badge mb-10 opacity-0">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-brand)]/25 bg-[var(--color-brand)]/[0.07] px-5 py-2 text-xs md:text-sm font-mono text-[var(--color-ember)] tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse-dot" />
            Open-source MCP server
          </span>
        </div>

        {/* Huge Typography */}
        <h1
          className="hero-title text-6xl md:text-8xl lg:text-[7rem] font-semibold tracking-tighter leading-[1.05] max-w-5xl mb-10"
          style={{ perspective: "800px" }}
        >
          <span className="word inline-block">The</span>{" "}
          <span className="word inline-block">agent</span>{" "}
          <span className="word inline-block">that</span>{" "}
          <span className="word inline-block">lives</span>{" "}
          <br className="hidden md:block" />
          <span className="word inline-block text-white/40">in</span>{" "}
          <span className="word inline-block text-white/40">your</span>{" "}
          <span className="word inline-block bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-ember)] bg-clip-text text-transparent">codebase.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subtitle text-lg md:text-2xl text-white/55 max-w-3xl font-light mb-12 opacity-0">
          CodeBroker indexes your repository and hands your AI coding tools the
          exact files and context they need — so they stop guessing and start
          answering.
        </p>

        {/* Buttons */}
        <div className="hero-actions flex flex-col sm:flex-row gap-4 opacity-0">
          <Link href="/docs/quick-start">
            <Button
              size="lg"
              className="group px-10 bg-[var(--color-brand)] text-black hover:bg-[var(--color-brand-soft)] hover:shadow-[0_0_36px_rgba(255,90,31,0.4)] transition-all duration-300"
            >
              Get Started
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
          <Link href="https://github.com/codebroker" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="px-10 gap-2.5">
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </Button>
          </Link>
        </div>

        {/* Install one-liner */}
        <div className="hero-install mt-10 opacity-0">
          <code className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/60 px-5 py-3 font-mono text-sm text-white/60 backdrop-blur-sm">
            <span className="text-[var(--color-brand)]">$</span>
            claude mcp add codebroker
            <span className="inline-block h-4 w-[2px] bg-[var(--color-brand)] animate-pulse" />
          </code>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="hero-scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <ChevronDown className="h-4 w-4 text-white/30 animate-bounce" />
      </div>
    </section>
  );
}
