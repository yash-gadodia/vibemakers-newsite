import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBar } from "@/components/ui/stat-bar";

const STATS = [
  { value: "18", label: "Years" },
  { value: "15+", label: "Schools" },
  { value: "5,000+", label: "Students" },
  { value: "MOE", label: "Aligned" },
];

describe("StatBar", () => {
  it("renders every stat value and label", () => {
    render(<StatBar stats={STATS} />);
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("Years")).toBeInTheDocument();
    expect(screen.getByText("MOE")).toBeInTheDocument();
    expect(screen.getByText("Aligned")).toBeInTheDocument();
  });

  it("renders separators between stats but not on the last one", () => {
    const { container } = render(<StatBar stats={STATS} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBe(STATS.length - 1);
  });
});
