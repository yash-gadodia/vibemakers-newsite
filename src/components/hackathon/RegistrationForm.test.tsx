import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationForm } from "@/components/hackathon/RegistrationForm";

// Mock the network surface so the test asserts on what the form submits, not
// on HTTP plumbing or downstream notification behaviour.
const submitHackathonWaitlist = vi.fn().mockResolvedValue({ ok: true });
vi.mock("@/lib/formApi", () => ({
  submitHackathonWaitlist: (...args: unknown[]) =>
    submitHackathonWaitlist(...(args as [unknown])),
}));

vi.mock("@/lib/sendNotification", () => ({
  sendNotificationEmail: vi.fn().mockResolvedValue(undefined),
}));

describe("Hackathon RegistrationForm", () => {
  beforeEach(() => {
    submitHackathonWaitlist.mockClear();
  });

  it("renders all required fields (name, email, school) and the consent checkbox", () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^school/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/parental consent/i)).toBeInTheDocument();
  });

  it("disables the submit button until the parental consent checkbox is ticked", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RegistrationForm />);
    const submit = screen.getByRole("button", { name: /register interest/i });
    expect(submit).toBeDisabled();

    await user.click(screen.getByLabelText(/parental consent/i));
    expect(submit).not.toBeDisabled();
  });

  it("submits via submitHackathonWaitlist with name/email/school + parental_consent:true", async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/full name/i), "Sam");
    await user.type(screen.getByLabelText(/email address/i), "sam@example.com");
    await user.type(screen.getByLabelText(/^school/i), "RGS");
    await user.click(screen.getByLabelText(/parental consent/i));

    // The age_group Select is a Radix Select that's hard to drive in jsdom
    // without flake — fire the submit event directly on the form to exercise
    // the handler logic we actually care about.
    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(submitHackathonWaitlist).toHaveBeenCalledTimes(1);
    });
    const payload = submitHackathonWaitlist.mock.calls[0][0] as Record<string, unknown>;
    expect(payload.name).toBe("Sam");
    expect(payload.email).toBe("sam@example.com");
    expect(payload.school).toBe("RGS");
    expect(payload.parental_consent).toBe(true);
  });
});
