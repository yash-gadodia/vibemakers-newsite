import { useState } from "react";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { Reveal } from "@/components/ui/Reveal";
import { BrutalSticker } from "@/components/ui/brutal-sticker";

// Import school logos
import vjcLogo from "@/assets/logos/vjc.png";
import rgsLogo from "@/assets/logos/rgs.png";
import acsLogo from "@/assets/logos/acs.png";
import njcLogo from "@/assets/logos/njc.png";
import cchLogo from "@/assets/logos/cch.png";
import chijLogo from "@/assets/logos/chij.png";
import plmgsLogo from "@/assets/logos/plmgs.png";
import marisStellaLogo from "@/assets/logos/maris-stella.svg";
import nanChiauLogo from "@/assets/logos/nan-chiau.svg";
import bedokSouthLogo from "@/assets/logos/bedok-south.png";
import peiChunLogo from "@/assets/logos/pei-chun.png";

const schools = [
  { name: "Victoria Junior College", abbr: "VJC", logo: vjcLogo },
  { name: "Raffles Girls' School", abbr: "RGS", logo: rgsLogo },
  { name: "Anglo-Chinese School (Primary)", abbr: "ACS", logo: acsLogo },
  { name: "National Junior College", abbr: "NJC", logo: njcLogo },
  { name: "Chung Cheng High School (Yishun)", abbr: "CCH", logo: cchLogo },
  { name: "CHIJ Katong Convent", abbr: "CHIJ", logo: chijLogo },
  { name: "Paya Lebar Methodist Girls' School", abbr: "PLMGS", logo: plmgsLogo },
  { name: "Maris Stella High School", abbr: "MSHS", logo: marisStellaLogo },
  { name: "Nan Chiau High School", abbr: "NCHS", logo: nanChiauLogo },
  { name: "Bedok South Secondary School", abbr: "BSSS", logo: bedokSouthLogo },
  { name: "Pei Chun Public School", abbr: "PCPS", logo: peiChunLogo },
];

const stats = [
  { value: "15,000+", label: "Students taught across Singapore since 2018" },
  { value: "50+", label: "School partners from primary to JC" },
  { value: "6+", label: "Years delivering enrichment programmes" },
];

export function TrustSection() {
  const [isPaused, setIsPaused] = useState(false);
  
  const schoolsWithLogos = schools.filter((school) => Boolean(school.logo));
  const duplicatedSchools = [...schoolsWithLogos, ...schoolsWithLogos];

  return (
    <section className="overflow-hidden">
      {/* Light Section - Headings & Logos */}
      <div className="bg-secondary/40 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Dialogic Academy + 21CC Badges */}
          <Reveal variant="up">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
              <a 
                href="https://dialogic.academy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full transition-all duration-300 group"
              >
                <span className="text-lg">🎓</span>
                <span className="text-foreground font-display font-bold text-base md:text-lg">
                  Part of <span className="text-primary">Dialogic Academy</span>
                </span>
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium">
                🎯 Develops CAIT, CCI & Self-Directed Learning (21CC Framework)
              </div>
            </div>
          </Reveal>
          
          <Reveal variant="up" delayMs={80}>
            <p className="text-muted-foreground text-sm md:text-base font-medium uppercase tracking-widest mb-3">
              Singapore Education Ecosystem
            </p>
            <h2 className="text-foreground font-display font-bold text-2xl md:text-3xl lg:text-4xl text-balance mb-2">
              Trusted by Singapore Schools
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              From primary schools to JCs — delivering enrichment programmes since 2018
            </p>
          </Reveal>

          {/* Infinite Carousel */}
          <Reveal variant="up" delayMs={160}>
            <div className="mt-10 md:mt-12">
              <div 
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Gradient masks for smooth edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-secondary/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-secondary/40 to-transparent z-10 pointer-events-none" />
                
                <div 
                  className={`flex gap-4 md:gap-6 ${isPaused ? '' : 'animate-scroll'}`}
                  style={{ width: 'fit-content' }}
                >
                  {duplicatedSchools.map((school, index) => (
                    <div
                      key={`${school.abbr}-${index}`}
                      className="flex-shrink-0 flex items-center justify-center px-4 py-3 rounded-2xl transition-all duration-300 group min-w-[100px] md:min-w-[120px] h-16 md:h-20"
                      title={school.name}
                    >
                      {school.logo ? (
                        <img
                          src={school.logo}
                          alt={school.name}
                          className="h-10 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <span className="font-display font-bold text-sm md:text-base text-foreground/70 tracking-wide transition-colors duration-300 group-hover:text-primary">
                          {school.abbr}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delayMs={240}>
            <div className="mt-8 md:mt-10 flex justify-center">
              <BrutalSticker tone="yellow" rotate={-2}>
                ● Just delivered · RGS · May 2026
              </BrutalSticker>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Dark Section - Stats */}
      <div className="bg-foreground py-12 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Stats Grid with fade and parallax */}
          <Reveal variant="up" delayMs={200}>
            <ParallaxSection speed={0.1} offset={40}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`text-center ${
                      index < stats.length - 1 ? "md:border-r md:border-background/20" : ""
                    }`}
                  >
                    <p className="text-primary font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-2">
                      {stat.value}
                    </p>
                    <p className="text-background/60 text-sm md:text-base">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ParallaxSection>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
