import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ArrowDown, Check, Eye, Lightbulb, Hammer, RotateCcw, Brain, MessageSquare, Monitor, Compass, BookOpen, Users, ShieldCheck } from "lucide-react";
import { PartnershipForm } from "@/components/programmes/PartnershipForm";
import { RGSCaseStudy } from "@/components/home/RGSCaseStudy";
import { LoyangViewCaseStudy } from "@/components/home/LoyangViewCaseStudy";
import { RGSStudentProjects } from "@/components/home/RGSStudentProjects";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import { BrutalCard } from "@/components/ui/brutal-card";
import { BrutalButton } from "@/components/ui/brutal-button";
import { cn } from "@/lib/utils";

const fourLearns = [
  {
    icon: Compass,
    pillar: "Learn About AI",
    moe: "Pillar 1",
    blurb: "Students understand AI fundamentals, capabilities, limitations, bias, and ethical use.",
    weDo: "We open every programme with a hands-on look at where AI is wrong. Students audit Lovable / Claude outputs and catalogue failure modes before building anything.",
  },
  {
    icon: BookOpen,
    pillar: "Learn to Use AI",
    moe: "Pillar 2",
    blurb: "Students wield AI tools effectively and responsibly, prompt engineering, output verification.",
    weDo: "We teach the craft: structured prompts, iteration cycles, output evaluation. Every student ships a working app using Claude + Lovable + Cursor as exoskeletons, not crutches.",
  },
  {
    icon: Users,
    pillar: "Learn With AI",
    moe: "Pillar 3",
    blurb: "AI as pedagogical partner, students collaborate with AI to deepen understanding.",
    weDo: "Students use Claude to explore unfamiliar problems, debug their own code, and stress-test their assumptions. AI becomes the always-available teaching assistant.",
  },
  {
    icon: ShieldCheck,
    pillar: "Learn Beyond AI",
    moe: "Pillar 4, the unique one",
    blurb: "Critical evaluation, human judgment, knowing when to reject AI suggestions.",
    weDo: "This is the gap most enrichment misses. Our V.I.B.E. cycle's Evolve phase explicitly trains students to user-test, critique AI outputs, defend non-AI decisions, and document when they pushed back.",
    highlight: true,
  },
];

const schoolPricing = [
  {
    name: "Introductory Lab",
    price: "From SGD $2,800",
    sub: "1-day session · up to 40 students · ~$70/student",
    description: "Post-exam slot, assembly programme, or single-day enrichment.",
    features: ["Up to 40 students in one session", "Live build demo + hands-on guided activity", "All software accounts provided", "Post-session reflection guide for teachers"],
  },
  {
    name: "Build Sprint",
    price: "From SGD $80",
    sub: "per student · 3-day intensive · 20–30 students",
    description: "Holiday programme or dedicated enrichment week. Each student ships a working web app.",
    features: ["3 × 2.5-hour sessions", "1 working web app per student", "Peer-testing + iteration cycles", "Demo Day with parents (optional)"],
    highlight: true,
  },
  {
    name: "Studio Programme",
    price: "From SGD $80",
    sub: "per student · 1–2 weeks · 15–25 students",
    description: "Semester break or extended enrichment. Deep project work with full V.I.B.E. cycle iteration.",
    features: ["8–12 sessions over 1–2 weeks", "Portfolio-ready project per student", "Reflection portfolio + certificate", "Co-designed curriculum with your HoD"],
  },
];

