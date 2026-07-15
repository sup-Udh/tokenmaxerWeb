"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { navigation } from "@/components/docs/SidebarNavigation";

/** Sidebar order, flattened — this is the intended reading order of the docs. */
const pages = navigation.flatMap((section) =>
  section.links.map((link) => ({ ...link, section: section.title }))
);

export function DocsPager() {
  const pathname = usePathname();
  const index = pages.findIndex((p) => p.href === pathname);

  // Unknown route (or not in the nav): nothing sensible to page to.
  if (index === -1) return null;

  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Documentation pages"
      className="mt-16 grid grid-cols-1 gap-4 border-t border-[#232323] pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[var(--color-brand)]/30 hover:bg-white/[0.04]"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
            <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="font-medium text-white/80 transition-colors group-hover:text-white">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next && (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition-all duration-300 hover:border-[var(--color-brand)]/30 hover:bg-white/[0.04] sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
            Next
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <span className="font-medium text-white/80 transition-colors group-hover:text-white">
            {next.label}
          </span>
        </Link>
      )}
    </nav>
  );
}
