import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RegistrationForm } from "@/components/programmes/RegistrationForm";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { cn } from "@/lib/utils";

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

        <script type="application/ld+json">{`{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Coding Coaching for Singapore Teens",
  "serviceType": "Educational Coaching",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Vibe Makers Academy",
    "url": "https://vibemakers.dev"
  },
  "areaServed": { "@type": "Country", "name": "Singapore" },
  "audience": {
    "@type": "Audience",
    "audienceType": "Parents of teens 13-18 in Singapore"
  },
  "description": "Personalised 1-to-1 coaching and small-group classes for Singapore teens (13-18) to build real apps with AI. No experience needed. Free trial class.",
  "offers": [
    {
      "@type": "Offer",
      "name": "Free Trial Class",
      "price": "0",
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock",
      "url": "https://vibemakers.dev/parents"
    },
    {
      "@type": "Offer",
      "name": "Group Classes",
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock",
      "url": "https://vibemakers.dev/parents"
    },
    {
      "@type": "Offer",
      "name": "1-to-1 Private Coaching",
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock",
      "url": "https://vibemakers.dev/parents"
    }
  ]
}`}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl">
              <span className="vm-sticker mb-6" style={{ transform: 'rotate(-3deg)' }}>
                ● For Parents & Students
              </span>
              <h1 className="font-display font-bold tracking-display leading-[1.02] text-5xl md:text-6xl lg:text-7xl mb-8">
                Personalised coaching that turns{" "}
                <span className="vm-sheen-text">curiosity</span>{" "}
                into real digital projects
              </h1>
              <p className="font-sans text-base text-foreground max-w-xl leading-[1.55]">
                For parents who want clear progress and tangible outcomes. Choose 1-to-1 coaching tailored to your child,
                or small-group build classes outside school.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Learner Profiles - "You might recognise your child here" */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-4xl mx-auto">
              <span className="vm-sticker vm-sticker--orange mb-4" style={{ transform: 'rotate(3deg)' }}>
                ● Learner Profiles
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-2">You might recognise your child here</h2>
              <p className="font-sans text-base text-ink-2 mb-8">
                These are common learning patterns we see in students who thrive in the programme.
              </p>

              <Accordion type="single" collapsible defaultValue="profile-0" className="space-y-3">
                {learnerProfiles.map((profile, index) => (
                  <AccordionItem
                    key={profile.title}
                    value={`profile-${index}`}
                    className="vm-card rounded-2xl border border-border bg-card overflow-hidden px-4"
                  >
                    <AccordionTrigger className="text-left no-underline hover:no-underline py-4">
                      <span className="font-semibold text-foreground leading-snug">{profile.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-base text-ink-2 leading-[1.55] pb-4">
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
      <section id="parent-clarity" className="bg-background py-20 md:py-28 border-t border-border scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Reveal variant="left">
              <div className="vm-card rounded-2xl border border-border bg-card p-8">
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">What You'll Get as a Parent</h2>
                <p className="font-sans text-base text-ink-2 mb-6">No guesswork—just a clear plan and visible work products.</p>
                <ul className="space-y-4">
                  {[
                    "A simple learning plan based on your child's goals",
                    "Regular progress updates and what to practise next",
                    "Portfolio-style deliverables you can review together",
                    "Support on safe and responsible AI usage",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">✅</span>
                      <span className="font-sans text-base text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="right" delayMs={100}>
              <div>
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-2">
                  What Happens in a Coaching Session
                </h2>
                <p className="font-sans text-base text-ink-2 mb-8">
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
                      className="flex items-center gap-4 pl-4 py-4 border-l-2 border-primary bg-bg-warm-2 rounded-r-xl"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <p className="font-sans text-base text-ink-2">{step.desc}</p>
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
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <span className="vm-sticker mb-4" style={{ transform: 'rotate(-3deg)' }}>
              ● Outcomes
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-8">What Your Child Will Gain</h2>
          </Reveal>
          <RevealGroup staggerMs={80} variant="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="vm-card rounded-2xl border border-border bg-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-bg-warm-2 flex items-center justify-center mb-4">
                  <span className="text-3xl">{outcome.emoji}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{outcome.title}</h3>
                <p className="font-sans text-base text-ink-2">{outcome.description}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Programme Formats */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <span className="vm-sticker vm-sticker--orange mb-4" style={{ transform: 'rotate(3deg)' }}>
              ● Programme Formats
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-8">Choose Your Format</h2>
          </Reveal>
          <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-2 gap-8">
            {programmeFormats.map((format) => (
              <div key={format.title} className="vm-card rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-bg-warm-2 flex items-center justify-center">
                    <span className="text-3xl">{format.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">{format.title}</h3>
                    <p className="font-sans text-base text-ink-2">{format.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {format.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-sans text-base text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <p className="font-sans text-base text-ink-2 italic">{format.whoFor}</p>
                </div>
                <Button asChild className="w-full mt-6 rounded-full bg-primary text-primary-foreground font-medium hover:bg-accent">
                  <a href="#register">Request This Format</a>
                </Button>
              </div>
            ))}
          </RevealGroup>
          <Reveal variant="up" delayMs={300}>
            <p className="text-center font-sans text-base text-muted-foreground mt-6">
              Beginner-friendly • No coding experience required • We place students based on age and readiness
            </p>
          </Reveal>
        </div>
      </section>

      {/* What They Build */}
      <section id="register" className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <span className="vm-sticker mb-4" style={{ transform: 'rotate(-3deg)' }}>
              ● Project Examples
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">What They'll Build</h2>
            <p className="font-sans text-base text-ink-2 mb-8">Real projects chosen and shaped by the student</p>
          </Reveal>
          <RevealGroup staggerMs={80} variant="up" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {projectExamples.map((project) => (
              <div
                key={project.title}
                className="vm-card rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="text-4xl mb-3">{project.emoji}</div>
                <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                <p className="font-sans text-sm text-ink-2">{project.description}</p>
              </div>
            ))}
          </RevealGroup>
          <Reveal variant="up" delayMs={400}>
            <p className="text-center font-sans text-base text-muted-foreground mt-6">
              Project scope and complexity are adapted to age and readiness.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Safety + Credibility */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <span className="vm-sticker vm-sticker--orange mb-4" style={{ transform: 'rotate(3deg)' }}>
              ● Trust & Safety
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-8">Safe, Structured Learning</h2>
          </Reveal>
          <RevealGroup staggerMs={80} variant="up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-bg-warm-2 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Guided AI Usage</h3>
                <p className="font-sans text-base text-ink-2">Students use AI tools under instructor supervision, learning responsible prompting and output verification — aligned with MOE's AI literacy guidelines</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-bg-warm-2 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">No Student Data Shared</h3>
                <p className="font-sans text-base text-ink-2">Projects are built on educational accounts. No personal data is collected by AI tools during sessions</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-bg-warm-2 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Dialogic Academy Track Record</h3>
                <p className="font-sans text-base text-ink-2">Part of <a href="https://dialogic.academy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Dialogic Academy</a> (est. 2018) — 40+ school partnerships including RGS, VJC, ACS, and NJC</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-bg-warm-2 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Structured Independence</h3>
                <p className="font-sans text-base text-ink-2">Every session follows a clear build cycle: brief, build, review. Students make their own decisions within a guided framework</p>
              </div>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* CTA Form */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="vm-sticker mb-4 inline-block" style={{ transform: 'rotate(-3deg)' }}>
                  ● Get Started
                </span>
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">Register Your Interest</h2>
                <p className="font-sans text-base text-ink-2">
                  Tell us what you're looking for (1-to-1 or group). We'll reach out within 2 working days with next
                  steps.
                </p>
                <p className="font-sans text-base text-muted-foreground mt-3">
                  We'll recommend a starting format and suggest a possible build direction after understanding your child.
                </p>
              </div>
              <RegistrationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
