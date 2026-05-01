import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders all four column headings", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /for parents/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /for schools/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^vibe makers$/i })).toBeInTheDocument();
  });

  it("links to the new IA pages", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).toContain("/classes");
    expect(links).toContain("/classes/1-on-1");
    expect(links).toContain("/classes/holiday-camps");
    expect(links).toContain("/pricing");
    expect(links).toContain("/schools");
    expect(links).toContain("/programme");
    expect(links).toContain("/vibe-method");
    expect(links).toContain("/about");
    expect(links).toContain("/contact");
  });

  it("does not link to /blog (removed)", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).not.toContain("/blog");
  });
});
