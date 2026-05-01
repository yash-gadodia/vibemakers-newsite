import { Compass, Lightbulb, Layers, Repeat, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

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
    painPoint: "\"I wanted to build everything — a chatbot, a calendar, notifications. My instructor asked: what's the one thing that solves 80% of the problem?\"",
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
      "First version has a bug — form submits but data doesn't persist. Debugs by reading the error",
      "Learns to verify AI output: 'Does this actually do what I asked? Let me test the flow.'",
    ],
    artifact: "Working prototype — messy but functional",
  },
  {
    phase: "Evolve",
    icon: Repeat,
    color: "bg-accent",
    painPoint: "\"My friend said the colours were confusing — green meant 'done' to me but 'not started' to her. I had to rethink the whole colour system.\"",
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
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <Reveal variant="up">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 rounded-full mb-4">
                Case Study
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                A Student's Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow one student through the V.I.B.E. cycle as they build a real solution 
                to a problem they actually care about.
              </p>
            </div>
          </Reveal>

          {/* Scenario Card */}
          <Reveal variant="up" delayMs={100}>
            <div className="mb-12 rounded-3xl bg-secondary/50 border border-border p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">The Starting Point</h3>
                  <p className="text-muted-foreground">
                    A Sec 3 student notices her classmates struggling with the same thing she is —
                    nobody knows their CCA points balance until it's too late. She decides to build something about it.
                  </p>
                  <p className="mt-3 font-medium text-foreground">
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
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="rounded-2xl bg-background border border-border p-5 md:p-6 shadow-sm">
                          {/* Phase Label */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-display font-bold text-lg">{step.phase}</span>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                              Step {index + 1}
                            </span>
                          </div>

                          {/* Pain Point Quote */}
                          <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-secondary/50">
                            <Quote className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <p className="text-sm italic text-muted-foreground">{step.painPoint}</p>
                          </div>

                          {/* Actions */}
                          <ul className="space-y-2 mb-4">
                            {step.actions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <span className="text-muted-foreground">{action}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Artifact */}
                          <div className="pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground">
                              <span className="font-semibold text-foreground">Evidence:</span> {step.artifact}
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
            <div className="mt-8 rounded-3xl bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎉</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">The Outcome</h3>
                  <p className="text-muted-foreground">
                    The student has a <strong className="text-foreground">working CCA Tracker</strong> her classmates
                    actually use — but the real outcome is what she can now do: identify a problem worth solving,
                    make scope trade-offs, verify AI output, and present her reasoning to others.
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">
                    CAIT, CCI, and self-directed learning — demonstrated through authentic work.
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
