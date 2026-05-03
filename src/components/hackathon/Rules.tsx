import { BrutalSectionHeading } from "@/components/ui/brutal-section-heading";

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
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <BrutalSectionHeading
          eyebrow="● Four Categories"
          eyebrowTone="yellow"
          title="Rules & Guidelines"
          sub="Everything you need to know before participating"
          align="center"
          size="md"
          className="mb-12"
        />

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ruleCategories.map((category) => (
            <div
              key={category.title}
              className="vm-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                  <span className="text-xl">{category.emoji}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 font-sans text-sm text-foreground">
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
