import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const features = [
  { title: "Project Summary", span: "col-span-12 md:col-span-8" },
  { title: "Architecture", span: "col-span-12 md:col-span-4" },
  { title: "Hotspots", span: "col-span-12 md:col-span-6" },
  { title: "Subsystems", span: "col-span-12 md:col-span-6" },
  { title: "Entrypoints", span: "col-span-12 md:col-span-4" },
  { title: "Impact Analysis", span: "col-span-12 md:col-span-8" },
  { title: "Context Capsules", span: "col-span-12" },
];

export function DeveloperIntelligence() {
  return (
    <section className="py-32">
      <Container>
        <SectionNumber number="03" />
        <SectionTitle 
          title="Developer Intelligence" 
          className="mb-24"
        />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Reveal 
              key={feature.title} 
              className={cn("min-h-[200px] rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex items-end hover:bg-white/[0.04] transition-colors group", feature.span)}
              delay={index * 0.1}
            >
              <h3 className="text-2xl md:text-3xl font-light tracking-wide group-hover:text-[var(--color-brand)] transition-colors">
                {feature.title}
              </h3>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
