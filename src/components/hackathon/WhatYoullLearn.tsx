const topics = [
  {
    emoji: "✨",
    title: "Introduction to Vibe Coding",
    description: "Learn to build apps by describing what you want in natural language",
  },
  {
    emoji: "🤖",
    title: "AI-Powered Tools",
    description: "Hands-on experience with Lovable, Cursor, and other cutting-edge tools",
  },
  {
    emoji: "💡",
    title: "Product Thinking",
    description: "Identify real problems worth solving and design solutions users love",
  },
  {
    emoji: "🚀",
    title: "Rapid Prototyping",
    description: "Build functional prototypes in hours, not weeks",
  },
  {
    emoji: "🎤",
    title: "Demo & Presentation Skills",
    description: "Learn to pitch your project effectively to judges and audiences",
  },
];

export function WhatYoullLearn() {
  return (
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="text-center mb-12">
          <span className="vm-sticker" style={{ transform: 'rotate(3deg)' }}>
            ● Day 1 Workshop
          </span>
          <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-4 mt-6 text-foreground">
            What You'll Learn
          </h2>
          <p className="font-sans text-ink-2 max-w-2xl mx-auto">
            Our Day 1 workshop covers everything you need to build amazing projects
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="vm-card group p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-bg-warm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-border">
                <span className="text-xl">{topic.emoji}</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">{topic.title}</h3>
              <p className="font-sans text-sm text-ink-2">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
