import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

describe("Footer", () => {
  it("renders the three column headings (For Parents, For Schools, Company)", () => {
    renderFooter();
    expect(screen.getByRole("heading", { name: /for parents/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /for schools/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^company$/i })).toBeInTheDocument();
  });

  it("links to the current IA pages (parents, schools, programme, about, blog, hackathon, contact)", () => {
    renderFooter();
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).toContain("/parents");
    expect(links).toContain("/schools");
    expect(links).toContain("/programme");
    expect(links).toContain("/about");
    expect(links).toContain("/blog");
    expect(links).toContain("/hackathon");
    expect(links).toContain("/contact");
  });

  it("renders privacy + terms in the legal row", () => {
    renderFooter();
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).toContain("/privacy");
    expect(links).toContain("/terms");
  });

  it("does not link to deprecated IA paths", () => {
    renderFooter();
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    // Old IA we removed — guard against regressions
    expect(links).not.toContain("/classes");
    expect(links).not.toContain("/classes/1-on-1");
    expect(links).not.toContain("/classes/holiday-camps");
    expect(links).not.toContain("/pricing");
    expect(links).not.toContain("/vibe-method");
  });
});
