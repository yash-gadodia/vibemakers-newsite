export function Partners() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-14">
        <div className="text-center mb-12">
          <span className="vm-sticker vm-sticker--orange inline-block" style={{ transform: 'rotate(-3deg)' }}>
            ● Coming Soon
          </span>
          <h2 className="font-display font-bold tracking-display leading-[1.02] text-3xl md:text-4xl mb-4 mt-6 text-foreground">
            Our Partners
          </h2>
          <p className="font-sans text-ink-2 max-w-2xl mx-auto">
            We're proud to partner with leading organisations to make this event possible
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="vm-card p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-bg-warm flex items-center justify-center mb-6 border border-border">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="font-display font-bold text-xl mb-3 text-foreground">Partners to be announced</h3>
            <p className="font-sans text-ink-2 max-w-md mx-auto">
              We're in discussions with exciting partners. Stay tuned for announcements!
            </p>
            <p className="font-sans text-sm text-ink-2 mt-6">
              Interested in partnering with us?{" "}
              <a href="/contact" className="text-primary hover:underline font-medium">
                Get in touch →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
