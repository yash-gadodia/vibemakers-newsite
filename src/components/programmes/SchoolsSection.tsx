import { BookOpen, Wrench, GraduationCap, AlertTriangle, Clock, Users, CheckCircle, Calendar, Target, ArrowRight, Heart, Lightbulb, PenTool, Layers, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartnershipForm } from "./PartnershipForm";

const problems = [
  { icon: Clock, text: "Short lead times for post-exam planning" },
  { icon: Users, text: "Wide range of student readiness in one cohort" },
  { icon: AlertTriangle, text: "Limited teacher bandwidth for enrichment delivery" },
  { icon: CheckCircle, text: "Need for programmes that are safe, structured, and credible" },
];

const solutions = [
  {
    icon: BookOpen,
    title: "Ready Curriculum",
    description: "Pre-built workshop content aligned to enrichment objectives. No preparation needed from your team.",
  },
  {
    icon: Wrench,
    title: "Customisable Workshops",
    description: "Tailored to your school's specific needs, student levels, and timetable constraints.",
  },
  {
    icon: Users,
    title: "End-to-end facilitation",
    description: "Planning, delivery, and coordination handled by experienced instructors.",
  },
  {
    icon: GraduationCap,
    title: "Teacher Training Included",
    description: "Upskill your educators so learning continues beyond the workshop.",
  },
];

const designThinkingSteps = [
  {
    icon: Heart,
    step: "Empathise",
    title: "Understand the User",
    description: "Students interview real users, observe pain points, and build empathy for who they're designing for.",
    vibeCodingLink: "Research & user stories before writing a single prompt",
  },
  {
    icon: Target,
    step: "Define",
    title: "Frame the Problem",
    description: "Synthesise insights into a clear problem statement that guides the entire build.",
    vibeCodingLink: "Problem briefs that shape what the AI builds",
  },
  {
    icon: Lightbulb,
    step: "Ideate",
    title: "Generate Solutions",
    description: "Brainstorm multiple approaches, sketch interfaces, and explore possibilities before committing.",
    vibeCodingLink: "Rapid wireframing and feature exploration with AI",
  },
  {
    icon: Layers,
    step: "Prototype",
    title: "Build to Learn",
    description: "Create working prototypes quickly to test assumptions and learn from real interactions.",
    vibeCodingLink: "Ship a functional app in hours, not weeks",
  },
  {
    icon: FlaskConical,
    step: "Test",
    title: "Iterate & Improve",
    description: "Gather feedback, identify improvements, and refine the solution through multiple iterations.",
    vibeCodingLink: "Real user testing and rapid iteration cycles",
  },
];

const workshops = [
  {
    title: "AI Foundations Workshop",
    targetLevel: "All levels",
    duration: "1 day",
    outcomes: ["AI awareness + ethics", "Hands-on tool exploration", "Build a tiny mini-project in a day"],
    deliveryWindow: "Holiday / End of semester",
    groupSize: "Up to 40 students",
  },
  {
    title: "Vibe Coding Sprint",
    targetLevel: "Sec 1–4",
    duration: "3 days",
    outcomes: ["Build a functional web app", "Learn AI-assisted development", "Team collaboration skills"],
    deliveryWindow: "Holiday / Enrichment week",
    groupSize: "20–30 students",
  },
  {
    title: "Holiday Build Lab",
    targetLevel: "Sec 1–4",
    duration: "1 week (5 days)",
    outcomes: ["Complete a project from scratch", "Pitch + demo day", "Certificate of completion"],
    deliveryWindow: "Semester break",
    groupSize: "20–30 students",
  },
  {
    title: "2-Week Intensive (Custom)",
    targetLevel: "Sec 2–JC",
    duration: "2 weeks",
    outcomes: ["Deeper build + iteration", "Multiple features shipped", "Showcase-ready portfolio output"],
    deliveryWindow: "Semester break",
    groupSize: "15–25 students",
  },
];

const trustPoints = [
  "Backed by Dialogic Academy's 6+ years in top schools",
  "Trusted by educators across Singapore",
  "Experienced instructors with teaching backgrounds",
];

export function SchoolsSection() {
  return (
    <section id="schools" className="scroll-mt-24">
      {/* Headline */}
      <div className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase bg-primary/20 text-primary rounded-full">
              School Workshops
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              Holiday and end-of-semester workshops, tailored to your students
            </h2>
            <p className="text-lg text-background/70">
              From a 1-day taster to a 2-week intensive, we design and deliver a hands-on programme that fits your timetable, student level, and learning goals.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Framing */}
      <div className="section-padding bg-foreground text-background border-t border-background/10">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-display font-semibold mb-6 text-background/80">We understand the challenges</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-background/5 rounded-xl border border-background/10">
                <problem.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-background/80">{problem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Pillars */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-8">Our Solution</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <div key={solution.title} className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{solution.title}</h4>
                <p className="text-sm text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design Thinking Section */}
      <div className="section-padding bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase bg-primary/20 text-primary rounded-full">
              Pedagogy
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Design Thinking Through Vibe Coding
            </h2>
            <p className="text-muted-foreground">
              Our workshops integrate the 5-stage design thinking process. Students don't just build apps: they learn to empathise, define problems, ideate solutions, prototype rapidly, and iterate based on feedback.
            </p>
          </div>

          {/* Design Thinking Process Flow */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {designThinkingSteps.map((step, index) => (
                <div key={step.step} className="relative group">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-2xl p-6 pt-8 h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-center mb-1">{step.step}</h3>
                    <p className="text-xs text-primary font-medium text-center mb-3">{step.title}</p>
                    <p className="text-sm text-muted-foreground text-center mb-4">{step.description}</p>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-primary/80 text-center italic">
                        "{step.vibeCodingLink}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 21CC Alignment Note */}
          <div className="mt-12 bg-card border border-border rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <PenTool className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">21st Century Competencies Aligned</h4>
                <p className="text-sm text-muted-foreground">
                  Design thinking develops critical thinking, creativity, and adaptive problem-solving: core 21CC skills. Students learn to navigate ambiguity and collaborate effectively while building real solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Cards */}
      <div className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-3">Available Workshops</h2>
          <p className="text-muted-foreground mb-8">Choose a starting point: we’ll tailor the pacing and outcomes to your cohort.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {workshops.map((workshop) => (
              <div key={workshop.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-display font-bold mb-3">{workshop.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs font-medium rounded-full">
                    <Users className="w-3 h-3" />
                    {workshop.targetLevel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs font-medium rounded-full">
                    <Clock className="w-3 h-3" />
                    {workshop.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs font-medium rounded-full">
                    <Calendar className="w-3 h-3" />
                    {workshop.deliveryWindow}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Outcomes:</p>
                  <ul className="space-y-1">
                    {workshop.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2 text-sm">
                        <Target className="w-3 h-3 text-primary flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-muted-foreground mb-4">
                  <span className="font-medium">Group size:</span> {workshop.groupSize}
                </div>

                <div className="flex gap-3">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href="#schools-proposal">Check Dates</a>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <a href="#schools-proposal">
                      Request Proposal
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Proof */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Why Schools Trust Us</h2>
              <ul className="space-y-4">
                {trustPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-primary">6+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center col-span-2">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Trusted by leading schools in Singapore</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Form */}
      <div id="schools-proposal" className="section-padding bg-foreground text-background scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-3">Request a Proposal</h2>
              <p className="text-background/70">
                Tell us about your school's needs and we'll prepare a tailored proposal.
              </p>
            </div>
            <PartnershipForm />
          </div>
        </div>
      </div>
    </section>
  );
}
