import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const benefits = [
  {
    emoji: "🎮",
    title: "Fun & Engaging",
    description: "Learn through building games, apps, and creative projects",
    color: "bg-primary/10",
  },
  {
    emoji: "🏆",
    title: "Hackathons & Competitions",
    description: "Showcase your skills and win recognition",
    color: "bg-primary/10",
  },
  {
    emoji: "💼",
    title: "Portfolio Building",
    description: "Create work that stands out in university applications",
    color: "bg-accent/10",
  },
  {
    emoji: "👥",
    title: "Community",
    description: "Join a tribe of future-ready creators like you",
    color: "bg-secondary",
  },
];

export function ForStudentsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <SectionHeader
              badge="For Students"
              title="Built for Curious Minds"
              description="Whether you're a complete beginner or already coding, Vibemakers helps you level up with AI tools and creative projects."
              align="left"
            />

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                >
                  <div className={`w-10 h-10 rounded-lg ${benefit.color} flex items-center justify-center shrink-0`}>
                    <span className="text-xl">{benefit.emoji}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{benefit.title}</h4>
                    <p className="text-muted-foreground text-xs mt-0.5">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link to="/programmes">
                  Explore Programmes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
              <div className="glass-card rounded-2xl p-8 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary/20 rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-accent/20 rounded w-2/3 mt-4" />
                </div>
                <div className="mt-6 flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">AI</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">Creative</span>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl rotate-12 animate-float" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
