import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Heart, Target, Lightbulb, Layers, FlaskConical,
  Calendar, Clock, Users, GraduationCap, Sparkles,
  ArrowRight, CheckCircle, Eye, Cpu, PenTool, MessageSquare
} from "lucide-react";

const modules = [
  {
    number: 1,
    date: "25 May 2026",
    duration: "2 Hours (1530–1730)",
    title: "Foundations: Design Thinking, V.I.B.E. Cycle & AI as a Creative Partner",
    highlights: [
      "Introduction to Design Thinking & V.I.B.E. Cycle",
      "Guest sharing: Quanda Ong, founder of Gnome & Bow",
      "Hands-on intro to Lovable as a creative AI tool",
      "Mini hackathon design challenge reveal & team formation",
    ],
    vibePhase: "Vision",
    color: "from-primary/20 to-primary/5",
  },
  {
    number: 2,
    date: "3 June 2026",
    duration: "4 Hours (0800–1200)",
    title: "Vision & Ideate — Empathise, Define and Generate Ideas",
    highlights: [
      "Structured user research with empathy maps",
      "Problem statements & 'How Might We…?' framing",
      "AI-assisted ideation & visual concept generation",
      "Concept selection, hand sketching & peer gallery walk",
    ],
    vibePhase: "Vision → Ideate",
    color: "from-accent/20 to-accent/5",
  },
  {
    number: 3,
    date: "5 June 2026",
    duration: "4 Hours (0800–1200)",
    title: "Build & Evolve — Prototype, Test, Pitch",
    highlights: [
      "Build working prototypes with Lovable + AI visuals",
      "Structured peer user testing & iteration",
      "AI-assisted pitch deck development",
      "Final mini hackathon presentations & awards",
    ],
    vibePhase: "Build → Evolve",
    color: "from-primary/20 to-accent/5",
  },
];

const designChallenges = [
  {
    icon: Eye,
    title: "Redesign a School Space",
    description: "Transform an underused school space into somewhere students actively choose to spend time.",
  },
  {
    icon: PenTool,
    title: "Reimagine a Daily Product",
    description: "Redesign a familiar everyday object to better serve the needs and lifestyles of teen users.",
  },
  {
    icon: Heart,
    title: "Improve a Senior's Daily Life",
    description: "Design a solution to improve the daily experience of a senior citizen in the community.",
  },
];

const vibeCycle = [
  { letter: "V", label: "Vision", subtitle: "Empathise & Define", icon: Heart, desc: "Choose a real user and a real problem" },
  { letter: "I", label: "Ideate", subtitle: "Explore & Decide", icon: Lightbulb, desc: "Generate solutions, pick a minimal set" },
  { letter: "B", label: "Build", subtitle: "Prototype", icon: Layers, desc: "Use AI to implement, test, and debug" },
  { letter: "E", label: "Evolve", subtitle: "Test & Improve", icon: FlaskConical, desc: "Collect feedback, iterate, reflect" },
];

const outcomes = [
  "Demonstrate understanding of entrepreneurial and design thinking concepts",
  "Generate and communicate design ideas using brainstorming and digital tools",
  "Use AI tools (Lovable) to support ideation, visualisation, and prototyping",
  "Create effective prompts that communicate design intent clearly",
  "Understand AI capabilities and limitations in the design process",
  "Present design ideas with creativity, confidence, and user consideration",
];

