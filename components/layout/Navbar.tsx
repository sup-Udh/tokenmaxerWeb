"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Product", href: "#product" },
  { name: "Architecture", href: "#architecture" },
  { name: "Features", href: "#features" },
  { name: "Documentation", href: "#docs" },
  { name: "GitHub", href: "https://github.com/codebroker" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "py-4 bg-black/50 backdrop-blur-md border-b border-white/5" : "py-8 bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-24 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-semibold tracking-tighter">
            CodeBroker
            <span className="text-[var(--color-brand)]">.</span>
          </Link>
        </div>

        {/* Center: Links */}
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: CTA */}
        <div className="flex-1 flex justify-end">
          <Button size={scrolled ? "sm" : "default"} className="transition-all duration-500">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
