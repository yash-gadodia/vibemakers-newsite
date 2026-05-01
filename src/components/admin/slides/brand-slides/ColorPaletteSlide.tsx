import SlideContainer from '../SlideContainer';

const colors = [
  { name: 'Primary Orange', hex: '#F97316', hsl: 'hsl(24, 95%, 53%)', usage: 'CTAs, accents, highlights' },
  { name: 'Background Cream', hex: '#FAF8F5', hsl: 'hsl(35, 30%, 97%)', usage: 'Page backgrounds' },
  { name: 'Foreground', hex: '#1C1917', hsl: 'hsl(24, 10%, 10%)', usage: 'Primary text' },
  { name: 'Muted', hex: '#78716C', hsl: 'hsl(30, 6%, 45%)', usage: 'Secondary text' },
  { name: 'Secondary', hex: '#F5F0EB', hsl: 'hsl(30, 25%, 94%)', usage: 'Cards, sections' },
  { name: 'Border', hex: '#E7E0D9', hsl: 'hsl(30, 20%, 88%)', usage: 'Dividers, outlines' },
];

const ColorPaletteSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
          Color <span className="text-primary">Palette</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {colors.map((color) => (
            <div key={color.name} className="bg-secondary/50 rounded-2xl p-5 border border-border">
              <div 
                className="w-full h-20 rounded-xl mb-4 border border-border"
                style={{ backgroundColor: color.hex }}
              />
              <h3 className="text-xl font-semibold text-foreground mb-1">{color.name}</h3>
              <p className="text-base text-muted-foreground font-mono mb-2">{color.hex}</p>
              <p className="text-base text-muted-foreground">{color.usage}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-secondary/50 rounded-2xl p-6 border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-3">Color Usage Principles</h3>
          <p className="text-lg text-muted-foreground">
            Primary orange is used sparingly for emphasis and CTAs. The warm cream background creates a calm, 
            educational feel. Dark foreground ensures readability while maintaining a soft, approachable aesthetic.
          </p>
        </div>

        <div className="text-center text-muted-foreground text-base mt-6">
          Vibe Makers · Powered by Dialogic Academy
        </div>
      </div>
    </SlideContainer>
  );
};

export default ColorPaletteSlide;
