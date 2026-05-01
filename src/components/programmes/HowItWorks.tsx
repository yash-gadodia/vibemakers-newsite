import { Clock } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Share Your Goals",
    description: "Tell us what you're looking to achieve—whether for your child or your school.",
  },
  {
    step: "02",
    title: "We Recommend a Programme",
    description: "Based on your needs, we'll suggest the best format and curriculum.",
  },
  {
    step: "03",
    title: "Schedule & Launch",
    description: "Pick a time that works and we'll handle the rest. Learning begins!",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground">Simple steps to get started</p>
        </div>

        {/* Steps with numbered circles and curved connectors */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mb-10">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Numbered Circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-border bg-card flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-display font-light text-foreground">
                    {step.step}
                  </span>
                </div>
                
                {/* Curved connector line - positioned to the right of circle */}
                {index < steps.length - 1 && (
                  <svg
                    className="hidden md:block absolute top-1/2 left-[90px] md:left-[100px] w-[calc(100%-20px)] h-10 -translate-y-1/2"
                    viewBox="0 0 200 40"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 20 Q50 0 100 20 Q150 40 200 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-border"
                      fill="none"
                    />
                  </svg>
                )}
              </div>

              {/* Step Label */}
              <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                Step {step.step}
              </span>

              {/* Content */}
              <h3 className="text-lg font-display font-bold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Turnaround Info Bar */}
        <div className="max-w-3xl bg-secondary/50 rounded-2xl px-6 py-4 flex items-center gap-3 border border-border/50">
          <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Typical turnaround:</span> Proposal within 3 working days • Programme starts within 2 weeks
          </p>
        </div>
      </div>
    </section>
  );
}
