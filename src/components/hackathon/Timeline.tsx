const events = [
  { emoji: "📋", event: "Registration Opens", date: "TBC", description: "Sign up and register your interest" },
  { emoji: "⏰", event: "Application Deadline", date: "TBC", description: "Submit your application" },
  { emoji: "👥", event: "Teams Announced", date: "TBC", description: "Accepted participants notified" },
  { emoji: "💻", event: "Day 1: Workshop & Build", date: "TBC", description: "Learn vibe coding, start building" },
  { emoji: "🎤", event: "Day 2: Demo Day", date: "TBC", description: "Present projects to judges" },
  { emoji: "🏆", event: "Winners Announced", date: "TBC", description: "Awards and prizes ceremony" },
];

export function Timeline() {
  return (
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="text-center mb-12">
          <span className="vm-sticker" style={{ transform: 'rotate(1deg)' }}>
            ● Timeline
          </span>
          <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-4 mt-6 text-foreground">
            Event Timeline
          </h2>
          <p className="font-sans text-ink-2">
            🕐 Dates to be announced
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 border-l border-border md:-translate-x-0.5" />

            {events.map((item, index) => (
              <div
                key={item.event}
                className={`relative flex items-center gap-6 mb-8 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot with emoji */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-card border-2 border-primary rounded-full flex items-center justify-center md:-translate-x-1/2 z-10">
                  <span className="text-sm">{item.emoji}</span>
                </div>

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="vm-card inline-block p-5">
                    <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-2 bg-bg-warm px-2 py-1 rounded">
                      {item.date}
                    </span>
                    <h3 className="font-display font-bold mt-2 text-foreground">{item.event}</h3>
                    <p className="font-sans text-sm text-ink-2 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
