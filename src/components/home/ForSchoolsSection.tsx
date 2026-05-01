import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    emoji: "📚",
    title: "Turnkey AI Curriculum",
    description: "Ready-to-deploy workshop programmes aligned with MOE's digital skills focus.",
  },
  {
    emoji: "⚙️",
    title: "Fully Customisable",
    description: "Tailored to your school's needs, schedule, and student levels.",
  },
  {
    emoji: "👩‍🏫",
    title: "Teacher Training Included",
    description: "Upskill your educators to continue the learning beyond our workshops.",
  },
  {
    emoji: "📈",
    title: "Future-Proof Students",
    description: "Equip students with AI literacy skills for the world they'll graduate into.",
  },
];

export function ForSchoolsSection() {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wide uppercase bg-primary/20 text-primary rounded-full">
              For Schools
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-balance">
              AI-Ready Education, Without the Hassle
            </h2>
            <p className="text-lg text-background/70 leading-relaxed mb-8">
              Your students need AI skills, but building a curriculum takes time you don't have. 
              Let us handle it—customised workshops, trained instructors, and measurable outcomes.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background/5 border border-background/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center shrink-0">
                    <span className="text-xl">{benefit.emoji}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-background">{benefit.title}</h4>
                    <p className="text-background/60 text-sm mt-0.5">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="secondary" className="bg-background text-foreground hover:bg-background/90" asChild>
                <Link to="/contact">
                  Partner With Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="border-background text-background hover:bg-background/20" asChild>
                <Link to="/programmes#schools">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Stats/Visual */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/5 border border-background/10 rounded-2xl p-6 text-center">
              <div className="text-4xl font-display font-bold text-primary mb-2">40+</div>
              <p className="text-background/70 text-sm">School Partners</p>
            </div>
            <div className="bg-background/5 border border-background/10 rounded-2xl p-6 text-center">
              <div className="text-4xl font-display font-bold text-primary mb-2">100%</div>
              <p className="text-background/70 text-sm">Satisfaction Rate</p>
            </div>
            <div className="bg-background/5 border border-background/10 rounded-2xl p-6 text-center">
              <div className="text-4xl font-display font-bold text-primary mb-2">6+</div>
              <p className="text-background/70 text-sm">Years Experience</p>
            </div>
            <div className="bg-background/5 border border-background/10 rounded-2xl p-6 text-center">
              <div className="text-4xl font-display font-bold text-primary mb-2">MOE</div>
              <p className="text-background/70 text-sm">Aligned Curriculum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
