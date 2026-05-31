import * as React from "react";
import { cn } from "@/lib/utils";

// Source: .claude/design-system.md, the brutalist card pattern.
// Black-bordered card with a hard offset drop shadow. Caller controls
// background/text via className, the component supplies border, shadow,
// radius, and optional hover lift.

type ShadowSize = "sm" | "md" | "lg" | "xl" | "none";

const shadowClasses: Record<ShadowSize, string> = {
  sm: "shadow-sticker",
  md: "shadow-sticker-md",
  lg: "shadow-sticker-lg",
  xl: "shadow-sticker-xl",
  none: "",
};

const hoverShadowClasses: Record<ShadowSize, string> = {
  sm: "hover:shadow-sticker-md",
  md: "hover:shadow-sticker-lg",
  lg: "hover:shadow-sticker-xl",
  xl: "hover:shadow-sticker-xl",
  none: "",
};

type BrutalCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Hard offset shadow size. Default lg (4px). */
  shadow?: ShadowSize;
  /** Apply the vm-card-lift hover (translates up 4px). Default true. */
  lift?: boolean;
};

export const BrutalCard = React.forwardRef<HTMLDivElement, BrutalCardProps>(
  ({ shadow = "lg", lift = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border-[1.5px] border-foreground bg-card",
          "transition-shadow",
          shadowClasses[shadow],
          lift && "vm-card",
          lift && shadow !== "none" && hoverShadowClasses[shadow],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
BrutalCard.displayName = "BrutalCard";
