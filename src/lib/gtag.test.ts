import { describe, it, expect, beforeEach, vi } from "vitest";

// gtag.ts reads import.meta.env.VITE_* at module load. We need to
// reset modules between cases so we can flip env values per test.
describe("gtag", () => {
  beforeEach(() => {
    vi.resetModules();
    // Reset window.gtag mock between tests
    (window as unknown as { gtag?: unknown }).gtag = undefined;
    (window as unknown as { dataLayer?: unknown[] }).dataLayer = undefined;
  });

  it("no-ops trackConversion when window.gtag is unavailable", async () => {
    const { trackConversion } = await import("./gtag");
    expect(() => trackConversion("parent_interest", 100)).not.toThrow();
  });

  it("no-ops trackPageView when window.gtag is unavailable", async () => {
    const { trackPageView } = await import("./gtag");
    expect(() => trackPageView("/parents")).not.toThrow();
  });

  it("calls window.gtag with conversion + GA4 generate_lead when both IDs configured", async () => {
    vi.stubEnv("VITE_GADS_ID", "AW-123");
    vi.stubEnv("VITE_GADS_LEAD_LABEL", "abc");
    vi.stubEnv("VITE_GA4_ID", "G-XYZ");

    const gtagSpy = vi.fn();
    (window as unknown as { gtag: typeof gtagSpy }).gtag = gtagSpy;

    const { trackConversion } = await import("./gtag");
    trackConversion("parent_interest", 100);

    // Should fire both Ads conversion + GA4 generate_lead
    expect(gtagSpy).toHaveBeenCalledTimes(2);
    expect(gtagSpy).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-123/abc",
      value: 100,
      currency: "SGD",
    });
    expect(gtagSpy).toHaveBeenCalledWith("event", "generate_lead", {
      send_to: "G-XYZ",
      form_type: "parent_interest",
      value: 100,
      currency: "SGD",
    });

    vi.unstubAllEnvs();
  });

  it("only fires GA4 generate_lead when Ads label is missing", async () => {
    vi.stubEnv("VITE_GADS_ID", "AW-123");
    vi.stubEnv("VITE_GADS_LEAD_LABEL", "");
    vi.stubEnv("VITE_GA4_ID", "G-XYZ");

    const gtagSpy = vi.fn();
    (window as unknown as { gtag: typeof gtagSpy }).gtag = gtagSpy;

    const { trackConversion } = await import("./gtag");
    trackConversion("school_enquiry", 500);

    // Only GA4 fires — no Ads conversion
    expect(gtagSpy).toHaveBeenCalledTimes(1);
    expect(gtagSpy).toHaveBeenCalledWith("event", "generate_lead", {
      send_to: "G-XYZ",
      form_type: "school_enquiry",
      value: 500,
      currency: "SGD",
    });

    vi.unstubAllEnvs();
  });

  it("trackPageView fires GA4 page_view with given path", async () => {
    vi.stubEnv("VITE_GA4_ID", "G-XYZ");

    const gtagSpy = vi.fn();
    (window as unknown as { gtag: typeof gtagSpy }).gtag = gtagSpy;

    const { trackPageView } = await import("./gtag");
    trackPageView("/parents");

    expect(gtagSpy).toHaveBeenCalledTimes(1);
    expect(gtagSpy).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        send_to: "G-XYZ",
        page_path: "/parents",
      }),
    );

    vi.unstubAllEnvs();
  });
});
