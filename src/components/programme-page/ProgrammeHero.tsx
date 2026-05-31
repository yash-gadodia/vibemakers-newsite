import appDemo from "@/assets/gallery/app-demo-screenshot.jpg";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import { BrutalButton } from "@/components/ui/brutal-button";

export function ProgrammeHero() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal variant="left" className="lg:col-span-6">
            <BrutalSticker tone="yellow" rotate={-3}>
              ● Problem-Solving
            </BrutalSticker>

            <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl md:text-5xl mt-6 mb-6">
              Problem-Solving with AI
            </h1>

            <p className="font-sans text-foreground text-lg leading-relaxed mb-8">
              An applied learning experience where students define problems, design solutions, and develop
              21st Century Competencies: using AI as a tool, not a shortcut.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <BrutalButton asChild variant="primary" size="md" className="rounded-full shadow-sticker">
                <a href="#programme">
                  Explore the programme
                  <span className="vm-arrow">→</span>
                </a>
              </BrutalButton>
              <BrutalButton asChild variant="outline" size="md" className="rounded-full bg-transparent">
                <Link to="/parents">
                  Classes for Parents
                  <span className="vm-arrow">→</span>
                </Link>
              </BrutalButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-foreground border border-border hover:border-primary/50 transition-colors"
              >
                🇸🇬 Aligned with MOE EdTech Masterplan 2030
              </a>
            </div>
          </Reveal>

          <Reveal variant="right" delayMs={100} className="lg:col-span-6">
            <div className="vm-card rounded-2xl border border-border bg-card p-6 overflow-hidden">
              <img
                src={appDemo}
                alt="Example student-built web app interface"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
