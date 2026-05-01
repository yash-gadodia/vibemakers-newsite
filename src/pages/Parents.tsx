import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RegistrationForm } from "@/components/programmes/RegistrationForm";
import { Button } from "@/components/ui/button";
import { HeroGlowBackground } from "@/components/ui/hero-glow-background";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";

const outcomes = [
  {
    emoji: "🚀",
    title: "Real Projects (Not Worksheets)",
    description: "Working apps deployed online — shareable via a link, not just screenshots",
  },
  {
    emoji: "🧠",
    title: "AI Fluency With Good Habits",
    description: "Prompting with intent, verifying outputs, debugging when things break",
  },
  {
    emoji: "🎯",
    title: "DSA & Portfolio-Ready",
    description: "A deployed app + reflection portfolio documenting their problem-solving process — strong evidence for DSA, EAE, and school applications",
  },
  {
    emoji: "💬",
    title: "Communication & Presentation",
    description: "Students explain design decisions, give peer feedback, and present builds to small groups",
  },
  {
    emoji: "✨",
    title: "Self-Directed Learning",
    description: "Students set project goals, manage scope, and iterate independently — a core MOE 21CC competency",
  },
];

const programmeFormats = [
  {
    emoji: "👥",
    title: "Group Classes (Outside School)",
    description: "Best for social learning + momentum",
    features: [
      "Small cohort of 4–8 students",
      "Weekly or holiday schedules",
      "Peer collaboration + demo days",
      "Structured curriculum with flexibility",
    ],
    whoFor: "Great for students who stay motivated in a group",
  },
  {
    emoji: "👤",
    title: "1-to-1 Coaching",
    description: "Our most personalised option, designed around your child's interests, goals, and pace.",
    features: [
      "Mentor-guided planning and decision-making",
      "Flexible scheduling",
      "Direct mentorship + feedback",
      "Parent updates on progress and next steps",
    ],
    whoFor: "Ideal when you want the fastest, most tailored outcomes",
  },
];

const projectExamples = [
  { emoji: "📚", title: "Exam Revision Planner", description: "Tracks subjects, deadlines, and spaced repetition" },
  { emoji: "🌐", title: "Personal Portfolio", description: "Showcase CCAs, projects, and achievements" },
  { emoji: "🎮", title: "Quiz Game App", description: "Custom questions with scoring and leaderboards" },
  { emoji: "💡", title: "CCA Points Tracker", description: "Dashboard to monitor progress before deadlines" },
];

const learnerProfiles = [
  {
    title: "\"My child has ideas but doesn't know where to start\"",
    description:
      "They come home talking about app ideas or things they wish existed — but don't have the tools or guidance to actually build them. Our programme gives them a structured way to go from idea to working prototype, with an instructor who helps them scope realistically and ship something real.",
  },
  {
    title: "\"They're good at school but bored by worksheets\"",
    description:
      "Strong academically, but disengaged by rote learning. These students come alive when they're solving real problems — figuring out why a feature isn't working, or deciding what to cut when time runs short. The programme channels that energy into tangible projects they own.",
  },
  {
    title: "\"They spend hours on devices — I want that time to be productive\"",
    description:
      "Instead of passive consumption, your child learns to use AI tools purposefully: prompting with intent, verifying outputs, debugging when things break. They go from being a user of technology to someone who creates with it.",
  },
  {
    title: "\"They're quiet and need a safe space to build confidence\"",
    description:
      "Not every student thrives in a debate or presentation setting — and that's fine. Here, the work speaks for itself first. Students build up to sharing by presenting their projects to small groups, explaining design decisions, and receiving constructive peer feedback at their own pace.",
  },
];

