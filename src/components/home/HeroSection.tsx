import { Link } from "react-router-dom";
import { ArrowRight, Brain, Sparkles, Zap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShaderBackground } from "@/components/ui/shaders-hero-section";
import { PromptDemo } from "@/components/home/PromptDemo";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FloatingElement } from "@/components/ui/parallax-section";

export function HeroSection() {
  return (
    <ShaderBackground>
      <section className="relative min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 py-10 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="max-w-lg">
              {/* Main headline */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 leading-tight animate-fade-in"
                style={{
                  animationDelay: "0.1s",
                }}
              >
                From Ideas to{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Working Products
                  </span>
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-primary/20 -rotate-1 rounded" />
                </span>
              </h1>

              {/* Sub-headline */}
              <p
                className="text-lg text-foreground/90 font-medium mb-3 animate-fade-in md:text-lg"
                style={{
                  animationDelay: "0.15s",
                }}
              >
                Students learn to spot real problems, design solutions, and build working apps — developing Critical, Adaptive and Inventive Thinking through AI-first vibe coding.
              </p>

              {/* Description */}
              <p
                className="text-base md:text-lg text-foreground/70 mb-6 animate-fade-in"
                style={{
                  animationDelay: "0.2s",
                }}
              >
                No coding experience needed. Aligned with MOE's EdTech Masterplan 2030 and 21st Century Competencies framework.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 animate-fade-in"
                style={{
                  animationDelay: "0.3s",
                }}
              >
                <Button
                  size="lg"
                  className="text-base px-6 py-5 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  asChild
                >
                  <Link to="/schools">
                    For Schools
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-6 py-5 rounded-2xl" asChild>
                  <Link to="/parents">For Parents & Students</Link>
                </Button>
                <Button size="lg" variant="ghost" className="text-base px-6 py-5 rounded-2xl border border-border/50" asChild>
                  <Link to="/contact">Book a Free Taster</Link>
                </Button>
              </div>

              <div className="h-2" aria-hidden="true" />
            </div>

            {/* Right: Hero Carousel with Stats */}
            <div
              className="relative animate-fade-in hidden md:block h-[350px] lg:h-[450px]"
              style={{
                animationDelay: "0.2s",
              }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                <HeroCarousel />
              </div>
              {/* Decorative elements with parallax */}
              <FloatingElement speed={-0.3} offset={80} className="absolute -bottom-4 -left-4">
                <div className="w-24 h-24 bg-primary/15 rounded-full blur-2xl" />
              </FloatingElement>
              <FloatingElement speed={-0.2} offset={60} className="absolute -top-4 -right-4">
                <div className="w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              </FloatingElement>
            </div>
          </div>

          {/* Interactive Prompt Demo - below on larger screens */}
          <div
            className="mt-12 animate-fade-in"
            style={{
              animationDelay: "0.25s",
            }}
          >
            <div className="soft-card border-0 p-4 sm:p-6 md:p-7">
              <PromptDemo />
            </div>
          </div>

          {/* Feature pills */}
          <div
            className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 animate-fade-in"
            style={{
              animationDelay: "0.35s",
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-card/70 backdrop-blur-sm border border-border rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-foreground/80">AI-first Vibe Coding</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-card/70 backdrop-blur-sm border border-border rounded-full">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-foreground/80">Product Thinking</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-card/70 backdrop-blur-sm border border-border rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-foreground/80">Ship Real Projects</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-card/70 backdrop-blur-sm border border-border rounded-full">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-foreground/80">Uni-Ready Portfolio</span>
            </div>
          </div>
        </div>
      </section>
    </ShaderBackground>
  );
}
