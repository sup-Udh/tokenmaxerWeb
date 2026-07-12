/** Orbiting-node logo mark — a tiny live graph. */
export function LogoMark() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]">
      <span className="h-2 w-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_rgba(255,90,31,0.9)]" />
      <span className="absolute h-1 w-1 rounded-full bg-white/60 animate-orbit" />
    </span>
  );
}
