import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionBandTone = "base" | "soft";

interface SectionBandProps {
  id?: string;
  tone?: SectionBandTone;
  inset?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/**
 * SectionBand
 * Standardises homepage section rhythm + soft background bands.
 * Purely presentational (no business logic).
 */
export function SectionBand({
  id,
  tone = "base",
  inset = false,
  className,
  innerClassName,
  children,
}: SectionBandProps) {
  const toneClass =
    tone === "soft" ? "bg-secondary/40" : "bg-background";

  return (
    <section id={id} className={cn(toneClass, "section-padding", className)}>
      <div className="container mx-auto px-4">
        {inset ? (
          <div className={cn("inset-panel", innerClassName)}>{children}</div>
        ) : (
          <div className={cn(innerClassName)}>{children}</div>
        )}
      </div>
    </section>
  );
}
