"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface MetricCounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export function MetricCounter({ value, suffix = "", label, delay = 0 }: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Animate from 0 to value
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  const display = useTransform(springValue, (current) => {
    return Math.floor(current).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        springValue.set(value);
      }, delay * 1000);
    }
  }, [isInView, springValue, value, delay]);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay }}
        className="flex items-baseline"
      >
        <motion.span className="text-6xl md:text-8xl font-light tracking-tighter text-white">
          {display}
        </motion.span>
        {suffix && (
          <span className="text-4xl md:text-6xl font-light text-[var(--color-brand)] ml-1">
            {suffix}
          </span>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      >
        <span className="text-sm uppercase tracking-widest text-white/50 font-mono block max-w-[150px]">
          {label}
        </span>
      </motion.div>
    </div>
  );
}
