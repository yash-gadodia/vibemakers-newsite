import { useState } from "react";
import { vibePhases, type VibePhaseKey } from "@/components/programmes/pedagogy/vibePhaseData";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

function BulletList({ items, variant = "default" }: { items: string[]; variant?: "default" | "success" }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm font-sans">
          <CheckCircle2
            className={cn(
              "w-4 h-4 mt-0.5 flex-shrink-0",
              variant === "success" ? "text-primary" : "text-primary"
            )}
          />
          <span className="text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MethodologySection() {
  const [activePhase, setActivePhase] = useState<VibePhaseKey>("vision");
  const currentPhase = vibePhases.find((p) => p.key === activePhase)!;

  return (
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        {/* Header */}
        <Reveal variant="up">
          <div className="text-center mb-12">
            <span className="vm-sticker" style={{ transform: 'rotate(3deg)' }}>
              ● Methodology
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-6">
              How We Teach It: The V.I.B.E. Cycle
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              A student-friendly design thinking loop that brings product thinking to life with AI—
              developing self-directed, collaborative, and digitally literate learners.
            </p>
          </div>
        </Reveal>

        {/* Phase Selector */}
        <Reveal variant="up" delayMs={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {vibePhases.map((phase) => {
              const Icon = phase.icon;
              const isActive = phase.key === activePhase;
              return (
                <button
                  key={phase.key}
                  onClick={() => setActivePhase(phase.key)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all",
                    isActive
                      ? "vm-btn bg-primary text-primary-foreground shadow-sticker"
                      : "vm-btn bg-transparent text-foreground border border-border hover:border-primary/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{phase.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Phase Content */}
        <Reveal variant="up" delayMs={200}>
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left: What Students Do */}
            <div className="vm-card rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <currentPhase.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-lg">{currentPhase.label}</h3>
                  <p className="text-xs font-mono uppercase tracking-eyebrow text-ink-2">{currentPhase.designThinking}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-eyebrow text-ink-2 mb-4">
                    What Students Do
                  </h4>
                  <BulletList items={currentPhase.studentDoes} />
                </div>
              </div>
            </div>

            {/* Right: What Teachers Look For & Evidence */}
            <div className="vm-card rounded-2xl border border-border bg-card p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-eyebrow text-ink-2 mb-4">
                    What Teachers Look For
                  </h4>
                  <BulletList items={currentPhase.teacherLooksFor} />
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-xs font-mono uppercase tracking-eyebrow text-primary mb-4">
                    Evidence of Learning
                  </h4>
                  <BulletList items={currentPhase.evidenceLooksLike} variant="success" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Outcome Banner */}
        <Reveal variant="up" delayMs={300}>
          <div className="vm-card rounded-2xl border border-border bg-bg-warm-2 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <p className="font-display font-bold text-foreground">Process over product—but students still ship</p>
                <p className="mt-2 font-sans text-foreground text-sm">
                  By the end, students have a working prototype AND can explain: the problem they chose,
                  how they designed it, what they built, and what they'd improve.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
