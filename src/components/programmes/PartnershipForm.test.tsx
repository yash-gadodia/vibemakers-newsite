import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PartnershipForm } from "@/components/programmes/PartnershipForm";

vi.mock("@/lib/formApi", () => ({
  submitSchoolEnquiry: vi.fn().mockResolvedValue({ ok: true }),
}));

vi.mock("@/lib/sendNotification", () => ({
  sendNotificationEmail: vi.fn().mockResolvedValue(undefined),
}));

describe("PartnershipForm (school path)", () => {
  it("renders the school enquiry fields", () => {
    render(<PartnershipForm />);
    expect(screen.getByLabelText(/school \/ organisation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of students/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/programme objectives/i)).toBeInTheDocument();
  });

  it("renders the request-a-proposal CTA on the submit button", () => {
    render(<PartnershipForm />);
    expect(
      screen.getByRole("button", { name: /request a proposal/i }),
    ).toBeInTheDocument();
  });

  it("zod validation blocks submit when the required role is not picked", async () => {
    const { submitSchoolEnquiry } = (await import("@/lib/formApi")) as {
      submitSchoolEnquiry: ReturnType<typeof vi.fn>;
    };
    submitSchoolEnquiry.mockClear();

    const user = userEvent.setup({ delay: null });
    render(<PartnershipForm />);
    // Fill name + email but skip the (required) role select
    await user.type(screen.getByLabelText(/your name/i), "Mr Lim");
    await user.type(screen.getByLabelText(/^email/i), "lim@school.sg");
    await user.click(screen.getByRole("button", { name: /request a proposal/i }));

    // Without role, zod should block — submitSchoolEnquiry must not have fired
    expect(submitSchoolEnquiry).not.toHaveBeenCalled();
  });
});
