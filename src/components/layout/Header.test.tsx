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
  it("renders the primary nav links: Parents, Adults, Schools, Programme, About, Blog", () => {
    renderHeader();
    expect(screen.getAllByRole("link", { name: /^parents$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^adults$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^schools$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^programme$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^about$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^blog$/i }).length).toBeGreaterThan(0);
  });

  it("does not render a Hackathon nav link", () => {
    renderHeader();
    expect(screen.queryAllByRole("link", { name: /^hackathon$/i }).length).toBe(0);
  });

  it("renders an Enquire CTA pointing to /contact", () => {
    renderHeader();
    const ctas = screen.getAllByRole("link", { name: /enquire/i });
    expect(ctas.length).toBeGreaterThan(0);
    expect(ctas.find((el) => el.getAttribute("href") === "/contact")).toBeTruthy();
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
    const parentsLinks = screen.getAllByRole("link", { name: /^parents$/i });
    expect(parentsLinks.length).toBeGreaterThanOrEqual(2);
  });
});
