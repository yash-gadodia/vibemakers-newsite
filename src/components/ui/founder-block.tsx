import { cn } from "@/lib/utils";

type FounderBlockProps = {
  photo: string;
  name: string;
  role: string;
  bio: string;
  signature?: string;
  layout?: "horizontal" | "vertical";
  className?: string;
};

export function FounderBlock({
  photo,
  name,
  role,
  bio,
  signature,
  layout = "horizontal",
  className,
}: FounderBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-8",
        layout === "horizontal"
          ? "flex flex-col gap-6 md:flex-row md:items-start md:gap-8"
          : "flex flex-col gap-6",
        className,
      )}
    >
      <img
        src={photo}
        alt={name}
        loading="lazy"
        className={cn(
          "rounded-md object-cover",
          layout === "horizontal" ? "h-32 w-32 md:h-40 md:w-40" : "h-40 w-40",
        )}
      />
      <div className="flex-1">
        <div className="font-display text-xl font-bold tracking-tight">{name}</div>
        <div className="mt-1 text-sm font-medium text-primary">{role}</div>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">{bio}</p>
        {signature ? (
          <p className="mt-4 font-display text-base italic text-foreground/70">
            {signature}
          </p>
        ) : null}
      </div>
    </div>
  );
}
