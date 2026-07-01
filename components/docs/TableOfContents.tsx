"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Collect all h2 and h3 elements inside the main content area
    const elements = Array.from(document.querySelectorAll("main h2, main h3"));
    const headingsData = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number(el.tagName.substring(1)),
    })).filter(h => h.id); // Only include headings with IDs

    setHeadings(headingsData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    elements.forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return <div className="w-64 shrink-0 hidden xl:block" />;

  return (
    <div className="w-64 shrink-0 hidden xl:block relative">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">On this page</h4>
        <div className="flex flex-col gap-2 border-l border-white/10">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 text-sm transition-colors relative",
                  heading.level === 3 ? "pl-6" : "pl-4",
                  isActive ? "text-[var(--color-brand)] font-medium" : "text-white/50 hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[var(--color-brand)]" />
                )}
                {heading.text}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
