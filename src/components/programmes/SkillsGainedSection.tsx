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
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        {/* Header */}
        <Reveal variant="up">
          <div className="mb-12">
            <span className="vm-sticker" style={{ transform: 'rotate(3deg)' }}>
              ● Skills
            </span>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6">
              What Skills Students Gain
            </h2>
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
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 md:p-8 flex items-center justify-between gap-6 shadow-sticker">
            <div>
              <h3 className="font-display font-bold text-lg md:text-xl mb-2">
                {responsibleAI.title}
              </h3>
              <p className="text-primary-foreground/90 text-sm md:text-base">{responsibleAI.subtitle}</p>
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
        "vm-card rounded-2xl p-6 md:p-6 h-full relative overflow-hidden transition-all border",
        heightClass,
        featured
          ? "bg-foreground border-foreground"
          : tinted
            ? "bg-bg-warm-2 border-border"
            : "bg-card border-border",
      )}
    >
      {/* Decorative star for featured card */}
      {featured && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.12]">
          <span className="text-[10rem] leading-none">⭐</span>
        </div>
      )}

      <div className="relative z-10">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
            featured ? "bg-primary-foreground/10" : "bg-primary/10",
          )}
        >
          <span className="text-2xl">{skill.emoji}</span>
        </div>
        <h3
          className={cn(
            "font-display font-bold mb-2 text-base md:text-lg",
            featured ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {skill.title}
        </h3>
        <p className={cn("font-sans text-sm", featured ? "text-primary-foreground/75" : "text-ink-2")}>
          {skill.subtitle}
        </p>
      </div>
    </div>
  );
}
