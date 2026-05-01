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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Challenge Tracks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a track that matches your interests – or surprise us with something completely new!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="group relative bg-card border-2 border-border rounded-2xl p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4">
                {track.tag}
              </span>
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{track.emoji}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{track.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {track.description}
              </p>
              <div className="pt-4 border-t border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Example ideas:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {track.examples.map((example) => (
                    <span key={example} className="text-xs px-2 py-1 bg-secondary rounded-md">
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
