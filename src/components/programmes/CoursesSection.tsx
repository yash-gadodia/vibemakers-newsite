import { Rocket, Brain, Briefcase, Calendar, Clock, Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "./RegistrationForm";

const courses = [
  {
    title: "Vibe Coding Foundations",
    description: "Build your first app with AI. Perfect for beginners who want to create something real.",
    ageRange: "Ages 10–14",
    duration: "6 weeks",
    schedule: "Weekly sessions",
    outcomes: ["Build a working web app", "Learn AI prompting basics", "Create a portfolio piece"],
    featured: true,
  },
  {
    title: "AI Creator Studio",
    description: "Create games, art, and music with AI. Explore the creative side of technology.",
    ageRange: "Ages 13–16",
    duration: "8 weeks",
    schedule: "Weekly sessions",
    outcomes: ["Design AI-generated art", "Build an interactive game", "Compose with AI music tools"],
    featured: false,
  },
  {
    title: "App Builder Bootcamp",
    description: "Launch a real product. Intensive programme for students ready to go deeper.",
    ageRange: "Ages 14–18",
    duration: "4 weeks",
    schedule: "Holiday intensive",
    outcomes: ["Ship a complete app", "Learn full-stack basics", "Present to a live audience"],
    featured: true,
  },
  {
    title: "Portfolio Sprint",
    description: "Build a showcase portfolio that stands out for school applications and beyond.",
    ageRange: "Ages 15–18",
    duration: "3 weeks",
    schedule: "Holiday intensive",
    outcomes: ["Professional portfolio site", "3+ polished projects", "Interview-ready presentation"],
    featured: false,
  },
];

const howItWorks = [
  { icon: Calendar, title: "Choose Your Course", description: "Pick based on age, interest, and schedule" },
  { icon: Users, title: "Join a Small Cohort", description: "Learn with 4-8 peers in guided sessions" },
  { icon: Rocket, title: "Build Real Projects", description: "Create portfolio-ready work each week" },
  { icon: Sparkles, title: "Showcase Your Work", description: "Present to peers and take home your projects" },
];

export function CoursesSection() {
  return (
    <section id="courses" className="scroll-mt-24">
      {/* Hero */}
      <div className="section-padding bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase bg-primary/10 text-primary rounded-full">
              Courses
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              Learn AI skills through hands-on courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Weekly and holiday programmes for curious minds aged 10–18. Build real projects, gain practical skills, and create a portfolio that stands out.
            </p>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-8">Available Courses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div 
                key={course.title} 
                className={`relative bg-card border rounded-2xl p-6 transition-all hover:shadow-lg ${
                  course.featured ? "border-primary/50 shadow-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                {course.featured && (
                  <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-display font-bold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs font-medium rounded-full">
                    <Users className="w-3 h-3" />
                    {course.ageRange}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs font-medium rounded-full">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-xs font-medium rounded-full">
                    <Calendar className="w-3 h-3" />
                    {course.schedule}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-medium text-muted-foreground mb-2">What you'll build:</p>
                  <ul className="space-y-1">
                    {course.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    Register Interest
                  </Button>
                  <Button size="sm" className="flex-1">
                    Join Upcoming Cohort
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-8">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/30">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Beginner-friendly • No coding experience required • All materials provided
          </p>
        </div>
      </div>

      {/* CTA Form */}
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-3">Register Your Interest</h2>
              <p className="text-muted-foreground">
                Tell us about your child and preferred course. We'll reach out within 2 working days with next steps.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
