import { Helmet } from "react-helmet-async";
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
    sub: "60 minutes · No obligation",
    description: "Ship a working app in your first session. Online over Zoom or in person.",
    features: [
      "A real deployed app, not a demo",
      "1-on-1 coach guidance",
      "Decide if vibe coding is for you, no pressure",
    ],
    cta: "Book my free trial",
    highlight: true,
  },
  {
    name: "Group Classes",
    price: "From SGD $250",
    sub: "per month · 4–8 adults",
    description: "Weekly 90-minute small-group sessions over Zoom. Best for momentum + peers to build alongside.",
    features: [
      "8 sessions per month",
      "Showcase + feedback every 4 weeks",
      "Pause anytime · no contract lock-in",
    ],
    cta: "Talk to us about groups",
    highlight: false,
  },
  {
    name: "1-to-1 Private Coaching",
    price: "SGD $80–150",
    sub: "per session · paced to you",
    description: "Mentor-guided weekly sessions, fully tailored to your goals, level, and schedule.",
    features: [
      "Flexible scheduling (evenings + weekends)",
      "Direct mentorship on whatever you're building",
      "Best for fastest, most-tailored outcomes",
    ],
    cta: "Enquire about 1-to-1",
    highlight: false,
  },
];

const adultFAQ = [
  {
    q: "Do I need any coding experience?",
    a: "No. Most of our adult students have never written a line of code. Vibe coding is about describing what you want in plain English and iterating with AI. The skill we teach is thinking, clear problem framing, prompt design, and verifying that the output actually works.",
  },
  {
    q: "What will I actually leave with?",
    a: "A real, deployed app you can show or share, built around something you genuinely care about. Past adult students have shipped: an inbox triage agent, a personal portfolio site, a small internal CRM for their business, a Telegram bot for their team, and a daily journaling app. You leave with the build and with the workflow you used to make it.",
  },
  {
    q: "What do I need to bring?",
    a: "A laptop (Mac or Windows, anything from 2019 onwards). A free Lovable account and a free Claude account, we'll help you set those up before session 1. No software to install.",
  },
  {
    q: "Is it online or in person?",
    a: "Online by default, most adults book over Zoom because it's the lowest-friction way to fit a session into a real workweek. We can also meet in person in Singapore for 1-to-1 if that's your preference.",
  },
  {
    q: "How long does it take to get good?",
    a: "First session: a deployed app you actually use. First month: a workflow you can repeat without us. Past month 3, most students stop needing structured coaching and start booking ad-hoc sessions when they hit a hard problem. There's no fixed curriculum length, you stop when the loop is internalised.",
  },
  {
    q: "I'm not in tech, will this be over my head?",
    a: "No. Half our adult students don't work in tech. Lawyers, teachers, founders, marketers, ops people. The build patterns are the same, just pointed at your problems. You don't need to understand frameworks; you need to understand what you want and how to verify you got it.",
  },
  {
    q: "Can my company sponsor this?",
    a: "Yes. We invoice through Dialogic Academy Pte Ltd (UEN 202040782G) and have run upskilling sessions for teams. WhatsApp +65 8890 0368 or email vibemakers@dialogic.academy and we'll send a corporate quote.",
  },
  {
    q: "How fast will I hear back?",
    a: "Within 24 hours on weekdays, sooner on most weekends. We reply via WhatsApp by default, you can also message +65 8890 0368 directly if you'd rather skip the form.",
  },
];

const outcomes = [
  {
    emoji: "🚀",
    title: "Real Builds, Not Tutorials",
    description: "Deployed apps you actually use, shareable via a link, not a screencap of someone else's project",
  },
  {
    emoji: "🧠",
    title: "AI Fluency With Good Habits",
    description: "Prompting with intent, verifying outputs, debugging when things break, the workflow, not just the tools",
  },
  {
    emoji: "🛠️",
    title: "A Workflow You Can Repeat",
    description: "Walk away with a build process you can apply solo, no permanent dependency on us or any single tool",
  },
  {
    emoji: "💼",
    title: "Career Leverage",
    description: "Use it at work to ship internal tools, automate manual work, and prototype ideas faster than anyone around you",
  },
];

const programmeFormats = [
  {
    emoji: "👤",
    title: "1-to-1 Coaching",
    description: "60-minute weekly sessions, fully tailored",
    features: [
      "Mentor-guided planning around your goals",
      "Online (Zoom) or in person",
      "Flexible scheduling, evenings and weekends",
      "Fastest path to a workflow you can repeat solo",
    ],
    whoFor: "Best for adults who want maximum leverage from each session",
  },
  {
    emoji: "👥",
    title: "Small Group (4–8 adults)",
    description: "90-minute weekly sessions over Zoom",
    features: [
      "Build alongside peers at similar levels",
      "Showcase + peer feedback every 4 weeks",
      "Lower price point per session",
      "Pause anytime · no contract lock-in",
    ],
    whoFor: "Best if you stay motivated by building in public with peers",
  },
];

const projectExamples = [
  { emoji: "🤖", title: "AI Agent", description: "Drafts work emails, tags by priority, runs while you sleep" },
  { emoji: "🌐", title: "Personal Site", description: "Your story, your link, no website builder, no template" },
  { emoji: "🛠️", title: "Internal Work Tool", description: "A small app your team actually uses, built in a weekend" },
  { emoji: "📊", title: "Custom Dashboard", description: "Pull data you care about into one view, finance, fitness, ops" },
];

