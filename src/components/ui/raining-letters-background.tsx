"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

interface Character {
  char: string;
  x: number;
  y: number;
  speed: number;
  size: string;
}

interface RainingLettersBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SIZES = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];

export function RainingLettersBackground({
  children,
  className = "",
}: RainingLettersBackgroundProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const createCharacters = useCallback(() => {
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]";
    const charCount = 300;
    const newCharacters: Character[] = [];

    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.05 + Math.random() * 0.15,
        size: SIZES[Math.floor(Math.random() * SIZES.length)],
      });
    }

    return newCharacters;
  }, []);

  useEffect(() => {
    setCharacters(createCharacters());
  }, [createCharacters]);

  // Flicker effect for active characters
  useEffect(() => {
    if (prefersReducedMotion || characters.length === 0) return;

    const updateActiveIndices = () => {
      const newActiveIndices = new Set<number>();
      const numActive = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length));
      }
      setActiveIndices(newActiveIndices);
    };

    const flickerInterval = setInterval(updateActiveIndices, 80);
    return () => clearInterval(flickerInterval);
  }, [characters.length, prefersReducedMotion]);

  // Animation loop for falling characters
  useEffect(() => {
    if (prefersReducedMotion) return;

    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]";

    const updatePositions = () => {
      setCharacters((prevChars) =>
        prevChars.map((char) => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: allChars[Math.floor(Math.random() * allChars.length)],
            size: SIZES[Math.floor(Math.random() * SIZES.length)],
          }),
        }))
      );
      animationRef.current = requestAnimationFrame(updatePositions);
    };

    animationRef.current = requestAnimationFrame(updatePositions);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] ${className}`}
    >
      {/* Raining Characters Layer - decorative, hidden from screen readers */}
      <div
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className={`absolute font-mono transition-all duration-75 ${char.size}`}
            style={{
              left: `${char.x}%`,
              top: `${char.y}%`,
              color: activeIndices.has(index)
                ? "rgba(134, 239, 172, 0.9)"
                : "rgba(255, 255, 255, 0.35)",
              textShadow: activeIndices.has(index)
                ? "0 0 12px rgba(134, 239, 172, 0.6)"
                : "none",
              transform: "translate(-50%, -50%)",
            }}
          >
            {char.char}
          </span>
        ))}
      </div>

      {/* Subtle radial overlay for text contrast - centered only */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 0, 0, 0.6) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content layer - above all decorative elements */}
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}

export default RainingLettersBackground;
