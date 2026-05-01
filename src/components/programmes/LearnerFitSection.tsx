import { CheckCircle2, Zap } from "lucide-react";

const learnerFitChecklist = [
  "Ages 13–18 (Secondary 1–JC2)",
  "No prior coding experience required",
  "Mixed-ability friendly",
  "Develops 21st Century Competencies (21CC)",
  "Applied learning, not exam prep",
];

export function LearnerFitSection() {
  return (
    <section id="programme" className="section-padding bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Hero: Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column: Badge, headline, subtext */}
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
              Fit Check
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Is This Right for You?
            </h2>
            <p className="text-muted-foreground text-lg">
              Clear boundaries so you can decide quickly if this fits.
            </p>
          </div>

          {/* Right column: Fast fit check card */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-display font-bold">Fast fit check</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              A quick scan to see if this matches.
            </p>

            <ul className="space-y-3">
              {learnerFitChecklist.map((label) => (
                <li key={label} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm md:text-base text-foreground leading-snug">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
