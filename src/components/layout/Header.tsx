import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";

const navLinks = [
  { href: "/parents", label: "Parents" },
  { href: "/adults", label: "Adults" },
  { href: "/schools", label: "Schools" },
  { href: "/programme", label: "Programme" },
  { href: "/hackathon", label: "Hackathon" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background border-b border-border">
      <nav className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-14">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="Vibe Makers" className="h-9 w-9 object-contain" />
          <span className="font-display font-bold text-[17px] tracking-[-0.02em]">
            Vibe Makers
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="vm-nav-link text-sm text-ink-2 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/contact"
            className="vm-btn inline-flex items-center gap-1.5 rounded-[8px] bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background shadow-[2px_2px_0_hsl(var(--primary))]"
          >
            Enquire <span className="vm-arrow">→</span>
          </Link>
          <button
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-[8px] border-[1.5px] border-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background px-5 py-4 sm:px-8">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="vm-nav-link py-2 text-base text-ink-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="vm-btn mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-[8px] bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-[2px_2px_0_hsl(var(--primary))]"
          >
            Enquire <span className="vm-arrow">→</span>
          </Link>
        </div>
      )}
    </header>
  );
}
