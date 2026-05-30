import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RGSStudentProjects } from "./RGSStudentProjects";

describe("RGSStudentProjects", () => {
  const renderIt = () => render(<RGSStudentProjects />);

  it("renders the student-work sticker and heading", () => {
    renderIt();
    expect(screen.getByText(/Student work/i)).toBeInTheDocument();
    expect(screen.getByText(/From Vibe Makers to Real Research/i)).toBeInTheDocument();
  });

  it("renders all three project titles", () => {
    renderIt();
    expect(screen.getByText(/Caffeine & Memory/i)).toBeInTheDocument();
    expect(screen.getByText(/Can AI Detect Fake News/i)).toBeInTheDocument();
    expect(screen.getByText(/Microplastics in Singapore Water/i)).toBeInTheDocument();
  });

  it("renders user levels (Sec 2, Sec 3, Sec 4)", () => {
    renderIt();
    expect(screen.getByText(/Sec 2 student/i)).toBeInTheDocument();
    expect(screen.getByText(/Sec 3 student/i)).toBeInTheDocument();
    expect(screen.getByText(/Sec 4 student/i)).toBeInTheDocument();
  });

  it("includes factual problem descriptions", () => {
    renderIt();
    expect(screen.getByText(/Does a small dose of caffeine/i)).toBeInTheDocument();
    expect(screen.getByText(/90% of MOE students use generative AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Singaporeans drink 120 million litres/i)).toBeInTheDocument();
  });

  it("includes factual deliverable descriptions with real outcomes", () => {
    renderIt();
    expect(screen.getByText(/randomised controlled trial/i)).toBeInTheDocument();
    expect(screen.getByText(/GPT-4o 73%.*Gemini 63%/i)).toBeInTheDocument();
    expect(screen.getByText(/8.8× more particles per litre/i)).toBeInTheDocument();
  });
});
