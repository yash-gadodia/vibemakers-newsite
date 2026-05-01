import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Vibe Makers Academy</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to the Vibe Makers Academy homepage." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="bg-background py-32 text-center">
        <div className="mx-auto max-w-xl px-6">
          <span className="vm-sticker" style={{ transform: 'rotate(-3deg)' }}>
            ● Lost in the vibe
          </span>

          <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl md:text-5xl mt-8 mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">Page not found</p>

          <a href="/" className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sticker">
            Back to home
            <span className="vm-arrow">→</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default NotFound;
