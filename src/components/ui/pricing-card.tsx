import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PricingCardProps = {
  name: string;
  priceFrom: string;
  unit?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  className?: string;
};

export function PricingCard({
  name,
  priceFrom,
  unit,
  description,
  features,
  ctaLabel,
  ctaHref,
  featured = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-md",
        featured ? "border-primary border-2" : "border-border",
        className,
      )}
    >
      <h3 className="font-display text-xl font-bold tracking-tight">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tracking-tight">
          {priceFrom}
        </span>
        {unit ? <span className="text-sm text-muted-foreground">{unit}</span> : null}
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex-1" />
      <Button asChild variant={featured ? "default" : "outline"} className="w-full">
        <Link to={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
