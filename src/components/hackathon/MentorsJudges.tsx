import { BrutalSectionHeading } from "@/components/ui/brutal-section-heading";

export function MentorsJudges() {
  return (
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <BrutalSectionHeading
          eyebrow="● Expert Guidance"
          eyebrowTone="yellow"
          title="Mentors & Judges"
          sub="Learn from and be judged by industry experts"
          align="center"
          size="md"
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mentors */}
          <div className="vm-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border border-border">
                <span className="text-2xl">🧑‍🏫</span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground">Mentors</h3>
            </div>
            <p className="font-sans text-ink-2 mb-6">
              Get guidance from experienced professionals who will help you throughout the event.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <span>🏢</span>
                <span>Tech companies & startups</span>
              </div>
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <span>🏢</span>
                <span>Software engineers & designers</span>
              </div>
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <span>🏢</span>
                <span>Product managers & founders</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background rounded-xl border border-border">
              <p className="font-sans text-sm text-ink-2 text-center">
                Mentor lineup to be announced
              </p>
            </div>
          </div>

          {/* Judges */}
          <div className="vm-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border border-border">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground">Judges</h3>
            </div>
            <p className="font-sans text-ink-2 mb-6">
              Present your project to a panel of experienced judges who will evaluate your work.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <span>🏢</span>
                <span>Industry professionals</span>
              </div>
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <span>🏢</span>
                <span>Educators & academics</span>
              </div>
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <span>🏢</span>
                <span>Tech community leaders</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background rounded-xl border border-border">
              <p className="font-sans text-sm text-ink-2 text-center">
                Judge panel to be announced
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
