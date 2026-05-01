import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { Reveal } from "./Reveal";

type RevealVariant = "up" | "down" | "left" | "right";

interface RevealGroupProps {
  children: ReactNode;
  staggerMs?: number;
  variant?: RevealVariant;
  durationMs?: number;
  threshold?: number;
  className?: string;
}

interface RevealChildProps {
  delayMs?: number;
  variant?: RevealVariant;
  durationMs?: number;
  threshold?: number;
}

export function RevealGroup({
  children,
  staggerMs = 90,
  variant = "up",
  durationMs = 520,
  threshold = 0.15,
  className,
}: RevealGroupProps) {
  const childArray = Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => {
        // If the child is already a Reveal component, clone it with stagger delay
        if (isValidElement(child) && child.type === Reveal) {
          return cloneElement(child as ReactElement<RevealChildProps>, {
            delayMs: index * staggerMs + ((child.props as RevealChildProps).delayMs || 0),
            variant: (child.props as RevealChildProps).variant || variant,
            durationMs: (child.props as RevealChildProps).durationMs || durationMs,
            threshold: (child.props as RevealChildProps).threshold || threshold,
          });
        }

        // Otherwise wrap in a Reveal component
        return (
          <Reveal
            key={index}
            delayMs={index * staggerMs}
            variant={variant}
            durationMs={durationMs}
            threshold={threshold}
          >
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}

