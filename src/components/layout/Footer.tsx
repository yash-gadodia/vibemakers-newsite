import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const sections = [
  {
    title: "For Parents",
    links: [
      { href: "/classes", label: "All classes" },
      { href: "/classes/1-on-1", label: "1-on-1 coaching" },
      { href: "/classes/holiday-camps", label: "Holiday camps" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "For Schools",
    links: [
      { href: "/schools", label: "School workshops" },
      { href: "/programme", label: "Programme detail" },
      { href: "/about", label: "Why Dialogic" },
    ],
  },
  {
    title: "Vibe Makers",
    links: [
      { href: "/vibe-method", label: "The V.I.B.E. method" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/hackathon", label: "Hackathon" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src={logo} alt="Vibe Makers" className="h-12 w-12 rounded-full object-cover" />
              <span className="font-display text-lg font-bold tracking-tight">Vibe Makers</span>
            </Link>
            <p className="text-sm leading-relaxed text-background/70">
              AI coding for Singapore teens 13-18. The new arm of Dialogic Academy — the academy
              behind debate, journalism, and now AI.
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 text-xs text-background/60">
                Powered by Dialogic Academy · est. 2018
              </span>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-display font-semibold tracking-tight">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-background/10 pt-8 md:flex-row md:justify-between">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Vibe Makers Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-background/50 transition-colors hover:text-background/80">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-background/50 transition-colors hover:text-background/80">
              Terms
            </Link>
            <a
              href="mailto:vibemakers@dialogic.academy"
              className="text-sm text-background/50 transition-colors hover:text-background/80"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
