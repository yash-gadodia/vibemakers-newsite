import SlideContainer from '../SlideContainer';
import { Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';

const TitleSlide = () => {
  return (
    <SlideContainer className="text-center">
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} alt="Vibe Makers" className="w-28 h-28 rounded-3xl shadow-2xl shadow-primary/30" />
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight text-foreground">
          <span className="text-primary">Problem-Solving</span> with AI
        </h1>
        
        <p className="text-3xl md:text-4xl text-muted-foreground font-medium mb-10">
          A School Enrichment Programme
        </p>

        {/* Alignment Badge */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary border border-border rounded-full text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-foreground">Aligned with MOE EdTech Masterplan 2030</span>
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary border border-border rounded-full text-lg">
            <span className="text-xl">🎯</span>
            <span className="text-foreground">Develops 21st Century Competencies</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-muted-foreground text-lg">
          Powered by <span className="text-foreground font-semibold">Dialogic Academy</span>
        </div>
      </div>
    </SlideContainer>
  );
};

export default TitleSlide;
