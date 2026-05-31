import { Users, Target, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { BrutalSticker } from "@/components/ui/brutal-sticker";

const pillars = [
  {
    icon: Users,
    title: "User-Centered",
    description: "Start with real people and real needs: not abstract exercises",
    detail: "Students learn to ask: Who is this for? What do they struggle with? What would 'better' look like?",
    badge: "Empathise",
  },
  {
    icon: Target,
    title: "Constraint-Aware",
    description: "Work within limits: time, scope, audience, and resources",
    detail: "Real problems have boundaries. Students learn to define scope and make trade-offs intentionally.",
    badge: "Define",
  },
  {
    icon: RefreshCw,
    title: "Feedback-Driven",
    description: "Test, learn, improve: continuously",
    detail: "No solution is perfect on the first try. Students iterate based on real feedback, not assumptions.",
    badge: "Iterate",
  },
];

export function ProductThinkingSection() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        {/* Header */}
        <Reveal variant="up">
          <div className="text-center mb-12">
            <BrutalSticker tone="yellow" rotate={-3}>
              ● The Mindset
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mt-6 mb-6">
              What is Product Thinking?
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              Before building, students learn to think like product designers: understand users,
              define problems, weigh trade-offs, and iterate based on feedback.
            </p>
          </div>
        </Reveal>

        {/* Three Pillars */}
        <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="vm-card rounded-2xl border border-border bg-card p-8"
            >
              {/* Badge */}
              <span className="text-xs font-mono uppercase tracking-eyebrow text-ink-2 mb-4 inline-block">
                {pillar.badge}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-foreground mb-3">{pillar.title}</h3>
              <p className="font-sans text-foreground mb-3">{pillar.description}</p>
              <p className="font-sans text-ink-2 text-sm">{pillar.detail}</p>
            </div>
          ))}
        </RevealGroup>

        {/* Bottom Callout */}
        <Reveal variant="up" delayMs={300}>
          <div className="rounded-2xl bg-bg-warm-2 border border-border p-6 md:p-8 text-center">
            <p className="font-sans text-foreground max-w-2xl mx-auto">
              Product thinking develops <strong>Critical, Adaptive and Inventive Thinking (CAIT)</strong> · one of three core 21CC domains. Our approach maps to MOE's <strong>Applied Learning Programme</strong> framework: authentic problems, real-world contexts, student-led iteration.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
