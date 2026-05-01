const tracks = [
  {
    emoji: "📚",
    title: "Productivity & Learning",
    description: "Tools that help students study, organize, or learn better. Think study planners, flashcard apps, or homework helpers.",
    tag: "Track 1",
    examples: ["Study Planner", "Flashcard Generator", "Homework Tracker"],
  },
  {
    emoji: "❤️",
    title: "Community & Social Good",
    description: "Solutions that benefit your school, community, or society. Make a positive impact with technology.",
    tag: "Track 2",
    examples: ["Volunteer Matcher", "School Event App", "Eco Tracker"],
  },
  {
    emoji: "🎮",
    title: "Creative & Fun",
    description: "Games, entertainment, or creative expression tools. Show off your imagination and build something fun!",
    tag: "Track 3",
    examples: ["Mini Games", "Art Generator", "Music Creator"],
  },
];

export function ChallengeTracks() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="text-center mb-12">
          <span className="vm-sticker vm-sticker--orange inline-block" style={{ transform: 'rotate(-2deg)' }}>
            ● Three Paths
          </span>
          <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-4 mt-6 text-foreground">
            Challenge Tracks
          </h2>
          <p className="font-sans text-ink-2 max-w-2xl mx-auto">
            Choose a track that matches your interests – or surprise us with something completely new!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="vm-card group relative p-8"
            >
              <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-eyebrow text-foreground bg-bg-warm-2 rounded-full mb-4">
                {track.tag}
              </span>
              <div className="w-14 h-14 rounded-lg bg-card flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border border-border">
                <span className="text-3xl">{track.emoji}</span>
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-foreground">{track.title}</h3>
              <p className="font-sans text-ink-2 text-sm leading-relaxed mb-4">
                {track.description}
              </p>
              <div className="pt-4 border-t border-border">
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">Example ideas:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {track.examples.map((example) => (
                    <span key={example} className="font-sans text-xs px-2 py-1 bg-bg-warm-2 rounded-md text-foreground">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
