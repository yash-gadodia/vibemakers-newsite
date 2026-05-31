import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { TrustSection } from "@/components/home/TrustSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { RegistrationForm } from "@/components/programmes/RegistrationForm";
import { cn } from "@/lib/utils";

const cohorts = [
  {
    label: "Cohort A · Jun 30 to Jul 18",
    sub: "3 weeks · Mon to Fri · 9:30am – 12:30pm",
    spots: "12 of 16 spots",
    spotState: "open" as const,
    badge: "Most popular",
  },
  {
    label: "Cohort B · Jul 21 to Aug 8",
    sub: "3 weeks · Mon to Fri · 9:30am – 12:30pm",
    spots: "16 of 16 spots open",
    spotState: "open" as const,
    badge: "",
  },
  {
    label: "Custom 1-week intensive",
    sub: "Any week in June, July, or August · 5 days × 6 hrs",
    spots: "By arrangement",
    spotState: "custom" as const,
    badge: "",
  },
];

const week1 = [
  { day: "Day 1", title: "Find a real problem", body: "Each student picks a problem they actually have, homework workflow, family chore tracker, study group tool. We coach them on scoping it down so it ships." },
  { day: "Day 2", title: "Design the user flow", body: "Sketch every screen on paper. Decide what a user can and can't do. Define what 'done' means for v1." },
  { day: "Day 3", title: "First Lovable build", body: "From plain-English brief to deployed app in 90 minutes. Students see their idea on a real URL." },
  { day: "Day 4", title: "First user test", body: "Each student tests another student's app. Real friction surfaces. Students give specific, actionable feedback." },
  { day: "Day 5", title: "Iterate + polish", body: "Fix the v1 bugs. Add the one feature their user asked for. Practise deciding what to cut." },
];
const week2 = [
  { day: "Day 6", title: "Going deeper with Cursor", body: "Move from Lovable's web UI into Cursor (an AI code editor). Read the actual code your AI generated. Spot when it's wrong." },
  { day: "Day 7", title: "Add a second feature", body: "AI integration, payment, auth, file upload, pick one stretch goal. Coach pairs with each student." },
  { day: "Day 8", title: "Second round of users", body: "Test with friends or family. Capture quotes + screenshots for the portfolio." },
  { day: "Day 9", title: "Edge cases + safety", body: "What happens when the AI is wrong? When a user enters bad data? When the API fails? Build defences." },
  { day: "Day 10", title: "Polish for portfolio", body: "Logo, copy, deployed URL, GitHub readme. Students walk away with a real artifact." },
];
const week3 = [
  { day: "Day 11", title: "Pitch prep", body: "5-minute pitch deck. Story arc: who's your user, what's their problem, what did you build, what did you learn?" },
  { day: "Day 12", title: "Pitch dress rehearsal", body: "Each student presents to coaches + peers. Iterate on the pitch based on real feedback." },
  { day: "Day 13", title: "Final shipping day", body: "Last bug fixes. Final user test. Lock the URL. Take screenshots. Record a 60-second walkthrough." },
  { day: "Day 14", title: "Demo Day rehearsal", body: "Run-through of the public Demo Day. Last polish on slides + live demo flow." },
  { day: "Day 15 · Demo Day", title: "Public Demo Day", body: "Parents + family + invited guests. Each student presents their app live and demos it. Certificates + portfolio links handed out." },
];

const outcomesIntl = [
  { emoji: "🚀", title: "1 deployed real app", description: "Live URL + portfolio screenshot. Not a tutorial project." },
  { emoji: "🎬", title: "Demo Day + 60-sec walkthrough video", description: "Public demo with parents + recorded walkthrough they can send to a school admissions officer." },
  { emoji: "📂", title: "Portfolio kit", description: "GitHub repo, README, deployment URL, problem brief, user feedback log, everything universities + DSA panels actually look at." },
  { emoji: "🧠", title: "AI fluency they keep", description: "Real Claude + Lovable + Cursor habits. Students leave knowing how to start their next build solo." },
  { emoji: "🤝", title: "Peer cohort", description: "Friends in the cohort become collaborators for school year projects. Students stay in touch via a private Discord." },
];

