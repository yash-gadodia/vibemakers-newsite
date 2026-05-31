import { Rocket, Brain, Briefcase, MessageSquare, Users, User, Shield, Lock, Award, CheckCircle } from "lucide-react";
import { RegistrationForm } from "./RegistrationForm";

const outcomes = [
  { icon: Rocket, title: "Real Projects (Not Worksheets)", description: "Apps, websites, and tools your child can demo and share" },
  { icon: Brain, title: "AI Fluency With Good Habits", description: "Prompting, verification, and responsible use of AI tools" },
  { icon: Briefcase, title: "Portfolio-Ready Outcomes", description: "Polished work that supports school goals and confidence" },
  { icon: MessageSquare, title: "Clear Communication", description: "Explain ideas, present builds, and collaborate effectively" },
];

const programmeFormats = [
  {
    icon: Users,
    title: "Group Classes (Outside School)",
    description: "Best for social learning + momentum",
    features: ["Small cohort of 4–8 students", "Weekly or holiday schedules", "Peer collaboration + demo days", "Structured curriculum with flexibility"],
    whoFor: "Great for students who stay motivated in a group",
  },
  {
    icon: User,
    title: "1-to-1 Coaching",
    description: "Personalised, parent-friendly progress",
    features: ["Custom learning plan based on goals", "Flexible scheduling", "Direct mentorship + feedback", "Parent updates on progress and next steps"],
    whoFor: "Ideal when you want the fastest, most tailored outcomes",
  },
];

const projectExamples = [
  { emoji: "📚", title: "AI Study Helper", description: "Smart study assistant" },
  { emoji: "🌐", title: "Personal Website", description: "Portfolio showcase" },
  { emoji: "🎮", title: "Game + AI Twist", description: "Interactive experience" },
  { emoji: "⚡", title: "Automation Workflow", description: "Productivity tools" },
];

export function ParentsSection() {
  return (
    <section id="coaching" className="scroll-mt-24">
      {/* Headline */}
      <div className="section-padding bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase bg-primary/10 text-primary rounded-full">
              Individual Coaching
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              Coaching that turns curiosity into real outcomes
            </h2>
            <p className="text-lg text-muted-foreground">
              For parents who want clear progress. Choose 1-to-1 coaching tailored to your child, or join small group classes outside school. Students build real projects and learn practical AI-powered creation skills.
            </p>
          </div>
        </div>
      </div>

      {/* Parent clarity */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="p-8 bg-card border border-border rounded-2xl">
              <h3 className="text-xl font-display font-bold mb-3">What You’ll Get as a Parent</h3>
              <p className="text-muted-foreground mb-6">
                No guesswork: just a clear plan and visible work products.
              </p>
              <ul className="space-y-3">
                {[
                  "A simple learning plan based on your child’s goals",
                  "Regular progress updates and what to practise next",
                  "Portfolio-style deliverables you can review together",
                  "Support on safe and responsible AI usage",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-secondary/30 border border-border rounded-2xl">
              <h3 className="text-xl font-display font-bold mb-3">A Typical Coaching Focus</h3>
              <p className="text-muted-foreground mb-6">
                We keep it hands-on and practical: students learn by building.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Idea → Build", desc: "Turn an idea into a working app" },
                  { title: "AI as a Tool", desc: "Prompting + verification habits" },
                  { title: "Shipping Skills", desc: "Iterate, debug, and improve" },
                  { title: "Showcase", desc: "Present and explain their work" },
                ].map((card) => (
                  <div key={card.title} className="bg-card border border-border rounded-xl p-4">
                    <div className="font-semibold">{card.title}</div>
                    <div className="text-sm text-muted-foreground">{card.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outcomes */}
      <div className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-display font-bold mb-8">What Your Child Will Gain</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome) => (
              <div key={outcome.title} className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <outcome.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{outcome.title}</h4>
                <p className="text-sm text-muted-foreground">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programme Formats */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-display font-bold mb-8">Choose Your Format</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {programmeFormats.map((format) => (
              <div key={format.title} className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <format.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold">{format.title}</h4>
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
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Beginner-friendly • No coding experience required • We place students based on age and readiness
          </p>
        </div>
      </div>

      {/* What They Build */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-display font-bold mb-3">What They'll Build</h3>
          <p className="text-muted-foreground mb-8">Real projects, not just exercises</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {projectExamples.map((project) => (
              <div key={project.title} className="p-6 bg-card border border-border rounded-2xl text-center hover:border-primary/30 transition-colors">
                <div className="text-4xl mb-3">{project.emoji}</div>
                <h4 className="font-semibold mb-1">{project.title}</h4>
                <p className="text-xs text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety + Credibility */}
      <div className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-display font-bold mb-8">Safe, Structured Learning</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Age-Appropriate Structure</h4>
                <p className="text-sm text-muted-foreground">Content and tools curated for young learners</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Privacy Protected</h4>
                <p className="text-sm text-muted-foreground">No sensitive data sharing, supervised sessions</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Experienced Instructors</h4>
                <p className="text-sm text-muted-foreground">Powered by Dialogic Academy's 6+ years of expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Form */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold mb-3">Register Your Interest</h3>
              <p className="text-muted-foreground">
                Tell us what you’re looking for (1-to-1 or group). We’ll reach out within 2 working days with next steps.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
