const criteria = [
  {
    emoji: "💡",
    title: "Innovation",
    weight: "25%",
    description: "How creative and unique is the solution? Does it approach the problem in a novel way?",
  },
  {
    emoji: "❤️",
    title: "Impact",
    weight: "25%",
    description: "Does it solve a real problem? Who benefits and how meaningful is the change?",
  },
  {
    emoji: "🔧",
    title: "Execution",
    weight: "25%",
    description: "Does the project work? Is it well-designed and functional?",
  },
  {
    emoji: "🎤",
    title: "Presentation",
    weight: "25%",
    description: "Can the team clearly explain their project and its value?",
  },
];

export function JudgingCriteria() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Judging Criteria
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Projects will be evaluated across four equally-weighted dimensions
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {criteria.map((item) => (
            <div
              key={item.title}
              className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="inline-block px-3 py-1 bg-secondary rounded-full mb-3">
                <span className="text-sm font-bold text-primary">{item.weight}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Judges include industry professionals, educators, and tech leaders
        </p>
      </div>
    </section>
  );
}
