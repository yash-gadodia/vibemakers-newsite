const ruleCategories = [
  {
    emoji: "🎓",
    title: "Eligibility",
    rules: [
      "Students aged 13-18 in any Singapore school",
      "Secondary, JC, Poly, ITE all welcome",
      "Must have parental consent if under 18",
    ],
  },
  {
    emoji: "👥",
    title: "Teams",
    rules: [
      "1-4 members per team",
      "Form teams before or at the event",
      "Cross-school teams allowed",
      "Solo participation welcome",
    ],
  },
  {
    emoji: "📱",
    title: "Projects",
    rules: [
      "Build something new during the event",
      "Can use existing libraries/frameworks",
      "Must credit open source code used",
      "All work during the challenge period",
    ],
  },
  {
    emoji: "🤝",
    title: "Code of Conduct",
    rules: [
      "Be respectful and inclusive to all",
      "No plagiarism or pre-built solutions",
      "Help each other learn and grow",
      "Follow venue and safety rules",
    ],
  },
];

export function Rules() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Rules & Guidelines
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know before participating
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ruleCategories.map((category) => (
            <div
              key={category.title}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">{category.emoji}</span>
                </div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
