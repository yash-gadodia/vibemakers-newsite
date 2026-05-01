// Form-submission helpers backed by the Railway server.js + Postgres.
// Replaces direct supabase.from(...).insert() calls in the form components.

const API_BASE = "";

async function postForm<T>(path: string, body: T): Promise<{ ok: true } | { ok: false; error: string }> {
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
export const submitParentInterest = (data: ParentInterestPayload) =>
  postForm("/api/parent-interest", data);

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
  postForm("/api/school-enquiries", data);

export type HackathonWaitlistPayload = {
  name: string;
  email: string;
  school: string;
  age_group: string;
  parental_consent: boolean;
};
export const submitHackathonWaitlist = (data: HackathonWaitlistPayload) =>
  postForm("/api/hackathon-waitlist", data);
