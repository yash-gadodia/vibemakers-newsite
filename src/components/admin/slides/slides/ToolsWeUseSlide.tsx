import SlideContainer from '../SlideContainer';
import { Zap, MessageSquare, Rocket, RefreshCw } from 'lucide-react';

const ToolsWeUseSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">The Power of AI Tools</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
          From <span className="text-primary">Idea</span> to <span className="text-primary">App</span> in One Prompt
        </h2>
        <p className="text-2xl text-muted-foreground mb-10 max-w-4xl">
          Using tools like <span className="font-semibold text-foreground">Lovable</span>, students describe what they want to build in plain English, and watch their ideas come to life instantly.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">One Prompt, One App</h3>
              <p className="text-muted-foreground text-lg">
                Students type a single sentence describing their idea, and AI generates a fully functional prototype.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Iterate in Real-Time</h3>
              <p className="text-muted-foreground text-lg">
                Refine features, fix issues, and add functionality through natural conversation.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Deploy Instantly</h3>
              <p className="text-muted-foreground text-lg">
                Publish real, shareable web apps with one click, show work to anyone, anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-secondary border border-border rounded-full">
            <span className="text-3xl">⚡</span>
            <span className="text-foreground font-medium text-xl">
              No setup. No installation. Just <span className="text-primary font-bold">ideas → reality</span>.
            </span>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default ToolsWeUseSlide;
