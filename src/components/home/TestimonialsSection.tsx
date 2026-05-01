import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials, type TestimonialDemographic as Demographic } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";

function getInitials(name: string) {
  const words = name
    .replace(/[.]/g, "")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return `${words[0]![0]}${words[words.length - 1]![0]}`.toUpperCase();
}

const demographicConfig = {
  students: {
    label: "Students",
    emoji: "🎓",
    gradient: "bg-gradient-to-br from-primary to-accent",
  },
  parents: {
    label: "Parents",
    emoji: "👨‍👩‍👧",
    gradient: "bg-gradient-to-br from-accent to-primary",
  },
  teachers: {
    label: "Teachers",
    emoji: "👩‍🏫",
    gradient: "bg-gradient-to-br from-primary/80 to-accent/80",
  },
};

export function TestimonialsSection() {
  const [activeDemographic, setActiveDemographic] = useState<Demographic>("students");

  return (
    <section className="section-padding bg-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Reveal variant="up">
          <div className="text-center mb-10">
            <p className="text-primary text-sm md:text-base font-medium uppercase tracking-widest mb-3">
              Testimonials
            </p>
            <h2 className="text-background font-display font-bold text-2xl md:text-3xl lg:text-4xl text-balance mb-3">
              Don't take our word for it
            </h2>
            <p className="text-background/60 text-base md:text-lg max-w-2xl mx-auto">
              Here's what students, parents, and teachers say about learning with us.
            </p>
          </div>
        </Reveal>

        {/* Demographic Tabs - Pill style */}
        <Reveal variant="up" delayMs={100}>
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-background/10 rounded-full p-1">
              {(Object.keys(demographicConfig) as Demographic[]).map((demo) => {
                const config = demographicConfig[demo];
                const isActive = activeDemographic === demo;

                return (
                  <button
                    key={demo}
                    onClick={() => setActiveDemographic(demo)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-background/60 hover:text-background"
                    }`}
                  >
                    <span>{config.emoji}</span>
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemographic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-4 md:gap-6"
            >
              {testimonials[activeDemographic].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/10 border border-background/20 rounded-2xl p-5 md:p-6 hover:border-primary/50 hover:shadow-[0_0_25px_hsl(24_95%_53%/0.15)] transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        demographicConfig[activeDemographic].gradient
                      }`}
                      aria-hidden="true"
                    >
                      {demographicConfig[activeDemographic].emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-background truncate">{testimonial.name}</p>
                      <p className="text-xs text-background/60 truncate">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-sm text-background/80 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
