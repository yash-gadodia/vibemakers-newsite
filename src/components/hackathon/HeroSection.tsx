import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RainingLettersBackground } from "@/components/ui/raining-letters-background";

const stats = [
  { emoji: "📅", label: "2 Days • Date TBA" },
  { emoji: "📍", label: "Singapore • Venue TBA" },
  { emoji: "👥", label: "Teams of 1–4 • Ages 13–18" },
  { emoji: "✨", label: "No Coding Experience Needed" },
];

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("registration")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <RainingLettersBackground>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full mb-8 animate-fade-in">
            <span className="text-lg">🚀</span>
            <span className="text-sm font-semibold text-white">
              Coming Soon • Register Interest
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 text-white animate-fade-in" style={{ animationDelay: "0.1s" }}>
            National Vibe Makers
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]">
              Hackathon
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-display font-semibold text-white/90 mb-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Learn. Build. Demo.
          </p>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A 2-day challenge where students learn vibe coding, build real projects, and demo to judges. 
            Open to ages 13-18. No coding experience required!
          </p>

          {/* Key Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
              >
                <span className="text-lg">{stat.emoji}</span>
                <span className="text-sm font-medium text-white">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              onClick={scrollToForm} 
              className="h-14 px-8 text-base font-semibold shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transition-all"
            >
              <span className="text-lg mr-2">🚀</span>
              Register Interest
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/60 mx-auto" />
          </div>
        </div>
      </div>
    </RainingLettersBackground>
  );
}
