import { cn } from "@/lib/utils";

type StudentWorkCardProps = {
  screenshot: string;
  projectName: string;
  outcome: string;
  builder: string;
  school: string;
  className?: string;
};

export function StudentWorkCard({
  screenshot,
  projectName,
  outcome,
  builder,
  school,
  className,
}: StudentWorkCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md",
        className,
      )}
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={screenshot}
          alt={`${projectName} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold tracking-tight">{projectName}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">{outcome}</p>
        <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{builder}</span>
          <span className="mx-2">·</span>
          <span>{school}</span>
        </div>
      </div>
    </article>
  );
}
