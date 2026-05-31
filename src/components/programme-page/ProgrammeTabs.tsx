import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  CheckCircle,
  Compass,
  GraduationCap,
  Hammer,
  Layers,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Repeat,
  Target,
  Users,
} from "lucide-react";

const anchorOutcomes = [
  {
    icon: Target,
    title: "Frame the problem",
    description: "Clarify needs, constraints, and success criteria",
  },
  {
    icon: Layers,
    title: "Design the solution",
    description: "Break problems into steps and make trade-offs",
  },
  {
    icon: Repeat,
    title: "Build & improve",
    description: "Create, test, and iterate real applications using AI",
  },
];

const vibeSteps = [
  {
    icon: Compass,
    label: "Vision",
    subLabel: "Empathise & Define",
    tooltipTitle: "Vision",
    tooltipBody: "Understand the user, clarify constraints, and define what success looks like.",
  },
  {
    icon: Lightbulb,
    label: "Ideate",
    subLabel: "Explore & Decide",
    tooltipTitle: "Ideate",
    tooltipBody: "Generate options, compare trade-offs, and choose a direction to build.",
  },
  {
    icon: Layers,
    label: "Build",
    subLabel: "Prototype",
    tooltipTitle: "Build",
    tooltipBody: "Prototype quickly with AI-assisted creation: then refine through small iterations.",
  },
  {
    icon: Repeat,
    label: "Evolve",
    subLabel: "Test & Improve",
    tooltipTitle: "Evolve",
    tooltipBody: "Test with feedback, reflect, and improve the solution based on what you learn.",
  },
];

const learnerFitPoints = [
  {
    icon: Users,
    title: "Ages 13–18",
    description: "Secondary 1 to JC2",
  },
  {
    icon: Brain,
    title: "No prior coding experience required",
    description: "Thinking comes before tools.",
  },
  {
    icon: GraduationCap,
    title: "Mixed-ability friendly",
    description: "We differentiate so students can progress at their own pace.",
  },
];

const learnerProfiles = [
  {
    icon: ListChecks,
    title: "Thrive with clear structure for open-ended work",
    description:
      "Well suited for students who do their best thinking when they’re given a clear framework to tackle open-ended problems and see projects through to completion.",
  },
  {
    icon: Hammer,
    title: "Learn best by doing, not memorising",
    description:
      "Well suited for teens who learn through building, testing ideas, and iterating on prototypes: rather than memorising content or following step-by-step worksheets.",
  },
  {
    icon: MessageSquareText,
    title: "Building confidence and communication",
    description:
      "Designed for students developing confidence in sharing ideas, explaining their thinking, and presenting work: with supportive feedback.",
  },
];

const skills = [
  {
    name: "Structured problem-solving",
    student: "Break big problems into small wins",
    parent: "Your child learns to think before acting",
    school: "Develops analytical and critical thinking",
  },
  {
    name: "Communication",
    student: "Explain your ideas clearly",
    parent: "Better at articulating thoughts",
    school: "Strengthens written and oral communication",
  },
  {
    name: "Independent learning",
    student: "Figure things out on your own",
    parent: "Self-directed learner who takes initiative",
    school: "Builds metacognition and self-regulation",
  },
  {
    name: "Collaboration",
    student: "Work well with others",
    parent: "Team player who contributes meaningfully",
    school: "Develops interpersonal and teamwork skills",
  },
  {
    name: "Responsible AI use",
    student: "Use AI like a power tool, not a crutch",
    parent: "Ethical, thoughtful AI usage",
    school: "Digital literacy and AI ethics awareness",
  },
];

export function ProgrammeTabs() {
  return (
    <section id="programme" className="section-padding bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-display font-bold">What students actually learn</h2>
          <p className="mt-3 text-muted-foreground">
            A clean, structured pathway: from problem framing to shipping and iteration.
          </p>
        </div>

        <div className="mt-10">
          <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cycle">VIBE cycle</TabsTrigger>
              <TabsTrigger value="fit">Learner fit</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {anchorOutcomes.map((outcome) => (
                  <div
                    key={outcome.title}
                    className="rounded-2xl bg-card border border-border p-6 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <outcome.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg">{outcome.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{outcome.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-secondary/30 border border-border p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Outcome: a real build students can show</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Students finish with a functional prototype and a clear story: what problem they chose, how they
                      designed, what they built, and what they improved.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cycle" className="mt-6">
              <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-xl md:text-2xl font-display font-bold">How learning works here</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">
                    Hover each stage to see what students practise.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center items-center gap-4 md:gap-2">
                  {vibeSteps.map((step, index) => (
                    <div key={step.label} className="flex items-center">
                      <HoverCard openDelay={120} closeDelay={80}>
                        <HoverCardTrigger asChild>
                          <button
                            type="button"
                            aria-label={`${step.label}: ${step.subLabel}`}
                            className="group flex flex-col items-center text-center w-28 md:w-32 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 transition-transform group-hover:scale-[1.03]">
                              <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-semibold text-sm">{step.label}</span>
                            <span className="text-xs text-muted-foreground">{step.subLabel}</span>
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-72">
                          <div className="space-y-1">
                            <div className="font-semibold text-sm text-foreground">{step.tooltipTitle}</div>
                            <div className="text-sm text-muted-foreground">{step.tooltipBody}</div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>

                      {index < vibeSteps.length - 1 && (
                        <div className="hidden md:block w-8 h-0.5 bg-primary/30 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fit" className="mt-6">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 rounded-3xl bg-card border border-border p-6">
                  <h3 className="text-xl font-display font-bold">Fast fit check</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Clear boundaries so you can decide quickly.</p>

                  <div className="mt-5 space-y-3">
                    {learnerFitPoints.map((point) => (
                      <div key={point.title} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <point.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold leading-snug">{point.title}</p>
                          <p className="text-sm text-muted-foreground">{point.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 rounded-3xl bg-card border border-border p-6">
                  <h3 className="text-xl font-display font-bold">Learner profiles (a right fit if you…)</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Common patterns we see in students who thrive in the programme.
                  </p>

                  <Separator className="my-5 bg-border/60" />

                  <div className="space-y-4">
                    {learnerProfiles.map((profile) => (
                      <div
                        key={profile.title}
                        className="rounded-2xl bg-secondary/30 border border-border p-5 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <profile.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold leading-snug">{profile.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{profile.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-xl md:text-2xl font-display font-bold">Skills students gain</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">
                    Choose the lens. Same skills: different outcomes.
                  </p>
                </div>

                <Tabs defaultValue="students" className="mt-8">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="parents">Parents</TabsTrigger>
                    <TabsTrigger value="schools">Schools</TabsTrigger>
                  </TabsList>

                  {(["students", "parents", "schools"] as const).map((persona) => (
                    <TabsContent key={persona} value={persona} className="mt-6">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`rounded-2xl border border-border p-5 hover:border-primary/30 transition-colors ${
                              skill.name === "Structured problem-solving"
                                ? "bg-secondary"
                                : "bg-secondary/30"
                            }`}
                          >
                            <p className="font-semibold">{skill.name}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {persona === "students"
                                ? skill.student
                                : persona === "parents"
                                  ? skill.parent
                                  : skill.school}
                            </p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
