import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SchoolLogosGrid } from "@/components/ui/school-logos-grid";

const SCHOOLS = [
  { name: "Raffles Girls' School", logo: "/rgs.png" },
  { name: "Anglo-Chinese School", logo: "/acs.png" },
];

describe("SchoolLogosGrid", () => {
  it("renders one image per school with the school name as alt text", () => {
    render(<SchoolLogosGrid schools={SCHOOLS} />);
    expect(screen.getByAltText("Raffles Girls' School")).toBeInTheDocument();
    expect(screen.getByAltText("Anglo-Chinese School")).toBeInTheDocument();
  });

  it("renders the optional heading when provided", () => {
    render(<SchoolLogosGrid schools={SCHOOLS} heading="Trusted at" />);
    expect(screen.getByText("Trusted at")).toBeInTheDocument();
  });

  it("does not render a heading when not provided", () => {
    const { container } = render(<SchoolLogosGrid schools={SCHOOLS} />);
    expect(container.querySelector("h2, h3, p")).toBeNull();
  });
});
