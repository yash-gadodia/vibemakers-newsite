import SlideContainer from '../SlideContainer';
import { Rocket, Calendar, Trophy, Award, Users, FileCheck } from 'lucide-react';

const benefits = [
  { icon: Rocket, text: 'Learn vibe coding' },
  { icon: FileCheck, text: 'Build portfolio' },
  { icon: Trophy, text: 'Win prizes' },
  { icon: Users, text: 'Meet mentors' },
  { icon: Award, text: 'Earn certificate' },
];

const criteria = [
  { name: 'Innovation', percent: 25 },
  { name: 'Impact', percent: 25 },
  { name: 'Execution', percent: 25 },
  { name: 'Presentation', percent: 25 },
];

const HackathonSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">Coming Soon</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-bold mb-3 text-foreground">
          National <span className="text-primary">Vibe Makers</span> Hackathon
        </h2>
        <p className="text-2xl text-muted-foreground mb-8">
          Singapore's first 2-day AI hackathon for students (ages 13-18)
        </p>

        {/* Format */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="text-primary font-bold text-xl mb-1">Day 1</div>
            <div className="text-foreground text-lg">Learn & Build</div>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-6 text-center">
            <div className="text-muted-foreground font-bold text-xl mb-1">Overnight</div>
            <div className="text-foreground text-lg">Continue at home</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="text-primary font-bold text-xl mb-1">Day 2</div>
            <div className="text-foreground text-lg">Demo Day</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Judging Criteria */}
          <div>
            <h3 className="text-lg text-muted-foreground mb-4 uppercase tracking-wide">Judging Criteria</h3>
            <div className="space-y-3">
              {criteria.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-foreground text-lg w-28">{item.name}</span>
                  <span className="text-primary font-bold text-lg">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg text-muted-foreground mb-4 uppercase tracking-wide">Student Benefits</h3>
            <div className="flex flex-wrap gap-3">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.text}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-base"
                >
                  <benefit.icon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Date */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full">
            <Calendar className="w-5 h-5" />
            <span className="font-semibold text-lg">Coming Q2 2026</span>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default HackathonSlide;
