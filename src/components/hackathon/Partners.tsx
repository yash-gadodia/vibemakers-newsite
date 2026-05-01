export function Partners() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're proud to partner with leading organisations to make this event possible
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Partners to be announced</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're in discussions with exciting partners. Stay tuned for announcements!
            </p>
            <p className="text-sm text-muted-foreground mt-6">
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
