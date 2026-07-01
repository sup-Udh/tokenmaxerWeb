"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PIPELINE_STAGES } from "@/components/ui/semantic-graph/data";
import { AnimatedBackground } from "@/components/ui/semantic-graph/AnimatedBackground";
import { PipelineStage } from "@/components/ui/semantic-graph/PipelineStage";
import { PipelineConnector } from "@/components/ui/semantic-graph/PipelineConnector";
import { StageDetails } from "@/components/ui/semantic-graph/StageDetails";
import { MetricsGrid } from "@/components/ui/semantic-graph/MetricsGrid";

export function SemanticGraph() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="semantic-graph" className="py-32 relative bg-[#050505]">
      <Container>
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center max-w-[700px] mx-auto">
          <Reveal>
            <div className="mb-6 inline-block text-[var(--color-brand)] font-mono text-sm tracking-[0.3em] uppercase">
              (03)
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Semantic Graph Engine
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              Every repository becomes a deterministic knowledge graph. <br className="hidden md:block" />
              Files, symbols and relationships are connected before AI ever sees your code.
            </p>
          </Reveal>
        </div>

        {/* Main Interactive Panel */}
        <Reveal delay={0.3}>
          <div className="w-full max-w-[95%] xl:max-w-[90%] mx-auto min-h-[600px] rounded-[32px] border border-[#232323] bg-[#080808] relative overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <AnimatedBackground />
            
            {/* Left Side: Horizontal Pipeline */}
            <div className="w-full md:w-[55%] lg:w-[60%] p-8 md:p-12 flex items-center justify-center relative z-10 border-b md:border-b-0 md:border-r border-[#232323]">
              <div className="flex flex-row items-start justify-center w-full max-w-3xl">
                {PIPELINE_STAGES.map((stage, index) => (
                  <div key={stage.id} className="flex flex-row items-start w-full">
                    <PipelineStage 
                      data={stage} 
                      index={index} 
                      isActive={activeStage === index} 
                      onHover={() => setActiveStage(index)} 
                    />
                    {index < PIPELINE_STAGES.length - 1 && (
                      <PipelineConnector 
                        isActive={activeStage === index}
                        isPast={activeStage > index}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Stage Details */}
            <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 relative z-10 flex items-center bg-black/20 backdrop-blur-sm">
              <StageDetails data={PIPELINE_STAGES[activeStage]} />
            </div>
          </div>
        </Reveal>

        {/* Bottom Metrics */}
        <MetricsGrid />
      </Container>
    </section>
  );
}
