import SlideContainer from '../SlideContainer';
import { Calendar, Clock, Users, Briefcase, Palette, Lightbulb } from 'lucide-react';

const formats = [
  {
    name: 'Introductory Lab',
    duration: '1 day',
    bestFor: 'Post-exam enrichment',
    classSize: 'Up to 40',
    icon: Clock,
  },
  {
    name: 'Build Sprint',
    duration: '3 days',
    bestFor: 'Holiday programmes',
    classSize: '20-30',
    icon: Calendar,
  },
  {
    name: 'Studio Programme',
    duration: '1-2 weeks',
    bestFor: 'Semester breaks',
    classSize: '15-25',
    icon: Users,
  },
];

const tracks = [
  { name: 'Portfolio Builder', icon: Briefcase, description: 'Create a personal portfolio website' },
  { name: 'Game Builder', icon: Palette, description: 'Design and build interactive games' },
  { name: 'Problem Solver', icon: Lightbulb, description: 'Tackle real-world challenges' },
];

const ProgrammeFormatsSlide = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-7 h-7 text-primary" />
          <span className="text-primary uppercase tracking-widest text-lg font-semibold">For Schools</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-10 text-foreground">
          Programme <span className="text-primary">Formats</span>
        </h2>

        {/* Formats Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-10 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left p-5 text-muted-foreground font-medium text-lg">Format</th>
                <th className="text-left p-5 text-muted-foreground font-medium text-lg">Duration</th>
                <th className="text-left p-5 text-muted-foreground font-medium text-lg">Best For</th>
                <th className="text-left p-5 text-muted-foreground font-medium text-lg">Class Size</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((format, index) => (
                <tr 
                  key={format.name}
                  className={index < formats.length - 1 ? 'border-b border-border' : ''}
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <format.icon className="w-6 h-6 text-primary" />
                      <span className="font-medium text-foreground text-lg">{format.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-primary font-semibold text-lg">{format.duration}</td>
                  <td className="p-5 text-muted-foreground text-lg">{format.bestFor}</td>
                  <td className="p-5 text-muted-foreground text-lg">{format.classSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Build Tracks */}
        <div>
          <h3 className="text-xl text-muted-foreground mb-5">Build Tracks Available</h3>
          <div className="flex flex-wrap gap-5">
            {tracks.map((track) => (
              <div 
                key={track.name}
                className="inline-flex items-center gap-4 px-6 py-4 bg-primary/10 border border-primary/30 rounded-full"
              >
                <track.icon className="w-6 h-6 text-primary" />
                <span className="font-medium text-foreground text-lg">{track.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default ProgrammeFormatsSlide;
