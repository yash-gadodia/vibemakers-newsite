import { BrutalSectionHeading } from "@/components/ui/brutal-section-heading";

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
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <BrutalSectionHeading
          eyebrow="● Prizes & Rewards"
          eyebrowTone="orange"
          title="Awards & Prizes"
          sub="Amazing prizes to be announced! ✨"
          align="center"
          size="md"
          className="mb-12"
        />

        {/* Main Prizes */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {mainPrizes.map((prize) => (
            <div
              key={prize.position}
              className="vm-card relative p-6 text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-lg bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-border">
                <span className="text-3xl">{prize.emoji}</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                {prize.position}
              </span>
              <h3 className="font-display font-bold text-lg mt-1 text-foreground">{prize.title}</h3>
              <div className="mt-3 px-3 py-1.5 bg-background rounded-lg inline-block">
                <span className="font-sans text-sm text-foreground">{prize.prize}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Category Awards */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center font-display font-bold text-lg mb-6 text-foreground">Category Awards</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryAwards.map((award) => (
              <div
                key={award.title}
                className="vm-card p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-background flex items-center justify-center mb-3 border border-border">
                  <span className="text-xl">{award.emoji}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-foreground">{award.title}</h4>
                <p className="font-sans text-xs text-ink-2 mt-1">{award.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Participation */}
        <div className="max-w-2xl mx-auto mt-12 p-6 vm-card text-center">
          <h3 className="font-display font-bold mb-3 text-foreground">All Participants Receive</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 font-sans text-sm text-foreground">
              <span>📜</span>
              <span>Certificate of Participation</span>
            </div>
            <div className="flex items-center gap-2 font-sans text-sm text-foreground">
              <span>🚀</span>
              <span>LinkedIn-ready Portfolio Project</span>
            </div>
            <div className="flex items-center gap-2 font-sans text-sm text-foreground">
              <span>👕</span>
              <span>Exclusive Swag</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
