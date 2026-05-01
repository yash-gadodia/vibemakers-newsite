import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { VibePhaseTabs } from "@/components/programmes/pedagogy/VibePhaseTabs";

const anchorOutcomes = [
  {
    emoji: "🎯",
    title: "Discover real-world needs",
    description: "Empathise with users, clarify constraints, and define success in authentic settings"
  },
  {
    emoji: "📐",
    title: "Develop practical solutions",
    description: "Apply knowledge and thinking skills to solve problems, not just complete exercises"
  },
  {
    emoji: "🔄",
    title: "Skilfully leverage AI tools",
    description: "Use Generative AI effectively—write prompts, evaluate outputs, and iterate"
  }
];

const vibeSteps = [
  {
    emoji: "👁️",
    label: "Vision",
    subLabel: "Empathise & Define",
    tooltipTitle: "Vision",
    tooltipBody: "Understand the user, clarify constraints, and define what success looks like."
  },
  {
    emoji: "💡",
    label: "Ideate",
    subLabel: "Explore & Decide",
    tooltipTitle: "Ideate",
    tooltipBody: "Generate options, compare trade-offs, and choose a direction to build."
  },
  {
    emoji: "🔨",
    label: "Build",
    subLabel: "Prototype",
    tooltipTitle: "Build",
    tooltipBody: "Prototype quickly with AI-assisted creation—then refine through small iterations."
  },
  {
    emoji: "🔄",
    label: "Evolve",
    subLabel: "Test & Improve",
    tooltipTitle: "Evolve",
    tooltipBody: "Test with feedback, reflect, and improve the solution based on what you learn."
  }
];

export function PedagogySection() {
  return (
    <section id="programme">
      {/* Dark Hero Section - Solve Real Problems */}
      <div className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight italic">
              Solve Real Problems.
              <br />
              <span className="text-primary">Build Real Solutions.</span>
            </h2>
            <p className="text-lg text-background/70 max-w-xl">
              Students apply knowledge in authentic settings—from understanding real users to designing, building, and improving digital solutions with AI.
            </p>
          </div>

          {/* 3 Anchor Outcome Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mb-12">
            {anchorOutcomes.map((outcome, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-background/10 border border-background/20 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-background/15 flex items-center justify-center mb-4">
                  <span className="text-2xl">{outcome.emoji}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-background mb-2">{outcome.title}</h3>
                <p className="text-sm text-background/60">{outcome.description}</p>
              </div>
            ))}
          </div>

          {/* Outcome callout */}
          <div className="max-w-5xl">
            <div className="rounded-2xl bg-background/10 border border-background/20 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <p className="font-semibold text-primary">Outcome: a real build students can show</p>
                  <p className="mt-1 text-sm text-background/60">
                    Students finish with a functional prototype and a clear story: what problem they chose, how they
                    designed, what they built, and what they improved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Light Section - How Learning Works */}
      <div className="section-padding bg-background">
        <div className="container mx-auto px-4">
          {/* VIBE Cycle Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 block">
              Human-Centered Methodology
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-4">
              How Learning Works Here
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our VIBE cycle uses <strong>human-centered methodologies</strong> to help students <strong>discover</strong> real-world needs and <strong>develop</strong> practical solutions — developing self-directed, collaborative, and digitally literate learners.
            </p>
          </div>

          {/* 4 Circular VIBE Icons */}
          <div className="flex flex-wrap justify-center items-start gap-6 md:gap-8 mb-16">
            {vibeSteps.map((step, index) => (
              <HoverCard key={index} openDelay={120} closeDelay={80}>
                <HoverCardTrigger asChild>
                  <button
                    type="button"
                    aria-label={`${step.label}: ${step.subLabel}`}
                    className="group flex flex-col items-center text-center w-28 md:w-36 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary border-2 border-border flex items-center justify-center mb-3 transition-all group-hover:border-primary/50 group-hover:shadow-lg">
                      <span className="text-3xl md:text-4xl">{step.emoji}</span>
                    </div>
                    <span className="font-semibold text-base">{step.label}</span>
                    <span className="text-xs text-muted-foreground">{step.subLabel}</span>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="space-y-1">
                    <div className="font-semibold text-sm text-foreground">
                      {step.tooltipTitle}
                    </div>
                    <div className="text-sm text-muted-foreground">{step.tooltipBody}</div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          {/* Per-phase mechanics */}
          <VibePhaseTabs />
        </div>
      </div>
    </section>
  );
}
