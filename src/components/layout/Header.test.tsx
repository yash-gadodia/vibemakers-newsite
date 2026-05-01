import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("renders the new nav links: Classes, Schools, Pricing, Method, About", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("link", { name: /classes/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /schools/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /pricing/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /method/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /about/i }).length).toBeGreaterThan(0);
  });

  it("renders an Enquire CTA pointing to /contact", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const cta = screen.getAllByRole("link", { name: /enquire/i });
    expect(cta.length).toBeGreaterThan(0);
    expect(cta[0]).toHaveAttribute("href", "/contact");
  });

  it("does not render Programme or Hackathon in the primary nav", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("link", { name: /^programme$/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /^hackathon$/i })).toBeNull();
  });
});
