import { Eye, Lightbulb, Hammer, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    letter: "V",
    name: "Vision",
    subtitle: "Empathise & Define",
    description: "Identify the real problem. Who is it for? What's the change you want?",
    icon: Eye,
  },
  {
    letter: "I",
    name: "Ideate",
    subtitle: "Explore & Decide",
    description: "Generate options, evaluate trade-offs, pick the strongest direction.",
    icon: Lightbulb,
  },
  {
    letter: "B",
    name: "Build",
    subtitle: "Prototype",
    description: "Use AI tools (Lovable, Claude) to ship a working prototype in days.",
    icon: Hammer,
  },
  {
    letter: "E",
    name: "Evolve",
    subtitle: "Test & Improve",
    description: "Test with real users, capture feedback, iterate to a better version.",
    icon: RefreshCw,
  },
] as const;

type MethodologyDiagramProps = { className?: string };

export function MethodologyDiagram({ className }: MethodologyDiagramProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {STAGES.map(({ letter, name, subtitle, description, icon: Icon }) => (
        <div
          key={name}
          className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 font-display text-lg font-bold text-primary">
              {letter}
            </div>
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{name}</h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            {subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{description}</p>
        </div>
      ))}
    </div>
  );
}
