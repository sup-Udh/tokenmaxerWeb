import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";

const metrics = [
  { value: "100%", label: "Graph Integrity" },
  { value: "100%", label: "Embedding Coverage" },
  { value: "3,412", label: "Relationships" },
  { value: "292", label: "Symbols" },
  { value: "29", label: "Entrypoints" },
];

export function Performance() {
  return (
    <section className="py-32">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <SectionNumber number="06" />
            <SectionTitle title="Performance" />
          </div>
          <Reveal delay={0.2} direction="left">
            <p className="text-xl text-white/50 max-w-sm font-light">
              Extreme precision minimal overhead. Built for huge repositories.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 border-t border-white/10 pt-16">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.1}>
              <div className="flex flex-col gap-4">
                <span className="text-5xl md:text-6xl font-light tracking-tighter">
                  {metric.value}
                </span>
                <span className="text-sm uppercase tracking-widest text-[var(--color-brand)] font-mono">
                  {metric.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
