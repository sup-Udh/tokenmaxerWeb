"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";

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

const PipelineItem = ({ stage, index, progress, total }: { stage: string, index: number, progress: any, total: number }) => {
  // Each item has a specific active window based on its index
  const start = index / total;
  const end = (index + 1) / total;
  const highlightStart = start + 0.05;
  const highlightEnd = end - 0.05;

  const color = useTransform(
    progress,
    [start, highlightStart, highlightEnd, end],
    ["rgba(255, 255, 255, 0.4)", "var(--color-brand)", "var(--color-brand)", "rgba(255, 255, 255, 0.4)"]
  );

  return (
    <motion.div 
      style={{ color }}
      className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight flex items-center gap-6"
    >
      <span className="text-sm font-mono tracking-widest opacity-50 w-8">
        {(index + 1).toString().padStart(2, "0")}
      </span>
      {stage}
    </motion.div>
  );
};

export function Architecture() {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.2"]
  });

  return (
    <section ref={container} className="relative py-32 bg-[#050505] border-y border-white/5 z-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionNumber number="05" />
              <SectionTitle 
                title="Architecture" 
                subtitle="A robust, multi-stage pipeline designed for scale and precision."
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-6 border-l border-white/10 pl-8 md:pl-16">
              {stages.map((stage, i) => (
                <PipelineItem 
                  key={stage} 
                  stage={stage} 
                  index={i} 
                  progress={scrollYProgress} 
                  total={stages.length} 
                />
              ))}
            </div>
          </div>
        </Container>
    </section>
  );
}
