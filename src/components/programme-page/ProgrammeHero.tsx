import appDemo from "@/assets/gallery/app-demo-screenshot.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";

export function ProgrammeHero() {
  return (
    <header className="section-padding bg-gradient-to-b from-secondary/60 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal variant="left" className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                One Core Programme
              </div>
              <a 
                href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-xs font-medium hover:border-primary/50 transition-colors"
              >
                🇸🇬 Aligned with MOE EdTech Masterplan 2030
              </a>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Problem-Solving with AI
            </h1>

            <p className="mt-5 text-lg md:text-xl text-muted-foreground">
              An applied learning experience where students define problems, design solutions, and develop
              21st Century Competencies—using AI as a tool, not a shortcut.
            </p>


            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="sm:w-auto">
                <a href="#programme" aria-label="Explore the programme details">
                  Explore the programme
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="sm:w-auto">
                <Link to="/parents">See Classes for Parents &amp; Students</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal variant="right" delayMs={100} className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-2xl" aria-hidden />
              <div className="relative rounded-[2rem] border border-border bg-card overflow-hidden shadow-xl">
                <img
                  src={appDemo}
                  alt="Example student-built web app interface"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
