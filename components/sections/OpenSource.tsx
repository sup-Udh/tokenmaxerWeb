import { Container } from "@/components/ui/Container";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function OpenSource() {
  return (
    <section className="py-32 bg-white/[0.01] border-y border-white/5">
      <Container>
        <SectionNumber number="07" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05]">
              Built for developers. <br />
              Runs locally. <br />
              <span className="text-white/40">Privacy first.</span>
            </h2>
          </Reveal>
          
          <div className="flex flex-col justify-end gap-12">
            <Reveal delay={0.2}>
              <ul className="space-y-6 text-xl md:text-2xl font-light text-white/70">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
                  MIT License
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
                  Deterministic
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
                  Self-hosted
                </li>
              </ul>
            </Reveal>
            
            <Reveal delay={0.3}>
              <Button size="lg" className="w-full sm:w-auto px-10 gap-3">
                <ArrowRight className="w-5 h-5" />
                View on GitHub
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
