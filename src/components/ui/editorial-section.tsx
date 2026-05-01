import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EditorialSectionProps = {
  children: ReactNode;
  className?: string;
};

export function EditorialSection({ children, className }: EditorialSectionProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[640px] text-lg leading-[1.7] text-foreground/90",
        "[&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-tight",
        "[&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-10 [&_h3]:mb-3",
        "[&_p]:mb-6 [&_p]:leading-[1.7]",
        "[&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
