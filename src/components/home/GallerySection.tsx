import { SectionHeader } from "@/components/ui/section-header";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const moments = [
  {
    title: "Build Sprints",
    description: "Students pick a real problem, scope it down, and ship a working feature in a single session — learning to make trade-offs under time pressure.",
    emoji: "⏱️",
    iconClassName: "bg-primary/15",
    activeClassName: "border-primary shadow-[0_0_40px_hsl(24_95%_53%/0.18)]",
    previews: [
      {
        title: "CCA Sign-up Tracker",
        imageSrc: "/student-projects/cca-signup-tracker.svg",
        imageAlt: "Example project: CCA Sign-up Tracker interface with tables and filters.",
        studentLine: "Example project • Productivity",
      },
      {
        title: "EcoTracker",
        imageSrc: "/student-projects/ecotracker.svg",
        imageAlt: "Example project: EcoTracker dashboard with a sustainability meter and breakdown.",
        studentLine: "Example project • Environment",
      },
      {
        title: "Study Planner",
        imageSrc: "/student-projects/study-planner.svg",
        imageAlt: "Example project: Study Planner calendar and task checklist.",
        studentLine: "Example project • Education",
      },
    ],
  },
  {
    title: "Prompt Craft",
    description: "Students learn to write specific prompts, verify what the AI generates, and debug when the output doesn't match their intent.",
    emoji: "✨",
    iconClassName: "bg-primary/15",
    activeClassName: "border-primary shadow-[0_0_40px_hsl(24_95%_53%/0.18)]",
    previews: [
      {
        title: "Study Buddy AI",
        imageSrc: "/student-projects/study-buddy-ai.svg",
        imageAlt: "Example project: Study Buddy AI flashcard interface with spaced repetition controls.",
        studentLine: "Example project • AI + Education",
      },
      {
        title: "MusicMood",
        imageSrc: "/student-projects/musicmood.svg",
        imageAlt: "Example project: MusicMood mood sliders and playlist generation screen.",
        studentLine: "Example project • Creative",
      },
      {
        title: "EcoTracker",
        imageSrc: "/student-projects/ecotracker.svg",
        imageAlt: "Example project: EcoTracker dashboard with a sustainability meter and breakdown.",
        studentLine: "Example project • Environment",
      },
    ],
  },
  {
    title: "Peer Code Reviews",
    description: "Students explain their design decisions to peers, receive feedback on UX and logic, and practise giving constructive critique.",
    emoji: "💬",
    iconClassName: "bg-primary/15",
    activeClassName: "border-primary shadow-[0_0_40px_hsl(24_95%_53%/0.18)]",
    previews: [
      {
        title: "Simple Marketplace",
        imageSrc: "/student-projects/simple-marketplace.svg",
        imageAlt: "Example project: Simple Marketplace listings and chat interface.",
        studentLine: "Example project • E-commerce",
      },
      {
        title: "CCA Sign-up Tracker",
        imageSrc: "/student-projects/cca-signup-tracker.svg",
        imageAlt: "Example project: CCA Sign-up Tracker interface with tables and filters.",
        studentLine: "Example project • Productivity",
      },
      {
        title: "Study Planner",
        imageSrc: "/student-projects/study-planner.svg",
        imageAlt: "Example project: Study Planner calendar and task checklist.",
        studentLine: "Example project • Education",
      },
    ],
  },
  {
    title: "Show & Tell",
    description: "Students present their builds to a small group — explaining the problem they chose, what they built, and what they'd improve next.",
    emoji: "🎤",
    iconClassName: "bg-primary/15",
    activeClassName: "border-primary shadow-[0_0_40px_hsl(24_95%_53%/0.18)]",
    previews: [
      {
        title: "MusicMood",
        imageSrc: "/student-projects/musicmood.svg",
        imageAlt: "Example project: MusicMood mood sliders and playlist generation screen.",
        studentLine: "Example project • Creative",
      },
      {
        title: "Study Buddy AI",
        imageSrc: "/student-projects/study-buddy-ai.svg",
        imageAlt: "Example project: Study Buddy AI flashcard interface with spaced repetition controls.",
        studentLine: "Example project • AI + Education",
      },
      {
        title: "Simple Marketplace",
        imageSrc: "/student-projects/simple-marketplace.svg",
        imageAlt: "Example project: Simple Marketplace listings and chat interface.",
        studentLine: "Example project • E-commerce",
      },
    ],
  },
] as const;

export function GallerySection() {
  const tabBaseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMoment = moments[activeIndex];

  function setActive(nextIndex: number) {
    const normalized = ((nextIndex % moments.length) + moments.length) % moments.length;
    setActiveIndex(normalized);
  }

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-48 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-secondary/70 via-secondary/30 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Community"
          title="Learning in Action"
          description="What it feels like inside a Vibemakers session—build sprints, prompt-craft, peer feedback, and demo moments."
        />

        <div className="relative mt-10 md:mt-14 max-w-7xl mx-auto grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-label="Inside a Vibemakers session"
              className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:block lg:space-y-3 lg:overflow-visible"
            >
              {moments.map((moment, index) => {
                const isActive = index === activeIndex;
                const tabId = `${tabBaseId}-tab-${index}`;
                const panelId = `${tabBaseId}-panel`;

                return (
                  <button
                    key={moment.title}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                        event.preventDefault();
                        setActive(index + 1);
                      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                        event.preventDefault();
                        setActive(index - 1);
                      }
                    }}
                    className={cn(
                      "group w-[18rem] shrink-0 text-left lg:w-full rounded-2xl border bg-card/70 backdrop-blur-sm px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive ? moment.activeClassName : "border-border/60 hover:border-border",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl", moment.iconClassName)}>
                        {moment.emoji}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-semibold text-foreground">{moment.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {moment.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              id={`${tabBaseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${tabBaseId}-tab-${activeIndex}`}
              tabIndex={0}
              className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-4 md:p-6 shadow-sm"
            >
              <div className="grid gap-4 sm:grid-cols-5 sm:grid-rows-2 sm:h-[420px]">
                {activeMoment.previews.map((preview, index) => (
                  <div
                    key={`${activeMoment.title}-${preview.title}`}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background to-muted/30",
                      "aspect-[16/10] sm:aspect-auto sm:h-full",
                      index === 0 ? "sm:col-span-3 sm:row-span-2" : "sm:col-span-2",
                    )}
                  >
                    {/* Faux window chrome */}
                    <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </div>

                    <img
                      src={preview.imageSrc}
                      alt={preview.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                        <span className="font-medium text-foreground/90">{preview.title}</span>
                        <span aria-hidden="true">•</span>
                        <span className="truncate">{preview.studentLine}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl text-2xl", activeMoment.iconClassName)}>
                    {activeMoment.emoji}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{activeMoment.title}</p>
                    <p className="text-sm text-muted-foreground">{activeMoment.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {moments.map((moment, index) => (
                    <button
                      key={`${moment.title}-dot`}
                      type="button"
                      onClick={() => setActive(index)}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full border border-border transition-all",
                        index === activeIndex ? "bg-foreground/60" : "bg-background hover:bg-muted",
                      )}
                      aria-label={`Show ${moment.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}