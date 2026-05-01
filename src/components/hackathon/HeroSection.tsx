import { ArrowDown } from "lucide-react";

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
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="mx-auto max-w-4xl text-center">
          {/* Sticker eyebrow */}
          <span className="vm-sticker vm-sticker--orange inline-block" style={{ transform: 'rotate(-3deg)' }}>
            ● National Challenge
          </span>

          {/* Main headline */}
          <h1 className="font-display font-bold tracking-display leading-[1.02] mt-6 text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground">
            National Vibe Makers
            <br />
            <span className="vm-sheen-text">Hackathon</span>
          </h1>

          {/* Tagline */}
          <p className="font-display font-bold text-2xl md:text-3xl text-ink-2 mb-6">
            Learn. Build. Demo.
          </p>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            A 2-day challenge where students learn vibe coding, build real projects, and demo to judges. Open to ages 13-18. No coding experience required!
          </p>

          {/* Key Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="vm-card inline-flex items-center gap-2 px-4 py-2"
              >
                <span className="text-lg">{stat.emoji}</span>
                <span className="font-sans text-sm text-foreground font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sticker"
            >
              Register Interest
              <span className="vm-arrow">→</span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 text-ink-2 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
