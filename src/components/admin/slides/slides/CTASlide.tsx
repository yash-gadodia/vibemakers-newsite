import SlideContainer from '../SlideContainer';
import { Mail, Globe, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import logo from '@/assets/logo.svg';

const CTASlide = () => {
  return (
    <SlideContainer className="text-center">
      <div className="flex flex-col items-center">
        {/* Headline */}
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground">
          Let's <span className="text-primary">Partner</span>
        </h2>
        <p className="text-2xl md:text-3xl text-muted-foreground mb-12">
          Request a tailored proposal for your school
        </p>

        {/* Contact Info + QR in a row */}
        <div className="flex flex-row gap-16 justify-center items-start">
          {/* Contact buttons - stacked vertically */}
          <div className="flex flex-col gap-5">
            <a 
              href="mailto:vibemakers@dialogic.academy" 
              className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-primary hover:bg-primary/90 rounded-2xl text-primary-foreground font-semibold text-xl transition-colors min-w-[380px]"
            >
              <Mail className="w-7 h-7" />
              vibemakers@dialogic.academy
              <ArrowRight className="w-7 h-7" />
            </a>
            <a 
              href="https://vibemakers.dev" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-card hover:bg-secondary border border-border rounded-2xl text-foreground font-semibold text-xl transition-colors min-w-[380px]"
            >
              <Globe className="w-7 h-7" />
              vibemakers.dev
            </a>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-card p-4 rounded-2xl border border-border">
              <QRCodeSVG 
                value="https://vibemakers.dev/schools" 
                size={140}
                level="M"
                includeMargin={false}
              />
            </div>
            <p className="text-muted-foreground text-lg">Scan for Schools page</p>
          </div>
        </div>

        {/* Footer - separate from buttons with clear spacing */}
        <div className="mt-12 text-muted-foreground text-xl">
          <span className="text-foreground font-semibold">Vibe Makers</span> · Powered by Dialogic Academy
        </div>
      </div>
    </SlideContainer>
  );
};

export default CTASlide;