const faqIntl = [
  {
    q: "Who's it for?",
    a: "Students aged 13–18 from any Singapore international or local school. Most cohort families come from UWCSEA, SAS, Tanglin Trust, Stamford American, CIS, GIIS, or top SG secondary schools. No prior coding experience required.",
  },
  {
    q: "What's the format, online or in-person?",
    a: "Hybrid. Mornings (3 hours) are in-person at our studio in Singapore. Optional afternoon studio time (12:30–4pm) is unstructured build/help-yourself time with a coach on standby. Out-of-Singapore families can do the full programme online with a dedicated coach.",
  },
  {
    q: "How big is the cohort?",
    a: "Maximum 16 students per cohort, split into two pods of 8 with one coach each. The 1:8 ratio means every student gets meaningful coach time on their own project every day.",
  },
  {
    q: "What does my child need to bring?",
    a: "A laptop (any 2019+ Mac or Windows). We set up free Claude + Lovable accounts on Day 1. No software to install, no hardware to buy. Lunch, snacks, and notebooks provided.",
  },
  {
    q: "What's the price and what's included?",
    a: "SGD $1,800 for the 3-week cohort (15 days × 3 hrs = 45 hrs of structured programme + Demo Day). Includes lunch, snacks, all software accounts, Demo Day video recording, and printed portfolio kit. Sibling discount: $200 off the second child.",
  },
  {
    q: "What's the refund policy?",
    a: "Full refund up to 14 days before the cohort starts. Within 14 days: 50% refund. After Day 1 of the cohort: no refund, but we'll credit the full amount toward our private classes or the next holiday cohort.",
  },
  {
    q: "What if my teen doesn't enjoy it?",
    a: "If after Day 2 it's clear they're not engaged, we'll happily transfer them to our private classes track or refund the unused portion. We'd rather not have a disengaged student dragging their cohort down.",
  },
  {
    q: "Can my child bring a friend?",
    a: "Encouraged. We've found cohorts work better when there's at least one familiar face. WhatsApp us if you want us to seat them on the same pod.",
  },
  {
    q: "Is it MOE-aligned for my local-stream child?",
    a: "Yes. The V.I.B.E. methodology maps directly to MOE's 4 AI Learns framework and develops all three core 21CC competencies (CAIT, CCI, Self-Directed Learning). The portfolio output is direct DSA / EAE evidence.",
  },
  {
    q: "How do I book?",
    a: "Fill the form below or WhatsApp us at +65 8890 0368. We'll confirm within 24 hours, then send a one-page agreement + payment link. You secure your spot with a SGD $300 deposit (deductible from the total).",
  },
];

