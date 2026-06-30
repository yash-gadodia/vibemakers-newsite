import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const sections = [
  {
    title: "For Parents",
    links: [
      { href: "/parents", label: "Private classes" },
      { href: "/contact", label: "Get started" },
    ],
  },
  {
    title: "For Adults",
    links: [
      { href: "/adults", label: "AI classes for adults" },
      { href: "/contact", label: "Enquire" },
    ],
  },
  {
    title: "For Schools",
    links: [
      { href: "/schools", label: "School programmes" },
      { href: "/programme", label: "The method" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-14 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Vibe Makers" className="h-9 w-9 object-cover" />
              <span className="font-display font-bold text-lg tracking-display">Vibe Makers</span>
            </div>
            <p className="text-ink-2 text-sm leading-relaxed">
              AI-first vibe coding for Singapore teens (13–18). Build real apps, develop critical thinking.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-mono text-xs uppercase tracking-eyebrow text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-ink-2 text-sm transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-xs text-muted-foreground">
          <p>© 2026 Vibe Makers Academy · A Dialogic Academy company · Singapore</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
