import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import all slides
import TitleSlide from './slides/TitleSlide';
import OpportunitySlide from './slides/OpportunitySlide';
import WhoWeAreSlide from './slides/WhoWeAreSlide';
import SchoolPartnersSlide from './slides/SchoolPartnersSlide';
import WhatIsVibeCodingSlide from './slides/WhatIsVibeCodingSlide';
import ToolsWeUseSlide from './slides/ToolsWeUseSlide';
import MethodologySlide from './slides/MethodologySlide';
import StudentProjectsSlide from './slides/StudentProjectsSlide';
import SkillsSlide from './slides/SkillsSlide';
import ProgrammeFormatsSlide from './slides/ProgrammeFormatsSlide';
import HackathonSlide from './slides/HackathonSlide';
import CTASlide from './slides/CTASlide';

const slides = [
  { id: 'title', component: TitleSlide, name: 'Title' },
  { id: 'opportunity', component: OpportunitySlide, name: 'The Opportunity' },
  { id: 'what-is-vibe', component: WhatIsVibeCodingSlide, name: 'What is Vibe Coding?' },
  { id: 'tools', component: ToolsWeUseSlide, name: 'The Power of AI Tools' },
  { id: 'methodology', component: MethodologySlide, name: 'V.I.B.E. Methodology' },
  { id: 'projects', component: StudentProjectsSlide, name: 'Student Projects' },
  { id: 'skills', component: SkillsSlide, name: '21CC Skills' },
  { id: 'formats', component: ProgrammeFormatsSlide, name: 'Programme Formats' },
  { id: 'who-we-are', component: WhoWeAreSlide, name: 'Who We Are' },
  { id: 'partners', component: SchoolPartnersSlide, name: 'School Partners' },
  { id: 'hackathon', component: HackathonSlide, name: 'Hackathon' },
  { id: 'cta', component: CTASlide, name: "Let's Partner" },
];

const TeacherSlideDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, []);

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && slideContainerRef.current) {
      slideContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, isFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div id="slide-deck-preview" className="relative">
      {/* Slide Container - 16:9 Aspect Ratio, this element goes fullscreen */}
      <div 
        ref={slideContainerRef}
        className={cn(
          "relative overflow-hidden bg-background",
          isFullscreen 
            ? "!fixed !inset-0 !w-screen !h-screen !rounded-none !z-[9999]" 
            : "w-full rounded-lg shadow-2xl"
        )}
        style={!isFullscreen ? { aspectRatio: '16/9' } : undefined}
      >
        {/* Slide Content */}
        <div className="absolute inset-0 w-full h-full">
          <CurrentSlideComponent />
        </div>

        {/* Navigation Arrows (visible on hover) */}
        <div className="absolute inset-y-0 left-0 flex items-center opacity-0 hover:opacity-100 transition-opacity z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="ml-4 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center opacity-0 hover:opacity-100 transition-opacity z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="mr-4 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-30"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        {/* Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity z-10"
        >
          {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </Button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/30 rounded-full text-white text-sm font-medium z-10">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Progress Dots - hidden in fullscreen */}
      {!isFullscreen && (
        <>
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  index === currentSlide 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                title={slide.name}
              />
            ))}
          </div>

          {/* Slide Name */}
          <p className="text-center text-sm text-muted-foreground mt-2">
            {slides[currentSlide].name}
          </p>

          {/* Keyboard Hints */}
          <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>← → Navigate</span>
            <span>F Fullscreen</span>
            <span>Space Next</span>
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherSlideDeck;