const learnerProfiles = [
  {
    title: "\"I'm AI-curious but I keep watching, not doing\"",
    description:
      "You've read every newsletter. You've watched the demos. You've tried ChatGPT for emails. But you haven't actually shipped anything, and the gap between 'I see what's possible' and 'I built this thing' feels enormous. Our trial collapses that gap in 60 minutes.",
  },
  {
    title: "\"I'm in a non-tech role and want to stop being dependent on devs\"",
    description:
      "PMs, ops leads, marketers, founders, teachers, lawyers, you have ideas for tools that would help you do your job better, but every one of them dies in a backlog or a quote from an agency. Vibe coding lets you ship a working v1 yourself, then decide whether it's worth handing off.",
  },
  {
    title: "\"I want to build a side project but don't know where to start\"",
    description:
      "You've been kicking around the same idea for two years. The barrier isn't motivation, it's that 'learn to code first' is a 6-month detour. We'll help you skip that and start building the actual thing in week one.",
  },
  {
    title: "\"I'm a founder and need to prototype faster than my team can\"",
    description:
      "You don't need to become an engineer. You need to be able to put a clickable, deployed prototype in front of a customer or co-founder in a day instead of a sprint. That's the workflow we teach.",
  },
];

export default function Adults() {
  return (
    <Layout>
      <Helmet>
        <title>For Adults | Vibemakers Academy. AI Coding Classes for Singapore Adults</title>
        <meta
          name="description"
          content="From AI-curious to AI-confident. 1-to-1 and small-group AI coding classes for adults in Singapore. Build real apps in your first session. No experience needed."
        />
        <meta
          name="keywords"
          content="AI coding for adults Singapore, vibe coding adults, learn AI Singapore, AI classes adults, adult coding bootcamp"
        />
        <link rel="canonical" href="https://vibemakers.dev/adults" />

        <meta property="og:title" content="For Adults | Vibemakers Academy" />
        <meta
          property="og:description"
          content="From AI-curious to AI-confident. 1-to-1 and small-group AI coding classes for adults in Singapore."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-adults.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{`{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Coding Classes for Singapore Adults",
  "serviceType": "Adult Education",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Vibe Makers Academy",
    "url": "https://vibemakers.dev"
  },
  "areaServed": { "@type": "Country", "name": "Singapore" },
  "audience": {
    "@type": "Audience",
    "audienceType": "Adults 18+ in Singapore wanting to learn AI"
  },
  "description": "1-to-1 and small-group AI coding classes for adults in Singapore. Ship real apps in your first session. No experience needed. Free trial class.",
  "offers": [
    {
      "@type": "Offer",
      "name": "Free Trial Class",
      "price": "0",
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock",
      "url": "https://vibemakers.dev/adults"
    },
    {
      "@type": "Offer",
      "name": "Group Classes",
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock",
      "url": "https://vibemakers.dev/adults"
    },
    {
      "@type": "Offer",
      "name": "1-to-1 Private Coaching",
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock",
      "url": "https://vibemakers.dev/adults"
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
                ● Vibe Coding for Adults
              </span>
              <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                From AI-curious to{" "}
                <span className="vm-sheen-text">AI-confident.</span>
              </h1>
              <p className="font-sans text-lg text-foreground max-w-2xl leading-[1.55] mb-3">
                Build with AI. Don't just talk about it. 1-to-1 (60 min) or small-group
                (90 min) sessions, weekly, over Zoom. Ship a real app in your first session.
              </p>
              <p className="font-sans text-sm text-muted-foreground max-w-2xl leading-[1.55] mb-8">
                Trusted by 50+ Singapore schools since 2018 · Part of Dialogic Academy
              </p>

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
                    href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27m%20enquiring%20about%20adult%20classes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2" aria-hidden>💬</span>
                    WhatsApp us +65 8890 0368
                  </a>
                </Button>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4 uppercase tracking-eyebrow">
                Most adults hear back within 24 hours · No commitment
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <TrustSection />

      {/* Learner Profiles */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-4xl mx-auto">
              <span className="vm-sticker vm-sticker--orange mb-4" style={{ transform: 'rotate(3deg)' }}>
                ● Who this is for
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-2">You might recognise yourself here</h2>
              <p className="font-sans text-base text-ink-2 mb-8">
                Anyone who wants to learn AI, non-tech professionals, founders, side-project
                builders, career switchers. No prior coding experience required.
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

      {/* Outcomes */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <span className="vm-sticker mb-4" style={{ transform: 'rotate(-3deg)' }}>
              ● Outcomes
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-8">What You'll Walk Away With</h2>
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
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <span className="vm-sticker vm-sticker--orange mb-4" style={{ transform: 'rotate(3deg)' }}>
              ● Formats
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
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-background py-20 md:py-28 border-t border-border scroll-mt-24">
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
              All prices in SGD. No GST surprises. We bill at the start of each month, pause or cancel anytime.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What you'll build */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <span className="vm-sticker mb-4" style={{ transform: 'rotate(-3deg)' }}>
              ● What You'll Build
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">Real builds, not tutorials</h2>
            <p className="font-sans text-base text-ink-2 mb-8">Pick something you actually care about, we'll help you scope and ship it</p>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[900px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="text-center mb-10">
              <span className="vm-sticker vm-sticker--orange mb-4 inline-block" style={{ transform: 'rotate(-2deg)' }}>
                ● Common questions
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                Things adults ask before booking
              </h2>
              <p className="font-sans text-base text-ink-2">
                Still unsure? <a href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">WhatsApp us</a> · we usually reply same day.
              </p>
            </div>
          </Reveal>
          <Reveal variant="up" delayMs={120}>
            <Accordion type="single" collapsible className="space-y-3">
              {adultFAQ.map((item, idx) => (
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
                  Tell us a bit about yourself, we'll reply within 24 hours (usually faster) with the next available trial slot. Or just{" "}
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
              <RegistrationForm defaultEnquiryType="for_self" />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
