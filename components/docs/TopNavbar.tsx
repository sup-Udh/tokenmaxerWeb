"use client";

import Link from "next/link";
import { Search, Download, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#232323] transition-colors duration-200",
        scrolled ? "bg-[#050505]/80 backdrop-blur-md" : "bg-[#050505]"
      )}
    >
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Left: Logo & Docs */}
        <div className="flex items-center gap-2 md:gap-4 md:w-[240px]">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight">CodeBroker</span>
            <span className="text-[var(--color-brand)]">.</span>
          </Link>
          <div className="hidden md:block w-[1px] h-4 bg-[#232323]" />
          <Link href="/docs" className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors">
            Documentation
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center px-4">
          <button className="flex items-center gap-2 w-full max-w-md bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/50 transition-colors">
            <Search className="w-4 h-4" />
            <span>Search documentation...</span>
            <kbd className="ml-auto hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-4 md:w-[240px] justify-end">
          <Link href="https://github.com/codebroker" className="text-white/50 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
            </svg>
          </Link>
          <Link href="/download" className="text-white/50 hover:text-white transition-colors">
            <Download className="w-5 h-5" />
          </Link>
          <Link href="https://discord.gg/codebroker" className="text-white/50 hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
