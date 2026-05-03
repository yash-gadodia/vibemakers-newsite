import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/parents", label: "For Parents" },
  { href: "/adults", label: "For Adults" },
  { href: "/schools", label: "For Schools" },
  { href: "/programme", label: "Programme" },
  { href: "/hackathon", label: "Hackathon" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "pt-3 px-4" : "pt-4 px-6"
    )}>
      <nav className={cn(
        "mx-auto flex w-full items-center justify-between transition-all duration-300",
        isScrolled
          ? "max-w-6xl px-4 py-3 rounded-full bg-card/95 backdrop-blur-xl border border-border shadow-md"
          : "max-w-full px-0 py-4 bg-background border-b border-border"
      )}>
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Vibe Makers" className="h-9 w-9 object-cover" />
          <span className="font-display font-bold tracking-display text-lg hidden sm:block">
            Vibe Makers
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="vm-nav-link font-mono text-xs uppercase tracking-eyebrow text-foreground whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="vm-btn rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm shadow-sticker"
          >
            Contact <span className="vm-arrow">→</span>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 hover:bg-secondary/50 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="mx-auto mt-2 w-full px-4 md:px-6">
          <div className="bg-background border-t border-border rounded-lg py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="vm-nav-link font-mono text-xs uppercase tracking-eyebrow text-foreground px-3 py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-border pt-4">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="vm-btn block w-full text-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm shadow-sticker"
              >
                Contact <span className="vm-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
