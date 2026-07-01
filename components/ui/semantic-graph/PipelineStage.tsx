"use client";

import { motion } from "framer-motion";
import { PipelineStageData } from "./data";
import { cn } from "@/lib/utils";

interface PipelineStageProps {
  data: PipelineStageData;
  index: number;
  isActive: boolean;
  onHover: () => void;
}

export function PipelineStage({ data, index, isActive, onHover }: PipelineStageProps) {
  const Icon = data.icon;

  return (
    <div 
      className="relative flex flex-col items-center gap-4 group cursor-pointer z-10"
      onMouseEnter={onHover}
    >
      <motion.div
        layout
        className={cn(
          "w-20 h-24 md:w-28 md:h-32 rounded-2xl border bg-black/40 backdrop-blur-md flex flex-col items-center justify-between py-4 transition-all duration-300 relative overflow-hidden",
          isActive 
            ? "border-[var(--color-brand)] shadow-[0_0_25px_rgba(255,107,45,0.2)] bg-black/80" 
            : "border-white/10 hover:border-white/20 hover:bg-black/60"
        )}
        animate={{
          y: isActive ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Soft internal glow for active state */}
        {isActive && (
          <div className="absolute inset-0 bg-[var(--color-brand)] opacity-[0.05] rounded-2xl" />
        )}
        
        <Icon className={cn(
          "w-5 h-5 md:w-6 md:h-6 transition-colors duration-300",
          isActive ? "text-[var(--color-brand)]" : "text-white/40 group-hover:text-white/70"
        )} />
        
        <span className={cn(
          "text-xs font-mono tracking-wider transition-colors duration-300",
          isActive ? "text-[var(--color-brand)]" : "text-white/30 group-hover:text-white/50"
        )}>
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </motion.div>
      
      <span className={cn(
        "text-xs md:text-sm font-medium tracking-wide transition-colors duration-300 text-center px-2",
        isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
      )}>
        {data.name}
      </span>
    </div>
  );
}
