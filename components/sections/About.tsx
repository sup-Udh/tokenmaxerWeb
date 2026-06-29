import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";
import { ImageComposition } from "@/components/ui/ImageComposition";

export function About() {
  return (
    <section id="about" className="py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Left Column: Heading */}
          <div>
            <SectionNumber number="01" />
            <SectionTitle 
              title={
                <>
                  AI cannot <br className="hidden md:block" />
                  <span className="text-white/40">understand millions</span> <br className="hidden md:block" />
                  <span className="text-white/40">of lines of code.</span>
                </>
              }
            />
          </div>

          {/* Right Column: Explanatory Text */}
          <div className="flex flex-col justify-end">
            <Reveal delay={0.2}>
              <div className="max-w-md space-y-8 text-lg text-white/70 font-light">
                <p>
                  The semantic intelligence layer for AI coding.
                </p>
                <p>
                  CodeBroker indexes Symbols, Relationships, Dependencies, Architecture, and Embeddings to create Developer Intelligence using deterministic analysis.
                </p>
                <p className="text-[var(--color-brand)] font-medium">
                  Never hallucinations.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Image Composition Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <Reveal className="md:col-span-7" direction="up">
            <ImageComposition type="graph" className="aspect-[16/9] md:aspect-[4/3]" />
          </Reveal>
          <Reveal className="md:col-span-5 md:-ml-12 z-10" delay={0.2} direction="left">
            <ImageComposition type="code" className="aspect-square bg-black shadow-2xl border-white/20" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
