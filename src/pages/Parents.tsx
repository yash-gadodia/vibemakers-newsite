import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RegistrationForm } from "@/components/programmes/RegistrationForm";
import { TrustSection } from "@/components/home/TrustSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { cn } from "@/lib/utils";

const pricingTiers = [
  {
    name: "Free Trial Class",
    price: "Free",
    sub: "90 minutes · No obligation",
    description: "Your teen builds a deployed app in their first session. Online or in-person. Most weekends.",
    features: [
      "Real shipped app, not a demo",
      "1-on-1 coach guidance",
      "We help you decide if VM is the right fit",
    ],
    cta: "Book my free trial",
    highlight: true,
  },
  {
    name: "Group Classes",
    price: "From SGD $250",
    sub: "per month · 4–8 students",
    description: "Weekly small-group sessions outside school hours. Best for momentum + peer collaboration.",
    features: [
      "8 sessions per month",
      "Demo days every 4 weeks",
      "Pause anytime · no contract lock-in",
    ],
    cta: "Talk to us about groups",
    highlight: false,
  },
  {
    name: "1-to-1 Private Coaching",
    price: "SGD $80–150",
    sub: "per session · paced to your child",
    description: "Mentor-guided weekly sessions, fully tailored to your child's interests, level, and schedule.",
    features: [
      "Flexible scheduling (weekends / evenings)",
      "Direct mentorship + parent updates",
      "Best for fastest, most-tailored outcomes",
    ],
    cta: "Enquire about 1-to-1",
    highlight: false,
  },
];

const parentFAQ = [
  {
    q: "What ages do you teach?",
    a: "Teenagers aged 13–18 (Sec 1 to JC2). The problem-scoping and feedback-iteration cycle requires written communication and abstract thinking that pre-secondary students typically don't have yet.",
  },
  {
    q: "Does my child need any prior coding experience?",
    a: "No. Most of our students have never coded before their free trial. The whole point of vibe coding is that students describe what they want in plain English and AI generates the code — they iterate from there. The learning is in the thinking, not the syntax.",
  },
  {
    q: "What does my child need to bring or own?",
    a: "A laptop (Mac or Windows, anything from 2019 onwards is fine). A free Lovable account and a free Claude account — we'll help you set those up before session 1. No software to install.",
  },
  {
    q: "Is it online or in-person?",
    a: "Both, your choice. Group classes run in-person at our partner space in Singapore. 1-to-1 coaching can be online (Zoom + screen share) or in-person depending on what suits your family. Trial classes are usually online — easier to schedule.",
  },
  {
    q: "How is this different from a Python course at Coding Lab / Saturday Kids / First Code?",
    a: "Those programmes optimise for syntax mastery — students learn to write code character-by-character. We optimise for shipping real products — students leave with deployed apps used by real classmates. For DSA / EAE / JC interviews, a portfolio of working apps consistently outperforms a course-completion certificate. We're built for teens (13–18); they're mostly built for primary kids.",
  },
  {
    q: "Will my child miss out on 'real' computer science?",
    a: "Not if they stay curious. Most students who continue past month 2 naturally start asking 'what's actually in the code Lovable generated?' — and that's when traditional CS knowledge becomes meaningful and motivated. Order matters: ship first, theorise second.",
  },
  {
    q: "How fast will I hear back after enquiring?",
    a: "Within 24 hours on weekdays, sooner on most weekends. We reply via WhatsApp by default — feel free to message +65 8890 0368 directly if you'd rather skip the form.",
  },
  {
    q: "What if my child tries it once and doesn't enjoy it?",
    a: "Then they don't come back, and we both learn something. That's exactly what the free trial is for. No commitment, no guilt. Most parents tell us they can read in 90 minutes whether vibe coding clicks for their child.",
  },
  {
    q: "Can I see what students have actually built?",
    a: "Yes — the trial class ends with your teen showing you what they made. We're also building a public portfolio gallery for late 2026 with consenting students' work.",
  },
  {
    q: "Are you MOE-aligned?",
    a: "Yes. The V.I.B.E. methodology maps to all four MOE 4 AI Learns (Learn about / use / with / beyond AI) and develops the three core 21CC competencies — Critical, Adaptive & Inventive Thinking; Communication & Collaboration; Self-Directed Learning. We've delivered enrichment with 40+ Singapore schools since 2018 (as Dialogic Academy).",
  },
];

