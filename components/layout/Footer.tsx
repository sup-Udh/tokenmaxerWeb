import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 mt-32">
      <Container className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <Link href="/" className="text-2xl font-semibold tracking-tighter">
            CodeBroker
            <span className="text-[var(--color-brand)]">.</span>
          </Link>
          <p className="text-white/40 mt-2 text-sm">
            © {new Date().getFullYear()} CodeBroker. All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-white/60">
          <Link href="https://github.com/codebroker" className="hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Documentation
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Discord
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            License
          </Link>
        </div>
      </Container>
    </footer>
  );
}
