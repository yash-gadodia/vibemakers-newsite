import { cn } from "@/lib/utils";

export type SchoolLogo = {
  name: string;
  logo: string;
};

type SchoolLogosGridProps = {
  schools: SchoolLogo[];
  heading?: string;
  className?: string;
};

export function SchoolLogosGrid({ schools, heading, className }: SchoolLogosGridProps) {
  return (
    <div className={cn("w-full", className)}>
      {heading ? (
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {heading}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {schools.map((school) => (
          <div key={school.name} className="flex h-16 items-center justify-center">
            <img
              src={school.logo}
              alt={school.name}
              loading="lazy"
              className="max-h-12 max-w-[140px] object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
