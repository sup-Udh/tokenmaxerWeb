import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WorksWith } from "@/components/sections/WorksWith";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ClaudeDemo } from "@/components/sections/ClaudeDemo";
import { Benchmarks } from "@/components/sections/Benchmarks";
import { CTA } from "@/components/sections/CTA";
import { FloatingNotice } from "@/components/ui/FloatingNotice";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <Hero />
      <WorksWith />
      <HowItWorks />
      <ClaudeDemo />
      <Benchmarks />
      <CTA />

      <Footer />

      <FloatingNotice />
    </main>
  );
}
