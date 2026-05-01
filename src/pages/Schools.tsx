import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ArrowDown, Check, Eye, Lightbulb, Hammer, RotateCcw, Brain, MessageSquare, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartnershipForm } from "@/components/programmes/PartnershipForm";
import { HeroGlowBackground } from "@/components/ui/hero-glow-background";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";

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
        <title>School Workshops | Vibemakers Academy</title>
        <meta name="description" content="21CC-aligned AI enrichment programmes for Singapore schools. From 1-day workshops to 2-week intensives, aligned with MOE EdTech Masterplan 2030." />
        <meta name="keywords" content="school AI workshop Singapore, MOE EdTech Masterplan, 21CC, holiday coding workshop, student enrichment, AI curriculum, digital literacy" />
        <link rel="canonical" href="https://vibemakers.dev/schools" />
        <meta property="og:title" content="For Schools | Vibemakers Academy" />
        <meta property="og:description" content="21CC-aligned AI workshops tailored for schools. Develops self-directed learners and digital literacy." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section - Light Background */}
      <HeroGlowBackground>
        <section className="section-padding pt-32 md:pt-40">
          <div className="container mx-auto px-4">
            <Reveal variant="up">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium uppercase border border-primary text-primary rounded">
                    For Schools
                  </span>
                  <a 
                    href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary border border-border text-xs font-medium hover:border-primary/50 transition-colors"
                  >
                    🇸🇬 Aligned with MOE EdTech Masterplan 2030
                  </a>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                  Enrichment programmes that develop{" "}
                  <span className="relative inline-block">
                    <span className="text-foreground">21CC</span>
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
                  through hands-on AI problem-solving
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
                  <p className="text-lg text-muted-foreground max-w-xl">
                    Designed for post-exam enrichment, non-curricular slots, and holiday programmes. We handle facilitation — you choose the format, track, and cohort size.
                  </p>
                  <a href="#formats" className="text-primary text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    <span className="w-8 h-px bg-primary"></span>
                    Scroll to explore
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </HeroGlowBackground>

      {/* School Partners Trust Bar */}
      <section className="bg-secondary/40 py-10 md:py-14 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <Reveal variant="up">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-2">
              Trusted by Singapore Schools
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              Delivering enrichment programmes from primary schools to JCs since 2018
            </p>
          </Reveal>

          <Reveal variant="up" delayMs={100}>
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-secondary/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-secondary/40 to-transparent z-10 pointer-events-none" />
              <div
                className={`flex gap-4 md:gap-6 ${isPaused ? "" : "animate-scroll"}`}
                style={{ width: "fit-content" }}
              >
                {duplicatedSchools.map((school, index) => (
                  <div
                    key={`${school.abbr}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-4 py-3 rounded-2xl transition-all duration-300 group min-w-[100px] md:min-w-[120px] h-16 md:h-20"
                    title={school.name}
                  >
                    {school.logo ? (
                      <img
                        src={school.logo}
                        alt={school.name}
                        className="h-10 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
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
                <p className="text-primary font-display font-bold text-2xl md:text-3xl">5,000+</p>
                <p className="text-muted-foreground text-xs mt-1">Students taught</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-primary font-display font-bold text-2xl md:text-3xl">40+</p>
                <p className="text-muted-foreground text-xs mt-1">School partners</p>
              </div>
              <div className="text-center">
                <p className="text-primary font-display font-bold text-2xl md:text-3xl">2018</p>
                <p className="text-muted-foreground text-xs mt-1">Founded</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Dialogic Academy */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Reveal variant="up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🎓</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  A Programme by Dialogic Academy
                </h2>
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={100}>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <a href="https://dialogic.academy" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Dialogic Academy</a> has
                  been Singapore's trusted partner for school enrichment since 2018 — delivering debate coaching,
                  public speaking, and communication programmes across leading institutions including Raffles Girls' School,
                  Tanglin Trust School, National Junior College, Victoria Junior College, and Anglo-Chinese School.
                </p>
                <p>
                  Vibe Makers extends Dialogic's pedagogical approach into AI and creative technology.
                  Where Dialogic develops thinkers and speakers, Vibe Makers develops builders and problem-solvers —
                  students who can translate ideas into working digital products using AI. Every lesson is designed
                  for engagement, scaffolded learning, and real outcomes.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://dialogic.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  Visit Dialogic Academy <span className="text-muted-foreground">→</span>
                </a>
                <a
                  href="https://www.moe.gov.sg/education-in-sg/21st-century-competencies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  MOE 21CC Framework <span className="text-muted-foreground">→</span>
                </a>
                <a
                  href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  EdTech Masterplan 2030 <span className="text-muted-foreground">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Programme Formats */}
      <section id="formats" className="section-padding scroll-mt-24">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                Programme Formats
              </h2>
              <p className="text-muted-foreground max-w-2xl">
All formats run the same V.I.B.E. methodology — Vision, Ideate, Build, Evolve. Students develop CAIT competencies through authentic problem-solving with AI tools. Choose based on depth and time available.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
            {formats.map((format) => {
              return <div key={format.title} className="rounded-2xl p-6 transition-all bg-secondary/30 border border-border hover:border-primary/30">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full uppercase bg-foreground text-white">
                        {format.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>👥</span>
                        {format.groupSize}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold mb-6">
                      {format.title}
                    </h3>

                    {/* Purpose */}
                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-wide mb-1 text-muted-foreground">Purpose</p>
                      <p>{format.purpose}</p>
                    </div>

                    {/* Best for */}
                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-wide mb-1 text-muted-foreground">Best for</p>
                      <p>{format.bestFor}</p>
                    </div>

                    {/* Outcomes */}
                    <div className="mb-6">
                      <p className="text-xs font-medium uppercase tracking-wide mb-2 text-muted-foreground">Outcomes</p>
                      <ul className="space-y-2">
                        {format.outcomes.map(outcome => <li key={outcome} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            {outcome}
                          </li>)}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button asChild className="w-full rounded-full">
                      <a href="#proposal">Request This Format</a>
                    </Button>
                  </div>;
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Build Tracks */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                Build Tracks
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Choose a project focus that resonates with your students. Each track applies the same core methodology to different creative outcomes.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
            {buildTracks.map(track => <div key={track.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
                  <span className="text-3xl">{track.emoji}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{track.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{track.description}</p>
                <p className="text-xs">
                  <span className="text-muted-foreground">Best for:</span>{" "}
                  <span className="text-foreground">{track.bestFor}</span>
                </p>
              </div>)}
          </RevealGroup>
        </div>
      </section>

      {/* V.I.B.E. Methodology */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase border border-primary text-primary rounded mb-4">
                Our Methodology
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                The V.I.B.E. Cycle
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A student-friendly design thinking loop that brings product thinking to life with AI. Each phase develops specific competencies while keeping students engaged in building something real.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {vibePhases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.key}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-1">{phase.label}</h3>
                  <p className="text-xs text-primary font-medium mb-3">{phase.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4">{phase.what}</p>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Evidence:</span> {phase.evidence}
                    </p>
                  </div>
                </div>
              );
            })}
          </RevealGroup>

          <Reveal variant="up" delayMs={300}>
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
              Process over product — but students still ship. By the end, every student has a working prototype AND can explain their problem, design, build, and improvement process.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sample Lesson Plan */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase border border-primary text-primary rounded mb-4">
                Sample Programme
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                What a Programme Looks Like
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                An illustrative 4-session plan showing programme flow. All programmes are customised to your school's objectives, schedule, and student profile.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delayMs={100}>
            <div className="max-w-4xl mx-auto space-y-4">
              {lessonPlan.map((session, index) => (
                <div
                  key={session.day}
                  className="bg-card border border-border rounded-2xl p-5 md:p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Day badge */}
                    <div className="flex items-center gap-3 md:w-32 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm">{session.day}</p>
                        <p className="text-xs text-muted-foreground">{session.hours}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-base mb-2">{session.focus}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{session.activities}</p>
                      <div className="flex items-start gap-2 bg-secondary/50 rounded-lg px-3 py-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground">
                          <span className="font-medium">Deliverable:</span> {session.deliverable}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="up" delayMs={200}>
            <div className="max-w-4xl mx-auto mt-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-1 min-h-[40px] bg-primary rounded-full flex-shrink-0" />
                <p className="text-sm text-foreground">
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
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal variant="up">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  Learning Outcomes
                </h2>
                <p className="text-background/70 max-w-2xl mx-auto">
                  By the end of the programme, students will be able to:
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={100}>
              <div className="grid md:grid-cols-2 gap-3 mb-12">
                {learningOutcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="flex items-start gap-3 p-3 rounded-xl bg-background/5"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-sm text-background/90">{outcome}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={200}>
              <div className="text-center mb-8">
                <h3 className="text-xl font-display font-bold">Skills Developed</h3>
                <p className="text-background/60 text-sm mt-1">Mapped to MOE's 21st Century Competencies framework</p>
              </div>
            </Reveal>

            <RevealGroup staggerMs={100} variant="up" className="grid md:grid-cols-3 gap-6">
              {skillsDeveloped.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.category}
                    className="rounded-2xl p-5 bg-background/5 border border-background/10"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-sm mb-2">{skill.category}</h4>
                    <p className="text-xs text-background/70 leading-relaxed">{skill.skills}</p>
                  </div>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* How Schools Customise */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left column */}
            <Reveal variant="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  How Schools Customise a Programme
                </h2>
                <p className="text-muted-foreground mb-8">
                  Every engagement is defined along three dimensions. We guide schools through this process to ensure pedagogical coherence and operational feasibility.
                </p>
                
                {/* Orange bar callout */}
                <div className="flex items-start gap-4">
                  <div className="w-1 min-h-[40px] bg-primary rounded-full flex-shrink-0" />
                  <p className="text-foreground">
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
                      <div className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.num}
                      </div>
                      {index < arr.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                    </div>
                    
                    {/* Content */}
                    <div className="pt-2 pb-6">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>)}
              </div>
            </Reveal>
            
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section id="proposal" className="section-padding bg-foreground text-background scroll-mt-24">
        <div className="container mx-auto px-4">
          <Reveal variant="up">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  Request a Proposal
                </h2>
                <p className="text-background/70">
                  Tell us about your school's needs and we'll prepare a tailored proposal within 2 working days.
                </p>
              </div>
              <PartnershipForm />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>;
}
