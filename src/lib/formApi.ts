// Form-submission helpers backed by the Railway server.js + Postgres.
// Replaces direct supabase.from(...).insert() calls in the form components.
//
// Successful submits also fire a Google Ads + GA4 conversion via gtag.ts.
// If the gtag IDs aren't configured (env empty), trackConversion no-ops.

import { trackConversion } from "@/lib/gtag";

const API_BASE = "";

async function postForm<T>(
  path: string,
  body: T,
  conversionType: string,
  conversionValue: number = 0,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.ok) {
      return { ok: false, error: json?.error || `HTTP ${res.status}` };
    }
    // Fire-and-forget conversion event. Wrapped in try so a gtag failure
    // never poisons the success path.
    try {
      trackConversion(conversionType, conversionValue);
    } catch {
      /* noop */
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export type ParentInterestPayload = {
  parent_name: string;
  parent_email: string;
  student_name: string;
  student_age: string;
  programme_interest?: string;
  message?: string | null;
};
// Conversion value is the rough gross revenue we'd expect from a converted
// trial booking (1 trial → ~25-35% paid → avg LTV ~$1500). Google Ads uses
// this for value-based bidding, so even a coarse number helps optimisation.
export const submitParentInterest = (data: ParentInterestPayload) =>
  postForm("/api/parent-interest", data, "parent_interest", 100);

export type SchoolEnquiryPayload = {
  contact_name: string;
  contact_email: string;
  contact_role?: string;
  school_name?: string;
  student_level?: string;
  number_of_students?: string;
  programme_objectives?: string;
  timing_sessions?: string;
  message?: string;
};
export const submitSchoolEnquiry = (data: SchoolEnquiryPayload) =>
  postForm("/api/school-enquiries", data, "school_enquiry", 500);

export type HackathonWaitlistPayload = {
  name: string;
  email: string;
  school: string;
  age_group: string;
  parental_consent: boolean;
};
export const submitHackathonWaitlist = (data: HackathonWaitlistPayload) =>
  postForm("/api/hackathon-waitlist", data, "hackathon_waitlist", 25);
