import { cn } from "@/lib/utils";
interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "filled" | "outline";
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}
export function SectionHeader({
  badge,
  badgeVariant = "filled",
  title,
  subtitle,
  description,
  align = "center",
  className
}: SectionHeaderProps) {
  return <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {badge && <span className={cn(
        "inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wide uppercase",
        badgeVariant === "filled" 
          ? "rounded-full bg-primary text-primary-foreground" 
          : "rounded border border-primary text-primary bg-white/80 backdrop-blur-sm"
      )}>
          {badge}
        </span>}
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance",
        subtitle ? "mb-2" : "mb-4"
      )}>
        {title}
      </h2>
      {subtitle && <p className="text-sm md:text-base text-muted-foreground mb-4">
          {subtitle}
        </p>}
      {description && <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>}
    </div>;
}
