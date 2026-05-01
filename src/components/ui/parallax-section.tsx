import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // -1 to 1: negative = slower than scroll, positive = faster
  offset?: number; // Max pixels of transform
  className?: string;
  disabled?: boolean;
}

export function ParallaxSection({
  children,
  speed = 0.1,
  offset = 50,
  className = "",
  disabled = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate transform based on scroll progress
  // At start (0): offset * speed pixels
  // At end (1): -offset * speed pixels
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset * speed, -offset * speed]
  );

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Disable parallax on mobile or if reduced motion is preferred
  const shouldAnimate = !disabled && !isMobile && !prefersReducedMotion;

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating decorative element with parallax
interface FloatingElementProps {
  speed?: number;
  offset?: number;
  className?: string;
  children?: ReactNode;
}

export function FloatingElement({
  speed = -0.3,
  offset = 100,
  className = "",
  children,
}: FloatingElementProps) {
  return (
    <ParallaxSection speed={speed} offset={offset} className={className}>
      {children}
    </ParallaxSection>
  );
}
