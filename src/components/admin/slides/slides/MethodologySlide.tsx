import SlideContainer from '../SlideContainer';
import { Compass, Lightbulb, Layers, Repeat, ArrowRight } from 'lucide-react';

const phases = [
  {
    letter: 'V',
    name: 'Vision',
    subtitle: 'Empathise & Define',
    description: 'Choose a real problem for a real user',
    icon: Compass,
  },
  {
    letter: 'I',
    name: 'Ideate',
    subtitle: 'Explore & Decide',
    description: 'Generate solutions, pick a minimal feature set',
    icon: Lightbulb,
  },
  {
    letter: 'B',
    name: 'Build',
    subtitle: 'Prototype',
    description: 'Use AI prompts to implement, test, and debug',
    icon: Layers,
  },
  {
    letter: 'E',
    name: 'Evolve',
    subtitle: 'Test & Improve',
    description: 'Collect feedback, iterate, reflect',
    icon: Repeat,
  },
];

const MethodologySlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <Compass className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">Our Methodology</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-10 text-foreground">
          The <span className="text-primary">V.I.B.E.</span> Cycle
        </h2>

        {/* Phases */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {phases.map((phase, index) => (
            <div key={phase.letter} className="relative">
              <div className="bg-card border border-border rounded-2xl p-5 h-full shadow-sm">
                {/* Letter Badge */}
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">{phase.letter}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-1">{phase.name}</h3>
                <p className="text-base text-primary mb-2">{phase.subtitle}</p>
                <p className="text-base text-muted-foreground leading-snug">{phase.description}</p>
              </div>
              
              {/* Arrow */}
              {index < phases.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/50 z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="text-center">
          <p className="inline-flex items-center gap-3 text-xl text-muted-foreground bg-secondary px-6 py-3 rounded-full">
            <span className="text-primary text-2xl">✨</span>
            Process over product — <span className="text-primary font-medium">but students still ship</span>
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};

export default MethodologySlide;