export default function Parents() {
  return (
    <Layout>
      <Helmet>
        <title>For Parents & Students | Vibemakers Academy - AI Coaching & Classes</title>
        <meta
          name="description"
          content="1-to-1 coaching and group classes for students. Build real projects, develop AI fluency, and create a portfolio you'll be proud of. No experience needed."
        />
        <meta
          name="keywords"
          content="AI coding tuition Singapore, 1-to-1 coding coach, group coding classes, student portfolio, teen coding, AI learning"
        />
        <link rel="canonical" href="https://vibemakers.dev/parents" />

        <meta property="og:title" content="For Parents & Students | Vibemakers Academy" />
        <meta
          property="og:description"
          content="1-to-1 coaching and group classes. Real projects, AI fluency, portfolio outcomes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <HeroGlowBackground>
        <section className="section-padding pt-32 md:pt-40">
          <div className="container mx-auto px-4">
            <Reveal variant="up">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase border border-primary text-primary rounded">
                  For Parents & Students
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                  Personalised coaching that turns{" "}
                  <span className="relative inline-block">
                    curiosity
                    <svg 
                      className="absolute -bottom-0.5 left-0 w-full h-2" 
                      viewBox="0 0 200 8" 
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path 
                        d="M0,4 Q15,1 30,4 T60,4 T90,4 T120,4 T150,4 T180,4 T200,4" 
                        fill="none" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{" "}
                  into real digital projects
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  For parents who want clear progress and tangible outcomes. Choose 1-to-1 coaching tailored to your child,
                  or small-group build classes outside school.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </HeroGlowBackground>

      {/* Learner Profiles - "You might recognise your child here" */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-display font-bold mb-2">You might recognise your child here</h2>
              <p className="text-sm text-muted-foreground mb-6">
                These are common learning patterns we see in students who thrive in the programme.
              </p>

              <Accordion type="single" collapsible defaultValue="profile-0" className="space-y-3">
                {learnerProfiles.map((profile, index) => (
                  <AccordionItem
                    key={profile.title}
                    value={`profile-${index}`}
                    className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden px-4"
                  >
                    <AccordionTrigger className="text-left no-underline hover:no-underline py-4">
                      <span className="font-semibold text-foreground leading-snug">{profile.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {profile.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Parent clarity */}
      <section id="parent-clarity" className="section-padding scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Reveal variant="left">
              <div className="p-8 bg-card border border-border rounded-2xl">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">What You'll Get as a Parent</h2>
                <p className="text-muted-foreground mb-6">No guesswork—just a clear plan and visible work products.</p>
                <ul className="space-y-4">
                  {[
                    "A simple learning plan based on your child's goals",
                    "Regular progress updates and what to practise next",
                    "Portfolio-style deliverables you can review together",
                    "Support on safe and responsible AI usage",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">✅</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="right" delayMs={100}>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  What Happens in a Coaching Session
                </h2>
                <p className="text-muted-foreground mb-8">
                  Sessions are hands-on and guided. Our full teaching approach is detailed on the{" "}
                  <Link to="/programme" className="text-primary hover:underline">
                    Programme Overview page
                  </Link>.
                </p>
                
                <div className="space-y-3">
                  {[
                    { emoji: "💡", title: "Idea → Build", desc: "Turn an idea into a working app" },
                    { emoji: "🤖", title: "AI as a Tool", desc: "Prompting + verification habits (with guidance, not copy-paste)" },
                    { emoji: "🔧", title: "Build, Test, Improve", desc: "Iterate, debug, and improve" },
                    { emoji: "📊", title: "Showcase", desc: "Present and explain their work" },
                  ].map((step) => (
                    <div 
                      key={step.title} 
                      className="flex items-center gap-4 pl-4 py-4 border-l-2 border-primary/30 bg-secondary/20 rounded-r-xl"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                      <span className="text-xl mr-4">{step.emoji}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <div className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <h2 className="text-2xl font-display font-bold mb-8">What Your Child Will Gain</h2>
          </Reveal>
          <RevealGroup staggerMs={80} variant="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
                  <span className="text-3xl">{outcome.emoji}</span>
                </div>
                <h3 className="font-semibold mb-2">{outcome.title}</h3>
                <p className="text-sm text-muted-foreground">{outcome.description}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* Programme Formats */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <h2 className="text-2xl font-display font-bold mb-8">Choose Your Format</h2>
          </Reveal>
          <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-2 gap-8">
            {programmeFormats.map((format) => (
              <div key={format.title} className="bg-secondary/30 border border-border rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
                    <span className="text-3xl">{format.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold">{format.title}</h3>
                    <p className="text-sm text-muted-foreground">{format.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {format.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">{format.whoFor}</p>
                </div>
                <Button asChild className="w-full rounded-full mt-6">
                  <a href="#register">Request This Format</a>
                </Button>
              </div>
            ))}
          </RevealGroup>
          <Reveal variant="up" delayMs={300}>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Beginner-friendly • No coding experience required • We place students based on age and readiness
            </p>
          </Reveal>
        </div>
      </div>

      {/* What They Build */}
      <div id="register" className="section-padding">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <h2 className="text-2xl font-display font-bold mb-3">What They'll Build</h2>
            <p className="text-muted-foreground mb-8">Real projects chosen and shaped by the student</p>
          </Reveal>
          <RevealGroup staggerMs={80} variant="up" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {projectExamples.map((project) => (
              <div
                key={project.title}
                className="p-6 bg-card border border-border rounded-2xl text-center hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl mb-3">{project.emoji}</div>
                <h3 className="font-semibold mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </RevealGroup>
          <Reveal variant="up" delayMs={400}>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Project scope and complexity are adapted to age and readiness.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Safety + Credibility */}
      <div className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <h2 className="text-2xl font-display font-bold mb-8">Safe, Structured Learning</h2>
          </Reveal>
          <RevealGroup staggerMs={80} variant="up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Guided AI Usage</h3>
                <p className="text-sm text-muted-foreground">Students use AI tools under instructor supervision, learning responsible prompting and output verification — aligned with MOE's AI literacy guidelines</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">No Student Data Shared</h3>
                <p className="text-sm text-muted-foreground">Projects are built on educational accounts. No personal data is collected by AI tools during sessions</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Dialogic Academy Track Record</h3>
                <p className="text-sm text-muted-foreground">Part of <a href="https://dialogic.academy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Dialogic Academy</a> (est. 2018) — 40+ school partnerships including RGS, VJC, ACS, and NJC</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Structured Independence</h3>
                <p className="text-sm text-muted-foreground">Every session follows a clear build cycle: brief, build, review. Students make their own decisions within a guided framework</p>
              </div>
            </div>
          </RevealGroup>
        </div>
      </div>

      {/* CTA Form */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-display font-bold mb-3">Register Your Interest</h2>
                <p className="text-muted-foreground">
                  Tell us what you're looking for (1-to-1 or group). We'll reach out within 2 working days with next
                  steps.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll recommend a starting format and suggest a possible build direction after understanding your child.
                </p>
              </div>
              <RegistrationForm />
            </div>
          </Reveal>
        </div>
      </div>
    </Layout>
  );
}
