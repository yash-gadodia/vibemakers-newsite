import SlideContainer from '../SlideContainer';
import { Palette } from 'lucide-react';

const projects = [
  {
    title: 'Personal Portfolio',
    description: 'Showcase achievements, CCAs, and future goals',
    tag: 'Beginner',
    tagColor: 'bg-green-100 text-green-700',
    screenshotSrc: '/student-projects/portfolio.svg',
  },
  {
    title: 'Study Planner',
    description: 'Calendar + checklist for exam prep',
    tag: 'Beginner',
    tagColor: 'bg-green-100 text-green-700',
    screenshotSrc: '/student-projects/study-planner.svg',
  },
  {
    title: 'CCA Tracker',
    description: 'Manage signups with filters & status',
    tag: 'Intermediate',
    tagColor: 'bg-blue-100 text-blue-700',
    screenshotSrc: '/student-projects/cca-signup-tracker.svg',
  },
  {
    title: 'Study Buddy AI',
    description: 'AI flashcards with spaced repetition',
    tag: 'Intermediate',
    tagColor: 'bg-blue-100 text-blue-700',
    screenshotSrc: '/student-projects/study-buddy-ai.svg',
  },
  {
    title: 'EcoTracker',
    description: 'Gamified carbon footprint calculator',
    tag: 'Intermediate',
    tagColor: 'bg-blue-100 text-blue-700',
    screenshotSrc: '/student-projects/ecotracker.svg',
  },
  {
    title: 'Marketplace',
    description: 'Buy/sell platform with chat',
    tag: 'Advanced',
    tagColor: 'bg-purple-100 text-purple-700',
    screenshotSrc: '/student-projects/simple-marketplace.svg',
  },
];

const StudentProjectsSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto text-center">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Palette className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">What Students Build</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-bold mb-3 text-foreground">
          Example <span className="text-primary">Projects</span>
        </h2>
        <p className="text-2xl text-muted-foreground mb-8">
          Real apps students create in our programmes
        </p>

        {/* Projects Grid - 2 rows of 3, larger cards */}
        <div className="grid grid-cols-3 gap-5">
          {projects.map((project) => (
            <div 
              key={project.title}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Screenshot - taller */}
              <div className="h-32 bg-muted relative overflow-hidden">
                <img 
                  src={project.screenshotSrc} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Info */}
              <div className="p-5 text-left">
                <h3 className="font-semibold text-lg text-foreground mb-2">{project.title}</h3>
                <span className={`inline-block px-4 py-1.5 text-base font-medium rounded-full ${project.tagColor}`}>
                  {project.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-lg text-muted-foreground mt-6">
          All projects built using our <span className="text-primary font-medium">V.I.B.E.</span> methodology
        </p>
      </div>
    </SlideContainer>
  );
};

export default StudentProjectsSlide;
