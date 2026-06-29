import * as React from "react";
import { cn } from "@/lib/utils";

// Note: Radix UI and class-variance-authority aren't installed yet, 
// I should just use a simple button to avoid extra dependencies, 
// per user's "Next.js + Tailwind" request.

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    // Simple manual classes for variants to avoid installing class-variance-authority
    const variants = {
      default: "bg-white text-black hover:bg-gray-200",
      outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
      ghost: "hover:bg-white/10 text-white",
    };
    
    const sizes = {
      default: "h-12 px-6 py-2 text-base",
      sm: "h-9 rounded-md px-3 text-sm",
      lg: "h-14 rounded-md px-8 text-lg",
    };
    
    const Comp = asChild ? "span" : "button"; // Simplified Slot
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
