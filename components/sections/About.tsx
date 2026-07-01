"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function About() {
  const container = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!visualRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: visualRef.current,
        start: "top 90%",
        end: "center center",
        scrub: 0.5,
      }
    });

    // Radar rings expanding
    tl.fromTo(".radar-ring", 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.2, duration: 2, stagger: 0.5 }
    );

    // Nodes popping in
    tl.fromTo(".graph-node",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, stagger: 0.2 },
      "-=1.5"
    );

    // Lines drawing
    tl.fromTo(".graph-line",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.5, duration: 1, stagger: 0.1 },
      "-=1"
    );

    // Labels fading in
    tl.fromTo(".graph-label",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
      "-=1"
    );

    // Center glow
    tl.to(".center-node",
      { boxShadow: "0 0 30px 10px rgba(255, 90, 31, 0.4)", duration: 1 },
      "-=0.5"
    );

    // Right panel lines revealing
    tl.fromTo(".panel-reveal",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.15 },
      "-=2"
    );

  }, { scope: container });

  const labels = [
    { text: "Auth.ts", x: "10%", y: "20%" },
    { text: "Database", x: "70%", y: "15%" },
    { text: "User", x: "85%", y: "45%" },
    { text: "JWT", x: "65%", y: "80%" },
    { text: "API", x: "20%", y: "75%" },
    { text: "Session", x: "5%", y: "45%" },
    { text: "Middleware", x: "40%", y: "10%" }
  ];

  const includes = [
    "AuthenticationService",
    "JWTMiddleware",
    "UserRepository",
    "SessionManager",
    "Auth Routes",
    "Login Controller"
  ];

  return (
    <section ref={container} id="about" className="py-32 relative">
      <Container>
        {/* Top Header */}
        <div className="mb-24 max-w-4xl">
          <SectionNumber number="01" className="mb-6 inline-block text-[var(--color-brand)] border border-[var(--color-brand)]/20 px-3 py-1 rounded-full bg-[var(--color-brand)]/10" />
          <span className="text-[var(--color-brand)] text-sm font-mono uppercase tracking-widest ml-4">Semantic Intelligence</span>
          
          <SectionTitle 
            title="Every answer starts with understanding."
            className="mt-6"
          />
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/60 font-light mt-8 max-w-3xl leading-relaxed">
              CodeBroker doesn't guess how your code works. It builds a deterministic semantic graph of your repository, follows relationships across your architecture, and prepares only the context your AI actually needs.
            </p>
          </Reveal>
        </div>

        {/* Visualization Area */}
        <div ref={visualRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-32">
          
          {/* Left Side: Semantic Graph */}
          <div className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-3xl border border-white/10 bg-black/50 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-grid opacity-10" />
            
            {/* Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="radar-ring absolute w-[30%] h-[30%] rounded-full border border-white/20" />
              <div className="radar-ring absolute w-[60%] h-[60%] rounded-full border border-white/15" />
              <div className="radar-ring absolute w-[90%] h-[90%] rounded-full border border-white/5" />
            </div>

            {/* Connecting Lines (Simulated with absolute divs) */}
            <div className="absolute inset-0">
               <div className="graph-line absolute w-[40%] h-[1px] bg-white/20 origin-left rotate-45 left-1/2 top-1/2" />
               <div className="graph-line absolute w-[30%] h-[1px] bg-white/20 origin-left -rotate-12 left-1/2 top-1/2" />
               <div className="graph-line absolute w-[45%] h-[1px] bg-white/20 origin-left rotate-[135deg] left-1/2 top-1/2" />
               <div className="graph-line absolute w-[35%] h-[1px] bg-white/20 origin-left -rotate-[160deg] left-1/2 top-1/2" />
               <div className="graph-line absolute w-[38%] h-[1px] bg-white/20 origin-left -rotate-[105deg] left-1/2 top-1/2" />
               <div className="graph-line absolute w-[42%] h-[1px] bg-white/20 origin-left -rotate-[60deg] left-1/2 top-1/2" />
            </div>

            {/* Labels & Nodes */}
            <div className="absolute inset-0">
              {labels.map((label, i) => (
                <div 
                  key={i} 
                  className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: label.x, top: label.y }}
                >
                  <div className="graph-node w-2 h-2 rounded-full bg-white/80" />
                  <span className="graph-label text-xs font-mono text-white/50 tracking-wider bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                    {label.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Center Node (Cursor/Query) */}
            <div className="center-node absolute w-3 h-3 bg-[var(--color-brand)] rounded-full z-10 shadow-[0_0_15px_rgba(255,90,31,0.8)]" />
          </div>

          {/* Right Side: Context Capsule Panel */}
          <div className="lg:col-span-5 relative w-full h-full lg:-ml-12 z-10 flex flex-col justify-center">
            <div className="rounded-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl overflow-hidden flex flex-col h-full max-h-[600px]">
              
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[var(--color-brand)]" />
                  <h3 className="text-lg font-medium tracking-tight">Context Capsule</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/20 text-[var(--color-brand)] text-xs font-mono">
                  Ready for Claude
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-8">
                {/* Request */}
                <div className="panel-reveal">
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">Request</p>
                  <p className="text-lg text-white/90 font-light border-l-2 border-[var(--color-brand)] pl-4">
                    Modify authentication without breaking sessions.
                  </p>
                </div>

                {/* Included Automatically */}
                <div className="panel-reveal">
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">Included automatically</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/70 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/80" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dependencies */}
                <div className="panel-reveal">
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">Dependencies</p>
                  <div className="flex flex-wrap gap-2">
                    {["42 symbols", "17 files", "113 relationships", "6 entrypoints", "2 architectural layers"].map((dep, i) => (
                      <span key={i} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Bottom Feature Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/10">
          <Reveal>
            <h4 className="text-xl font-medium mb-4">Semantic Graph</h4>
            <p className="text-white/50 font-light leading-relaxed">
              Every file is transformed into symbols, relationships and graph edges.
            </p>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h4 className="text-xl font-medium mb-4">Deterministic Context</h4>
            <p className="text-white/50 font-light leading-relaxed">
              Only relevant architecture is selected—no token waste, no hallucinations.
            </p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h4 className="text-xl font-medium mb-4">AI Ready</h4>
            <p className="text-white/50 font-light leading-relaxed">
              Claude, GPT, Gemini or any MCP client receives structured project understanding.
            </p>
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
