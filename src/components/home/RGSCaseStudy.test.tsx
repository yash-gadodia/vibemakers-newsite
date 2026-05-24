import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RGSCaseStudy } from "./RGSCaseStudy";

describe("RGSCaseStudy", () => {
  const renderIt = () =>
    render(
      <MemoryRouter>
        <RGSCaseStudy />
      </MemoryRouter>,
    );

  it("renders the recent-delivery sticker and RGS heading", () => {
    renderIt();
    expect(screen.getByText(/Recent delivery/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Raffles Girls' School/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the three outcome stats with their numbers and labels", () => {
    renderIt();
    // Two stats with value "40" — use getAllByText for the value
    expect(screen.getAllByText("40").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/research agents built/i)).toBeInTheDocument();
    expect(screen.getByText(/HTML decks shipped/i)).toBeInTheDocument();
    expect(screen.getByText(/Y1.{1,3}Y4/i)).toBeInTheDocument();
  });

  it("includes the Dr Lim quote attribution", () => {
    renderIt();
    expect(screen.getByText(/Dr Lim AK/i)).toBeInTheDocument();
  });

  it("links the CTA to the blog post", () => {
    renderIt();
    const cta = screen.getByRole("link", { name: /full case study/i });
    expect(cta).toHaveAttribute("href", "/blog/rgs-research-agents-workshop");
  });

  it("renders at least three RGS photos", () => {
    renderIt();
    const photos = screen.getAllByRole("img");
    expect(photos.length).toBeGreaterThanOrEqual(3);
  });
});
