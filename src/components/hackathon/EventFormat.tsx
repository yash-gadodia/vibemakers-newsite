const day1Schedule = [
  { time: "9:00 AM", activity: "Registration & Opening Ceremony" },
  { time: "10:00 AM", activity: "Vibe Coding Workshop" },
  { time: "12:00 PM", activity: "Lunch & Team Formation" },
  { time: "2:00 PM", activity: "Ideation & Planning" },
  { time: "4:00 PM", activity: "Hacking Begins!" },
  { time: "6:00 PM", activity: "Day 1 Ends - Continue at Home" },
];

const day2Schedule = [
  { time: "9:00 AM", activity: "Doors Open & Final Build Hours" },
  { time: "12:00 PM", activity: "Project Submission Deadline" },
  { time: "1:00 PM", activity: "Lunch & Prep" },
  { time: "2:00 PM", activity: "Demos & Judging" },
  { time: "5:00 PM", activity: "Awards Ceremony" },
  { time: "6:00 PM", activity: "Event Ends" },
];

export function EventFormat() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            2-Day Event Format
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn vibe coding on Day 1, build at home overnight, and demo on Day 2
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Day 1 */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">☀️</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Day 1</span>
                <h3 className="font-display font-bold text-xl">Learn & Build</h3>
              </div>
            </div>
            <div className="space-y-4">
              {day1Schedule.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-16 shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <span className="text-sm">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overnight */}
          <div className="bg-gradient-to-b from-secondary/50 to-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-accent-foreground uppercase tracking-wide">Overnight</span>
                <h3 className="font-display font-bold text-xl">Build at Home</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-card/50 rounded-xl border border-border/50">
                <p className="text-sm text-muted-foreground mb-3">
                  Continue building from the comfort of your home
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Discord support channel open</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Mentors available via chat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>No overnight stay required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🎤</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Day 2</span>
                <h3 className="font-display font-bold text-xl">Demo Day</h3>
              </div>
            </div>
            <div className="space-y-4">
              {day2Schedule.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-16 shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <span className="text-sm">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