const schoolFAQ = [
  {
    q: "How is this different from a generic 'AI literacy' workshop?",
    a: "We don't lecture about AI. Students build with it. Every programme produces tangible artefacts (deployed apps, reflection portfolios, demo decks) that map directly to MOE's 4 AI Learns and 21CC competencies, auditable evidence schools can show to inspectorates and parents, not just a slide deck.",
  },
  {
    q: "Are you on any MOE-approved vendor list?",
    a: "Vibe Makers is delivered by Dialogic Academy Pte Ltd (UEN 202040782G), an MOE-experienced enrichment provider serving 50+ schools since 2018 (RGS, Tanglin Trust, NJC, VJC, ACS, Maris Stella, CHIJ Katong Convent and others). Dialogic is registered on GeBIZ and recognised across our existing partner schools' procurement systems.",
  },
  {
    q: "What's the typical timeline from enquiry to delivery?",
    a: "For warm referrals (existing partner schools or via teacher introduction): 2–3 weeks from first call to signed engagement letter. For new schools: 4–6 weeks including a free pilot session if helpful. We can usually accommodate your existing term planning rather than push you to ours.",
  },
  {
    q: "Do you handle MOE / SchoolsCare / GeBIZ procurement?",
    a: "Yes. We've completed both direct school engagements and GeBIZ-routed contracts. For ALP-funded slots, we provide standard MOE 21CC alignment documentation, lesson plans, and CAIT outcome mapping ready for your Vice Principal or curriculum committee to attach to the proposal.",
  },
  {
    q: "What devices and AI tools do students use?",
    a: "We're platform-agnostic. On MOE-issued devices, we work within the whitelisted toolset (NotebookLM is currently the primary). On BYOD / international school devices, we use Claude + Lovable + Cursor as the production-grade stack. We adapt the curriculum to whatever your IT policy permits.",
  },
  {
    q: "Can you handle a teacher who's not yet AI-confident?",
    a: "Yes, and we recommend it. Every Build Sprint and Studio Programme includes a 90-minute teacher prep session before student day 1, plus a teacher-version of the lesson plan with debug notes. Several of our partner schools' computing teachers have joined as co-facilitators after one cohort.",
  },
  {
    q: "What outcomes can I show my Principal / VP?",
    a: "Each cohort produces: (1) every student's deployed app + portfolio link, (2) a reflection log mapped to the 21CC framework's CAIT levels, (3) anonymised feedback metrics, and (4) a 1-page after-action report ready for your annual ALP / MOE submission. We've built this format with our partner Vice Principals, it's already what schools need to file.",
  },
  {
    q: "How big is too big? How small is too small?",
    a: "Sweet spot is 20–30 students per cohort. We've successfully run Introductory Lab sessions for 40 in a hall, and intensive 1:1 mentoring for groups of 8. Anything outside that range, talk to us, we'll be honest about whether the format works.",
  },
  {
    q: "Can we tailor the build track to a specific subject (Geography, Bio, Lit)?",
    a: "Often, yes. We've worked with computing/IT teachers, English teachers (debate-driven app projects), and Geography teachers (data-viz dashboards on real Singapore data). The V.I.B.E. cycle adapts; the subject lens shifts the user research and problem definition phases.",
  },
  {
    q: "What happens after the programme?",
    a: "Two threads: (a) students receive a printed/digital portfolio kit + a parent letter with their deployed-app link, often leading to private-class enrolments outside school; (b) schools that ran Build Sprint or Studio often book us back for the same cohort the next semester, going deeper. We measure everything and share the data back.",
  },
];

// Import school logos
import vjcLogo from "@/assets/logos/vjc.png";
import rgsLogo from "@/assets/logos/rgs.png";
import acsLogo from "@/assets/logos/acs.png";
import njcLogo from "@/assets/logos/njc.png";
import cchLogo from "@/assets/logos/cch.png";
import chijLogo from "@/assets/logos/chij.png";
import plmgsLogo from "@/assets/logos/plmgs.png";
import marisStellaLogo from "@/assets/logos/maris-stella.svg";
import nanChiauLogo from "@/assets/logos/nan-chiau.svg";
import bedokSouthLogo from "@/assets/logos/bedok-south.png";
import peiChunLogo from "@/assets/logos/pei-chun.png";

const formats = [{
  title: "Introductory Lab",
  duration: "1 day",
  purpose: "AI awareness + hands-on exploration",
  bestFor: "Post-exam enrichment, assembly programmes",
  outcomes: ["Apply Find-Think-Apply-Create digital literacy skills", "Build a mini-project", "Experience AI as a tool for inventive thinking"],
  groupSize: "Up to 40"
}, {
  title: "Build Sprint",
  duration: "3 days",
  purpose: "Build a functional app from scratch",
  bestFor: "Holiday programmes, enrichment week",
  outcomes: ["Complete working web app", "Develop responsible AI prompting and verification habits", "Practise peer feedback and collaborative problem-solving"],
  groupSize: "20–30"
}, {
  title: "Studio Programme",
  duration: "1–2 weeks",
  purpose: "Deep project work with iteration cycles",
  bestFor: "Semester breaks, extended enrichment",
  outcomes: ["Portfolio-ready project", "Demonstrate self-directed learning through iterative improvement", "Reflection portfolio and certificate of completion"],
  groupSize: "15–25"
}];

