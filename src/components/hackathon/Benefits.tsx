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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Why Join?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            More than just a competition – it's a learning experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl group hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-2xl">{benefit.emoji}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
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
