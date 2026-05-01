import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import aboutHero from "@/assets/about-hero.png";
import peiSongPhoto from "@/assets/faculty/pei-song.jpg";
import yashGadodiaPhoto from "@/assets/faculty/yash-gadodia.jpg";

const values = [
  { emoji: "🧠", title: "Thinking Over Syntax", description: "We teach problem-solving and product thinking — AI handles the code generation so students focus on what matters." },
  { emoji: "🔍", title: "Verify, Don't Trust", description: "Students learn to check AI outputs, debug when things break, and understand why their solution works — not just that it works." },
  { emoji: "🔄", title: "Build → Test → Improve", description: "Real learning happens through iteration. Every session follows the V.I.B.E. cycle: Vision, Ideate, Build, Evolve." },
  { emoji: "🤝", title: "Dialogic DNA", description: "Built on Dialogic Academy's 6+ years of enrichment delivery across 40+ Singapore schools. Same pedagogy, new medium." },
];

const faculty = [
  {
    name: "Seah Pei Song",
    role: "CEO & Founder, Dialogic Academy",
    credentials:
      "Founded Dialogic Academy in 2018 and grew it to 40+ school partnerships across Singapore — from Anglo-Chinese School and Pei Chun Public School at the primary level to Raffles Girls' School, Victoria Junior College, and National Junior College. Former national debating coach who led VJC to 7 Grand Finals and RGS to a Division 1 championship. Pei Song designs every Vibe Makers programme to develop 21st Century Competencies through hands-on, student-led problem solving.",
    image: peiSongPhoto,
  },
  {
    name: "Yash Gadodia",
    role: "Head of Curriculum & Product",
    credentials: "Product builder and founding PM at Voltade, where he shipped AI-powered tools to 10,000+ users from zero. Yash designs the Vibe Makers curriculum — structuring each session around MOE's EdTech Masterplan 2030 principles (Find, Think, Apply, Create) and the V.I.B.E. methodology. He ensures students don't just use AI tools, but learn to prompt with intent, verify outputs critically, and iterate based on real user feedback.",
    image: yashGadodiaPhoto,
  },
];


