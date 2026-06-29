"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SemanticGraph() {
  const container = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!graphRef.current) return;
    
    const steps = gsap.utils.toArray(".graph-step");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    steps.forEach((step: any, i) => {
      tl.fromTo(step, 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        i * 0.5
      );
      
      // Keep visible for a bit
      tl.to(step, { opacity: 1, duration: 0.5 });
      
      // Fade out if not last
      if (i !== steps.length - 1) {
        tl.to(step, { opacity: 0.2, duration: 0.5 });
      }
    });

  }, { scope: container });

  const pipeline = [
    "Files",
    "Symbols",
    "Relationships",
    "Graph",
    "Retrieval",
    "Context"
  ];

  return (
    <section ref={container} id="features" className="py-32 bg-white/[0.01] border-y border-white/5">
      <Container>
        <SectionNumber number="02" />
        <SectionTitle 
          title="Semantic Graph" 
          subtitle="A deterministic representation of your entire codebase."
          className="mb-24"
        />

        <div ref={graphRef} className="relative aspect-video rounded-3xl border border-white/10 bg-black overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 md:p-16 gap-4 md:gap-8">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          
          {pipeline.map((step, index) => (
            <div key={step} className="graph-step flex flex-col items-center gap-4 relative z-10 w-full max-w-[150px]">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white/40 text-xs md:text-sm font-mono tracking-wider">{index + 1}</span>
              </div>
              <span className="text-sm md:text-base font-medium tracking-wide text-white/80">{step}</span>
              
              {/* Connector Line (hide on mobile or change direction) */}
              {index !== pipeline.length - 1 && (
                <>
                  <div className="hidden md:block absolute top-12 left-[100%] w-8 h-[1px] bg-[var(--color-brand)] opacity-50" />
                  <div className="block md:hidden w-[1px] h-4 bg-[var(--color-brand)] opacity-50 mt-2" />
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
