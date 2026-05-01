import SlideContainer from '../SlideContainer';
import { MessageCircle, Lightbulb, GraduationCap, Heart } from 'lucide-react';

const toneAttributes = [
  {
    icon: MessageCircle,
    title: 'Professional',
    description: 'Education-focused language that respects both students and educators',
    example: '"Our programme develops critical thinking skills" not "AI-powered learning revolution"'
  },
  {
    icon: Lightbulb,
    title: 'Clear',
    description: 'Straightforward explanations without jargon or buzzwords',
    example: '"Build real apps with AI assistance" not "Leverage cutting-edge AI synergies"'
  },
  {
    icon: GraduationCap,
    title: 'Empowering',
    description: 'Focus on student agency and capability building',
    example: '"Students create their own solutions" not "AI does the work for you"'
  },
  {
    icon: Heart,
    title: 'Approachable',
    description: 'Friendly and encouraging without being condescending',
    example: '"Start with an idea you care about" not "No coding experience required!"'
  }
];

const ToneOfVoiceSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
          Tone of <span className="text-primary">Voice</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {toneAttributes.map((attr) => {
            const Icon = attr.icon;
            return (
              <div key={attr.title} className="bg-secondary/50 rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{attr.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground mb-3">{attr.description}</p>
                <p className="text-base text-foreground/80 italic bg-background/50 rounded-lg p-3">
                  {attr.example}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-primary/10 rounded-2xl p-5 border border-primary/20">
          <p className="text-lg text-foreground text-center">
            <strong>Key Principle:</strong> Avoid generic AI buzzphrases. Ground messaging in pedagogy and real educational outcomes.
          </p>
        </div>

        <div className="text-center text-muted-foreground text-base mt-6">
          Vibe Makers · Powered by Dialogic Academy
        </div>
      </div>
    </SlideContainer>
  );
};

export default ToneOfVoiceSlide;
