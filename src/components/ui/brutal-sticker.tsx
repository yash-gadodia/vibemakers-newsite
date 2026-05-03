import * as React from "react";
import { cn } from "@/lib/utils";

// Source: .claude/design-system.md — the signature sticker primitive.
// React wrapper around the .vm-sticker CSS pattern, with tone variants
// and an optional vm-wiggle animation. Use for section eyebrows, audience
// tags, and accent badges (e.g. "1st class free", "free trial").

type Tone = "yellow" | "orange" | "ink" | "card";

const toneClasses: Record<Tone, string> = {
  yellow: "bg-yellow text-foreground",
  orange: "bg-primary text-primary-foreground",
  ink: "bg-foreground text-background",
  card: "bg-card text-foreground",
};

type BrutalStickerProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Background tone. Default yellow (the canonical sticker colour). */
  tone?: Tone;
  /** Resting tilt in degrees. Default -3. Pass 0 for upright. */
  rotate?: number;
  /** Apply the vm-wiggle keyframe animation. Off by default. */
  wiggle?: boolean;
};

export const BrutalSticker = React.forwardRef<HTMLSpanElement, BrutalStickerProps>(
  ({ tone = "yellow", rotate = -3, wiggle = false, className, style, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5",
          "rounded-full border-[1.5px] border-foreground",
          "px-2.5 py-1",
          "font-mono text-[11px] font-semibold uppercase tracking-[0.06em]",
          "shadow-sticker",
          toneClasses[tone],
          wiggle && "vm-wiggle",
          className,
        )}
        style={{
          transform: wiggle ? undefined : `rotate(${rotate}deg)`,
          ...(wiggle ? ({ ["--rot" as string]: `${rotate}deg` } as React.CSSProperties) : {}),
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    );
  },
);
BrutalSticker.displayName = "BrutalSticker";
