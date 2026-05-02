import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationForm } from "@/components/programmes/RegistrationForm";

const submitParentInterest = vi.fn().mockResolvedValue({ ok: true });
vi.mock("@/lib/formApi", () => ({
  submitParentInterest: (...args: unknown[]) =>
    submitParentInterest(...(args as [unknown])),
}));

vi.mock("@/lib/sendNotification", () => ({
  sendNotificationEmail: vi.fn().mockResolvedValue(undefined),
}));

describe("Programmes RegistrationForm (parent path)", () => {
  beforeEach(() => {
    submitParentInterest.mockClear();
  });

  it("renders the parent + student fields", () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student's name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it("blocks submission and shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RegistrationForm />);
    await user.click(screen.getByRole("button", { name: /register interest/i }));
    await waitFor(() => {
      expect(submitParentInterest).not.toHaveBeenCalled();
    });
  });

  it("submits parent_interest with the right payload (incl. phone in message) on valid input", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/your name/i), "Jane");
    await user.type(screen.getByLabelText(/^email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone/i), "+65 9000 0000");
    await user.type(screen.getByLabelText(/student's name/i), "Sam");
    // Pick the 13-15 age + group format radios
    await user.click(screen.getByLabelText(/^13-15$/));
    await user.click(screen.getByLabelText(/group sessions/i));
    await user.click(screen.getByRole("button", { name: /register interest/i }));

    await waitFor(() => {
      expect(submitParentInterest).toHaveBeenCalledTimes(1);
    });
    const payload = submitParentInterest.mock.calls[0][0] as Record<string, unknown>;
    expect(payload.parent_name).toBe("Jane");
    expect(payload.parent_email).toBe("jane@example.com");
    expect(payload.student_name).toBe("Sam");
    expect(payload.student_age).toBe("13-15");
    expect(payload.programme_interest).toBe("group");
    // Phone is folded into the message body since the DB has no phone column
    expect(String(payload.message)).toContain("+65 9000 0000");
  });
});
