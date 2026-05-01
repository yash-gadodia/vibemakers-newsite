import { Link } from "react-router-dom";
import { Building2, Home, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";

export function FormatCardsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Choose Your Format
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One core programme, multiple ways to learn.
            </p>
          </div>
        </Reveal>

        <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Schools Card - Dark */}
          <div className="bg-foreground rounded-3xl p-8">
            <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center mb-8">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3 text-white">
              Programmes for Schools
            </h3>
            <p className="text-background/70 mb-8">
              School-based programmes for post-exam periods, enrichment blocks, and special programmes.
            </p>
            <Link 
              to="/schools"
              className="w-full bg-background text-foreground hover:bg-muted rounded-full py-4 px-6 flex items-center justify-between font-medium transition-colors"
            >
              View School Programmes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Parents Card - Orange */}
          <div className="bg-primary rounded-3xl p-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-8">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3 text-white">
              Programmes for Parents & Students
            </h3>
            <p className="text-white/80 mb-8">
              Holiday classes and small-group coaching for students and families.
            </p>
            <Link 
              to="/parents"
              className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full py-4 px-6 flex items-center justify-between font-medium transition-colors"
            >
              View Classes for Parents & Students
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
