import { BrutalSticker } from "@/components/ui/brutal-sticker";

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
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-6 text-foreground">
                What is{" "}
                <span className="text-primary">
                  Vibe Coding
                </span>
                ?
              </h2>
              <p className="font-sans text-lg text-foreground mb-6 leading-relaxed">
                Vibe coding is a revolutionary way to build software using AI and
                natural language. Instead of writing complex code, you simply
                describe what you want to create – and AI brings it to life.
              </p>
              <p className="font-sans text-foreground mb-8">
                <strong>No coding experience needed!</strong>{" "}
                Whether you're a complete beginner or have some tech skills,
                vibe coding levels the playing field and lets your creativity
                shine.
              </p>

              <BrutalSticker tone="yellow" rotate={-1}>
                ● Ages 13-18
              </BrutalSticker>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="vm-card flex items-start gap-4 p-5"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-bg-warm flex items-center justify-center border border-border">
                    <span className="text-xl">{feature.emoji}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="font-display font-bold mb-1 text-foreground">{feature.title}</h3>
                    <p className="font-sans text-sm text-ink-2">
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
