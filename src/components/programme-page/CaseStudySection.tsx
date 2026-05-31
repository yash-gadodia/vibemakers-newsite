import { Compass, Lightbulb, Layers, Repeat, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BrutalSticker } from "@/components/ui/brutal-sticker";

const journeySteps = [
  {
    phase: "Vision",
    icon: Compass,
    color: "bg-primary",
    painPoint: "\"Everyone in my class uses a shared Google Sheet for CCA points but it always breaks. I want to fix that.\"",
    actions: [
      "Interviews 3 classmates about their CCA tracking pain points",
      "Discovers the real problem: not tracking itself, but knowing what's missing before the deadline",
      "Writes a problem statement: 'Sec 3 students need a way to see gaps in their CCA points before term ends'",
    ],
    artifact: "Problem statement with user quotes and success criteria",
  },
  {
    phase: "Ideate",
    icon: Lightbulb,
    color: "bg-accent",
    painPoint: "\"I wanted to build everything, a chatbot, a calendar, notifications. My instructor asked: what's the one thing that solves 80% of the problem?\"",
    actions: [
      "Brainstorms 5 ideas, evaluates each against time and user need",
      "Cuts scope: drops notifications and chatbot, keeps dashboard + add activity",
      "Paper sketches 2 screens, gets peer feedback, revises layout",
    ],
    artifact: "Annotated wireframe with trade-off notes",
  },
  {
    phase: "Build",
    icon: Layers,
    color: "bg-primary",
    painPoint: "\"The AI generated a whole page but the form didn't save anything. I had to figure out what went wrong and re-prompt with more detail.\"",
    actions: [
      "Prompts AI with specific requirements from wireframe, not just 'build a tracker'",
      "First version has a bug, form submits but data doesn't persist. Debugs by reading the error",
      "Learns to verify AI output: 'Does this actually do what I asked? Let me test the flow.'",
    ],
    artifact: "Working prototype, messy but functional",
  },
  {
    phase: "Evolve",
    icon: Repeat,
    color: "bg-accent",
    painPoint: "\"My friend said the colours were confusing, green meant 'done' to me but 'not started' to her. I had to rethink the whole colour system.\"",
    actions: [
      "3 classmates test the app; 2 out of 3 misread the status colours",
      "Redesigns status indicators based on feedback, adds text labels alongside colours",
      "Presents to class: explains the problem, shows before/after, shares what failed",
    ],
    artifact: "Before/after comparison, user feedback log, and presentation slides",
  },
];

export function CaseStudySection() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        {/* Header */}
        <Reveal variant="up">
          <div className="text-center mb-12">
            <BrutalSticker tone="orange" rotate={-3}>
              ● Case Study
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-6">
              A Student's Journey
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              Follow one student through the V.I.B.E. cycle as they build a real solution
              to a problem they actually care about.
            </p>
          </div>
        </Reveal>

        {/* Scenario Card */}
        <Reveal variant="up" delayMs={100}>
          <div className="vm-card rounded-2xl border border-border bg-bg-warm-2 p-6 md:p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">The Starting Point</h3>
                <p className="font-sans text-foreground">
                  A Sec 3 student notices her classmates struggling with the same thing she is: nobody knows their CCA points balance until it's too late. She decides to build something about it.
                </p>
                <p className="font-sans font-medium text-foreground mt-3">
                  "My class Google Sheet keeps breaking. I think I can make something better."
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Journey Timeline */}
        <div className="relative space-y-8">
          {/* Connecting Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={index} variant="up" delayMs={150 + index * 100}>
                <div className="relative">
                  {/* Step Card */}
                  <div className="flex gap-4 md:gap-6">
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl ${step.color} flex items-center justify-center shadow-sticker`}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="vm-card rounded-2xl border border-border bg-card p-6">
                        {/* Phase Label */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="font-display font-bold text-lg text-foreground">{step.phase}</span>
                          <span className="text-xs font-mono uppercase tracking-eyebrow text-ink-2">
                            Step {index + 1}
                          </span>
                        </div>

                        {/* Pain Point Quote */}
                        <div className="flex items-start gap-3 mb-5 p-4 rounded-lg bg-bg-warm-2 border border-border">
                          <Quote className="w-4 h-4 text-ink-2 flex-shrink-0 mt-0.5" />
                          <p className="font-sans text-sm italic text-foreground">{step.painPoint}</p>
                        </div>

                        {/* Actions */}
                        <ul className="space-y-2 mb-5">
                          {step.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-3 font-sans text-sm">
                              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-foreground">{action}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Artifact */}
                        <div className="pt-4 border-t border-border">
                          <p className="font-sans text-xs text-ink-2">
                            <span className="font-bold text-foreground">Evidence:</span> {step.artifact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Outcome Banner */}
        <Reveal variant="up" delayMs={550}>
          <div className="vm-card rounded-2xl border border-border bg-bg-warm-2 p-6 md:p-8 mt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎉</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">The Outcome</h3>
                <p className="font-sans text-foreground">
                  The student has a <strong>working CCA Tracker</strong> her classmates
                  actually use, but the real outcome is what she can now do: identify a problem worth solving,
                  make scope trade-offs, verify AI output, and present her reasoning to others.
                </p>
                <p className="font-sans text-sm font-medium text-primary mt-3">
                  CAIT, CCI, and self-directed learning, demonstrated through authentic work.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
