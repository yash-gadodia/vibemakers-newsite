import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  className?: string;
}

const variantStyles: Record<RevealVariant, { hidden: string; visible: string }> = {
  up: {
    hidden: "opacity-0 translate-y-4",
    visible: "opacity-100 translate-y-0",
  },
  down: {
    hidden: "opacity-0 -translate-y-4",
    visible: "opacity-100 translate-y-0",
  },
  left: {
    hidden: "opacity-0 -translate-x-5",
    visible: "opacity-100 translate-x-0",
  },
  right: {
    hidden: "opacity-0 translate-x-5",
    visible: "opacity-100 translate-x-0",
  },
};

export function Reveal({
  children,
  variant = "up",
  delayMs = 0,
  durationMs = 600,
  threshold = 0.1,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCheckedMotion, setHasCheckedMotion] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    setHasCheckedMotion(true);

    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "-50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const styles = variantStyles[variant];

  // If reduced motion, show content immediately without animation
  if (prefersReducedMotion && hasCheckedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? styles.visible : styles.hidden,
        className
      )}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
