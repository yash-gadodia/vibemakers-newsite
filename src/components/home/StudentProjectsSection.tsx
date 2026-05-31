import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { Reveal } from "@/components/ui/Reveal";

const exampleProjects = [
  {
    title: "Personal Portfolio",
    description: "A polished portfolio site to showcase achievements, CCAs, and future goals.",
    gradient: "from-primary to-accent",
    screenshotSrc: "/student-projects/portfolio.svg",
    screenshotAlt: "Portfolio website with hero section, about me, and projects grid.",
    tags: ["Portfolio", "Personal Branding"],
    difficulty: "Beginner" as const,
  },
  {
    title: "Study Planner",
    description: "Calendar view with task checklist for exam prep and daily study goals.",
    gradient: "from-accent to-primary",
    screenshotSrc: "/student-projects/study-planner.svg",
    screenshotAlt: "Study Planner app showing a weekly calendar and today's checklist.",
    tags: ["Productivity", "Planning"],
    difficulty: "Beginner" as const,
  },
  {
    title: "Study Buddy AI",
    description: "AI-powered flashcard app with spaced repetition for faster memorization.",
    gradient: "from-primary/80 to-accent/90",
    screenshotSrc: "/student-projects/study-buddy-ai.svg",
    screenshotAlt: "Study Buddy AI showing flashcard prompt and difficulty buttons.",
    tags: ["AI", "Education"],
    difficulty: "Intermediate" as const,
  },
  {
    title: "CCA Tracker",
    description: "Manage CCA registrations with tables, filters, and status tracking.",
    gradient: "from-accent/80 to-primary",
    screenshotSrc: "/student-projects/cca-signup-tracker.svg",
    screenshotAlt: "CCA Tracker with table view, filters, and signup statuses.",
    tags: ["Productivity", "School"],
    difficulty: "Intermediate" as const,
  },
  {
    title: "Simple Marketplace",
    description: "Buy/sell platform with product cards, search, and chat features.",
    gradient: "from-primary to-primary/70",
    screenshotSrc: "/student-projects/simple-marketplace.svg",
    screenshotAlt: "Marketplace app with listings grid and chat inbox.",
    tags: ["E-commerce", "Social"],
    difficulty: "Advanced" as const,
  },
  {
    title: "EcoTracker",
    description: "Carbon footprint calculator that gamifies sustainability tracking.",
    gradient: "from-accent to-primary/80",
    screenshotSrc: "/student-projects/ecotracker.svg",
    screenshotAlt: "EcoTracker dashboard with carbon meter and weekly breakdown.",
    tags: ["Environment", "Gamification"],
    difficulty: "Intermediate" as const,
  },
];

export function StudentProjectsSection() {
  return (
    <section id="student-projects" className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <ParallaxSection speed={0.08} offset={30}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
                What You Could Build
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Projects you'll create.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From portfolios to productivity tools: see the kinds of apps students build in our programmes.
              </p>
            </div>
          </ParallaxSection>
        </Reveal>

        <Reveal variant="up" delayMs={150}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {exampleProjects.map((project, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <div className="group h-full bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Project preview header */}
                      <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                        <img
                          src={project.screenshotSrc}
                          alt={project.screenshotAlt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative z-10 p-4 flex justify-end">
                          <div className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm">
                            <ExternalLink className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Project info */}
                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Difficulty badge */}
                        <div className="pt-4 border-t border-border/50">
                          <span className={cn(
                            "px-3 py-1 text-xs font-medium rounded-full",
                            project.difficulty === "Beginner" && "bg-primary/10 text-primary",
                            project.difficulty === "Intermediate" && "bg-accent/10 text-accent",
                            project.difficulty === "Advanced" && "bg-foreground/10 text-foreground"
                          )}>
                            {project.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white border-border hover:bg-muted" />
              <CarouselNext className="static translate-y-0 bg-white border-border hover:bg-muted" />
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
