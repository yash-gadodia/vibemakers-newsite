import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, GraduationCap, ArrowRight, Calendar, UserPlus, Sparkles, Users, BookOpen, Clock } from "lucide-react";

export function PersonaSwitcher() {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Our Programmes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a student looking to explore AI, or a school seeking workshops, we have the right programme for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Courses Card */}
          <div className="group relative bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-display font-bold mb-2 mt-8">Courses</h2>
            <p className="text-primary font-medium text-sm mb-4">Learn outside school</p>
            <p className="text-muted-foreground mb-6">
              Weekly or multi-week programmes for individual students ready to build real projects with AI.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Weekly or multi-week programmes</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <UserPlus className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Individual sign-ups</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Skill building and exploration</span>
              </li>
            </ul>
            
            <Button asChild className="w-full group-hover:bg-primary/90">
              <Link to="/programmes#coaching">
                Explore Coaching
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* School Workshops Card */}
          <div className="group relative bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-display font-bold mb-2 mt-8">School Workshops & Programmes</h2>
            <p className="text-primary font-medium text-sm mb-4">In-school or semester break delivery</p>
            <p className="text-muted-foreground mb-6">
              Turnkey workshops facilitated by our instructors, designed for groups or classes.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Facilitated by experienced instructors</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Designed for groups or classes</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Flexible scheduling options</span>
              </li>
            </ul>
            
            <Button asChild className="w-full group-hover:bg-primary/90">
              <Link to="/programmes#schools">
                Explore School Workshops
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
