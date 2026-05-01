import SlideContainer from '../SlideContainer';

const TypographySlide = () => {
  return (
    <SlideContainer>
      <div className="w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
          Typo<span className="text-primary">graphy</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Display Font */}
          <div className="bg-secondary/50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Display Font</h3>
            <p className="text-6xl font-bold text-foreground mb-4 font-display">
              Cabinet Grotesk
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Bold, geometric sans-serif for headlines and titles. Confident and distinctive.
            </p>
            <div className="space-y-2 text-foreground font-display">
              <p className="text-4xl font-bold">Aa Bb Cc 123</p>
              <p className="text-2xl font-semibold">The quick brown fox</p>
            </div>
          </div>

          {/* Body Font */}
          <div className="bg-secondary/50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Body Font</h3>
            <p className="text-6xl font-normal text-foreground mb-4 font-sans">
              Satoshi
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Clean, modern sans-serif with excellent readability for body text.
            </p>
            <div className="space-y-2 text-foreground font-sans">
              <p className="text-xl">Aa Bb Cc Dd Ee 123</p>
              <p className="text-lg">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>
        </div>

        {/* Type Scale */}
        <div className="mt-8 bg-secondary/50 rounded-2xl p-6 border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">Type Scale</h3>
          <div className="space-y-3">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-foreground">H1 Heading</span>
              <span className="text-base text-muted-foreground">4xl / Bold</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-semibold text-foreground">H2 Heading</span>
              <span className="text-base text-muted-foreground">2xl / Semibold</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-lg text-foreground">Body Text</span>
              <span className="text-base text-muted-foreground">lg / Regular</span>
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

export default TypographySlide;
