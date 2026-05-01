import SlideContainer from '../SlideContainer';
import { Lightbulb, Zap } from 'lucide-react';

const OpportunitySlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">The Opportunity</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-foreground">
          Students Learn Faster<br />
          <span className="text-primary">When They Build</span>
        </h2>

        {/* Key Message */}
        <div className="flex items-start gap-5 mb-10">
          <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed">
            Traditional coding focuses on syntax memorization. 
            <span className="text-foreground font-medium"> Vibe coding</span> lets students 
            focus on <span className="text-primary font-medium">problem-solving</span> while AI handles implementation.
          </p>
        </div>

        {/* Student Quote */}
        <div className="bg-card border border-border rounded-3xl p-8 relative">
          <div className="text-6xl text-primary/20 absolute top-6 left-6">"</div>
          <blockquote className="text-2xl md:text-3xl text-foreground pl-8 pr-6 italic">
            I always thought coding was just memorising syntax. 
            Seeing my app update instantly made it click.
          </blockquote>
          <div className="mt-4 pl-8 text-muted-foreground text-lg">
            — <span className="text-foreground">Arjun S.</span>, JC1 student
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default OpportunitySlide;
