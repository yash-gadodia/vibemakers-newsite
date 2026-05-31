import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParallaxSection, FloatingElement } from "@/components/ui/parallax-section";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTASection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Decorative parallax elements */}
      <FloatingElement speed={-0.2} offset={100} className="absolute top-10 left-10 pointer-events-none">
        <div className="w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      </FloatingElement>
      <FloatingElement speed={-0.3} offset={120} className="absolute bottom-10 right-10 pointer-events-none">
        <div className="w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
      </FloatingElement>

      <div className="container mx-auto px-4 relative">
        <Reveal variant="up" durationMs={600}>
          <ParallaxSection speed={0.1} offset={30}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Real problems. Real apps. Real learning.
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                Whether you're a school looking for enrichment programmes or a parent seeking personalised coaching, we'll help students build something they're proud of.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base px-8 py-6 rounded-xl shadow-glow" asChild>
                  <Link to="/schools">
                    For Schools
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl" asChild>
                  <Link to="/parents">For Parents & Students</Link>
                </Button>
              </div>

              <div className="mt-10 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-2">
                  A programme by{" "}
                  <a
                    href="https://dialogic.academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Dialogic Academy
                  </a>{" "}
                  · Singapore's trusted enrichment provider since 2018
                </p>
                <p className="text-xs text-muted-foreground">
                  50+ school partners • Aligned with{" "}
                  <a
                    href="https://www.moe.gov.sg/education-in-sg/21st-century-competencies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    MOE 21CC Framework
                  </a>{" "}
                  &{" "}
                  <a
                    href="https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    EdTech Masterplan 2030
                  </a>
                </p>
              </div>
            </div>
          </ParallaxSection>
        </Reveal>
      </div>
    </section>
  );
}