const buildTracks = [{
  title: "Portfolio Builder",
  emoji: "💼",
  description: "Students create personal portfolio websites showcasing their interests, achievements, and future goals.",
  bestFor: "Self-expression and digital presence"
}, {
  title: "Game Builder",
  emoji: "🎮",
  description: "Design and build interactive browser-based games with engaging mechanics and visual polish.",
  bestFor: "Creative students interested in game design"
}, {
  title: "Problem Solver",
  emoji: "💡",
  description: "Identify a real-world problem and build a web app solution through design thinking methodology.",
  bestFor: "Students who want to create meaningful impact"
}];

const customiseSteps = [{
  num: 1,
  title: "Format",
  desc: "1 day / 3 days / 2 weeks"
}, {
  num: 2,
  title: "Build Track",
  desc: "Portfolio, Game, Problem Solver"
}, {
  num: 3,
  title: "Cohort Profile",
  desc: "Level, class size, prior experience"
}];

const schools = [
  { name: "Victoria Junior College", abbr: "VJC", logo: vjcLogo },
  { name: "Raffles Girls' School", abbr: "RGS", logo: rgsLogo },
  { name: "Anglo-Chinese School (Primary)", abbr: "ACS", logo: acsLogo },
  { name: "National Junior College", abbr: "NJC", logo: njcLogo },
  { name: "Chung Cheng High School (Yishun)", abbr: "CCH", logo: cchLogo },
  { name: "CHIJ Katong Convent", abbr: "CHIJ", logo: chijLogo },
  { name: "Paya Lebar Methodist Girls' School", abbr: "PLMGS", logo: plmgsLogo },
  { name: "Maris Stella High School", abbr: "MSHS", logo: marisStellaLogo },
  { name: "Nan Chiau High School", abbr: "NCHS", logo: nanChiauLogo },
  { name: "Bedok South Secondary School", abbr: "BSSS", logo: bedokSouthLogo },
  { name: "Pei Chun Public School", abbr: "PCPS", logo: peiChunLogo },
];

const vibePhases = [
  {
    key: "vision",
    label: "Vision",
    subtitle: "Empathise & Define",
    icon: Eye,
    what: "Choose a real user and situation. Describe the problem in plain language. Define constraints and success criteria.",
    evidence: "Problem statement, user story, and constraint shortlist.",
  },
  {
    key: "ideate",
    label: "Ideate",
    subtitle: "Explore & Decide",
    icon: Lightbulb,
    what: "Generate solution options and compare trade-offs. Pick a minimal feature set. Sketch the flow.",
    evidence: "Feature shortlist (must-have vs. later), wireframe, and stated trade-offs.",
  },
  {
    key: "build",
    label: "Build",
    subtitle: "Prototype",
    icon: Hammer,
    what: "Use AI prompts to implement the planned flow. Test core actions and fix issues. Refactor intentionally.",
    evidence: "Functioning prototype, build log, and demo script.",
  },
  {
    key: "evolve",
    label: "Evolve",
    subtitle: "Test & Improve",
    icon: RotateCcw,
    what: "Run simple user tests. Prioritise fixes. Iterate, then re-test.",
    evidence: "Before/after comparison, test summary, and improvement list.",
  },
];

const lessonPlan = [
  {
    day: "Day 1",
    hours: "2.5 hrs",
    focus: "Vision & Ideate",
    activities: "Intro to vibe coding (live demo). Problem discovery: identify a real user and need. Define problem statement and constraints. Generate solution options, pick MVP scope. Sketch wireframes.",
    deliverable: "Problem statement + user story + wireframe",
  },
  {
    day: "Day 2",
    hours: "2.5 hrs",
    focus: "Build (Part 1)",
    activities: "Intro to Lovable + Claude as building tools. Translate wireframe into AI prompts. Build core screens and flow. Guided debugging and prompt refinement.",
    deliverable: "Working v1 prototype (1\u20132 core screens)",
  },
  {
    day: "Day 3",
    hours: "2.5 hrs",
    focus: "Build & Evolve",
    activities: "Peer testing: swap prototypes and collect structured feedback. Prioritise changes based on feedback. Iterate and improve. Prepare demo narrative.",
    deliverable: "Improved prototype + test feedback log",
  },
  {
    day: "Day 4",
    hours: "2.5 hrs",
    focus: "Evolve & Present",
    activities: "Final refinements. Team presentations: problem \u2192 solution \u2192 demo \u2192 learnings. Peer Q&A and feedback. Reflection: what worked, what they\u2019d do differently.",
    deliverable: "Final prototype + presentation + written reflection",
  },
];

