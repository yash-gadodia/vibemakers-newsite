import SlideContainer from '../SlideContainer';
import { Users, Building2, Clock, Trophy, User } from 'lucide-react';
import peiSong from '@/assets/faculty/pei-song.jpg';
import yash from '@/assets/faculty/yash-gadodia.jpg';

const stats = [
  { icon: Users, value: '15,000+', label: 'Students impacted' },
  { icon: Building2, value: '50+', label: 'School partners across SG' },
  { icon: Clock, value: '7+', label: 'Years of excellence since 2018' },
  { icon: Trophy, value: '150+', label: 'Championships won' },
];

const leaders = [
  { name: 'Seah Pei Song', role: 'CEO', image: peiSong },
  { name: 'Yash Gadodia', role: 'Head of Curriculum', image: yash },
];

const WhoWeAreSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <User className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">Who We Are</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-bold mb-10 text-foreground">
          <span className="text-primary">Dialogic Academy</span> Track Record
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Leadership */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <span className="text-muted-foreground uppercase tracking-widest text-sm">Leadership</span>
          <div className="flex gap-8">
            {leaders.map((leader) => (
              <div key={leader.name} className="flex items-center gap-4">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary/50"
                />
                <div>
                  <div className="font-semibold text-foreground text-lg">{leader.name}</div>
                  <div className="text-base text-muted-foreground">{leader.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default WhoWeAreSlide;
