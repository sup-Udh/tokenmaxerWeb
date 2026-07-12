import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Reveal } from "@/components/ui/Reveal";

export function ContextEngine() {
  return (
    <section id="demo" className="py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <SectionNumber number="02" />
          <SectionTitle
            title={
              <>
                You ask. <span className="text-white/40">It finds.</span>
              </>
            }
            subtitle="Tell your AI what you want changed. CodeBroker quietly hands it the files that matter."
            className="items-center text-center"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="border-shimmer rounded-3xl bg-black shadow-2xl overflow-hidden flex flex-col">
              {/* Window chrome */}
              <div className="h-12 border-b border-white/10 flex items-center px-6 gap-2 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <span className="ml-4 font-mono text-xs text-white/30">your coding agent</span>
              </div>

              {/* Prompt Area */}
              <div className="p-8 md:p-12 border-b border-white/5">
                <p className="text-white/40 text-sm font-mono mb-4">You type</p>
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight">
                  &ldquo;Fix the login bug&rdquo;<span className="animate-pulse text-[var(--color-brand)]">_</span>
                </h3>
              </div>

              {/* Context Generation Result */}
              <div className="p-8 md:p-12 bg-white/[0.02]">
                <p className="text-[var(--color-brand)] text-sm font-mono mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-pulse" />
                  CodeBroker finds the context
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Files that matter</h4>
                    <ul className="space-y-2 text-white/70 font-mono text-sm">
                      {["src/auth/provider.ts", "src/api/middleware.ts", "config/auth.config.ts"].map((file, i) => (
                        <Reveal key={file} delay={0.3 + i * 0.12} direction="left">
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[var(--color-brand)]/70" />
                            {file}
                          </li>
                        </Reveal>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Where to start</h4>
                    <ul className="space-y-2 text-white/70 font-mono text-sm">
                      {["loginHandler()", "validateSession()"].map((fn, i) => (
                        <Reveal key={fn} delay={0.45 + i * 0.12} direction="left">
                          <li className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[var(--color-brand)]/70" />
                            {fn}
                          </li>
                        </Reveal>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-10 text-sm text-white/35 font-light border-t border-white/5 pt-6">
                  Your agent gets 3 files instead of 3,000 — faster answers,
                  fewer tokens, fewer wrong guesses.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
