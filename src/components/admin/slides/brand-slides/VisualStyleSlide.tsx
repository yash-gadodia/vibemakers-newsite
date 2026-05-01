import SlideContainer from '../SlideContainer';
import { Layers, Sparkles, Image, Layout } from 'lucide-react';

const styleElements = [
  {
    icon: Layers,
    title: 'Soft UI',
    description: 'Large radii (rounded-2xl/3xl), minimal borders, alternating section backgrounds'
  },
  {
    icon: Sparkles,
    title: 'Subtle Effects',
    description: 'Gentle gradients, soft shadows, and calm animations that don\'t distract'
  },
  {
    icon: Image,
    title: 'Real Imagery',
    description: 'Authentic education photos over AI-generated illustrations'
  },
  {
    icon: Layout,
    title: 'Generous Spacing',
    description: 'Ample whitespace for a premium, calm educational feel'
  }
];

const VisualStyleSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
          Visual <span className="text-primary">Style</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {styleElements.map((element) => {
            const Icon = element.icon;
            return (
              <div key={element.title} className="bg-secondary/50 rounded-2xl p-5 border border-border text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{element.title}</h3>
                <p className="text-base text-muted-foreground">{element.description}</p>
              </div>
            );
          })}
        </div>

        {/* Component Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Button Styles</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium">
                Primary CTA
              </button>
              <button className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-medium">
                Outline
              </button>
              <button className="px-6 py-3 bg-secondary text-foreground rounded-xl font-medium border border-border">
                Secondary
              </button>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Card Style</h3>
            <div className="bg-background rounded-2xl p-5 border border-border">
              <p className="text-lg font-medium text-foreground">Sample Card</p>
              <p className="text-base text-muted-foreground mt-1">Rounded corners, subtle borders, clean content</p>
            </div>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-base mt-6">
          Vibe Makers · Powered by Dialogic Academy
        </div>
      </div>
    </SlideContainer>
  );
};

export default VisualStyleSlide;
