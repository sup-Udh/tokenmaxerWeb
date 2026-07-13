"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/LogoMark";
import { navigation } from "@/components/docs/SidebarNavigation";

export function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#232323] transition-colors duration-200",
        scrolled ? "bg-[#050505]/80 backdrop-blur-md" : "bg-[#050505]"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
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

        {/* Mobile nav toggle — the sidebar is hidden below lg, so this is the
            only way to reach docs navigation on phones/tablets */}
        <button
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((v) => !v)}
          className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white transition-colors"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-y-auto max-h-[calc(100vh-4rem)] border-b border-[#232323] bg-[#050505] px-4 py-4"
          >
            <div className="flex flex-col gap-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h4 className="font-semibold text-white/40 text-xs uppercase tracking-wider mb-2">
                    {section.title}
                  </h4>
                  <div className="flex flex-col gap-1">
                    {section.links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                            isActive
                              ? "text-[var(--color-brand)] bg-[var(--color-brand)]/5 font-medium"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
