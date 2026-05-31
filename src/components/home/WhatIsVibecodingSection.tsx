import { SectionHeader } from "@/components/ui/section-header";
import { SectionBand } from "@/components/ui/section-band";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { Reveal } from "@/components/ui/Reveal";

function StudentVisual() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const steps = useMemo(
    () => [
      {
        id: "idea",
        title: "Idea",
        subtitle: "Identify a problem.",
        content: (
          <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm italic text-muted-foreground">
            "Make a study planner that reminds me what to revise today…"
          </div>
        ),
      },
      {
        id: "prototype",
        title: "Prototype",
        subtitle: "Prompt → prototype",
        content: (
          <div className="bg-foreground text-green-400 font-mono text-xs rounded-lg p-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-background/40">&gt;</span>
              <span>Generating UI elements...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-background/40">&gt;</span>
              <span className="text-white">First version: good enough to demo</span>
            </div>
          </div>
        ),
      },
      {
        id: "improve",
        title: "Improve",
        subtitle: "Iterate based on feedback.",
        content: (
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center min-w-[80px]">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Today</div>
              <div className="text-3xl font-bold text-primary">42</div>
              <div className="text-xs text-muted-foreground">days to exam</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Iterate based on feedback.
            </div>
          </div>
        ),
      },
    ],
    []
  );

  // Auto-cycle through steps
  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, steps.length]);

  const getStepStatus = (index: number) => {
    if (index < activeStep) return "done";
    if (index === activeStep) return "now";
    return "next";
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPaused(true);
    // Resume auto-cycle after 6 seconds
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <motion.div
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Learning Loop
          </span>
          <span className="text-sm text-muted-foreground">
            FROM IDEA → PROTOTYPE → IMPROVEMENT
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6 space-y-0">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className="flex gap-4 cursor-pointer group"
              onClick={() => handleStepClick(index)}
            >
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <motion.div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    status === "done" && "bg-primary text-white",
                    status === "now" && "border-2 border-primary bg-card",
                    status === "next" && "border border-border bg-card"
                  )}
                  animate={shouldReduceMotion ? undefined : {
                    scale: status === "now" ? 1.1 : 1,
                  }}
                >
                  {status === "done" && (
                    <Check className="w-4 h-4" />
                  )}
                  {status === "now" && (
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                {/* Connecting line */}
                {!isLast && (
                  <div className={cn(
                    "w-0.5 flex-1 min-h-[60px]",
                    index < activeStep ? "bg-primary/50" : "bg-border"
                  )} />
                )}
              </div>

              {/* Step content */}
              <div className={cn(
                "flex-1 pb-6 transition-all duration-300",
                !isLast && "border-b border-transparent"
              )}>
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className={cn(
                    "font-semibold transition-colors",
                    status === "now" ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </h4>
                  <span className={cn(
                    "text-xs font-medium px-2.5 py-0.5 rounded-full transition-all",
                    status === "done" && "text-primary bg-primary/10",
                    status === "now" && "text-primary bg-primary/10",
                    status === "next" && "text-muted-foreground bg-muted"
                  )}>
                    {status === "done" ? "Done" : status === "now" ? "Now" : "Next"}
                  </span>
                </div>

                {/* Subtitle */}
                {step.id !== "improve" && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.subtitle}
                  </p>
                )}

                {/* Content - fixed height container to prevent layout shift */}
                <div className="min-h-[72px]">
                  <AnimatePresence mode="wait">
                    {status === "now" && (
                      <motion.div
                        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        {step.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="px-6 pb-4 pt-0">
        <p className="text-xs text-muted-foreground text-center">
          Click a step
        </p>
      </div>
    </motion.div>
  );
}

export function WhatIsVibecodingSection() {
  return (
    <SectionBand tone="base">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Left: Explanation + outcomes panel */}
        <Reveal variant="left">
          <div className="max-w-xl">
            <SectionHeader
              align="left"
              badge="Product Thinking"
              title="The V.I.B.E. Cycle"
              subtitle="V = Vision • I = Ideate • B = Build • E = Evolve"
              description="Our design thinking methodology adapted for AI-first building. Each phase develops specific 21CC competencies, from empathising with users to presenting and defending solutions."
              className="max-w-none"
            />

            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">Outcomes to achieve</h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                Students develop self-directed learning habits: framing problems, evaluating trade-offs, and iterating on feedback. AI accelerates the build cycle so more time is spent on thinking, not syntax.
              </p>
            </div>

            <Link 
              to="/programme" 
              className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View in detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* Right: Learning Loop visual only */}
        <Reveal variant="right" delayMs={100}>
          <ParallaxSection speed={0.06} offset={25}>
            <StudentVisual />
          </ParallaxSection>
        </Reveal>
      </div>
    </SectionBand>
  );
}