export default function IntlSummerCamp() {
  return (
    <Layout>
      <Helmet>
        <title>Summer 2026 AI Coding Camp Singapore. Vibe Makers</title>
        <meta
          name="description"
          content="3-week intensive AI coding camp for teens 13–18 in Singapore. Build a real deployed app with Claude + Lovable. Demo Day for parents. Jun 30 or Jul 21. SGD $1,800."
        />
        <meta
          name="keywords"
          content="summer camp Singapore coding, AI summer camp Singapore, school holiday coding camp teens, UWCSEA AI camp, SAS Stamford coding camp, intensive teen coding Singapore"
        />
        <link rel="canonical" href="https://vibemakers.dev/intl-summer-camp" />
        <meta property="og:title" content="Summer 2026 AI Coding Camp. Vibe Makers Singapore" />
        <meta property="og:description" content="3 weeks. Real app shipped. Demo Day for parents. Jun 30 or Jul 21 cohorts. Limited to 16 students/cohort." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{`{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Summer 2026 AI Coding Camp. Vibe Makers Singapore",
  "description": "3-week intensive AI coding camp for teens 13-18 in Singapore. Students build a real deployed app using Claude + Lovable + Cursor and present at a public Demo Day.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Vibe Makers Academy",
    "url": "https://vibemakers.dev"
  },
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "Teens aged 13-18 in Singapore"
  },
  "courseMode": "Onsite",
  "inLanguage": "en",
  "offers": {
    "@type": "Offer",
    "price": "1800",
    "priceCurrency": "SGD",
    "availability": "https://schema.org/LimitedAvailability",
    "url": "https://vibemakers.dev/intl-summer-camp"
  },
  "hasCourseInstance": [
    { "@type": "CourseInstance", "name": "Cohort A", "startDate": "2026-06-30", "endDate": "2026-07-18", "courseMode": "Onsite", "courseWorkload": "P3W" },
    { "@type": "CourseInstance", "name": "Cohort B", "startDate": "2026-07-21", "endDate": "2026-08-08", "courseMode": "Onsite", "courseWorkload": "P3W" }
  ]
}`}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-background pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="vm-sticker" style={{ transform: 'rotate(-3deg)' }}>
                  ● Summer 2026 · Singapore
                </span>
                <span className="font-mono text-xs uppercase tracking-eyebrow text-muted-foreground">
                  Limited to 16 students/cohort
                </span>
              </div>
              <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                Build a real AI app{" "}
                <span className="vm-sheen-text">in 3 weeks.</span>
              </h1>
              <p className="font-sans text-lg text-foreground max-w-2xl leading-[1.55] mb-3">
                A 3-week intensive AI coding camp for teens 13–18. Each student ships a deployed app and presents at a public Demo Day. Built with Claude, Lovable, and Cursor, the same tools real product teams use.
              </p>
              <p className="font-sans text-sm text-muted-foreground max-w-2xl leading-[1.55] mb-8">
                Designed for international school summer breaks · MOE 4 AI Learns aligned · DSA / EAE portfolio-ready
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl">
                <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-accent shadow-sticker">
                  <a href="#book">Reserve a spot →</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full font-medium border-2 border-foreground">
                  <a
                    href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27m%20interested%20in%20the%20Summer%202026%20AI%20Coding%20Camp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2" aria-hidden>💬</span>
                    WhatsApp +65 8890 0368
                  </a>
                </Button>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4 uppercase tracking-eyebrow">
                $300 deposit reserves a spot · Full refund up to 14 days before
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cohorts + Pricing */}
      <section className="bg-bg-warm py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="text-center mb-10">
              <span className="vm-sticker mb-4 inline-block" style={{ transform: 'rotate(3deg)' }}>
                ● Cohorts + Pricing
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                SGD $1,800 · 3 weeks · 45 hours of programme
              </h2>
              <p className="font-sans text-base text-ink-2 max-w-2xl mx-auto">
                Includes lunch, all software accounts, Demo Day video, and printed portfolio kit. Sibling discount: $200 off the second child.
              </p>
            </div>
          </Reveal>
          <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-3 gap-6">
            {cohorts.map((c) => (
              <div
                key={c.label}
                className={cn(
                  "vm-card rounded-2xl border p-6 flex flex-col",
                  c.spotState === "open"
                    ? "border-primary bg-card shadow-sticker"
                    : "border-border bg-card"
                )}
              >
                {c.badge && (
                  <span className="vm-sticker mb-3 self-start" style={{ transform: 'rotate(-3deg)' }}>
                    {c.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-xl text-foreground mb-1">{c.label}</h3>
                <p className="font-sans text-sm text-muted-foreground mb-4">{c.sub}</p>
                <p className="font-mono text-xs uppercase tracking-eyebrow text-primary mb-4">
                  {c.spots}
                </p>
                <Button asChild className="w-full mt-auto rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium">
                  <a href="#book">{c.spotState === "custom" ? "Enquire" : "Reserve"}</a>
                </Button>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl mb-10">
              <span className="vm-sticker vm-sticker--orange mb-4 inline-block" style={{ transform: 'rotate(-2deg)' }}>
                ● What your teen walks away with
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                A shipped app. A demo. A portfolio kit.
              </h2>
              <p className="font-sans text-base text-ink-2">
                Not a tutorial certificate. Not a binder of slides. A real artefact that works on the open internet, that a parent can show, and that an admissions officer can click.
              </p>
            </div>
          </Reveal>
          <RevealGroup staggerMs={80} variant="up" className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {outcomesIntl.map((o) => (
              <div key={o.title} className="vm-card rounded-2xl border border-border bg-card p-5">
                <div className="text-3xl mb-3">{o.emoji}</div>
                <h3 className="font-semibold text-foreground mb-2 leading-snug">{o.title}</h3>
                <p className="font-sans text-sm text-ink-2 leading-[1.5]">{o.description}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Trust bar */}
      <TrustSection />

      {/* Day-by-day */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl mb-10">
              <span className="vm-sticker mb-4 inline-block" style={{ transform: 'rotate(3deg)' }}>
                ● Day-by-day
              </span>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                What 15 days of building actually looks like
              </h2>
              <p className="font-sans text-base text-ink-2">
                Mornings are structured (3 hours). Optional afternoon studio time is open build / help-yourself with a coach on standby.
              </p>
            </div>
          </Reveal>

          {[
            { label: "Week 1: Find, design, ship", days: week1 },
            { label: "Week 2: Go deeper, harden, polish", days: week2 },
            { label: "Week 3: Pitch + Demo Day", days: week3 },
          ].map((week, wi) => (
            <Reveal variant="up" delayMs={wi * 100} key={week.label}>
              <div className="mb-10">
                <h3 className="font-display font-bold text-xl text-foreground mb-4 mt-2">{week.label}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {week.days.map((d) => (
                    <div key={d.title} className="vm-card rounded-xl border border-border bg-card p-4">
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-primary mb-2">{d.day}</p>
                      <h4 className="font-semibold text-foreground mb-2 leading-snug">{d.title}</h4>
                      <p className="font-sans text-sm text-ink-2 leading-[1.5]">{d.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
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
                Things parents ask before booking
              </h2>
              <p className="font-sans text-base text-ink-2">
                Still unsure? <a href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20a%20question%20about%20the%20Summer%20Camp" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">WhatsApp us</a> · usually same-day reply.
              </p>
            </div>
          </Reveal>
          <Reveal variant="up" delayMs={120}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqIntl.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="vm-card rounded-2xl border border-border bg-card overflow-hidden px-5">
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

      {/* Booking form */}
      <section id="book" className="bg-bg-warm py-20 md:py-28 border-t border-border scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="vm-sticker mb-4 inline-block" style={{ transform: 'rotate(-3deg)' }}>
                  ● Reserve your spot
                </span>
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                  Lock in a cohort
                </h2>
                <p className="font-sans text-base text-ink-2">
                  Tell us about your teen, we'll confirm spot availability within 24 hours and send a one-page agreement + deposit link.
                  Or just{" "}
                  <a
                    href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27d%20like%20to%20reserve%20a%20spot%20in%20the%20Summer%20Camp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    WhatsApp us
                  </a>
                  .
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
