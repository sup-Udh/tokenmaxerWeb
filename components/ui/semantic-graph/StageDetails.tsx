"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PipelineStageData } from "./data";

interface StageDetailsProps {
  data: PipelineStageData;
}

export function StageDetails({ data }: StageDetailsProps) {
  return (
    <div className="h-full flex flex-col justify-center max-w-sm ml-auto mr-auto md:ml-12 md:mr-0 text-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={data.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col gap-6"
        >
          {/* Title Area */}
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              {data.title}
            </h3>
            <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
              {data.description}
            </p>
          </div>
          
          {/* Metrics Area */}
          <div className="flex flex-col gap-3 mt-4 border-l-2 border-[var(--color-brand)]/50 pl-4">
            {data.metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]/80" />
                <span className="text-white font-medium text-sm md:text-base tracking-wide">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
