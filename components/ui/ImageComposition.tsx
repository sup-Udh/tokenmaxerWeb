import { cn } from "@/lib/utils";

interface ImageCompositionProps {
  className?: string;
  type?: "graph" | "pipeline" | "code";
}

export function ImageComposition({ className, type = "graph" }: ImageCompositionProps) {
  return (
    <div className={cn("relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-white/5", className)}>
      {/* 
        TODO: Replace with custom CodeBroker illustrations, 
        semantic graph renders, or product screenshots. 
        Using tasteful CSS grid placeholders for now to maintain premium feel.
      */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Abstract Shapes based on type */}
      {type === "graph" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-white/20 absolute animate-pulse" />
          <div className="w-64 h-64 rounded-full border border-white/10 absolute" />
          <div className="w-96 h-96 rounded-full border border-white/5 absolute" />
          <div className="w-3 h-3 bg-[var(--color-brand)] rounded-full z-10" />
        </div>
      )}
      
      {type === "code" && (
        <div className="absolute inset-0 p-8 flex flex-col gap-4 justify-center opacity-30">
          <div className="h-4 bg-white/20 rounded w-3/4" />
          <div className="h-4 bg-white/20 rounded w-1/2 ml-8" />
          <div className="h-4 bg-white/20 rounded w-2/3 ml-8" />
          <div className="h-4 bg-white/20 rounded w-1/3" />
        </div>
      )}

      {type === "pipeline" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
          <div className="w-1/2 h-16 border border-white/20 rounded-xl" />
          <div className="w-[1px] h-12 bg-white/20" />
          <div className="w-3/4 h-16 border border-white/20 rounded-xl" />
          <div className="w-[1px] h-12 bg-white/20" />
          <div className="w-1/2 h-16 border border-[var(--color-brand)] rounded-xl" />
        </div>
      )}
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
