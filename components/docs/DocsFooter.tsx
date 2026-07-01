import Link from "next/link";

export function DocsFooter() {
  return (
    <footer className="mt-24 border-t border-[#232323] pt-8 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Documentation</h4>
          <Link href="/docs/installation" className="text-sm text-white/50 hover:text-white transition-colors">Installation</Link>
          <Link href="/docs/quick-start" className="text-sm text-white/50 hover:text-white transition-colors">Quick Start</Link>
          <Link href="/docs/core-concepts" className="text-sm text-white/50 hover:text-white transition-colors">Core Concepts</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Tools</h4>
          <Link href="/docs/cli" className="text-sm text-white/50 hover:text-white transition-colors">CLI</Link>
          <Link href="/docs/vscode-extension" className="text-sm text-white/50 hover:text-white transition-colors">VS Code</Link>
          <Link href="/docs/architecture" className="text-sm text-white/50 hover:text-white transition-colors">Architecture</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Community</h4>
          <Link href="https://github.com/codebroker" className="text-sm text-white/50 hover:text-white transition-colors">GitHub</Link>
          <Link href="https://discord.gg/codebroker" className="text-sm text-white/50 hover:text-white transition-colors">Discord</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Legal</h4>
          <Link href="/license" className="text-sm text-white/50 hover:text-white transition-colors">License</Link>
          <Link href="/docs/roadmap" className="text-sm text-white/50 hover:text-white transition-colors">Roadmap</Link>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/40">© {new Date().getFullYear()} CodeBroker. All rights reserved.</p>
        <div className="flex items-center gap-2 text-sm text-white/40">
          Built with <span className="text-[var(--color-brand)]">♥</span> for developers
        </div>
      </div>
    </footer>
  );
}
