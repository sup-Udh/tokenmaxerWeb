"use client";

import { useState } from "react";
import { Check, Copy, ChevronRight } from "lucide-react";

interface TerminalBlockProps {
  command: string;
  output?: string;
}

export function TerminalBlock({ command, output }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-[#232323] bg-black shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-[#232323]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          aria-label="Copy command"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="flex items-start gap-3">
          <ChevronRight className="w-4 h-4 text-[var(--color-brand)] mt-0.5 shrink-0" />
          <div className="text-white break-all">{command}</div>
        </div>
        {output && (
          <div className="mt-4 text-white/50 pl-7 whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
