import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnquiryForm } from "@/components/ui/enquiry-form";

const insertMock = vi.fn().mockResolvedValue({ error: null });
const fromMock = vi.fn(() => ({ insert: insertMock }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: (...args: unknown[]) => fromMock(...args),
    functions: { invoke: vi.fn().mockResolvedValue({ error: null }) },
  },
}));

vi.mock("@/lib/sendNotification", () => ({
  sendNotificationEmail: vi.fn().mockResolvedValue(undefined),
}));

describe("EnquiryForm", () => {
  beforeEach(() => {
    fromMock.mockClear();
    insertMock.mockClear();
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

  it("submits parent form to parent_interest table on valid submit", async () => {
    const user = userEvent.setup({ delay: null });
    render(<EnquiryForm audience="parent" />);
    await user.type(screen.getByLabelText(/parent name/i), "Jane");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/student name/i), "Sam");
    await user.type(screen.getByLabelText(/student age/i), "14");
    const button = screen.getByRole("button", { name: /send enquiry/i });
    await user.click(button);
    expect(fromMock).toHaveBeenCalledWith("parent_interest");
    expect(insertMock).toHaveBeenCalled();
  });
});
