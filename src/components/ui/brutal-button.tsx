import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Source: .claude/design-system.md, the brutalist button pattern.
// 4 variants: primary (orange + ink shadow), dark (ink + orange shadow),
// outline (white + ink border), ghost (transparent + soft border).

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground border-[1.5px] border-foreground shadow-sticker-lg hover:bg-accent hover:shadow-sticker-xl",
  dark:
    "bg-foreground text-background border-[1.5px] border-foreground shadow-sticker hover:shadow-sticker-md hover:bg-foreground/90",
  outline:
    "bg-card text-foreground border-[1.5px] border-foreground hover:bg-secondary",
  ghost:
    "bg-transparent text-foreground border border-border hover:bg-secondary/50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

type BrutalButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

export const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ variant = "primary", size = "lg", asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "vm-btn inline-flex items-center justify-center gap-2",
          "rounded-lg font-display font-semibold",
          "transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
BrutalButton.displayName = "BrutalButton";
