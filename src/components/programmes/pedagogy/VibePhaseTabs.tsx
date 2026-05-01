import { useState } from "react";
import { vibePhases, VibePhaseKey } from "./vibePhaseData";
import { cn } from "@/lib/utils";

function BulletList({ items, color = "primary" }: { items: string[]; color?: "primary" | "muted" }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={cn(
            "mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0",
            color === "primary" ? "bg-primary" : "bg-muted-foreground/50"
          )} />
          <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function VibePhaseTabs() {
  const [activePhase, setActivePhase] = useState<VibePhaseKey>("vision");
  const currentPhase = vibePhases.find((p) => p.key === activePhase) || vibePhases[0];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column - Title and Tab Buttons */}
        <div className="lg:col-span-4">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 leading-tight">
            What Happens In
            <br />
            Each Phase
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Our VIBE cycle is a student-friendly adaptation of design thinking, guiding learners from understanding real problems to building and improving solutions.
          </p>

          {/* Phase Toggle Buttons */}
          <div className="flex flex-wrap gap-2">
            {vibePhases.map((phase) => (
              <button
                key={phase.key}
                onClick={() => setActivePhase(phase.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activePhase === phase.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-border"
                )}
              >
                {phase.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Phase Content */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            {/* Phase Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h4 className="text-xl md:text-2xl font-display font-bold text-primary">
                {currentPhase.label}
              </h4>
              <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full uppercase tracking-wide">
                Design Thinking: {currentPhase.designThinking}
              </span>
            </div>

            {/* Two Columns: Students do & Teachers look for */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Students do */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">✍️</span>
                  <h5 className="font-semibold text-foreground">Students do</h5>
                </div>
                <BulletList items={currentPhase.studentDoes} color="primary" />
              </div>

              {/* Teachers look for */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📋</span>
                  <h5 className="font-semibold text-foreground">Teachers look for</h5>
                </div>
                <BulletList items={currentPhase.teacherLooksFor} color="muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
