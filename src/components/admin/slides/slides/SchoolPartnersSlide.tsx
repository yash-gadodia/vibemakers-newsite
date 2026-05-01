import SlideContainer from '../SlideContainer';
import { GraduationCap } from 'lucide-react';

// Import school logos
import vjcLogo from '@/assets/logos/vjc.png';
import rgsLogo from '@/assets/logos/rgs.png';
import acsLogo from '@/assets/logos/acs.png';
import njcLogo from '@/assets/logos/njc.png';
import cchLogo from '@/assets/logos/cch.png';
import chijLogo from '@/assets/logos/chij.png';
import plmgsLogo from '@/assets/logos/plmgs.png';
import marisStellaLogo from '@/assets/logos/maris-stella.svg';
import nanChiauLogo from '@/assets/logos/nan-chiau.svg';
import bedokSouthLogo from '@/assets/logos/bedok-south.png';
import peiChunLogo from '@/assets/logos/pei-chun.png';

const schools = [
  { name: 'Victoria Junior College', logo: vjcLogo },
  { name: "Raffles Girls' School", logo: rgsLogo },
  { name: 'Anglo-Chinese School', logo: acsLogo },
  { name: 'National Junior College', logo: njcLogo },
  { name: 'Chung Cheng High School', logo: cchLogo },
  { name: 'CHIJ Katong Convent', logo: chijLogo },
  { name: "Paya Lebar Methodist Girls' School", logo: plmgsLogo },
  { name: 'Maris Stella High School', logo: marisStellaLogo },
  { name: 'Nan Chiau High School', logo: nanChiauLogo },
  { name: 'Bedok South Secondary', logo: bedokSouthLogo },
  { name: 'Pei Chun Public School', logo: peiChunLogo },
];

const SchoolPartnersSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">Our Partners</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
          Schools We Work With
        </h2>
        <p className="text-2xl text-muted-foreground mb-10">
          Trusted by leading schools across Singapore
        </p>

        {/* Logo Grid - 4x2 grid + more indicator */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {schools.slice(0, 8).map((school) => (
            <div 
              key={school.name}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-center h-20 shadow-sm"
              title={school.name}
            >
              <img 
                src={school.logo} 
                alt={school.name}
                className="max-h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
        {/* More schools indicator */}
        <div className="flex justify-center mb-8">
          <div className="bg-secondary rounded-xl px-8 py-3 flex items-center justify-center border border-dashed border-border">
            <span className="text-muted-foreground text-lg font-medium">+40 more schools across Singapore</span>
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
            <span className="text-xl">🎓</span>
            <span className="text-foreground text-lg font-medium">
              Part of <span className="text-primary">Dialogic Academy</span>
            </span>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SchoolPartnersSlide;
