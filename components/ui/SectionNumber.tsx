import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionNumberProps {
  number: string;
  className?: string;
}

export function SectionNumber({ number, className }: SectionNumberProps) {
  return (
    <Reveal>
      <div className={cn("text-[var(--color-brand)] text-sm font-mono tracking-widest uppercase mb-4", className)}>
        ({number})
      </div>
    </Reveal>
  );
}
