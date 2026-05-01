import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FounderBlock } from "@/components/ui/founder-block";

describe("FounderBlock", () => {
  it("renders the founder's photo, name, role, and bio", () => {
    render(
      <FounderBlock
        photo="/yash.jpg"
        name="Yash Gadodia"
        role="Head Coach"
        bio="I teach SG teens to build with AI. 5 years of shipping product."
      />,
    );
    expect(screen.getByAltText("Yash Gadodia")).toHaveAttribute("src", "/yash.jpg");
    expect(screen.getByText("Yash Gadodia")).toBeInTheDocument();
    expect(screen.getByText("Head Coach")).toBeInTheDocument();
    expect(screen.getByText(/I teach SG teens/)).toBeInTheDocument();
  });

  it("renders the optional signature when provided", () => {
    render(
      <FounderBlock
        photo="/yash.jpg"
        name="Yash"
        role="Head Coach"
        bio="..."
        signature="— Yash"
      />,
    );
    expect(screen.getByText("— Yash")).toBeInTheDocument();
  });
});
