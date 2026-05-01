const mainPrizes = [
  {
    position: "1st Place",
    title: "Grand Prize",
    prize: "TBC",
    emoji: "🥇",
    gradient: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    position: "2nd Place",
    title: "Runner-up",
    prize: "TBC",
    emoji: "🥈",
    gradient: "from-slate-300/20 to-slate-400/20",
    borderColor: "border-slate-400/30",
  },
  {
    position: "3rd Place",
    title: "Bronze",
    prize: "TBC",
    emoji: "🥉",
    gradient: "from-amber-600/20 to-amber-700/20",
    borderColor: "border-amber-600/30",
  },
];

const categoryAwards = [
  { title: "Best in Track", description: "Winner in each challenge track", emoji: "⭐" },
  { title: "Most Innovative", description: "Most creative & unique solution", emoji: "✨" },
  { title: "Best Presentation", description: "Outstanding demo delivery", emoji: "🎤" },
  { title: "Crowd Favorite", description: "Voted by fellow participants", emoji: "👍" },
];

export function Prizes() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Awards & Prizes
          </h2>
          <p className="text-muted-foreground">
            Amazing prizes to be announced! ✨
          </p>
        </div>

        {/* Main Prizes */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {mainPrizes.map((prize) => (
            <div
              key={prize.position}
              className={`relative bg-card border-2 ${prize.borderColor} rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300`}
            >
              <div
                className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${prize.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <span className="text-3xl">{prize.emoji}</span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {prize.position}
              </span>
              <h3 className="font-semibold text-lg mt-1">{prize.title}</h3>
              <div className="mt-3 px-3 py-1.5 bg-muted rounded-lg inline-block">
                <span className="text-sm text-muted-foreground">{prize.prize}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Category Awards */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-semibold mb-6">Category Awards</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryAwards.map((award) => (
              <div
                key={award.title}
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-xl">{award.emoji}</span>
                </div>
                <h4 className="font-medium text-sm">{award.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{award.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Participation */}
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-card border border-border rounded-2xl text-center">
          <h3 className="font-semibold mb-3">All Participants Receive</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>📜</span>
              <span>Certificate of Participation</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>🚀</span>
              <span>LinkedIn-ready Portfolio Project</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>👕</span>
              <span>Exclusive Swag</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
