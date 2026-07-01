"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("my-6 rounded-xl overflow-hidden border border-[#232323] bg-black shadow-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-[#232323]">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="text-xs font-mono text-white/70">{filename}</span>
          ) : (
            <span className="text-xs font-mono text-white/40 uppercase">{language}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Code Area */}
      <div className="p-4 overflow-x-auto custom-scrollbar text-sm font-mono leading-relaxed text-white/90">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
