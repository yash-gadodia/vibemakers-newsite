import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MethodologyDiagram } from "@/components/ui/methodology-diagram";

describe("MethodologyDiagram", () => {
  it("renders all four V.I.B.E. stages in order", () => {
    render(<MethodologyDiagram />);
    expect(screen.getByText("Vision")).toBeInTheDocument();
    expect(screen.getByText("Ideate")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Evolve")).toBeInTheDocument();
  });

  it("renders stage descriptions", () => {
    render(<MethodologyDiagram />);
    expect(screen.getByText(/Empathise/)).toBeInTheDocument();
    expect(screen.getByText(/Prototype/)).toBeInTheDocument();
  });
});
