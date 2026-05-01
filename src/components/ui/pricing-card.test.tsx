import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PricingCard } from "@/components/ui/pricing-card";

const PROPS = {
  name: "1-on-1 with Head Coach",
  priceFrom: "S$160",
  unit: "per hour",
  description: "Founder-led private coaching for ambitious teens.",
  features: ["Personalised pace", "Direct access to Yash", "Outcome-driven"],
  ctaLabel: "Book consult",
  ctaHref: "/contact",
};

describe("PricingCard", () => {
  it("renders name, price, unit, description, and features", () => {
    render(<MemoryRouter><PricingCard {...PROPS} /></MemoryRouter>);
    expect(screen.getByText("1-on-1 with Head Coach")).toBeInTheDocument();
    expect(screen.getByText("S$160")).toBeInTheDocument();
    expect(screen.getByText("per hour")).toBeInTheDocument();
    expect(screen.getByText("Personalised pace")).toBeInTheDocument();
    expect(screen.getByText("Direct access to Yash")).toBeInTheDocument();
  });

  it("renders the CTA as a link to the given href", () => {
    render(<MemoryRouter><PricingCard {...PROPS} /></MemoryRouter>);
    const cta = screen.getByRole("link", { name: "Book consult" });
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("highlights the card when featured is true", () => {
    const { container } = render(<MemoryRouter><PricingCard {...PROPS} featured /></MemoryRouter>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-primary");
  });
});
