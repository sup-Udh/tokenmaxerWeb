import Link from "next/link";

export function DocsFooter() {
  return (
    <footer className="mt-24 border-t border-[#232323] pt-8 pb-16">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Documentation</h4>
          <Link href="/docs/installation" className="text-sm text-white/50 hover:text-white transition-colors">Installation</Link>
          <Link href="/docs/quick-start" className="text-sm text-white/50 hover:text-white transition-colors">Quick Start</Link>
          <Link href="/docs/core-concepts" className="text-sm text-white/50 hover:text-white transition-colors">Core Concepts</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Legal</h4>
          <Link href="/legal#terms-of-service" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/legal#privacy-policy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/legal#license" className="text-sm text-white/50 hover:text-white transition-colors">License</Link>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/40">© {new Date().getFullYear()} CodeBroker. All rights reserved.</p>
        <div className="flex items-center gap-1.5 text-sm text-white/40">
          Made with <span className="text-[var(--color-brand)]">♥</span> by Udhay
        </div>
      </div>
    </footer>
  );
}
