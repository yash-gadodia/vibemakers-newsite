import { Link } from "react-router-dom";
import { Building2, Home } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import { BrutalButton } from "@/components/ui/brutal-button";

export function FormatCardsSection() {
  return (
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <Reveal variant="up">
          <div className="text-center mb-12">
            <BrutalSticker tone="yellow" rotate={-3}>
              ● Formats
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-6">
              Choose Your Format
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              One core programme, multiple ways to learn.
            </p>
          </div>
        </Reveal>

        <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Schools Card */}
          <div className="vm-card rounded-2xl border border-border bg-card p-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-3">
              Programmes for Schools
            </h3>
            <p className="font-sans text-foreground mb-8 leading-relaxed">
              School-based programmes for post-exam periods, enrichment blocks, and special programmes.
            </p>
            <BrutalButton asChild variant="primary" size="md" className="rounded-full shadow-sticker">
              <Link to="/schools">
                View School Programmes
                <span className="vm-arrow">→</span>
              </Link>
            </BrutalButton>
          </div>

          {/* Parents Card */}
          <div className="vm-card rounded-2xl border border-border bg-card p-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-3">
              Programmes for Parents & Students
            </h3>
            <p className="font-sans text-foreground mb-8 leading-relaxed">
              Holiday classes and small-group coaching for students and families.
            </p>
            <BrutalButton asChild variant="primary" size="md" className="rounded-full shadow-sticker">
              <Link to="/parents">
                View Classes for Parents & Students
                <span className="vm-arrow">→</span>
              </Link>
            </BrutalButton>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
