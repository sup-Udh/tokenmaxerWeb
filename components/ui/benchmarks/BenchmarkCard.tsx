"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface BenchmarkCardProps {
  id: string;
  status: string;
  title: string;
  description: string;
  tokens: string;
  efficiency: string;
  delay?: number;
}

export function BenchmarkCard({ status, title, description, tokens, efficiency, delay = 0 }: BenchmarkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
      className="p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] hover:bg-white/[0.02] hover:border-white/20 transition-colors flex flex-col h-full shadow-2xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <Sparkles className="w-5 h-5 text-[var(--color-brand)]" />
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase border",
          status === "Excellent" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
        )}>
          {status}
        </div>
      </div>
      
      <h4 className="text-xl font-mono text-white/90 mb-4">{title}</h4>
      <p className="text-white/50 font-light leading-relaxed flex-1 mb-8 text-sm">
        {description}
      </p>

      <div className="pt-6 border-t border-white/10 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Tokens used</span>
          <span className="text-white font-medium">{tokens}</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Efficiency</span>
          <span className="text-[var(--color-brand)] font-mono font-medium">{efficiency}</span>
        </div>
      </div>
    </motion.div>
  );
}
