import { BrutalSectionHeading } from "@/components/ui/brutal-section-heading";

const benefits = [
  {
    emoji: "🎓",
    title: "Learn Vibe Coding",
    description: "Full workshop included on Day 1 – learn to build with AI tools",
  },
  {
    emoji: "📁",
    title: "Build Portfolio",
    description: "Create a real project you can showcase to universities and employers",
  },
  {
    emoji: "🏆",
    title: "Win Prizes",
    description: "Compete for amazing prizes and recognition across categories",
  },
  {
    emoji: "👥",
    title: "Meet Mentors",
    description: "Get guidance from industry professionals and experienced builders",
  },
  {
    emoji: "🎖️",
    title: "Earn Certificate",
    description: "All participants receive a certificate of completion",
  },
  {
    emoji: "🎁",
    title: "Free Food & Swag",
    description: "Meals, snacks, and exclusive challenge merchandise included",
  },
];

export function Benefits() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <BrutalSectionHeading
          eyebrow="● Six Benefits"
          eyebrowTone="yellow"
          title="Why Join?"
          sub="More than just a competition – it's a learning experience"
          align="center"
          size="md"
          className="mb-12"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="vm-card flex items-start gap-4 p-6"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-background flex items-center justify-center group-hover:scale-105 transition-transform border border-border">
                <span className="text-2xl">{benefit.emoji}</span>
              </div>
              <div>
                <h3 className="font-display font-bold mb-1 text-foreground">{benefit.title}</h3>
                <p className="font-sans text-sm text-ink-2">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
