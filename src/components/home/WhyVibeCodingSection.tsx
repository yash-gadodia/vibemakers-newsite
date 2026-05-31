import { SectionHeader } from "@/components/ui/section-header";

const reasons = [
  {
    emoji: "🧠",
    title: "AI is the New Literacy",
    description: "Just as reading and writing became essential, understanding AI will be fundamental to success in every field: from medicine to art to business.",
  },
  {
    emoji: "🚀",
    title: "10x Faster Building",
    description: "What took developers weeks now takes hours. Students who master AI tools can prototype and ship ideas faster than ever before.",
  },
  {
    emoji: "🛡️",
    title: "Future-Proof Careers",
    description: "Jobs are changing rapidly. Those who can work alongside AI: not be replaced by it: will thrive in the new economy.",
  },
  {
    emoji: "📈",
    title: "Democratized Innovation",
    description: "You no longer need years of coding experience to build powerful apps. AI lowers the barrier, making creators out of everyone.",
  },
  {
    emoji: "⚡",
    title: "From Consumer to Creator",
    description: "Most people passively use technology. Vibe Coding empowers students to shape technology and solve real problems.",
  },
  {
    emoji: "🤝",
    title: "Collaborative Advantage",
    description: "The future belongs to humans + AI teams. Learning to prompt, guide, and iterate with AI is the ultimate meta-skill.",
  },
];

export function WhyVibeCodingSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="The Future is Here"
          title="Why Every Student Needs Vibe Coding"
          description="In an AI-powered world, the ability to build with AI isn't optional: it's essential. Here's why this skill matters more than ever."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl">{reason.emoji}</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Urgency callout */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h4 className="font-display font-semibold text-lg text-foreground mb-1">
                The AI revolution is happening now
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                By 2030, 85% of jobs will require AI literacy. Students who start learning today will have a massive head start. 
                Don't let your child be left behind: equip them with the skills that will define the next decade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
