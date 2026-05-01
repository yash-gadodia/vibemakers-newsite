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
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">Day 1 Workshop</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            What You'll Learn
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our Day 1 workshop covers everything you need to build amazing projects
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-xl">{topic.emoji}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
