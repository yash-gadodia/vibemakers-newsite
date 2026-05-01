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
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Event Timeline
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <span className="text-base">🕐</span>
            <span className="text-sm text-muted-foreground">Dates to be announced</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

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
                  <div className="bg-card border border-border rounded-xl p-5 inline-block hover:border-primary/30 transition-colors">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.date}
                    </span>
                    <h3 className="font-semibold mt-2">{item.event}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
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
