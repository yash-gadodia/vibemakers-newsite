import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AudiencePathCTA } from "@/components/ui/audience-path-cta";

describe("AudiencePathCTA", () => {
  it("renders both audience paths with their respective CTAs", () => {
    render(
      <MemoryRouter>
        <AudiencePathCTA
          parents={{ heading: "For Parents", description: "Private classes", ctaLabel: "See classes", ctaHref: "/classes" }}
          schools={{ heading: "For Schools", description: "Workshops", ctaLabel: "Get a proposal", ctaHref: "/schools" }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("For Parents")).toBeInTheDocument();
    expect(screen.getByText("For Schools")).toBeInTheDocument();
    const parentCta = screen.getByRole("link", { name: "See classes" });
    expect(parentCta).toHaveAttribute("href", "/classes");
    const schoolCta = screen.getByRole("link", { name: "Get a proposal" });
    expect(schoolCta).toHaveAttribute("href", "/schools");
  });
});
