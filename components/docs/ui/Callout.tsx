import { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const config = {
  info: {
    icon: Info,
    styles: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    styles: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    iconColor: "text-orange-400",
  },
  success: {
    icon: CheckCircle,
    styles: "bg-green-500/10 border-green-500/20 text-green-400",
    iconColor: "text-green-400",
  },
  tip: {
    icon: Lightbulb,
    styles: "bg-[var(--color-brand)]/10 border-[var(--color-brand)]/20 text-[var(--color-brand)]",
    iconColor: "text-[var(--color-brand)]",
  }
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, styles, iconColor } = config[type];

  return (
    <div className={cn("my-6 flex gap-4 rounded-xl border p-4", styles)}>
      <div className="shrink-0 mt-0.5">
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      <div className="flex-1">
        {title && <h5 className="font-semibold mb-1 text-white">{title}</h5>}
        <div className="text-white/80 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
