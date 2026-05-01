import { useState } from "react";
import { vibePhases, type VibePhaseKey } from "@/components/programmes/pedagogy/vibePhaseData";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

function BulletList({ items, variant = "default" }: { items: string[]; variant?: "default" | "success" }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <CheckCircle2 
            className={cn(
              "w-4 h-4 mt-0.5 flex-shrink-0",
              variant === "success" ? "text-primary" : "text-primary"
            )}
          />
          <span className="text-background/70">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MethodologySection() {
  const [activePhase, setActivePhase] = useState<VibePhaseKey>("vision");
  const currentPhase = vibePhases.find((p) => p.key === activePhase)!;

  return (
    <section className="bg-foreground py-16 md:py-24">

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Reveal variant="up">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/20 rounded-full mb-4">
                Human-Centered Methodology
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-background mb-4">
                How We Teach It: The V.I.B.E. Cycle
              </h2>
              <p className="text-background/60 max-w-2xl mx-auto">
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
                      "flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-background/10 text-background/70 hover:bg-background/20"
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
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: What Students Do */}
              <div className="rounded-3xl bg-background/10 border border-background/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <currentPhase.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-background text-lg">{currentPhase.label}</h3>
                    <p className="text-xs text-background/60">{currentPhase.designThinking}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-background/70 uppercase tracking-wide mb-3">
                      What Students Do
                    </h4>
                    <BulletList items={currentPhase.studentDoes} />
                  </div>
                </div>
              </div>

              {/* Right: What Teachers Look For & Evidence */}
              <div className="rounded-3xl bg-background/10 border border-background/20 p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-background/70 uppercase tracking-wide mb-3">
                      What Teachers Look For
                    </h4>
                    <BulletList items={currentPhase.teacherLooksFor} />
                  </div>

                  <div className="pt-4 border-t border-background/20">
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
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
            <div className="mt-10 rounded-2xl bg-background/10 border border-background/20 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <p className="font-semibold text-primary">Process over product—but students still ship</p>
                  <p className="mt-1 text-sm text-background/60">
                    By the end, students have a working prototype AND can explain: the problem they chose,
                    how they designed it, what they built, and what they'd improve.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