const parentTestimonials = [
  {
    quote: "He came home and opened his laptop without being asked. That hasn't happened since the iPad. Whatever you're doing, it's working.",
    role: "Parent of a Sec 2 student",
  },
  {
    quote: "What convinced me was the demo class. My daughter shipped a working app in 90 minutes. I had been paying for a Python tutor for 6 months with nothing to show.",
    role: "Parent of a Sec 3 student",
  },
  {
    quote: "I built a CCA points tracker my entire club uses now. Way more useful than the spreadsheet our teacher made us use last year.",
    role: "Sec 3 student",
  },
];

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
      <section className="bg-background pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl">
              <span className="vm-sticker mb-6" style={{ transform: 'rotate(-3deg)' }}>
                ● For Parents & Students
              </span>
              <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                Your teen ships a real app{" "}
                <span className="vm-sheen-text">in their first session.</span>
              </h1>
              <p className="font-sans text-lg text-foreground max-w-2xl leading-[1.55] mb-3">
                AI-first coding for teens 13–18. 1-to-1 coaching or small-group classes outside school.
                Trial class is 90 minutes, online or in-person, and free.
              </p>
              <p className="font-sans text-sm text-muted-foreground max-w-2xl leading-[1.55] mb-8">
                Trusted by 40+ Singapore schools since 2018 · Part of Dialogic Academy
              </p>

              {/* Above-fold CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-accent shadow-sticker"
                >
                  <a href="#register">Book my free trial →</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full font-medium border-2 border-foreground"
                >
                  <a
                    href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27m%20enquiring%20about%20coaching%20for%20my%20teen"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2" aria-hidden>💬</span>
                    WhatsApp us +65 8890 0368
                  </a>
                </Button>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4 uppercase tracking-eyebrow">
                Most parents hear back within 24 hours · No commitment
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust bar — partner schools + stats. Ported from home so /parents
          starts with credibility before going into the longer pitch. */}
      <TrustSection />

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

      {/* Pricing — transparent rates. Per competitor research, every other
          SG provider hides pricing behind "contact us" — publishing ours
          is our biggest single conversion wedge. */}
      <section id="pricing" className="bg-bg-warm py-20 md:py-28 border-t border-border scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="text-center mb-10">
              <span className="vm-sticker mb-4 inline-block" style={{ transform: 'rotate(-3deg)' }}>
                ● Simple, Transparent Pricing
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                Pricing you can decide on without a sales call
              </h2>
              <p className="font-sans text-base text-ink-2 max-w-2xl mx-auto">
                We don't hide rates. The first class is free, and you can pause anytime.
              </p>
            </div>
          </Reveal>
          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "vm-card rounded-2xl border p-8 flex flex-col",
                  tier.highlight
                    ? "border-primary bg-card shadow-sticker"
                    : "border-border bg-card"
                )}
              >
                {tier.highlight && (
                  <span className="vm-sticker mb-4 self-start" style={{ transform: 'rotate(-3deg)' }}>
                    Start here
                  </span>
                )}
                <h3 className="font-display font-bold text-xl text-foreground mb-1">{tier.name}</h3>
                <p className="font-display font-bold text-3xl md:text-4xl text-primary mb-1">{tier.price}</p>
                <p className="font-sans text-sm text-muted-foreground mb-4">{tier.sub}</p>
                <p className="font-sans text-base text-ink-2 mb-6 leading-[1.55]">{tier.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-primary flex-shrink-0">✓</span>
                      <span className="font-sans text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    "w-full rounded-full font-medium",
                    tier.highlight
                      ? "bg-primary text-primary-foreground hover:bg-accent"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  <a href="#register">{tier.cta}</a>
                </Button>
              </div>
            ))}
          </RevealGroup>
          <Reveal variant="up" delayMs={400}>
            <p className="text-center font-sans text-sm text-muted-foreground mt-8">
              All prices in SGD. No GST surprises. We bill at the start of each month — pause or cancel anytime.
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

      {/* What parents (and students) say */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="text-center mb-12">
              <span className="vm-sticker mb-4 inline-block" style={{ transform: 'rotate(3deg)' }}>
                ● From the families we work with
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                What parents (and students) say
              </h2>
              <p className="font-sans text-sm text-muted-foreground max-w-2xl mx-auto">
                Quotes are real, anonymised at the family's request. We'll publish a public student showcase later this year with consent.
              </p>
            </div>
          </Reveal>
          <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-3 gap-6">
            {parentTestimonials.map((t, i) => (
              <div
                key={i}
                className="vm-card rounded-2xl border border-border bg-card p-7 flex flex-col"
              >
                <div className="text-4xl text-primary leading-none mb-4 font-display">"</div>
                <blockquote className="font-display text-lg md:text-xl text-foreground leading-snug font-medium mb-6 flex-1">
                  {t.quote}
                </blockquote>
                <p className="font-mono text-xs uppercase tracking-eyebrow text-muted-foreground">
                  — {t.role}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ — pre-empt every common parent objection so they don't bounce */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[900px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="text-center mb-10">
              <span className="vm-sticker vm-sticker--orange mb-4 inline-block" style={{ transform: 'rotate(-2deg)' }}>
                ● Common parent questions
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                Things parents ask before booking
              </h2>
              <p className="font-sans text-base text-ink-2">
                Still unsure? <a href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">WhatsApp us</a> — we usually reply same day.
              </p>
            </div>
          </Reveal>
          <Reveal variant="up" delayMs={120}>
            <Accordion type="single" collapsible className="space-y-3">
              {parentFAQ.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="vm-card rounded-2xl border border-border bg-card overflow-hidden px-5"
                >
                  <AccordionTrigger className="text-left no-underline hover:no-underline py-5">
                    <span className="font-semibold text-foreground leading-snug pr-4">{item.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-base text-ink-2 leading-[1.6] pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA Form */}
      <section id="register" className="bg-bg-warm py-20 md:py-28 border-t border-border scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="vm-sticker mb-4 inline-block" style={{ transform: 'rotate(-3deg)' }}>
                  ● Book your free trial
                </span>
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                  Ready when you are
                </h2>
                <p className="font-sans text-base text-ink-2">
                  Tell us about your teen — we'll reply within 24 hours (usually faster) with the next available trial slot. Or just{" "}
                  <a
                    href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27d%20like%20to%20book%20a%20free%20trial%20class"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    WhatsApp us
                  </a>{" "}
                  if forms aren't your thing.
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
