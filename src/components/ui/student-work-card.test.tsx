import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StudentWorkCard } from "@/components/ui/student-work-card";

describe("StudentWorkCard", () => {
  it("renders project name, screenshot, outcome, builder, and school", () => {
    render(
      <StudentWorkCard
        screenshot="/app-demo-screenshot.jpg"
        projectName="StudyPal"
        outcome="An AI study planner used by 200 students at RGS"
        builder="Sarah, Sec 3"
        school="Raffles Girls' School"
      />,
    );
    expect(screen.getByAltText("StudyPal screenshot")).toHaveAttribute(
      "src",
      "/app-demo-screenshot.jpg",
    );
    expect(screen.getByText("StudyPal")).toBeInTheDocument();
    expect(screen.getByText(/AI study planner/)).toBeInTheDocument();
    expect(screen.getByText("Sarah, Sec 3")).toBeInTheDocument();
    expect(screen.getByText("Raffles Girls' School")).toBeInTheDocument();
  });
});
