// Thin wrapper over Google's gtag.js (loaded in index.html). Adds:
//   - SSR / no-window safety (no-ops on the server or in tests)
//   - Typed conversion + page-view helpers
//   - Per-conversion env-driven IDs so we don't redeploy every time
//     Google Ads regenerates a conversion label.
//
// Env vars (Vite, pulled at build time):
//   VITE_GADS_ID                  e.g. "AW-1234567890"  — Google Ads account ID
//   VITE_GADS_LEAD_LABEL          e.g. "abcDEFghi"      — conversion label for "Submit lead form"
//   VITE_GA4_ID                   e.g. "G-ABC123XYZ"    — GA4 measurement ID (optional)
//
// If any of these are missing the helpers no-op silently — safe to call
// from anywhere without env-checks at the call site.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GADS_ID = import.meta.env.VITE_GADS_ID as string | undefined;
const GADS_LEAD_LABEL = import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined;
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

function gtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Fire a Google Ads "lead form submitted" conversion. Called from form
 * components on submit-success. Safe to call without IDs configured.
 *
 * @param formType   internal label (parent_interest / school_enquiry / hackathon_waitlist) — passed to GA4 event params for downstream attribution
 * @param value      optional SGD value, defaults to 0 (Google Ads still counts the conversion)
 */
export function trackConversion(formType: string, value: number = 0): void {
  if (!gtagAvailable()) return;

  // Google Ads conversion (only fires if both ID + label are configured)
  if (GADS_ID && GADS_LEAD_LABEL) {
    window.gtag!("event", "conversion", {
      send_to: `${GADS_ID}/${GADS_LEAD_LABEL}`,
      value,
      currency: "SGD",
    });
  }

  // GA4 generic conversion event (also fires regardless of Ads config)
  if (GA4_ID) {
    window.gtag!("event", "generate_lead", {
      send_to: GA4_ID,
      form_type: formType,
      value,
      currency: "SGD",
    });
  }
}

/** Fire a GA4 page-view manually (Vite SPAs don't trigger GA4 page-views on
 *  client-side route changes by default). Hook into <ScrollToTop /> or any
 *  router listener. Safe no-op without a GA4 ID. */
export function trackPageView(path: string): void {
  if (!gtagAvailable() || !GA4_ID) return;
  window.gtag!("event", "page_view", {
    send_to: GA4_ID,
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
  });
}

/** Exposed for tests + diagnostics. */
export const _gtagConfig = { GADS_ID, GADS_LEAD_LABEL, GA4_ID };
