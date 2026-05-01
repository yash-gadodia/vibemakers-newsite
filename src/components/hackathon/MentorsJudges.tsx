export function MentorsJudges() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Mentors & Judges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from and be judged by industry experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mentors */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🧑‍🏫</span>
              </div>
              <h3 className="font-display font-bold text-xl">Mentors</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Get guidance from experienced professionals who will help you throughout the event.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span>🏢</span>
                <span>Tech companies & startups</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🏢</span>
                <span>Software engineers & designers</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🏢</span>
                <span>Product managers & founders</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                Mentor lineup to be announced
              </p>
            </div>
          </div>

          {/* Judges */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-display font-bold text-xl">Judges</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Present your project to a panel of experienced judges who will evaluate your work.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span>🏢</span>
                <span>Industry professionals</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🏢</span>
                <span>Educators & academics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🏢</span>
                <span>Tech community leaders</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                Judge panel to be announced
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
