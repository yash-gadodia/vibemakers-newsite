import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Satoshi", "system-ui", "sans-serif"],
        display: ["Cabinet Grotesk", "Satoshi", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        base: [
          "16px",
          {
            lineHeight: "1.55",
            fontWeight: "400",
          },
        ],
      },
      letterSpacing: {
        display: "-0.025em",
        eyebrow: "0.06em",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        // V2 named tokens (sourced from prototype's H object)
        ink: {
          DEFAULT: "hsl(var(--foreground))",   // #1a1612
          2: "hsl(var(--ink-2))",              // #3a312a
        },
        "bg-warm": "hsl(var(--bg-warm))",       // #f3ecdf
        "bg-warm-2": "hsl(var(--bg-warm-2))",   // #fff4e6
        rule: "hsl(var(--border))",             // #e8e0d4
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        yellow: {
          DEFAULT: "hsl(var(--yellow))",
          foreground: "hsl(var(--yellow-foreground))",
          deep: "hsl(var(--yellow-deep))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) - 2px)",
        DEFAULT: "var(--radius)",
        md: "var(--radius-lg)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 40px hsl(20 100% 55% / 0.3)",
        soft: "0 8px 32px -8px hsl(20 100% 55% / 0.15)",
        // Sticker hard-shadow signature look
        sticker: "2px 2px 0 hsl(30 17% 9%)",
        "sticker-lg": "4px 4px 0 hsl(30 17% 9%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        // V2 keyframes (mirrors of those in src/index.css for Tailwind utility access)
        "vm-wiggle": {
          "0%, 100%": { transform: "rotate(var(--rot, -3deg))" },
          "50%": { transform: "rotate(calc(var(--rot, -3deg) + 2deg))" },
        },
        "vm-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(255, 107, 26, 0.55)" },
          "70%": { boxShadow: "0 0 0 10px rgba(255, 107, 26, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255, 107, 26, 0)" },
        },
        "vm-drift": {
          "0%, 100%": { transform: "translateY(0) rotate(var(--card-rot, 0deg))" },
          "50%": { transform: "translateY(-6px) rotate(var(--card-rot, 0deg))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "vm-wiggle": "vm-wiggle 4.5s ease-in-out infinite",
        "vm-pulse": "vm-pulse 2.4s ease-out infinite",
        "vm-drift": "vm-drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
