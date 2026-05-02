import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

describe("Header", () => {
  it("renders the primary nav links: For Parents, For Schools, Programme, Hackathon, About, Blog", () => {
    renderHeader();
    expect(screen.getAllByRole("link", { name: /for parents/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /for schools/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^programme$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^hackathon$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^about$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^blog$/i }).length).toBeGreaterThan(0);
  });

  it("renders a Contact CTA pointing to /contact", () => {
    renderHeader();
    const contactCtas = screen.getAllByRole("link", { name: /contact/i });
    expect(contactCtas.length).toBeGreaterThan(0);
    expect(contactCtas.find((el) => el.getAttribute("href") === "/contact")).toBeTruthy();
  });

  it("links the logo back to the homepage", () => {
    renderHeader();
    const logo = screen.getAllByRole("link").find((el) => el.getAttribute("href") === "/");
    expect(logo).toBeTruthy();
  });

  it("toggles the mobile menu when the hamburger button is clicked", async () => {
    const user = userEvent.setup({ delay: null });
    renderHeader();
    const toggle = screen.getByLabelText(/toggle menu/i);
    await user.click(toggle);
    // After opening, the same nav links exist twice (desktop + mobile menu)
    const parentsLinks = screen.getAllByRole("link", { name: /for parents/i });
    expect(parentsLinks.length).toBeGreaterThanOrEqual(2);
  });
});