export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us | Vibemakers Academy - Singapore's Vibe Coding Pioneers</title>
        <meta name="description" content="Meet the team behind Vibemakers Academy. Powered by Dialogic Academy with 6+ years of excellence, 5000+ students impacted, and 40+ school partnerships." />
        <link rel="canonical" href="https://vibemakers.dev/about" />
        <meta property="og:title" content="About Vibemakers Academy" />
        <meta property="og:description" content="Singapore's trusted educators bringing AI-powered learning to students." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-background">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
          role="img"
          aria-label="Students collaborating on projects"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />

        <div className="mx-auto max-w-[1200px] px-6 md:px-14 relative z-10">
          <Reveal variant="up">
            <div>
              <h1 className="font-display font-bold tracking-display leading-[1.02] text-5xl md:text-6xl lg:text-7xl mb-6">
                Problem-Solving With AI — Not Just Coding
              </h1>
              <p className="max-w-2xl text-lg text-ink-2">
                Vibe Makers Academy teaches students to identify real problems, design solutions, and build working apps using AI tools. Aligned with MOE's 21st Century Competencies framework and EdTech Masterplan 2030.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-background border-t border-border" aria-labelledby="our-story">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl mx-auto">
              <span className="vm-sticker" style={{ transform: 'rotate(-2deg)' }}>● Our Story</span>
              <h2 id="our-story" className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-6 mt-4">Our Story</h2>
              <div className="space-y-4 text-ink-2">
                <p>
                  Vibe Makers Academy is a programme by{" "}
                  <a href="https://dialogic.academy" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Dialogic Academy</a>{" "}
                  (est. 2018) — Singapore's trusted provider of debate, public speaking, and enrichment programmes for schools. Dialogic works with 40+ schools from primary to JC level, including Raffles Girls' School, Victoria Junior College, Anglo-Chinese School, and National Junior College.
                </p>
                <p>
                  MOE's{" "}
                  <a href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">EdTech Masterplan 2030</a>{" "}
                  calls for students who can "Find, Think, Apply, and Create" with digital tools. The{" "}
                  <a href="https://www.moe.gov.sg/education-in-sg/21st-century-competencies" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">21st Century Competencies framework</a>{" "}
                  emphasises Critical, Adaptive and Inventive Thinking (CAIT), Communication, Collaboration and Information Skills (CCI), and self-directed learning. Traditional coding classes teach syntax. We teach the thinking.
                </p>
                <p>
                  Vibe Makers was created to bridge this gap. Students use AI tools to build real, working apps — but the learning isn't about the tools. It's about defining problems worth solving, making scope trade-offs, verifying AI outputs, testing with real users, and presenting their reasoning. The same skills Dialogic has been developing through debate and public speaking, now applied through product building.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-bg-warm border-t border-border" aria-labelledby="our-values">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="mb-12">
              <span className="vm-sticker" style={{ transform: 'rotate(1deg)' }}>● How We Teach</span>
              <h2 id="our-values" className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mt-4">How We Teach</h2>
            </div>
          </Reveal>
          <RevealGroup staggerMs={100} variant="up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <article key={v.title} className="vm-card rounded-2xl border border-border bg-card p-6">
                <div className="w-16 h-16 rounded-2xl bg-bg-warm-2 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{v.emoji}</span>
                </div>
                <h3 className="font-display font-bold text-center mb-2">{v.title}</h3>
                <p className="text-sm text-ink-2 text-center">{v.description}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-20 md:py-28 bg-background border-t border-border" aria-labelledby="our-faculty">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="mb-12">
              <span className="vm-sticker" style={{ transform: 'rotate(-1deg)' }}>● Meet the Team</span>
              <h2 id="our-faculty" className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mt-4 mb-4">Meet the Team</h2>
              <p className="text-ink-2 max-w-2xl">Enrichment educators and product builders — combining Dialogic Academy's 6-year track record with hands-on AI product experience.</p>
            </div>
          </Reveal>
          <RevealGroup staggerMs={120} variant="up" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {faculty.map((member) => (
              <article key={member.name} className="vm-card rounded-2xl border border-border bg-card p-6">
                <img
                  src={member.image}
                  alt={`${member.name} headshot`}
                  className="w-24 h-24 rounded-2xl mx-auto mb-6 object-cover object-top"
                  loading="lazy"
                />
                <h4 className="font-display font-bold text-center">{member.name}</h4>
                <p className="text-xs font-mono uppercase tracking-eyebrow text-ink-2 text-center mb-4 mt-2">{member.role}</p>
                <p className="text-sm text-ink-2 text-center leading-relaxed">{member.credentials}</p>
              </article>
            ))}
          </RevealGroup>
          <Reveal variant="up" delayMs={300}>
            <p className="text-center text-sm text-muted-foreground mt-8">
              More coaches joining soon—stay tuned!
            </p>
          </Reveal>
        </div>
      </section>

      {/* MOE Alignment */}
      <section className="py-20 md:py-28 bg-bg-warm border-t border-border" aria-labelledby="moe-alignment">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-4xl mx-auto mb-12">
              <span className="vm-sticker" style={{ transform: 'rotate(2deg)' }}>● MOE Alignment</span>
              <h2 id="moe-alignment" className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-center mt-4 mb-6">
                Aligned With Singapore's Education Direction
              </h2>
              <p className="text-ink-2 text-center max-w-2xl mx-auto">
                Every programme is designed around MOE's frameworks — not as a marketing claim, but as the foundation for how we structure learning outcomes.
              </p>
            </div>
          </Reveal>

          <RevealGroup staggerMs={100} variant="up" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="vm-card rounded-2xl border border-border bg-card p-6">
              <div className="w-12 h-12 rounded-xl bg-bg-warm-2 flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-display font-bold mb-2">
                <a href="https://www.moe.gov.sg/education-in-sg/21st-century-competencies" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  21st Century Competencies
                </a>
              </h3>
              <p className="text-sm text-ink-2 mb-3">
                Our V.I.B.E. cycle directly develops the three 21CC domains:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong className="text-foreground">CAIT</strong> — Students evaluate trade-offs, debug AI outputs, and make design decisions under constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong className="text-foreground">CCI</strong> — Students present builds, give peer feedback, and collaborate on shared projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Self-Directed Learning</strong> — Students set project goals, manage scope, and iterate independently</span>
                </li>
              </ul>
            </div>

            <div className="vm-card rounded-2xl border border-border bg-card p-6">
              <div className="w-12 h-12 rounded-xl bg-bg-warm-2 flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-display font-bold mb-2">
                <a href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  EdTech Masterplan 2030
                </a>
              </h3>
              <p className="text-sm text-ink-2 mb-3">
                MOE's digital literacy framework — Find, Think, Apply, Create — maps directly to how our sessions work:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Find</strong> — Research user needs, interview stakeholders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Think</strong> — Evaluate options, choose an approach, scope realistically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Apply</strong> — Prompt AI tools with intent, verify outputs, debug</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong className="text-foreground">Create</strong> — Ship a working prototype, present reasoning</span>
                </li>
              </ul>
            </div>

            <div className="vm-card rounded-2xl border border-border bg-card p-6">
              <div className="w-12 h-12 rounded-xl bg-bg-warm-2 flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-display font-bold mb-2">
                Responsible AI for Students
              </h3>
              <p className="text-sm text-ink-2 mb-3">
                Following MOE's guidance on AI in education, we build responsible habits from day one:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>Students use AI under instructor supervision with educational accounts — no personal data collected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>Output verification is a core skill — students learn to check, not blindly accept AI suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>Critical evaluation of AI limitations, bias, and appropriate use cases</span>
                </li>
              </ul>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground border-t border-border" aria-labelledby="track-record">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <Reveal variant="up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 id="track-record" className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-12">Our Track Record</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold mb-2">5,000+</div>
                  <p className="text-sm opacity-80">Students taught since 2018</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold mb-2">40+</div>
                  <p className="text-sm opacity-80">School partners (primary to JC)</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold mb-2">2018</div>
                  <p className="text-sm opacity-80">Dialogic Academy founded</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold mb-2">7×</div>
                  <p className="text-sm opacity-80">National debating Grand Finals</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
