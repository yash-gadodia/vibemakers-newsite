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
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="text-center mb-12">
          <span className="vm-sticker vm-sticker--orange inline-block" style={{ transform: 'rotate(2deg)' }}>
            ● Fair Judging
          </span>
          <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-4 mt-6 text-foreground">
            Judging Criteria
          </h2>
          <p className="font-sans text-ink-2 max-w-2xl mx-auto">
            Projects will be evaluated across four equally-weighted dimensions
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {criteria.map((item) => (
            <div
              key={item.title}
              className="vm-card group p-6 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-lg bg-bg-warm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-border">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="inline-block mb-3">
                <span className="font-display font-bold text-5xl text-primary">{item.weight}</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="font-sans text-sm text-ink-2">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-sm text-ink-2 mt-8">
          Judges include industry professionals, educators, and tech leaders
        </p>
      </div>
    </section>
  );
}
