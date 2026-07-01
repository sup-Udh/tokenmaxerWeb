"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PipelineConnectorProps {
  isActive: boolean;
  isPast: boolean;
}

export function PipelineConnector({ isActive, isPast }: PipelineConnectorProps) {
  return (
    <div className="hidden md:flex flex-1 h-[1px] bg-white/10 relative mx-2 top-[-16px]">
      <motion.div
        className="absolute left-0 top-0 bottom-0 bg-[var(--color-brand)] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive || isPast ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}
