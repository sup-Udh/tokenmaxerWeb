import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SemanticGraph } from "@/components/sections/SemanticGraph";
import { GraphBenchmarks } from "@/components/sections/GraphBenchmarks";
import { ContextEngine } from "@/components/sections/ContextEngine";
import { Architecture } from "@/components/sections/Architecture";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      
      <Hero />
      <About />
      <SemanticGraph />
      <GraphBenchmarks />
      <ContextEngine />
      <Architecture />
      <CTA />

      <Footer />
    </main>
  );
}
