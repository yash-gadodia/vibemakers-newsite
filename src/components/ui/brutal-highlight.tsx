import * as React from "react";
import { cn } from "@/lib/utils";

// Source: .claude/design-system.md — yellow rotated underline-bar behind a word.
// Used inside large display headlines (e.g. "real apps", "products").
//
// Usage:
//   <h1>Build <BrutalHighlight>apps</BrutalHighlight>, not just code.</h1>

type BrutalHighlightProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Override the highlight bar color. Defaults to --yellow. */
  color?: string;
};

export function BrutalHighlight({
  color,
  className,
  children,
  ...props
}: BrutalHighlightProps) {
  return (
    <span className={cn("relative inline-block", className)} {...props}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute -left-1.5 -right-1.5 bottom-1 z-0 h-2 rounded-sm md:h-3"
        style={{
          background: color ?? "hsl(var(--yellow))",
          transform: "rotate(-1deg)",
        }}
      />
    </span>
  );
}
