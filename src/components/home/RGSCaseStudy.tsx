import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import rgsW101 from "@/assets/gallery/rgs-w1-01.jpg";
import rgsW102 from "@/assets/gallery/rgs-w1-02.jpg";
import rgsW105 from "@/assets/gallery/rgs-w1-05.jpg";

const outcomes = [
  { value: "40", label: "research agents built" },
  { value: "40", label: "HTML decks shipped" },
  { value: "Y1–Y4", label: "mixed cohort, 4 contact hours" },
];

export function RGSCaseStudy() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <Reveal variant="up">
          <div className="text-center mb-10">
            <BrutalSticker tone="yellow" rotate={-3}>
              ● Recent delivery
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-4">
              Raffles Girls' School · May 2026
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              40 students · 4 contact hours across 2 sessions · each student walked
              out with two deliverables that support their existing research project.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={120}>
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10">
            {outcomes.map((o) => (
              <div key={o.label} className="vm-card rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display font-bold text-3xl md:text-5xl text-primary mb-2">
                  {o.value}
                </p>
                <p className="font-sans text-xs md:text-sm text-ink-2">{o.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <img
              src={rgsW101}
              alt="40 RGS students raising peace signs at end of Vibe Makers W2 workshop"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
            <img
              src={rgsW102}
              alt="RGS students watching the V.I.B.E. cycle being taught"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
            <img
              src={rgsW105}
              alt="RGS student presenting her vibe-coded HTML slide deck on Ferrari and McLaren"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={280}>
          <blockquote className="vm-card rounded-2xl border border-border bg-bg-warm-2 p-6 md:p-8 mb-10">
            <p className="font-sans text-base md:text-lg text-foreground italic">
              "The students came in with their own research topics and walked out
              with tools they actually use · a research agent they configured
              themselves, and a deck they could present from. That's the level of
              ownership we wanted."
            </p>
            <footer className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mt-3">
              Dr Lim AK · Raffles Girls' School
            </footer>
          </blockquote>
        </Reveal>

        <Reveal variant="up" delayMs={360}>
          <div className="text-center">
            <Link
              to="/blog/rgs-research-agents-workshop"
              className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-eyebrow font-semibold"
            >
              See the full case study
              <span className="vm-arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
