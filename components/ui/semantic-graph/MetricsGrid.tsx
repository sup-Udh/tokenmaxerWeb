"use client";

import { motion, Variants } from "framer-motion";

const METRICS = [
  { label: "Files Indexed", value: "327" },
  { label: "Relationships", value: "18,903" },
  { label: "Context Reduction", value: "62%" },
  { label: "Pipeline Time", value: "1.8s" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function MetricsGrid() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-[90%] mx-auto"
    >
      {METRICS.map((metric, i) => (
        <motion.div 
          key={i}
          variants={itemVariants}
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#050505] border border-[#232323] hover:border-[var(--color-brand)]/50 transition-colors duration-300 group"
        >
          <span className="text-3xl md:text-4xl font-semibold text-white mb-2 group-hover:text-[var(--color-brand)] transition-colors duration-300">
            {metric.value}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 text-center">
            {metric.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
