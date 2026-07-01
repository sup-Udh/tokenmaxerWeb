import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function FeatureCard({ title, description, icon: Icon, href }: FeatureCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 flex flex-col">
        <div className="mb-4 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/60 mb-6 flex-1">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-brand)] opacity-80 group-hover:opacity-100 transition-opacity">
          Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
