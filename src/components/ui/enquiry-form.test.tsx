import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnquiryForm } from "@/components/ui/enquiry-form";

// formApi.ts is the new entry point (replaces direct supabase calls).
// We mock it so the test asserts on payload shape + call ordering rather
// than HTTP plumbing.
const submitParentInterest = vi.fn().mockResolvedValue({ ok: true });
const submitSchoolEnquiry = vi.fn().mockResolvedValue({ ok: true });

vi.mock("@/lib/formApi", () => ({
  submitParentInterest: (...args: unknown[]) =>
    submitParentInterest(...(args as [unknown])),
  submitSchoolEnquiry: (...args: unknown[]) =>
    submitSchoolEnquiry(...(args as [unknown])),
}));

vi.mock("@/lib/sendNotification", () => ({
  sendNotificationEmail: vi.fn().mockResolvedValue(undefined),
}));

describe("EnquiryForm", () => {
  beforeEach(() => {
    submitParentInterest.mockClear();
    submitSchoolEnquiry.mockClear();
  });

  it("renders parent fields when audience is parent", () => {
    render(<EnquiryForm audience="parent" />);
    expect(screen.getByLabelText(/parent name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/school name/i)).toBeNull();
  });

  it("renders school fields when audience is school", () => {
    render(<EnquiryForm audience="school" />);
    expect(screen.getByLabelText(/school name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/parent name/i)).toBeNull();
  });

  it("submits parent form via submitParentInterest on valid input", async () => {
    const user = userEvent.setup({ delay: null });
    render(<EnquiryForm audience="parent" />);
    await user.type(screen.getByLabelText(/parent name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/student name/i), "Sam");
    await user.type(screen.getByLabelText(/student age/i), "14");
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => {
      expect(submitParentInterest).toHaveBeenCalledTimes(1);
    });
    const payload = submitParentInterest.mock.calls[0][0] as Record<string, unknown>;
    expect(payload.parent_name).toBe("Jane");
    expect(payload.parent_email).toBe("jane@example.com");
    expect(payload.student_name).toBe("Sam");
    expect(payload.student_age).toBe("14");
  });

  it("includes phone in message when phone is filled", async () => {
    const user = userEvent.setup({ delay: null });
    render(<EnquiryForm audience="parent" />);
    await user.type(screen.getByLabelText(/parent name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone/i), "+65 9123 4567");
    await user.type(screen.getByLabelText(/student name/i), "Sam");
    await user.type(screen.getByLabelText(/student age/i), "14");
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => {
      expect(submitParentInterest).toHaveBeenCalled();
    });
    const payload = submitParentInterest.mock.calls[0][0] as Record<string, unknown>;
    expect(payload.message).toContain("Phone:");
    expect(payload.message).toContain("+65 9123 4567");
  });

  it("does not submit when required fields are missing", async () => {
    const user = userEvent.setup({ delay: null });
    render(<EnquiryForm audience="parent" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    // Zod validation should block the submit
    expect(submitParentInterest).not.toHaveBeenCalled();
  });

  it("submits school form via submitSchoolEnquiry", async () => {
    const user = userEvent.setup({ delay: null });
    render(<EnquiryForm audience="school" />);
    await user.type(screen.getByLabelText(/contact name/i), "Mr Lim");
    await user.type(screen.getByLabelText(/your role/i), "HoD Computing");
    await user.type(screen.getByLabelText(/^email/i), "lim@school.sg");
    await user.type(screen.getByLabelText(/school name/i), "Loyang View Secondary");
    await user.click(screen.getByRole("button", { name: /get a proposal/i }));

    await waitFor(() => {
      expect(submitSchoolEnquiry).toHaveBeenCalledTimes(1);
    });
    const payload = submitSchoolEnquiry.mock.calls[0][0] as Record<string, unknown>;
    expect(payload.contact_name).toBe("Mr Lim");
    expect(payload.contact_email).toBe("lim@school.sg");
    expect(payload.school_name).toBe("Loyang View Secondary");
  });
});
