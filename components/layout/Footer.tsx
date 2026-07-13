import Link from "next/link";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    title: "Product",
    links: [
      { name: "Integrations", href: "/#works-with" },
      { name: "How it works", href: "/#how-it-works" },
      { name: "Demo", href: "/#demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "/legal#terms-of-service" },
      { name: "Privacy Policy", href: "/legal#privacy-policy" },
      { name: "License", href: "/legal#license" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-32 overflow-hidden">
      {/* Faint ember bleed at the very bottom */}
      <div className="pointer-events-none absolute bottom-[-120px] left-1/2 -translate-x-1/2 h-[240px] w-[70vw] rounded-full bg-[var(--color-brand)]/[0.06] blur-[100px]" />

      <Container className="relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-6">
            <Link href="/" className="text-2xl font-semibold tracking-tighter">
              CodeBroker
              <span className="text-[var(--color-brand)]">.</span>
            </Link>
            <p className="text-white/40 mt-4 text-sm max-w-xs leading-relaxed">
              An agent that lives in your repository and helps AI coding
              tools find the right files and context.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/35 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-white/30 text-xs font-mono">
            © {new Date().getFullYear()} CodeBroker. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-mono flex items-center gap-1.5">
            Made with <span className="text-[var(--color-brand)]">♥</span> by Udhay
          </p>
          <p className="text-white/30 text-xs font-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse-dot" />
            index: up to date
          </p>
        </div>
      </Container>
    </footer>
  );
}
