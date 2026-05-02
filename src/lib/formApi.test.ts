import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const trackConversion = vi.fn();
vi.mock("@/lib/gtag", () => ({
  trackConversion: (...args: unknown[]) => trackConversion(...args),
}));

import {
  submitParentInterest,
  submitSchoolEnquiry,
  submitHackathonWaitlist,
} from "./formApi";

describe("formApi", () => {
  beforeEach(() => {
    trackConversion.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mockFetchOk(body: object = { ok: true }) {
    return vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => body,
    } as unknown as Response);
  }

  function mockFetchError(status: number, body: object = { ok: false, error: "boom" }) {
    return vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status,
      json: async () => body,
    } as unknown as Response);
  }

  describe("submitParentInterest", () => {
    it("POSTs to /api/parent-interest and returns ok:true on success", async () => {
      const fetchSpy = mockFetchOk();
      const result = await submitParentInterest({
        parent_name: "Jane",
        parent_email: "jane@example.com",
        student_name: "Sam",
        student_age: "14",
      });

      expect(result).toEqual({ ok: true });
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, init] = fetchSpy.mock.calls[0];
      expect(url).toBe("/api/parent-interest");
      expect(init?.method).toBe("POST");
      expect(init?.headers).toMatchObject({ "Content-Type": "application/json" });
      const body = JSON.parse(init?.body as string) as Record<string, unknown>;
      expect(body.parent_name).toBe("Jane");
      expect(body.parent_email).toBe("jane@example.com");
    });

    it("fires trackConversion with parent_interest + value 100 on success", async () => {
      mockFetchOk();
      await submitParentInterest({
        parent_name: "Jane",
        parent_email: "jane@example.com",
        student_name: "Sam",
        student_age: "14",
      });
      expect(trackConversion).toHaveBeenCalledWith("parent_interest", 100);
    });

    it("returns ok:false with error string when server responds non-ok", async () => {
      mockFetchError(500, { ok: false, error: "db down" });
      const result = await submitParentInterest({
        parent_name: "Jane",
        parent_email: "jane@example.com",
        student_name: "Sam",
        student_age: "14",
      });
      expect(result).toEqual({ ok: false, error: "db down" });
      expect(trackConversion).not.toHaveBeenCalled();
    });

    it("returns ok:false when fetch itself throws (network error)", async () => {
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("offline"));
      const result = await submitParentInterest({
        parent_name: "Jane",
        parent_email: "jane@example.com",
        student_name: "Sam",
        student_age: "14",
      });
      expect(result.ok).toBe(false);
      expect(trackConversion).not.toHaveBeenCalled();
    });

    it("never bubbles trackConversion failure into the success path", async () => {
      mockFetchOk();
      trackConversion.mockImplementation(() => {
        throw new Error("gtag explode");
      });
      const result = await submitParentInterest({
        parent_name: "Jane",
        parent_email: "jane@example.com",
        student_name: "Sam",
        student_age: "14",
      });
      // Submit still considered successful — gtag failure is swallowed
      expect(result).toEqual({ ok: true });
    });
  });

  describe("submitSchoolEnquiry", () => {
    it("POSTs to /api/school-enquiries and tracks school_enquiry conversion at $500", async () => {
      const fetchSpy = mockFetchOk();
      const result = await submitSchoolEnquiry({
        contact_name: "Mr Lim",
        contact_email: "lim@school.sg",
        school_name: "Loyang View Sec",
      });
      expect(result).toEqual({ ok: true });
      expect(fetchSpy.mock.calls[0][0]).toBe("/api/school-enquiries");
      expect(trackConversion).toHaveBeenCalledWith("school_enquiry", 500);
    });
  });

  describe("submitHackathonWaitlist", () => {
    it("POSTs to /api/hackathon-waitlist and tracks hackathon_waitlist conversion at $25", async () => {
      const fetchSpy = mockFetchOk();
      const result = await submitHackathonWaitlist({
        name: "Sam",
        email: "sam@example.com",
        school: "RGS",
        age_group: "13-15",
        parental_consent: true,
      });
      expect(result).toEqual({ ok: true });
      expect(fetchSpy.mock.calls[0][0]).toBe("/api/hackathon-waitlist");
      expect(trackConversion).toHaveBeenCalledWith("hackathon_waitlist", 25);
    });

    it("returns ok:false with HTTP status when body has no error message", async () => {
      mockFetchError(503, {});
      const result = await submitHackathonWaitlist({
        name: "Sam",
        email: "sam@example.com",
        school: "RGS",
        age_group: "13-15",
        parental_consent: true,
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toMatch(/503/);
      }
    });
  });
});
