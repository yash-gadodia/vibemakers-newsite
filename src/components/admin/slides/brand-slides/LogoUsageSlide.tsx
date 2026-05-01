import SlideContainer from '../SlideContainer';
import { Check, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const LogoUsageSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
          Logo <span className="text-primary">Usage</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Primary Logo */}
          <div className="bg-secondary/50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Primary Logo</h3>
            <div className="bg-background rounded-xl p-8 flex items-center justify-center mb-4">
              <img src={logo} alt="Vibe Makers Logo" className="w-24 h-24" />
            </div>
            <p className="text-muted-foreground text-lg">
              The peace-sign "V" is our primary mark. Use on light backgrounds with adequate clear space.
            </p>
          </div>

          {/* Logo Variations */}
          <div className="bg-secondary/50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Clear Space</h3>
            <div className="bg-background rounded-xl p-8 flex items-center justify-center mb-4 relative">
              <div className="border-2 border-dashed border-primary/30 p-6 rounded-xl">
                <img src={logo} alt="Vibe Makers Logo" className="w-16 h-16" />
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Maintain minimum clear space equal to the height of the "V" on all sides.
            </p>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="flex items-start gap-3 bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-lg text-foreground">Use on branded materials, presentations, and digital assets</span>
          </div>
          <div className="flex items-start gap-3 bg-red-500/10 rounded-xl p-4 border border-red-500/20">
            <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-lg text-foreground">Do not distort, rotate, or change logo colors</span>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-base mt-8">
          Vibe Makers · Powered by Dialogic Academy
        </div>
      </div>
    </SlideContainer>
  );
};

export default LogoUsageSlide;
