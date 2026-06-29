"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".hero-logo",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2 }
    )
      .fromTo(
        ".hero-title .word",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.05 },
        "-=0.5"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        ".hero-actions",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16"
    >
      <Container className="flex flex-col items-center text-center">
        {/* Centered Logo / Icon */}
        <div className="hero-logo mb-16 opacity-0">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-[var(--color-brand)] rounded-full" />
          </div>
        </div>

        {/* Huge Typography */}
        <h1 className="hero-title text-6xl md:text-8xl lg:text-[7rem] font-semibold tracking-tighter leading-[1.05] max-w-5xl mb-12">
          <span className="word inline-block">Understand</span>{" "}
          <span className="word inline-block">your</span>{" "}
          <span className="word inline-block">codebase</span>{" "}
          <br className="hidden md:block" />
          <span className="word inline-block text-white/50">before</span>{" "}
          <span className="word inline-block text-white/50">your</span>{" "}
          <span className="word inline-block text-white/50">AI</span>{" "}
          <span className="word inline-block text-white/50">does.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subtitle text-xl md:text-2xl text-white/60 max-w-3xl font-light mb-16 opacity-0">
          CodeBroker builds a deterministic semantic understanding of your repository—giving AI agents the exact context they need instead of making them guess.
        </p>

        {/* Buttons */}
        <div className="hero-actions flex flex-col sm:flex-row gap-6 opacity-0">
          <Button size="lg" className="px-10">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="px-10">
            GitHub
          </Button>
        </div>
      </Container>

      {/* Tiny Downward Arrow */}
      <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0">
        <ArrowDown className="w-5 h-5 text-white/40 animate-bounce" />
      </div>
    </section>
  );
}
