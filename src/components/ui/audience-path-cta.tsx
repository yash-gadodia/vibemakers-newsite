import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Path = {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type AudiencePathCTAProps = {
  parents: Path;
  schools: Path;
  className?: string;
};

export function AudiencePathCTA({ parents, schools, className }: AudiencePathCTAProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      <PathCard path={parents} variant="default" />
      <PathCard path={schools} variant="outline" />
    </div>
  );
}

function PathCard({ path, variant }: { path: Path; variant: "default" | "outline" }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card p-8 transition-all hover:shadow-md",
        variant === "default" ? "border-primary/30" : "border-border",
      )}
    >
      <h3 className="font-display text-2xl font-bold tracking-tight">{path.heading}</h3>
      <p className="mt-3 flex-1 text-base text-foreground/80">{path.description}</p>
      <Button asChild variant={variant} className="mt-6 self-start">
        <Link to={path.ctaHref} className="inline-flex items-center gap-2">
          {path.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
