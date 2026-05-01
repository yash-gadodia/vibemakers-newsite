import SlideContainer from '../SlideContainer';
import { 
  Target, 
  BookOpen, 
  MessageCircle, 
  Users, 
  Shield, 
  Search,
  Sparkles 
} from 'lucide-react';

const skills = [
  { icon: Target, name: 'Applied Problem-Solving' },
  { icon: BookOpen, name: 'Self-Directed Learning' },
  { icon: MessageCircle, name: 'Communication & Presentation' },
  { icon: Users, name: 'Collaborative Learning' },
  { icon: Shield, name: 'Digital Literacy & Responsible AI' },
  { icon: Search, name: 'Critical Evaluation (Distil & Discern)' },
  { icon: Sparkles, name: 'Creative Confidence' },
];

const SkillsSlide = () => {
  return (
    <SlideContainer className="text-center">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Target className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">Learning Outcomes</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
          <span className="text-primary">21CC</span> Skills Developed
        </h2>
        <p className="text-2xl text-muted-foreground mb-10">
          Aligned with MOE's 21st Century Competencies Framework
        </p>

        {/* Skills Grid - 7 items in 2 rows: 4 + 3 centered */}
        <div className="w-full max-w-5xl mx-auto">
          {/* First row - 4 items */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {skills.slice(0, 4).map((skill) => (
              <div 
                key={skill.name}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <skill.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-base font-medium text-foreground leading-tight">{skill.name}</span>
              </div>
            ))}
          </div>
          {/* Second row - 3 items centered */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-start-1 col-span-4 flex justify-center gap-4">
              {skills.slice(4).map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm w-[calc(25%-0.75rem)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <skill.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-base font-medium text-foreground leading-tight">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOE Badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary border border-border rounded-full text-base">
            <span className="text-xl">🎯</span>
            <span className="text-muted-foreground">
              Mapped to <span className="text-foreground font-medium">MOE EdTech Masterplan 2030</span>
            </span>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SkillsSlide;
