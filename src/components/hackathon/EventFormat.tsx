import { BrutalSectionHeading } from "@/components/ui/brutal-section-heading";

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
    <section className="border-t border-border bg-bg-warm py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <BrutalSectionHeading
          eyebrow="● Two Saturdays"
          eyebrowTone="yellow"
          title="2-Day Event Format"
          sub="Learn vibe coding on Day 1, build at home overnight, and demo on Day 2"
          align="center"
          size="md"
          className="mb-12"
        />

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Day 1 */}
          <div className="vm-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-bg-warm-2 flex items-center justify-center">
                <span className="text-2xl">☀️</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">Day 1</span>
                <h3 className="font-display font-bold text-xl text-foreground">Learn & Build</h3>
              </div>
            </div>
            <div className="space-y-4">
              {day1Schedule.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-ink-2 w-16 shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <span className="font-sans text-sm text-foreground">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overnight */}
          <div className="vm-card bg-bg-warm-2 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">Overnight</span>
                <h3 className="font-display font-bold text-xl text-foreground">Build at Home</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="font-sans text-sm text-ink-2 mb-3">
                  Continue building from the comfort of your home
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-sans text-foreground">Discord support channel open</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-sans text-foreground">Mentors available via chat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-sans text-foreground">No overnight stay required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="vm-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-bg-warm-2 flex items-center justify-center">
                <span className="text-2xl">🎤</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-2">Day 2</span>
                <h3 className="font-display font-bold text-xl text-foreground">Demo Day</h3>
              </div>
            </div>
            <div className="space-y-4">
              {day2Schedule.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-ink-2 w-16 shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <span className="font-sans text-sm text-foreground">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
