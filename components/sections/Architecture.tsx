"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Architecture() {
  const container = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pipelineRef.current) return;
    
    const items = gsap.utils.toArray(".pipeline-item");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=200%", // Pin for longer scroll
        pin: true,
        scrub: 1,
      }
    });

    items.forEach((item: any, i) => {
      // Fade in and translate
      tl.fromTo(item, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1 },
        i * 0.5
      );
      
      // Highlight color
      tl.to(item, { color: "var(--color-brand)", duration: 0.2 });
      
      // Keep visible
      tl.to(item, { duration: 0.5 });
      
      // Fade back to normal
      if (i !== items.length - 1) {
        tl.to(item, { color: "rgba(255, 255, 255, 0.4)", duration: 0.5 });
      }
    });
  }, { scope: container });

  const stages = [
    "Parser",
    "Semantic Engine",
    "Relationship Resolution",
    "Graph Builder",
    "Feature Extraction",
    "Embeddings",
    "Developer Intelligence",
    "AI Context"
  ];

  return (
    <section ref={container} className="h-screen flex flex-col justify-center bg-black border-y border-white/5 relative z-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionNumber number="05" />
            <SectionTitle 
              title="Architecture" 
              subtitle="A robust, multi-stage pipeline designed for scale and precision."
            />
          </div>

          <div ref={pipelineRef} className="flex flex-col gap-4 md:gap-6 border-l border-white/10 pl-8 md:pl-16">
            {stages.map((stage, i) => (
              <div 
                key={stage} 
                className="pipeline-item text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/40 flex items-center gap-6"
              >
                <span className="text-sm font-mono tracking-widest text-white/20 w-8">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                {stage}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
