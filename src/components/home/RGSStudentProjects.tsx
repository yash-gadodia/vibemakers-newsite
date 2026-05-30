import { Reveal } from "@/components/ui/Reveal";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { BrutalSticker } from "@/components/ui/brutal-sticker";

const projects = [
  {
    title: "Caffeine & Memory",
    user: "Sec 2 student, RGS",
    problem: "Does a small dose of caffeine improve short-term memory in teenagers?",
    deliverable: "Randomised controlled trial with 20 peers, measuring digit-span recall. GPT-4o hypothesis frame, Claude debug partner for statistical analysis.",
  },
  {
    title: "Can AI Detect Fake News?",
    user: "Sec 3 student, RGS",
    problem: "90% of MOE students use generative AI weekly. Most can't tell when it's wrong.",
    deliverable: "Head-to-head accuracy test: GPT-4o vs Gemini Pro on 30 Singapore-context headlines (15 real, 15 fabricated). Result: GPT-4o 73%, Gemini 63%, human baseline 87%.",
  },
  {
    title: "Microplastics in Singapore Water",
    user: "Sec 4 student, RGS",
    problem: "Singaporeans drink 120 million litres of bottled water annually. Is tap water actually cleaner?",
    deliverable: "Comparative microplastic count: 3 tap sources vs 5 bottled brands (filtered, stained with Nile Red, counted under school microscope). Finding: bottled water averaged 8.8× more particles per litre.",
  },
];

export function RGSStudentProjects() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <Reveal variant="up">
          <div className="text-center mb-10">
            <BrutalSticker tone="yellow" rotate={-2}>
              ● Student work
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-4">
              From Vibe Makers to Real Research
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              Three RGS students turned design thinking + AI tools into research decks. Each one shipped a real deliverable tied to their existing schoolwork.
            </p>
          </div>
        </Reveal>

        <RevealGroup variant="up" delayMs={120} staggerMs={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="vm-card rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-1">
                  {p.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 mb-4">
                  {p.user}
                </p>
                <p className="font-sans text-sm text-ink-2 mb-4 font-semibold">
                  {p.problem}
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  <strong>Deliverable:</strong> {p.deliverable}
                </p>
              </div>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
