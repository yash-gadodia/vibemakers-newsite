import { cn } from "@/lib/utils";

interface HeroGlowBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroGlowBackground({ children, className }: HeroGlowBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Primary soft orange glow - large and diffuse */}
      <div 
        className="absolute top-0 right-0 w-[1200px] h-[1200px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.08) 0%, hsl(var(--primary) / 0.03) 30%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      
      {/* Secondary warm glow for depth - bottom right */}
      <div 
        className="absolute -bottom-1/4 right-0 w-[1000px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 80%, hsl(35 60% 95% / 0.6) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      
      {/* Subtle accent glow - adds warmth */}
      <div 
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
