import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/Reveal";

const rows = [
  { feature: "Students build a real, deployed app", vm: true, trad: false },
  { feature: "No coding syntax to memorise", vm: true, trad: false },
  { feature: "Problem-solving & design thinking", vm: true, trad: false },
  { feature: "AI tools used as part of learning", vm: true, trad: false },
  { feature: "Portfolio for DSA/school applications", vm: true, trad: false },
  { feature: "Peer feedback & presentation practice", vm: true, trad: false },
  { feature: "Aligned with MOE 21CC framework", vm: true, trad: false },
  { feature: "Learn programming fundamentals", vm: true, trad: true },
  { feature: "Step-by-step syntax instruction", vm: false, trad: true },
];

function StatusIcon({ yes }: { yes: boolean }) {
  return yes ? (
    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
      <Check className="w-3.5 h-3.5 text-primary" />
    </div>
  ) : (
    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
      <X className="w-3.5 h-3.5 text-muted-foreground/50" />
    </div>
  );
}

export function ComparisonSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <SectionHeader
            badge="Why Vibe Makers"
            title="Not Another Coding Class"
            description="We teach students to solve problems with AI, not memorise syntax."
          />
        </Reveal>

        <Reveal variant="up" delayMs={100}>
          <div className="max-w-2xl mx-auto mt-10 rounded-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4 bg-secondary/50 border-b border-border">
              <div className="text-sm font-medium text-muted-foreground" />
              <div className="w-24 text-center">
                <span className="text-sm font-bold text-primary">Vibe Makers</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-sm font-medium text-muted-foreground">Traditional</span>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3.5 ${
                  i < rows.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span className="text-sm text-foreground">{row.feature}</span>
                <div className="w-24 flex justify-center">
                  <StatusIcon yes={row.vm} />
                </div>
                <div className="w-24 flex justify-center">
                  <StatusIcon yes={row.trad} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
