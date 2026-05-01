import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";

type FlowStep = {
  emoji: string;
  label: string;
};

type FormatAccent = "primary" | "secondary";

type ProgramFormat = {
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
  flow: FlowStep[];
  features: string[];
  cta: string;
  ctaLink: string;
  accent: FormatAccent;
};

const formats: ProgramFormat[] = [
  {
    title: "For Parents",
    subtitle: "Private Classes",
    emoji: "👨‍👩‍👧",
    description: "Small-group private classes with personalised attention and project-based learning.",
    flow: [
      { emoji: "📅", label: "6–9 months" },
      { emoji: "👥", label: "Max 8 / class" },
      { emoji: "🎓", label: "Portfolio + cert" },
    ],
    features: [
      "6-9 month programme (can extend)",
      "Small class sizes (max 8 students)",
      "Individual project portfolio",
      "Certificate upon completion",
    ],
    cta: "View Private Classes",
    ctaLink: "/parents",
    accent: "primary",
  },
  {
    title: "For Schools",
    subtitle: "School Workshops",
    emoji: "🏫",
    description: "Flexible programmes from 5-hour workshops to semester-long CCAs and ALPs.",
    flow: [
      { emoji: "📅", label: "Flexible dates" },
      { emoji: "⏰", label: "5 hrs → semester" },
      { emoji: "👥", label: "CCA, ALP, Cohort" },
    ],
    features: [
      "CCA, ALP, and cohort-wide options",
      "5-hour workshops to semester-long programmes",
      "Customised to your school's needs",
      "MOE EdTech Masterplan aligned",
    ],
    cta: "Partner With Us",
    ctaLink: "/schools",
    accent: "secondary",
  },
];

function accentTokens(accent: FormatAccent) {
  if (accent === "secondary") {
    return {
      ring: "hover:border-accent/60",
      iconWrap: "bg-accent/10 group-hover:bg-accent",
      strip: "from-accent to-primary",
      flowIconWrap: "bg-accent/10",
    };
  }

  return {
    ring: "hover:border-primary/60",
    iconWrap: "bg-primary/10 group-hover:bg-primary",
    strip: "from-primary to-accent",
    flowIconWrap: "bg-primary/10",
  };
}

function FormatFlow({ steps, accent }: { steps: FlowStep[]; accent: FormatAccent }) {
  const tokens = accentTokens(accent);

  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4 mb-6">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">At a glance</p>

      <div className="relative">
        <div className="absolute left-6 right-6 top-5 h-px bg-border" aria-hidden="true" />
        <div className="grid grid-cols-3 gap-3">
          {steps.map((step) => (
            <div key={step.label} className="relative z-10 flex flex-col items-center text-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm",
                )}
              >
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", tokens.flowIconWrap)}>
                  <span className="text-lg">{step.emoji}</span>
                </div>
              </div>
              <p className="mt-2 text-xs font-medium text-foreground/90 leading-snug">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FormatCard({ format }: { format: ProgramFormat }) {
  const tokens = accentTokens(format.accent);

  return (
    <div
      className={cn(
        "group relative p-6 lg:p-8 bg-card border border-border rounded-2xl hover:shadow-soft transition-all overflow-hidden h-full",
        tokens.ring,
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", tokens.strip)} aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 via-transparent to-secondary/40"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-start gap-4 mb-6">
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all",
              tokens.iconWrap,
            )}
          >
            <span className="text-3xl">{format.emoji}</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">{format.title}</h3>
            <p className="text-sm text-muted-foreground">{format.subtitle}</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">{format.description}</p>

        <FormatFlow steps={format.flow} accent={format.accent} />

        <ul className="space-y-3 mb-8">
          {format.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <span className="text-base shrink-0">✅</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="w-full" asChild>
          <Link to={format.ctaLink}>
            {format.cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function ProgramFormatsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-secondary/70 via-secondary/30 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <SectionHeader
            badge="Ways to Learn"
            title="Pick what works for you"
            description="Individual coaching, group classes, or bring us to your school. All roads lead to shipped projects."
          />
        </Reveal>

        <div className="relative mt-12 max-w-5xl mx-auto">
          {/* Branch diagram */}
          <div className="hidden lg:block pointer-events-none absolute inset-x-0 -top-10 h-40" aria-hidden="true">
            <svg viewBox="0 0 900 160" className="w-full h-full">
              <defs>
                <linearGradient id="pathGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                  <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <path
                d="M450 10 C450 40 450 55 450 70 C450 90 330 100 210 142"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="8 10"
                strokeLinecap="round"
              />
              <path
                d="M450 10 C450 40 450 55 450 70 C450 90 570 100 690 142"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="8 10"
                strokeLinecap="round"
              />
              <circle cx="450" cy="10" r="6" fill="hsl(var(--primary))" opacity="0.5" />
              <circle cx="210" cy="142" r="6" fill="hsl(var(--primary))" opacity="0.35" />
              <circle cx="690" cy="142" r="6" fill="hsl(var(--accent))" opacity="0.35" />
            </svg>
          </div>

          <RevealGroup staggerMs={120} variant="up" className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {formats.map((format) => (
              <FormatCard key={format.title} format={format} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
