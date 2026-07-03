"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Overview",
    links: [
      { href: "/docs", label: "Getting Started" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/quick-start", label: "Quick Start" },
    ],
  },
];

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 hidden lg:block overflow-y-auto h-[calc(100vh-4rem)] border-r border-[#232323] pr-6 py-8 custom-scrollbar">
      <div className="flex flex-col gap-8">
        {navigation.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold text-white mb-3 text-sm">{section.title}</h4>
            <div className="flex flex-col gap-1 border-l border-white/10 ml-2">
              {section.links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.href} className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarIndicator"
                        className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[var(--color-brand)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <Link
                      href={link.href}
                      className={cn(
                        "block pl-4 py-1.5 text-sm transition-colors rounded-r-md",
                        isActive
                          ? "text-[var(--color-brand)] bg-[var(--color-brand)]/5 font-medium"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