const learningOutcomes = [
  "Define a real-world problem with a clear user, context, and success criteria",
  "Generate multiple solution approaches and make intentional design trade-offs",
  "Use AI tools to build a working digital prototype from a problem statement",
  "Test their solution with real users, collect structured feedback, and iterate",
  "Present and defend their design decisions to an audience",
  "Reflect on their process and identify areas for improvement",
];

const skillsDeveloped = [
  {
    category: "Critical & Inventive Thinking",
    icon: Brain,
    skills: "Problem decomposition, solution design, trade-off analysis, iterative improvement",
  },
  {
    category: "Communication & Collaboration",
    icon: MessageSquare,
    skills: "User research, peer testing, team presentations, feedback synthesis, collaborative building",
  },
  {
    category: "Digital Literacy",
    icon: Monitor,
    skills: "AI tool proficiency, prompt engineering, debugging strategies, responsible AI use",
  },
];

export default function Schools() {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedSchools = [...schools, ...schools];

  return <Layout>
      <Helmet>
        <title>School AI Workshops Singapore. MOE 4 AI Learns Aligned | Vibe Makers</title>
        <meta name="description" content="MOE 4 AI Learns and 21CC-aligned AI workshops for Singapore schools. From $80/student. 1-day Lab to 2-week Studio. Delivered by Dialogic Academy (50+ school partners since 2018)." />
        <meta name="keywords" content="school AI workshop Singapore, MOE 4 AI Learns, MOE EdTech Masterplan 2030, 21CC enrichment Singapore, ALP AI partner, applied learning programme AI, holiday coding workshop schools, CAIT enrichment, secondary school AI curriculum" />
        <link rel="canonical" href="https://vibemakers.dev/schools" />
        <meta property="og:title" content="School AI Workshops. MOE 4 AI Learns Aligned | Vibe Makers" />
        <meta property="og:description" content="From $80/student. 1-day to 2-week formats. We hit all four MOE AI Learns, including the one most providers miss." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{`{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Coding Workshops for Singapore Schools",
  "serviceType": "Educational enrichment programme",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Vibe Makers Academy",
    "url": "https://vibemakers.dev",
    "parentOrganization": { "@type": "EducationalOrganization", "name": "Dialogic Academy", "foundingDate": "2018" }
  },
  "areaServed": { "@type": "Country", "name": "Singapore" },
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "school",
    "audienceType": "Singapore secondary schools, JCs, and international schools"
  },
  "description": "MOE 4 AI Learns aligned AI coding workshops for Singapore schools. From SGD $80/student. 1-day Introductory Lab, 3-day Build Sprint, or 1-2 week Studio Programme. Delivers auditable 21CC outcomes mapped to CAIT, CCI, and Self-Directed Learning competencies.",
  "offers": [
    { "@type": "Offer", "name": "Introductory Lab", "price": "2800", "priceCurrency": "SGD", "url": "https://vibemakers.dev/schools" },
    { "@type": "Offer", "name": "Build Sprint", "price": "80", "priceCurrency": "SGD", "url": "https://vibemakers.dev/schools" },
    { "@type": "Offer", "name": "Studio Programme", "price": "80", "priceCurrency": "SGD", "url": "https://vibemakers.dev/schools" }
  ]
}`}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-background pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <BrutalSticker>● For Schools</BrutalSticker>
                <span className="font-mono text-xs uppercase tracking-eyebrow text-muted-foreground">
                  MOE 4 AI Learns aligned · 21CC mapped
                </span>
              </div>

              <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                Where students{" "}
                <span className="vm-sheen-text">build with AI</span>
                {" "}and learn when to push back.
              </h1>

              <p className="font-sans text-lg text-foreground max-w-2xl leading-[1.55] mb-3">
                Enrichment workshops that hit all four MOE AI Learns, including the one most providers miss: <em>Learn Beyond AI</em> (critical evaluation, human judgment). From 1-day labs to 2-week Studio programmes, $80/student.
              </p>
              <p className="font-sans text-sm text-muted-foreground max-w-2xl leading-[1.55] mb-8">
                Delivered by Dialogic Academy · 50+ Singapore school partners since 2018 · Auditable 21CC outcomes
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl">
                <BrutalButton variant="primary" size="lg" asChild>
                  <a href="#proposal">Get a proposal →</a>
                </BrutalButton>
                <BrutalButton variant="outline" size="lg" asChild>
                  <a
                    href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27m%20enquiring%20about%20a%20school%20workshop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-2" aria-hidden>💬</span>
                    WhatsApp +65 8890 0368
                  </a>
                </BrutalButton>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4 uppercase tracking-eyebrow">
                Tailored proposal within 1 working day · Free pilot session available
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* School Partners Trust Bar */}
      <section className="bg-bg-warm py-12 md:py-16 overflow-hidden border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14 text-center">
          <Reveal variant="up">
            <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-2">
              Trusted by Singapore Schools
            </p>
            <p className="text-foreground text-base mb-8">
              Delivering enrichment programmes from primary schools to JCs since 2018
            </p>
          </Reveal>

          <Reveal variant="up" delayMs={100}>
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-bg-warm to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-bg-warm to-transparent z-10 pointer-events-none" />
              <div
                className={`flex gap-4 md:gap-6 ${isPaused ? "" : "animate-vm-marquee"}`}
                style={{ width: "fit-content" }}
              >
                {duplicatedSchools.map((school, index) => (
                  <div
                    key={`${school.abbr}-${index}`}
                    className="vm-logo-cell flex-shrink-0 flex items-center justify-center px-4 py-3 rounded-2xl transition-all duration-300 min-w-[100px] md:min-w-[120px] h-16 md:h-20"
                    title={school.name}
                  >
                    {school.logo ? (
                      <img
                        src={school.logo}
                        alt={school.name}
                        className="h-10 md:h-14 w-auto object-contain transition-all duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-display font-bold text-sm md:text-base text-foreground/70 tracking-wide">
                        {school.abbr}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal variant="up" delayMs={200}>
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mt-10">
              <div className="text-center">
                <p className="text-primary font-display font-bold text-2xl md:text-3xl">15,000+</p>
                <p className="text-foreground text-xs mt-1">Students taught</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-primary font-display font-bold text-2xl md:text-3xl">50+</p>
                <p className="text-foreground text-xs mt-1">School partners</p>
              </div>
              <div className="text-center">
                <p className="text-primary font-display font-bold text-2xl md:text-3xl">2018</p>
                <p className="text-foreground text-xs mt-1">Founded</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recent school deliveries section */}
      <section className="border-t border-border bg-background">
        <RGSCaseStudy />
        <LoyangViewCaseStudy />
        <RGSStudentProjects />
      </section>

      {/* MOE 4 AI Learns alignment, the unique positioning per May 2026 research.
          Most enrichment providers cover Pillars 1-3; nobody covers Pillar 4.
          Schools are actively looking for partners who can demonstrate this gap. */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl mb-12">
              <BrutalSticker tone="orange" rotate={-2} className="mb-4">
                ● MOE 4 AI Learns alignment
              </BrutalSticker>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                We hit all four 'Learns' · including the one most providers skip
              </h2>
              <p className="font-sans text-base text-foreground max-w-2xl">
                MOE's AI in Education framework defines four pillars schools must demonstrate. Most enrichment vendors cover the first three. The fourth · <em>Learn Beyond AI</em> · has no standard curriculum, and it's exactly what we built our V.I.B.E. cycle's Evolve phase around.
              </p>
            </div>
          </Reveal>
          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fourLearns.map((p) => {
              const Icon = p.icon;
              return (
                <BrutalCard
                  key={p.pillar}
                  shadow={p.highlight ? "sm" : "none"}
                  className={cn(
                    "p-6 flex flex-col h-full",
                    p.highlight ? "border-primary" : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-bg-warm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-2">
                      {p.moe}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 leading-snug">{p.pillar}</h3>
                  <p className="font-sans text-sm text-ink-2 mb-4 leading-[1.5]">{p.blurb}</p>
                  <div className="pt-3 mt-auto border-t border-border">
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-primary mb-1">How we deliver</p>
                    <p className="font-sans text-xs text-foreground leading-[1.5]">{p.weDo}</p>
                  </div>
                </BrutalCard>
              );
            })}
          </RevealGroup>
          <Reveal variant="up" delayMs={400}>
            <p className="font-sans text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
              All outcomes mapped to MOE's <a href="https://www.moe.gov.sg/education-in-sg/21st-century-competencies" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">21CC Navigator</a> · auditable evidence of CAIT, CCI, and Self-Directed Learning progression at Levels 3–4.
            </p>
          </Reveal>
        </div>
      </section>

      {/* About Dialogic Academy */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <div className="max-w-3xl mx-auto">
            <Reveal variant="up">
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-6">
                A Programme by Dialogic Academy
              </h2>
            </Reveal>

            <Reveal variant="up" delayMs={100}>
              <div className="space-y-4 font-sans text-foreground">
                <p>
                  <a href="https://dialogic.academy" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Dialogic Academy</a> has
                  been Singapore's trusted partner for school enrichment since 2018, delivering debate coaching,
                  public speaking, and communication programmes across leading institutions including Raffles Girls' School,
                  Tanglin Trust School, National Junior College, Victoria Junior College, and Anglo-Chinese School.
                </p>
                <p>
                  Vibe Makers extends Dialogic's pedagogical approach into AI and creative technology.
                  Where Dialogic develops thinkers and speakers, Vibe Makers develops builders and problem-solvers: students who can translate ideas into working digital products using AI. Every lesson is designed
                  for engagement, scaffolded learning, and real outcomes.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                <BrutalButton variant="primary" size="md" asChild>
                  <a
                    href="https://dialogic.academy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Dialogic Academy
                    <span className="vm-arrow">→</span>
                  </a>
                </BrutalButton>
                <BrutalButton variant="outline" size="md" asChild>
                  <a
                    href="https://www.moe.gov.sg/education-in-sg/21st-century-competencies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MOE 21CC Framework
                    <span className="vm-arrow">→</span>
                  </a>
                </BrutalButton>
                <BrutalButton variant="outline" size="md" asChild>
                  <a
                    href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EdTech Masterplan 2030
                    <span className="vm-arrow">→</span>
                  </a>
                </BrutalButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Programme Formats */}
      <section id="formats" className="bg-bg-warm py-20 md:py-28 border-t border-border scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="mb-10">
              <BrutalSticker rotate={3} className="mb-4">● Flexible Options</BrutalSticker>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">
                Programme Formats
              </h2>
              <p className="font-sans text-foreground max-w-2xl">
All formats run the same V.I.B.E. methodology. Vision, Ideate, Build, Evolve. Students develop CAIT competencies through authentic problem-solving with AI tools. Choose based on depth and time available.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
            {formats.map((format) => {
              return <BrutalCard key={format.title} className="p-6">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full uppercase bg-foreground text-white">
                        {format.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-foreground">
                        <span>👥</span>
                        {format.groupSize}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl mb-6">
                      {format.title}
                    </h3>

                    {/* Purpose */}
                    <div className="mb-4">
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-1">Purpose</p>
                      <p className="font-sans text-foreground">{format.purpose}</p>
                    </div>

                    {/* Best for */}
                    <div className="mb-4">
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-1">Best for</p>
                      <p className="font-sans text-foreground">{format.bestFor}</p>
                    </div>

                    {/* Outcomes */}
                    <div className="mb-6">
                      <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-2">Outcomes</p>
                      <ul className="space-y-2">
                        {format.outcomes.map(outcome => <li key={outcome} className="flex items-center gap-2 text-sm font-sans text-foreground">
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            {outcome}
                          </li>)}
                      </ul>
                    </div>

                    {/* CTA */}
                    <BrutalButton variant="primary" size="md" asChild className="w-full">
                      <a href="#proposal">
                        Request This Format
                        <span className="vm-arrow">→</span>
                      </a>
                    </BrutalButton>
                  </BrutalCard>;
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Build Tracks */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="mb-10">
              <BrutalSticker tone="orange" className="mb-4">● Project Options</BrutalSticker>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">
                Build Tracks
              </h2>
              <p className="font-sans text-foreground max-w-2xl">
                Choose a project focus that resonates with your students. Each track applies the same core methodology to different creative outcomes.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
            {buildTracks.map(track => <BrutalCard key={track.title} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-bg-warm flex items-center justify-center mb-4">
                  <span className="text-3xl">{track.emoji}</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{track.title}</h3>
                <p className="font-sans text-foreground text-sm mb-4">{track.description}</p>
                <p className="font-sans text-sm">
                  <span className="text-ink-2">Best for:</span>{" "}
                  <span className="text-foreground">{track.bestFor}</span>
                </p>
              </BrutalCard>)}
          </RevealGroup>
        </div>
      </section>

      {/* V.I.B.E. Methodology */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <BrutalSticker rotate={3} className="mb-4">● Our Methodology</BrutalSticker>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">
                The V.I.B.E. Cycle
              </h2>
              <p className="font-sans text-foreground max-w-2xl mx-auto">
                A student-friendly design thinking loop that brings product thinking to life with AI. Each phase develops specific competencies while keeping students engaged in building something real.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {vibePhases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <BrutalCard key={phase.key} className="p-6">
                  <BrutalSticker rotate={idx % 2 === 0 ? -3 : 3} className="mb-4">
                    ● {phase.label}
                  </BrutalSticker>
                  <div className="w-10 h-10 rounded-lg bg-bg-warm flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-3">{phase.subtitle}</p>
                  <p className="font-sans text-foreground text-sm mb-4">{phase.what}</p>
                  <div className="pt-3 border-t border-border">
                    <p className="font-sans text-xs text-foreground">
                      <span className="font-medium">Evidence:</span> {phase.evidence}
                    </p>
                  </div>
                </BrutalCard>
              );
            })}
          </RevealGroup>

          <Reveal variant="up" delayMs={300}>
            <p className="font-sans text-center text-base text-foreground mt-8 max-w-xl mx-auto">
              Process over product, but students still ship. By the end, every student has a working prototype AND can explain their problem, design, build, and improvement process.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sample Lesson Plan */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <BrutalSticker tone="orange" className="mb-4">● Sample Programme</BrutalSticker>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3">
                What a Programme Looks Like
              </h2>
              <p className="font-sans text-foreground max-w-2xl mx-auto">
                An illustrative 4-session plan showing programme flow. All programmes are customised to your school's objectives, schedule, and student profile.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delayMs={100}>
            <div className="max-w-4xl mx-auto space-y-4">
              {lessonPlan.map((session, index) => (
                <BrutalCard
                  key={session.day}
                  className="p-5 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Day badge */}
                    <div className="flex items-center gap-3 md:w-32 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm">{session.day}</p>
                        <p className="font-sans text-xs text-ink-2">{session.hours}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-base mb-2">{session.focus}</h4>
                      <p className="font-sans text-foreground text-sm mb-3">{session.activities}</p>
                      <div className="flex items-start gap-2 bg-bg-warm rounded-lg px-3 py-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="font-sans text-xs text-foreground">
                          <span className="font-medium">Deliverable:</span> {session.deliverable}
                        </p>
                      </div>
                    </div>
                  </div>
                </BrutalCard>
              ))}
            </div>
          </Reveal>

          <Reveal variant="up" delayMs={200}>
            <div className="max-w-4xl mx-auto mt-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-bg-warm-2 border border-border">
                <div className="w-1 min-h-[40px] bg-primary rounded-full flex-shrink-0" />
                <p className="font-sans text-foreground text-sm">
                  This is a sample plan. We customise every programme to your school's objectives, schedule, and student interests.{" "}
                  <a href="#proposal" className="text-primary font-medium hover:underline">
                    Let's co-design yours.
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Learning Outcomes & Skills */}
      <section className="bg-foreground py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <div className="max-w-4xl mx-auto">
            <Reveal variant="up">
              <div className="text-center mb-10">
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3 text-background">
                  Learning Outcomes
                </h2>
                <p className="font-sans text-background/80 max-w-2xl mx-auto">
                  By the end of the programme, students will be able to:
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={100}>
              <div className="grid md:grid-cols-2 gap-3 mb-12">
                {learningOutcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background/10 border border-background/20"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="font-sans text-sm text-background/90">{outcome}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={200}>
              <div className="text-center mb-8">
                <h3 className="font-display font-bold text-xl text-background">Skills Developed</h3>
                <p className="font-sans text-background/70 text-sm mt-1">Mapped to MOE's 21st Century Competencies framework</p>
              </div>
            </Reveal>

            <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
              {skillsDeveloped.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.category}
                    className="rounded-lg p-5 bg-background/10 border border-background/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-background" />
                    </div>
                    <h4 className="font-display font-bold text-sm mb-2 text-background">{skill.category}</h4>
                    <p className="font-sans text-xs text-background/80 leading-relaxed">{skill.skills}</p>
                  </div>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* How Schools Customise */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left column */}
            <Reveal variant="left">
              <div>
                <BrutalSticker rotate={3} className="mb-4">● Customisation</BrutalSticker>
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-4">
                  How Schools Customise a Programme
                </h2>
                <p className="font-sans text-foreground mb-8">
                  Every engagement is defined along three dimensions. We guide schools through this process to ensure pedagogical coherence and operational feasibility.
                </p>

                {/* Orange bar callout */}
                <div className="flex items-start gap-4">
                  <div className="w-1 min-h-[40px] bg-primary rounded-full flex-shrink-0" />
                  <p className="font-sans text-foreground">
                    Not sure which format fits your needs?{" "}
                    <a href="#proposal" className="text-primary font-medium hover:underline">
                      We'll recommend one.
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right column - Numbered steps */}
            <Reveal variant="right" delayMs={100}>
              <div className="space-y-0">
                {customiseSteps.map((step, index, arr) => <div key={step.num} className="flex items-start gap-4">
                    {/* Number + connector line */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.num}
                      </div>
                      {index < arr.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                    </div>

                    {/* Content */}
                    <div className="pt-2 pb-6">
                      <h4 className="font-display font-bold text-base mb-1">{step.title}</h4>
                      <p className="font-sans text-foreground text-sm">{step.desc}</p>
                    </div>
                  </div>)}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Transparent pricing, most SG enrichment vendors hide pricing.
          Publishing ours is a deliberate trust signal for HoDs running
          internal procurement. */}
      <section className="bg-bg-warm py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <BrutalSticker className="mb-4">● Transparent pricing</BrutalSticker>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                Pricing your VP can sign off in one read
              </h2>
              <p className="font-sans text-base text-foreground">
                $80/student is the locked rate across Build Sprint and Studio formats. Introductory Lab is priced per session because it scales with hall size. We don't surprise you on quote.
              </p>
            </div>
          </Reveal>
          <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-3 gap-6">
            {schoolPricing.map((tier) => (
              <BrutalCard
                key={tier.name}
                shadow={tier.highlight ? "sm" : "none"}
                className={cn(
                  "p-6 flex flex-col",
                  tier.highlight ? "border-primary" : "border-border",
                )}
              >
                {tier.highlight && (
                  <BrutalSticker className="mb-3 self-start">
                    Most booked
                  </BrutalSticker>
                )}
                <h3 className="font-display font-bold text-xl text-foreground mb-1">{tier.name}</h3>
                <p className="font-display font-bold text-2xl md:text-3xl text-primary mb-1">{tier.price}</p>
                <p className="font-sans text-sm text-muted-foreground mb-4">{tier.sub}</p>
                <p className="font-sans text-base text-ink-2 mb-5 leading-[1.55]">{tier.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-primary flex-shrink-0">✓</span>
                      <span className="font-sans text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <BrutalButton
                  variant={tier.highlight ? "primary" : "dark"}
                  size="md"
                  asChild
                  className="w-full mt-auto"
                >
                  <a href="#proposal">Request quote</a>
                </BrutalButton>
              </BrutalCard>
            ))}
          </RevealGroup>
          <Reveal variant="up" delayMs={400}>
            <p className="text-center font-sans text-sm text-muted-foreground mt-8">
              All prices in SGD. ALP-eligible. We work within MOE / SchoolsCare / GeBIZ procurement processes, invoice routing, vendor onboarding, and W-9 equivalents handled.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ for school admins (HoDs, VPs, MOE coordinators) */}
      <section className="bg-background py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-[900px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="text-center mb-10">
              <BrutalSticker tone="orange" rotate={-2} className="mb-4">
                ● Common questions from HoDs + VPs
              </BrutalSticker>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-5xl mb-3">
                Things schools ask before booking
              </h2>
              <p className="font-sans text-base text-ink-2">
                Need a vendor doc, lesson plan sample, or 21CC mapping for your VP?{" "}
                <a
                  href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27m%20a%20school%20admin%20with%20a%20question"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  WhatsApp us
                </a>{" "}
                · usually same-day reply.
              </p>
            </div>
          </Reveal>
          <Reveal variant="up" delayMs={120}>
            <Accordion type="single" collapsible className="space-y-3">
              {schoolFAQ.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`schoolfaq-${idx}`}
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
      <section id="proposal" className="bg-foreground py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-3 text-background">
                  Request a tailored proposal
                </h2>
                <p className="font-sans text-background/80 mb-3">
                  Tell us about your school, term schedule, and ALP / enrichment slot. We'll send a one-page tailored proposal, usually within 1 working day, often same-day.
                </p>
                <p className="font-sans text-background/60 text-sm">
                  Or just{" "}
                  <a
                    href="https://wa.me/6588900368?text=Hi%20Vibe%20Makers%20%E2%80%94%20I%27d%20like%20to%20discuss%20a%20school%20workshop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    WhatsApp +65 8890 0368
                  </a>{" "}
                  · Pei or Claire usually picks up the same day.
                </p>
              </div>
              <PartnershipForm />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>;
}
