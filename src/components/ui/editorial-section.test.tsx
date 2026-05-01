import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EditorialSection } from "@/components/ui/editorial-section";

describe("EditorialSection", () => {
  it("renders children", () => {
    render(<EditorialSection><p>Editorial body copy</p></EditorialSection>);
    expect(screen.getByText("Editorial body copy")).toBeInTheDocument();
  });

  it("constrains content to a max-width of 640px", () => {
    const { container } = render(<EditorialSection><p>x</p></EditorialSection>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("max-w-[640px]");
  });

  it("merges custom className", () => {
    const { container } = render(<EditorialSection className="my-custom-class"><p>x</p></EditorialSection>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("my-custom-class");
  });
});
