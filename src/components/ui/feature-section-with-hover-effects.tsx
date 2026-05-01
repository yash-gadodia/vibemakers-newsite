import * as React from "react";

import { cn } from "@/lib/utils";
import {
  IconAdjustments,
  IconBolt,
  IconBook2,
  IconEye,
} from "@tabler/icons-react";

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function FeaturesSectionWithHoverEffects({
  className,
}: {
  className?: string;
}) {
  const features: FeatureItem[] = [
    {
      title: "Ready-to-run enrichment",
      description: "Pre-built workshops aligned to student readiness and enrichment goals.",
      icon: <IconBook2 className="h-6 w-6" aria-hidden="true" />,
    },
    {
      title: "Customised delivery",
      description: "Adapted to your timetable, cohort profile, and learning objectives.",
      icon: <IconAdjustments className="h-6 w-6" aria-hidden="true" />,
    },
    {
      title: "End-to-end facilitation",
      description: "Planning, delivery, and coordination handled by experienced instructors.",
      icon: <IconBolt className="h-6 w-6" aria-hidden="true" />,
    },
    {
      title: "Optional teacher exposure",
      description: "Teachers can observe or participate without additional prep load.",
      icon: <IconEye className="h-6 w-6" aria-hidden="true" />,
    },
  ];

  return (
    <section className={cn("section-padding", className)}>
      <div className="container mx-auto px-4">
        <header className="max-w-3xl mb-8">
          <h2 className="text-2xl font-display font-bold">What schools get</h2>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Feature
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6",
        "transition-transform duration-300 hover:-translate-y-0.5",
        "focus-within:ring-2 focus-within:ring-primary/30"
      )}
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100"
        )}
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
      </div>

      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
