import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />
      
      <Container className="relative flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter leading-[1.05] mb-12">
          Stop giving AI <br />
          <span className="text-white/40">your repository.</span> <br />
          Give it <span className="text-[var(--color-brand)]">understanding.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center items-center w-full">
          <Button size="lg" className="px-12 py-6 text-lg font-medium">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="px-12 py-6 text-lg font-medium border-white/20 hover:bg-white/[0.05]">
            GitHub
          </Button>
        </div>
      </Container>
    </section>
  );
}
