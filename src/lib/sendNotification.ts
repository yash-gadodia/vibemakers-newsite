import { supabase } from "@/integrations/supabase/client";

type FormType = "parent_interest" | "school_enquiry" | "hackathon_waitlist";

export async function sendNotificationEmail(formType: FormType, data: Record<string, unknown>) {
  try {
    const { error } = await supabase.functions.invoke("send-notification-email", {
      body: { formType, data },
    });

    if (error) {
      // Silent fail - notification emails are non-critical
    }
  } catch {
    // Silent fail - we don't want to show an error to the user if email fails
  }
}
