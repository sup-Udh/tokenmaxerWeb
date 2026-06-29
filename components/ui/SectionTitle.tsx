import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionTitleProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Reveal>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
