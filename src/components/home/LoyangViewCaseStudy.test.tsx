import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoyangViewCaseStudy } from "./LoyangViewCaseStudy";

describe("LoyangViewCaseStudy", () => {
  const renderIt = () => render(<LoyangViewCaseStudy />);

  it("renders the recent-delivery sticker and LVSS heading", () => {
    renderIt();
    expect(screen.getByText(/Recent delivery/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Loyang View Secondary School/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the three outcome stats with their numbers and labels", () => {
    renderIt();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getAllByText(/May.June/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("includes the V.I.B.E. teaching beat description", () => {
    renderIt();
    expect(screen.getByText(/Works.*Frustrating.*Missing/i)).toBeInTheDocument();
  });

  it("renders at least four LVSS photos", () => {
    renderIt();
    const photos = screen.getAllByRole("img");
    expect(photos.length).toBeGreaterThanOrEqual(4);
  });

  it("includes descriptive alt text for all photos", () => {
    renderIt();
    const photos = screen.getAllByRole("img");
    photos.forEach((photo) => {
      expect(photo).toHaveAttribute("alt");
      expect((photo.getAttribute("alt") || "").length).toBeGreaterThan(0);
    });
  });
});
