import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type Stat = { value: string; label: string };

type StatBarProps = {
  stats: Stat[];
  className?: string;
};

export function StatBar({ stats, className }: StatBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-6 md:py-8",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <Fragment key={`${stat.value}-${stat.label}`}>
          <div className="flex flex-col items-center">
            <div className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">
              {stat.label}
            </div>
          </div>
          {i < stats.length - 1 ? (
            <div
              aria-hidden="true"
              className="hidden h-8 w-px bg-border md:block"
            />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
