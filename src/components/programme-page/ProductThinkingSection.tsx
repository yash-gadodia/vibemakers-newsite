import { Users, Target, RefreshCw } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";

const pillars = [
  {
    icon: Users,
    title: "User-Centered",
    description: "Start with real people and real needs—not abstract exercises",
    detail: "Students learn to ask: Who is this for? What do they struggle with? What would 'better' look like?",
    badge: "Empathise",
  },
  {
    icon: Target,
    title: "Constraint-Aware",
    description: "Work within limits—time, scope, audience, and resources",
    detail: "Real problems have boundaries. Students learn to define scope and make trade-offs intentionally.",
    badge: "Define",
  },
  {
    icon: RefreshCw,
    title: "Feedback-Driven",
    description: "Test, learn, improve—continuously",
    detail: "No solution is perfect on the first try. Students iterate based on real feedback, not assumptions.",
    badge: "Iterate",
  },
];

export function ProductThinkingSection() {
  return (
    <section className="section-padding bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Reveal variant="up">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full mb-4">
                The Mindset
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                What is Product Thinking?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Before building, students learn to think like product designers: understand users, 
                define problems, weigh trade-offs, and iterate based on feedback.
              </p>
            </div>
          </Reveal>

          {/* Three Pillars */}
          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group relative rounded-3xl bg-background border border-border p-6 transition-all hover:shadow-lg hover:border-primary/30"
              >
                {/* Badge */}
                <span className="absolute top-4 right-4 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                  {pillar.badge}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground mb-4">{pillar.description}</p>
                <p className="text-sm text-muted-foreground/80">{pillar.detail}</p>
              </div>
            ))}
          </RevealGroup>

          {/* Bottom Callout */}
          <Reveal variant="up" delayMs={300}>
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Product thinking develops <strong className="text-foreground">Critical, Adaptive and Inventive Thinking (CAIT)</strong> — one of three core 21CC domains. Our approach maps to MOE's <strong className="text-foreground">Applied Learning Programme</strong> framework: authentic problems, real-world contexts, student-led iteration.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
