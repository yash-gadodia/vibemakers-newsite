import SlideContainer from '../SlideContainer';
import { Palette } from 'lucide-react';
import logo from '@/assets/logo.png';

const BrandTitleSlide = () => {
  return (
    <SlideContainer className="text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
          <img src={logo} alt="Vibe Makers" className="w-28 h-28 rounded-3xl shadow-2xl shadow-primary/30" />
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight text-foreground">
          Brand <span className="text-primary">Guidelines</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-muted-foreground font-medium mb-10">
          Visual Identity & Communication Standards
        </p>

        <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary border border-border rounded-full text-lg">
          <Palette className="w-5 h-5 text-primary" />
          <span className="text-foreground">Vibe Makers · 2026</span>
        </div>

        <div className="text-muted-foreground text-lg mt-10">
          Powered by <span className="text-foreground font-semibold">Dialogic Academy</span>
        </div>
      </div>
    </SlideContainer>
  );
};

export default BrandTitleSlide;
