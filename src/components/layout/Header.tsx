import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/classes", label: "Classes" },
  { href: "/schools", label: "Schools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/vibe-method", label: "Method" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActiveLink = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300",
        isScrolled ? "pt-3" : "pt-4",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex w-full items-center justify-between transition-all duration-300",
          isScrolled
            ? "max-w-5xl px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl shadow-md border border-border/50"
            : "max-w-7xl px-4 py-4 bg-transparent",
        )}
      >
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Vibe Makers" className="h-10 w-10 rounded-full object-cover" />
          <span
            className={cn(
              "hidden font-display text-base font-bold tracking-tight sm:block",
              isScrolled && "lg:text-sm",
            )}
          >
            Vibe Makers
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActiveLink(link.href)
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild size="sm">
            <Link to="/contact">Enquire</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div
          className={cn(
            "mx-auto mt-3 w-full animate-fade-in",
            isScrolled ? "max-w-5xl" : "max-w-7xl",
          )}
        >
          <div className="rounded-2xl border border-border/50 bg-white/95 px-4 py-4 backdrop-blur-xl">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-md text-base font-medium transition-colors",
                    isActiveLink(link.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-border/50 pt-4">
              <Button asChild className="w-full">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Enquire
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
