import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";

export function ContextEngine() {
  return (
    <section className="py-32">
      <Container>
        <SectionNumber number="04" />
        <SectionTitle 
          title="Context Engine" 
          subtitle="Automatically generate the perfect context window for any task."
          className="mb-24 text-center items-center"
        />

        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-3xl border border-white/20 bg-black shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="h-12 border-b border-white/10 flex items-center px-6 gap-2 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              
              {/* Prompt Area */}
              <div className="p-8 md:p-12 border-b border-white/5">
                <p className="text-white/40 text-sm font-mono mb-4">User Prompt</p>
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight">
                  Modify authentication<span className="animate-pulse text-[var(--color-brand)]">_</span>
                </h3>
              </div>

              {/* Context Generation Result */}
              <div className="p-8 md:p-12 bg-white/[0.02]">
                <p className="text-[var(--color-brand)] text-sm font-mono mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-pulse" />
                  Context Automatically Generated
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Relevant Files</h4>
                    <ul className="space-y-2 text-white/70 font-mono text-sm">
                      <li>src/auth/provider.ts</li>
                      <li>src/api/middleware.ts</li>
                      <li>config/auth.config.ts</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Entry Points</h4>
                    <ul className="space-y-2 text-white/70 font-mono text-sm">
                      <li>loginHandler()</li>
                      <li>validateSession()</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
