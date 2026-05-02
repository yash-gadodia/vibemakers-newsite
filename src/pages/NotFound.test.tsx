import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

describe("NotFound", () => {
  it("sets robots noindex via Helmet", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>,
    );

    await waitFor(() => {
      const robotsTag = document.head.querySelector<HTMLMetaElement>(
        "meta[name='robots']",
      );
      expect(robotsTag).toBeTruthy();
      expect(robotsTag!.content).toBe("noindex");
    });
  });

  it("renders a 404 message and a link home", () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(getByText("404")).toBeTruthy();
    expect(getByText(/back to home/i)).toBeTruthy();
  });
});
