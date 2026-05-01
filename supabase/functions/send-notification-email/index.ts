import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  formType: "parent_interest" | "school_enquiry" | "hackathon_waitlist";
  data: Record<string, any>;
}

const formatParentInterest = (data: Record<string, any>) => `
<h2>New Parent Interest Submission</h2>
<table style="border-collapse: collapse; width: 100%;">
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Parent Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.parent_name}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Parent Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.parent_email}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Student Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.student_name}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Student Age:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.student_age}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Programme Interest:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.programme_interest}</td></tr>
  ${data.message ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.message}</td></tr>` : ''}
</table>
`;

const formatSchoolEnquiry = (data: Record<string, any>) => `
<h2>New School Enquiry</h2>
<table style="border-collapse: collapse; width: 100%;">
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>School Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.school_name}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.contact_name}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.contact_email}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact Role:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.contact_role}</td></tr>
  ${data.message ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.message}</td></tr>` : ''}
</table>
`;

const formatHackathonWaitlist = (data: Record<string, any>) => `
<h2>New Hackathon Waitlist Signup</h2>
<table style="border-collapse: collapse; width: 100%;">
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>School:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.school}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Age Group:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.age_group}</td></tr>
  <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Parental Consent:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.parental_consent ? 'Yes' : 'No'}</td></tr>
</table>
`;

const getSubject = (formType: string) => {
  switch (formType) {
    case "parent_interest":
      return "🎓 New Parent Interest Submission - VibeMakerz";
    case "school_enquiry":
      return "🏫 New School Enquiry - VibeMakerz";
    case "hackathon_waitlist":
      return "🏆 New Hackathon Waitlist Signup - VibeMakerz";
    default:
      return "New Form Submission - VibeMakerz";
  }
};

const getEmailContent = (formType: string, data: Record<string, any>) => {
  switch (formType) {
    case "parent_interest":
      return formatParentInterest(data);
    case "school_enquiry":
      return formatSchoolEnquiry(data);
    case "hackathon_waitlist":
      return formatHackathonWaitlist(data);
    default:
      return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, data }: NotificationRequest = await req.json();

    const ccRecipients = ["pirsquare.yash@gmail.com", "danielleona.p@gmail.com"];

    const emailResponse = await resend.emails.send({
      from: "VibeMakerz <human@vibemakers.dev>",
      to: ["vibemakers@dialogic.academy"],
      cc: ccRecipients,
      subject: getSubject(formType),
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              h2 { color: #6366f1; }
              table { margin-top: 16px; }
            </style>
          </head>
          <body>
            ${getEmailContent(formType, data)}
            <p style="margin-top: 24px; color: #666; font-size: 12px;">
              This is an automated notification from Vibe Makers website.
            </p>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending notification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
