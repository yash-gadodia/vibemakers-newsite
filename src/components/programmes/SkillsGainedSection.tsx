import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";

interface Skill {
  emoji: string;
  title: string;
  subtitle: string;
}

const topRowSkills: Skill[] = [
  {
    emoji: "🧩",
    title: "Applied problem-solving",
    subtitle: "Tackle real-world problems in authentic settings",
  },
  {
    emoji: "💬",
    title: "Communication",
    subtitle: "Explain your ideas and thinking clearly",
  },
  {
    emoji: "📖",
    title: "Self-directed learning",
    subtitle: "Set goals and manage learning independently",
  },
  {
    emoji: "🔍",
    title: "Distil & Discern",
    subtitle: "Evaluate AI outputs and identify bias",
  },
];

const bottomRowSkills: Skill[] = [
  {
    emoji: "🤝",
    title: "Collaborative learning",
    subtitle: "Co-construct and share knowledge",
  },
  {
    emoji: "⭐",
    title: "Creative confidence",
    subtitle: "Trust your ideas",
  },
  {
    emoji: "🎤",
    title: "Presentation skills",
    subtitle: "Demo your work with confidence",
  },
];

const responsibleAI = {
  emoji: "🤖",
  title: "Digital Literacy & Responsible AI",
  subtitle: "Understand AI bias, societal implications, and Cyber Wellness — use AI as a power tool, not a crutch",
};

export function SkillsGainedSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Reveal variant="up">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold">What Skills Students Gain</h2>
          </div>
        </Reveal>

        {/* Top Row: Wide + Medium + Medium + Small */}
        <RevealGroup staggerMs={80} variant="up" className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          {/* Structured problem-solving - spans 2 columns */}
          <div className="md:col-span-2">
            <SkillCard skill={topRowSkills[0]} size="large" />
          </div>
          {/* Communication - spans 2 columns */}
          <div className="md:col-span-2">
            <SkillCard skill={topRowSkills[1]} size="medium" tinted />
          </div>
          {/* Self-directed learning - spans 2 columns */}
          <div className="md:col-span-2">
            <SkillCard skill={topRowSkills[2]} size="medium" />
          </div>
        </RevealGroup>

        {/* Middle Row: Distil + Creative confidence + Presentation */}
        <RevealGroup staggerMs={80} variant="up" className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          {/* Distil & Discern - spans 2 columns */}
          <div className="md:col-span-2">
            <SkillCard skill={topRowSkills[3]} size="medium" tinted />
          </div>
          {/* Creative confidence - spans 2 columns, dark featured */}
          <div className="md:col-span-2">
            <SkillCard skill={bottomRowSkills[1]} size="large" featured />
          </div>
          {/* Presentation skills - spans 2 columns */}
          <div className="md:col-span-2">
            <SkillCard skill={bottomRowSkills[2]} size="medium" />
          </div>
        </RevealGroup>

        {/* Bottom Row: Collaborative learning full width */}
        <Reveal variant="up">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            {/* Collaborative learning - spans full width */}
            <div className="md:col-span-6">
              <SkillCard skill={bottomRowSkills[0]} size="medium" />
            </div>
          </div>
        </Reveal>

        {/* Responsible AI Banner */}
        <Reveal variant="up" delayMs={100}>
          <div className="bg-gradient-to-r from-primary via-primary to-[hsl(10,80%,55%)] rounded-2xl p-6 md:p-8 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-lg md:text-xl font-display font-bold text-primary-foreground mb-1">
                {responsibleAI.title}
              </h3>
              <p className="text-primary-foreground/80 text-sm md:text-base">{responsibleAI.subtitle}</p>
            </div>
            <div className="hidden sm:flex w-14 h-14 rounded-full bg-primary-foreground/20 items-center justify-center flex-shrink-0">
              <span className="text-2xl">{responsibleAI.emoji}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: Skill;
  size?: "small" | "medium" | "large";
  featured?: boolean;
  tinted?: boolean;
}

function SkillCard({ skill, size = "medium", featured, tinted }: SkillCardProps) {
  const heightClass = size === "large" ? "min-h-[180px]" : size === "medium" ? "min-h-[160px]" : "min-h-[140px]";

  return (
    <div
      className={cn(
        "rounded-2xl p-5 md:p-6 h-full relative overflow-hidden transition-all",
        heightClass,
        featured
          ? "bg-foreground"
          : tinted
            ? "bg-[hsl(28_55%_95%)] border border-border/30"
            : "bg-white/70 border border-border/40",
      )}
    >
      {/* Decorative star for featured card */}
      {featured && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.14]">
          <span className="text-[10rem] leading-none">⭐</span>
        </div>
      )}

      <div className="relative z-10">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
            featured ? "bg-background/10" : "bg-white",
          )}
        >
          <span className="text-2xl">{skill.emoji}</span>
        </div>
        <h3
          className={cn(
            "font-display font-bold mb-1 text-base md:text-lg",
            featured ? "text-white" : "text-foreground",
          )}
        >
          {skill.title}
        </h3>
        <p className={cn("text-sm", featured ? "text-background/60" : "text-muted-foreground")}>
          {skill.subtitle}
        </p>
      </div>
    </div>
  );
}
