import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const trustPoints = [
  {
    emoji: "🛡️",
    title: "Safe Learning Environment",
    description: "Structured programmes with qualified instructors in a supportive setting.",
  },
  {
    emoji: "🎯",
    title: "Future-Ready Skills",
    description: "AI literacy and creative tech skills that prepare students for tomorrow's world.",
  },
  {
    emoji: "🏆",
    title: "Proven Track Record",
    description: "Backed by Dialogic Academy's 6+ years educating Singapore's top students.",
  },
  {
    emoji: "⏰",
    title: "Tangible Outcomes",
    description: "Students leave with real projects and portfolio pieces, not just certificates.",
  },
];

const outcomes = [
  "Build real apps and websites",
  "Develop AI literacy skills",
  "Create portfolio for university applications",
  "Learn problem-solving and creativity",
  "Join a community of like-minded peers",
];

export function ForParentsSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual - Testimonial Card */}
          <div className="order-2 lg:order-1">
            <div className="bg-card border border-border rounded-3xl p-8 relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-primary/10 rounded-2xl -rotate-6" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-accent/10 rounded-2xl rotate-6" />
              
              <div className="relative">
                <div className="text-6xl text-primary/20 font-serif leading-none">"</div>
                <blockquote className="text-lg text-foreground italic -mt-6 ml-4">
                  My daughter went from playing games all day to building her own apps. The transformation has been incredible.
                </blockquote>
                <div className="flex items-center gap-4 mt-6 ml-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-semibold text-muted-foreground">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah T.</p>
                    <p className="text-sm text-muted-foreground">Parent of a 14-year-old student</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick outcomes list */}
            <div className="mt-8 p-6 bg-secondary/50 rounded-2xl">
              <h4 className="font-display font-semibold text-foreground mb-4">What Your Child Will Achieve</h4>
              <ul className="space-y-2">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="text-base">✅</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              badge="For Parents & Students"
              title="Invest in Your Child's Future"
              description="In an AI-driven world, creative technology skills aren't optional: they're essential. Give your child the head start they deserve."
              align="left"
            />

            <div className="space-y-4 mt-8">
              {trustPoints.map((point) => (
                <div
                  key={point.title}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0">
                    <span className="text-xl">{point.emoji}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{point.title}</h4>
                    <p className="text-muted-foreground text-sm mt-0.5">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link to="/programmes#coaching">
                  Explore Coaching Options
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
