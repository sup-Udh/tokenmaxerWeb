"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/LogoMark";

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
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <span className="font-semibold text-lg tracking-tight">
              CodeBroker
              <span className="text-[var(--color-brand)]">.</span>
            </span>
          </Link>
          <div className="hidden md:block w-[1px] h-4 bg-[#232323]" />
          <Link href="/docs" className="hidden md:block text-sm font-medium text-white/70 hover:text-white transition-colors">
            Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}