export default function DemoLoyangView() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase bg-primary/20 text-primary rounded-full">
                Programme Demo
              </span>
              <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase bg-background/10 text-background/70 rounded-full">
                Loyang View Secondary School
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Entrepreneurial Mindsets &{" "}
              <span className="text-primary">AI-Enhanced Design Skills</span>
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl mb-8">
              A 3-module enrichment programme integrating Design Thinking with AI-powered prototyping tools. Students don't just learn — they <strong className="text-background">build, test, and ship</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-xl text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span>May – June 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-xl text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>10 Hours Total</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-xl text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>3 Modules</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Students Will Experience */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="The Experience"
            title="What does this look like in practice?"
            description="During Module 1, your facilitator will demonstrate how Lovable transforms a rough design brief into a working prototype — live, in minutes. Here's what that process looks like."
          />
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">1. Describe the Problem</h3>
              <p className="text-sm text-muted-foreground">
                Students articulate what they want to build in plain English — grounded in their user research and empathy interviews.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">2. AI Generates a Prototype</h3>
              <p className="text-sm text-muted-foreground">
                Lovable translates the prompt into a working app — layout, interactivity, and visuals — in seconds, not weeks.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">3. Critique & Iterate</h3>
              <p className="text-sm text-muted-foreground">
                Students evaluate the output as designers: What serves the user? What doesn't? Then they refine — the AI assists, humans decide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* V.I.B.E. Cycle */}
      <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Framework"
            title="The V.I.B.E. Cycle"
            description="Our proprietary design thinking loop purpose-built for AI-assisted problem solving. Built on Stanford's Design Thinking process, made actionable for secondary school students."
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {vibeCycle.map((phase) => (
              <div key={phase.letter} className="relative group">
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 hover:shadow-lg transition-all text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground text-2xl font-display font-bold flex items-center justify-center mx-auto mb-4">
                    {phase.letter}
                  </div>
                  <h3 className="text-lg font-display font-bold mb-1">{phase.label}</h3>
                  <p className="text-xs text-primary font-medium mb-3">{phase.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8 italic">
            Process over product — but students still ship.
          </p>
        </div>
      </section>

      {/* Design Challenges */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Mini Hackathon"
            title="Design Challenge Briefs"
            description="One brief is selected in consultation with the school. All are intentionally open-ended to encourage creative risk-taking while remaining grounded in real user empathy."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {designChallenges.map((challenge) => (
              <div key={challenge.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <challenge.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Timeline */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Programme Structure"
            title="3-Module Journey"
            description="Each module builds on the previous, following the V.I.B.E. Cycle from empathy to shipped prototype."
            className="text-background [&_p]:text-background/70 [&_span]:bg-primary/20 [&_span]:text-primary"
          />
          <div className="mt-12 space-y-8">
            {modules.map((mod) => (
              <div key={mod.number} className="bg-background/5 border border-background/10 rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground text-2xl font-display font-bold flex items-center justify-center">
                      {mod.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-medium px-3 py-1 bg-primary/20 text-primary rounded-full">
                        {mod.vibePhase}
                      </span>
                      <span className="text-xs text-background/50">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {mod.date}
                      </span>
                      <span className="text-xs text-background/50">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {mod.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-4">{mod.title}</h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {mod.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-background/80">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Outcomes */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Outcomes"
            title="What Students Will Achieve"
            description="By the end of the programme, every student will have built, tested, and pitched a working prototype — grounded in real user research."
          />
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="grid gap-4">
              {outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Philosophy */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold mb-2">AI as a Creative Partner, Not a Replacement</h2>
                  <p className="text-muted-foreground">
                    Our core pedagogical position on AI in the classroom.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  We position artificial intelligence as a powerful creative collaborator — not a replacement for human judgement. Students learn to <strong className="text-foreground">direct, evaluate, and iterate</strong> on AI-generated outputs.
                </p>
                <p>
                  When students use Lovable to generate a prototype, facilitators intervene with questions like: <em>"Does this serve your user? Would the person you interviewed recognise their need in this?"</em>
                </p>
                <p className="font-medium text-foreground">
                  AI draws on patterns, not empathy — your role as a designer is to make it useful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to bring this to Loyang View?
          </h2>
          <p className="text-background/70 max-w-xl mx-auto mb-8">
            Let's discuss how we can tailor this programme to your school's specific needs, student levels, and timetable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/contact">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10" asChild>
              <a href="/programme">
                View Full Programme
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
