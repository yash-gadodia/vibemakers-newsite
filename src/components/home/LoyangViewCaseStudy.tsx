import { Reveal } from "@/components/ui/Reveal";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import lvssW101 from "@/assets/gallery/lvss-w1-01.jpg";
import lvssW102 from "@/assets/gallery/lvss-w1-02.jpg";
import lvssW103 from "@/assets/gallery/lvss-w1-03.jpg";
import lvssW104 from "@/assets/gallery/lvss-w1-04.jpg";

const outcomes = [
  { value: "50", label: "students across 2 parallel classes" },
  { value: "3", label: "sessions · 10 contact hours total" },
  { value: "May–June", label: "2026" },
];

export function LoyangViewCaseStudy() {
  return (
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <Reveal variant="up">
          <div className="text-center mb-10">
            <BrutalSticker tone="yellow" rotate={3}>
              ● Recent delivery
            </BrutalSticker>
            <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl text-foreground mt-6 mb-4">
              Loyang View Secondary School · May–June 2026
            </h2>
            <p className="font-sans text-ink-2 max-w-2xl mx-auto text-lg">
              50 students across 2 parallel classes · 3 sessions (10 contact hours) · students observed everyday products using the Works/Frustrating/Missing framework, then designed improved versions with AI.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={120}>
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10">
            {outcomes.map((o) => (
              <div key={o.label} className="vm-card rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display font-bold text-3xl md:text-5xl text-primary mb-2">
                  {o.value}
                </p>
                <p className="font-sans text-xs md:text-sm text-ink-2">{o.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <img
              src={lvssW101}
              alt="Loyang View student examining a cyclist water bottle design on iPad, using Gemini to generate product mockups"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
            <img
              src={lvssW102}
              alt="Loyang View student interacting with iPad showing water bottle observation research"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
            <img
              src={lvssW103}
              alt="Instructor teaching the Works/Frustrating/Missing observation framework with a water bottle as the design subject"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
            <img
              src={lvssW104}
              alt="Loyang View classroom during the product observation and design thinking workshop"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-border"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal variant="up" delayMs={280}>
          <div className="vm-card rounded-2xl border border-border bg-bg-warm-2 p-6 md:p-8 mb-10">
            <p className="font-sans text-base md:text-lg text-foreground mb-4">
              <strong>The V.I.B.E. teaching beat:</strong> Students started by observing a real product (a water bottle) through three lenses: <em>Works</em> (what already does the job well), <em>Frustrating</em> (pain points), and <em>Missing</em> (gaps the designer didn't anticipate). This structured observation forced design thinking before tools. Then they used Gemini to explore visual iterations and Lovable to prototype an improved version. Each pair walked out with a working prototype addressing a real user need they'd identified themselves.
            </p>
            {/* Teacher testimonial slot: drop in a real quote from Mr Clement (Loyang View Secondary School) when received. */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
