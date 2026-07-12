"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "@/components/ui/harness-icons";

const navLinks = [
  { name: "Integrations", href: "/#works-with" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "Demo", href: "/#demo" },
  { name: "Docs", href: "/docs" },
];

/** Orbiting-node logo mark — a tiny live graph. */
function LogoMark() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_rgba(255,90,31,0.9)]" />
      <span className="absolute h-1 w-1 rounded-full bg-white/60 animate-orbit" />
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
    >
      <div
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-2.5 md:px-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <LogoMark />
          <span className="text-lg font-semibold tracking-tighter">
            CodeBroker
            <span className="text-[var(--color-brand)] transition-opacity group-hover:animate-pulse">.</span>
          </span>
        </Link>

        {/* Center links (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {link.name}
              <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/codebroker"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-white/25 hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
          </Link>

          <Link
            href="/docs/quick-start"
            className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)] px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-[var(--color-brand-soft)] hover:shadow-[0_0_24px_rgba(255,90,31,0.45)]"
          >
            Get Started
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-4 right-4 mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/90 p-3 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.25 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/docs/quick-start"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-brand)] px-4 py-3 text-base font-medium text-black"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
