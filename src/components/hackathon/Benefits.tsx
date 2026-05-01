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
        <div className="text-center mb-12">
          <span className="vm-sticker" style={{ transform: 'rotate(-1deg)' }}>
            ● Six Benefits
          </span>
          <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-4 mt-6 text-foreground">
            Why Join?
          </h2>
          <p className="font-sans text-ink-2 max-w-2xl mx-auto">
            More than just a competition – it's a learning experience
          </p>
        </div>

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
