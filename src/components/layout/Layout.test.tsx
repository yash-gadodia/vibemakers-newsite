import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

describe("Layout", () => {
  it("emits an EducationalOrganization JSON-LD script tag", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Layout>
            <p>Body</p>
          </Layout>
        </MemoryRouter>
      </HelmetProvider>,
    );

    // Helmet writes to document.head asynchronously
    await new Promise((r) => setTimeout(r, 0));
    const scripts = document.head.querySelectorAll<HTMLScriptElement>(
      "script[type='application/ld+json']",
    );
    const localBusiness = Array.from(scripts).find((s) =>
      s.textContent?.includes('"@type":"EducationalOrganization"'),
    );
    expect(localBusiness).toBeTruthy();
    expect(localBusiness!.textContent).toContain("Vibe Makers Academy");
    expect(localBusiness!.textContent).toContain("https://vibemakers.dev");
  });
});
