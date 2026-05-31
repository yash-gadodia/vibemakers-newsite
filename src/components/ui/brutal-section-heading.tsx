import * as React from "react";
import { cn } from "@/lib/utils";
import { BrutalSticker } from "./brutal-sticker";

// Source: .claude/design-system.md, the recurring "eyebrow sticker + h2 + sub"
// pattern at the top of homepage sections. Replaces inline copies.

type BrutalSectionHeadingProps = {
  eyebrow?: React.ReactNode;
  eyebrowTone?: "yellow" | "orange" | "ink" | "card";
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
};

const titleSize = {
  md: "text-3xl md:text-4xl lg:text-5xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
};

export function BrutalSectionHeading({
  eyebrow,
  eyebrowTone = "card",
  title,
  sub,
  align = "left",
  size = "lg",
  className,
}: BrutalSectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <div className="mb-4">
          <BrutalSticker tone={eyebrowTone} rotate={-3}>
            {eyebrow}
          </BrutalSticker>
        </div>
      )}
      <h2
        className={cn(
          "font-display font-bold leading-[1.05] tracking-tight text-foreground",
          titleSize[size],
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-muted-foreground md:text-lg",
            align === "center" && "mx-auto",
            "max-w-2xl",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
