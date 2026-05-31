import { MapPin } from "lucide-react";
import singaporeSvgRaw from "@/assets/singapore.svg?raw";
import { useLayoutEffect, useRef, useState } from "react";

type ReachPin = {
  label: string;
  abbr?: string;
  logoSrc?: string;
  xPercent: number;
  yPercent: number;
};

type SingaporeReachMapProps = {
  sinceYear?: string;
  schoolsLabel?: string;
  studentsLabel?: string;
  pins?: ReachPin[];
};

const defaultPins: ReachPin[] = [
  { label: "North", xPercent: 46, yPercent: 30 },
  { label: "North-East", xPercent: 58, yPercent: 36 },
  { label: "Central", xPercent: 48, yPercent: 46 },
  { label: "West", xPercent: 34, yPercent: 52 },
  { label: "East", xPercent: 64, yPercent: 54 },
];

const MAP_VIEWBOX = {
  width: 760,
  height: 340,
} as const;

function extractPathDs(svgRaw: string): string[] {
  return Array.from(svgRaw.matchAll(/<path[^>]*\sd="([^"]+)"/g), (match) => match[1]);
}

const singaporePathDs = extractPathDs(singaporeSvgRaw);

export function SingaporeReachMap({
  sinceYear = "2018",
  schoolsLabel = "50+",
  studentsLabel = "15,000+",
  pins = defaultPins,
}: SingaporeReachMapProps) {
  const mapRef = useRef<SVGGElement | null>(null);
  const [pathTransform, setPathTransform] = useState<string>("");
  const pinRadius = 16;

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    const box = mapRef.current.getBBox();
    if (box.width <= 0 || box.height <= 0) return;

    const paddingX = 48;
    const paddingY = 28;
    const availableWidth = MAP_VIEWBOX.width - paddingX * 2;
    const availableHeight = MAP_VIEWBOX.height - paddingY * 2;
    const scale = Math.min(availableWidth / box.width, availableHeight / box.height);
    const offsetX = paddingX + (availableWidth - box.width * scale) / 2;
    const offsetY = paddingY + (availableHeight - box.height * scale) / 2;

    setPathTransform(
      `translate(${offsetX}, ${offsetY}) scale(${scale}) translate(${-box.x}, ${-box.y})`
    );
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 md:p-8">
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-[3rem] -rotate-12" />
      <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-accent/10 rounded-[3.5rem] rotate-12" />

      <div className="relative">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Singapore Reach
            </p>
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2">
              Islandwide partner schools
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-prose">
              A snapshot of the schools we’ve served across Singapore (primary, secondary, and junior colleges).
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full bg-secondary/60 border border-border px-4 py-2">
            <MapPin className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-foreground">
              {schoolsLabel} schools
            </span>
          </div>
        </div>

        <div className="mt-6 relative rounded-2xl border border-border bg-secondary/30 overflow-hidden h-[240px] sm:h-[280px] md:h-[340px]">
          <div className="absolute inset-0">
            <svg
              viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
              className="w-full h-full"
              role="img"
              aria-label="Illustrated map of Singapore showing islandwide reach"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="sgFill" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="hsl(var(--destructive))" stopOpacity="0.22" />
                  <stop offset="1" stopColor="hsl(var(--destructive))" stopOpacity="0.10" />
                </linearGradient>
                <radialGradient id="sgGlow" cx="50%" cy="50%" r="65%">
                  <stop offset="0" stopColor="hsl(var(--destructive))" stopOpacity="0.18" />
                  <stop offset="1" stopColor="hsl(var(--destructive))" stopOpacity="0" />
                </radialGradient>
                <pattern id="sgGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                  <path
                    d="M 36 0 L 0 0 0 36"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                  />
                </pattern>
                <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="url(#sgGrid)" opacity="0.7" />
              <ellipse cx={380} cy={170} rx={310} ry={160} fill="url(#sgGlow)" />

              {/* Singapore outline (from src/assets/singapore.svg) */}
              {singaporePathDs.length ? (
                <g ref={mapRef} transform={pathTransform || undefined}>
                  {singaporePathDs.map((d, index) => (
                    <path
                      key={index}
                      d={d}
                      fill="url(#sgFill)"
                      stroke="hsl(var(--border))"
                      strokeOpacity="0.55"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
              ) : null}

              {/* Pins */}
              {pins.map((pin) => {
                const cx = (pin.xPercent / 100) * MAP_VIEWBOX.width;
                const cy = (pin.yPercent / 100) * MAP_VIEWBOX.height;
                const clipId = `pinClip-${pin.label.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <g key={pin.label} aria-label={`${pin.label} coverage`}>
                    <title>{pin.label}</title>
                    <defs>
                      <clipPath id={clipId}>
                        <circle cx={cx} cy={cy} r={pinRadius} />
                      </clipPath>
                    </defs>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={pinRadius + 8}
                      fill="hsl(var(--destructive))"
                      opacity="0.10"
                      filter="url(#pinGlow)"
                    />
                    <circle cx={cx} cy={cy} r={pinRadius} fill="hsl(var(--background))" opacity="0.92" />
                    {pin.logoSrc ? (
                      <image
                        href={pin.logoSrc}
                        x={cx - pinRadius}
                        y={cy - pinRadius}
                        width={pinRadius * 2}
                        height={pinRadius * 2}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#${clipId})`}
                      />
                    ) : pin.abbr ? (
                      <text
                        x={cx}
                        y={cy + 5}
                        textAnchor="middle"
                        className="fill-foreground"
                        style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.6 }}
                      >
                        {pin.abbr}
                      </text>
                    ) : null}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={pinRadius}
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeOpacity="0.7"
                      strokeWidth="3"
                    />
                  </g>
                );
              })}

              <text
                x="380"
                y="182"
                textAnchor="middle"
                className="fill-foreground"
                opacity="0.10"
                style={{ fontSize: 52, fontWeight: 800, letterSpacing: 8 }}
              >
                SINGAPORE
              </text>
            </svg>
          </div>

          {/* Metric callouts */}
          <div className="absolute left-4 top-4 rounded-xl bg-background/80 backdrop-blur border border-border px-3 py-2">
            <p className="text-xs text-muted-foreground">Since</p>
            <p className="text-sm font-semibold text-foreground">{sinceYear}</p>
          </div>

          <div className="absolute right-4 top-4 rounded-xl bg-background/80 backdrop-blur border border-border px-3 py-2 text-right">
            <p className="text-xs text-muted-foreground">Partner Schools</p>
            <p className="text-sm font-semibold text-foreground">{schoolsLabel} across SG</p>
          </div>

          <div className="absolute right-4 bottom-4 rounded-xl bg-background/80 backdrop-blur border border-border px-3 py-2 text-right">
            <p className="text-xs text-muted-foreground">Students Reached</p>
            <p className="text-sm font-semibold text-foreground">{studentsLabel}</p>
          </div>

          <div className="absolute left-4 bottom-4 hidden sm:block rounded-xl bg-background/70 backdrop-blur border border-border px-3 py-2">
            <p className="text-xs text-muted-foreground">Coverage</p>
            <p className="text-xs font-medium text-foreground/90">Primary • Secondary • Junior College</p>
          </div>
        </div>
      </div>
    </div>
  );
}
