"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export function FloatingNotice() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-black/80 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <Sparkles className="h-4 w-4" />
          </span>

          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              CodeBroker is free for your first 7 days.
            </p>
            <p className="mt-1 text-xs text-white/50">
              Paid plans coming soon.
            </p>
          </div>

          <button
            aria-label="Dismiss notification"
            onClick={() => setDismissed(true)}
            className="mt-0.5 shrink-0 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
