import SlideContainer from '../SlideContainer';
import { Check, X } from 'lucide-react';

const dos = [
  'Use the peace-sign V logo consistently',
  'Write "Vibe Makers" with a space',
  'Use warm, educational imagery',
  'Maintain generous whitespace',
  'Focus on student outcomes in copy',
  'Use Primary + Outline CTA pairing'
];

const donts = [
  'Distort or recolor the logo',
  'Write "VibeMakers" or "Vibemakers"',
  'Use AI-generated illustrations',
  'Overcrowd layouts with content',
  'Use generic AI buzzphrases',
  'Mix too many button styles'
];

const DosAndDontsSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
          Do's & <span className="text-primary">Don'ts</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Do's */}
          <div className="bg-green-500/5 rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-green-600">Do</h3>
            </div>
            <ul className="space-y-4">
              {dos.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-red-600">Don't</h3>
            </div>
            <ul className="space-y-4">
              {donts.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-secondary/50 rounded-2xl p-5 border border-border text-center">
          <p className="text-lg text-muted-foreground">
            When in doubt, prioritize <span className="text-foreground font-semibold">clarity</span>, 
            <span className="text-foreground font-semibold"> warmth</span>, and 
            <span className="text-foreground font-semibold"> professionalism</span>.
          </p>
        </div>

        <div className="text-center text-muted-foreground text-base mt-6">
          Vibe Makers · Powered by Dialogic Academy
        </div>
      </div>
    </SlideContainer>
  );
};

export default DosAndDontsSlide;
