const features = [
  {
    emoji: "💬",
    title: "Describe in Plain English",
    description: "Tell the AI what you want to build using natural language",
  },
  {
    emoji: "✨",
    title: "AI Does the Heavy Lifting",
    description: "Watch as your ideas transform into working code instantly",
  },
  {
    emoji: "🚀",
    title: "Launch Your Creation",
    description: "Deploy your project and share it with the world",
  },
];

export function WhatIsVibeCoding() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                What is{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Vibe Coding
                </span>
                ?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Vibe coding is a revolutionary way to build software using AI and
                natural language. Instead of writing complex code, you simply
                describe what you want to create – and AI brings it to life.
              </p>
              <p className="text-muted-foreground mb-8">
                <strong className="text-foreground">No coding experience needed!</strong>{" "}
                Whether you're a complete beginner or have some tech skills,
                vibe coding levels the playing field and lets your creativity
                shine.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-medium text-primary">
                  Open to students aged 13-18
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl group hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-xl">{feature.emoji}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
