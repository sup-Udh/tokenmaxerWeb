import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />
      
      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-semibold tracking-tighter leading-[1.05] mb-16">
            Stop giving AI <br />
            <span className="text-white/40">your repository.</span> <br />
            Give it <span className="text-[var(--color-brand)]">understanding.</span>
          </h2>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" className="px-12 text-lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-12 text-lg">
              GitHub
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
