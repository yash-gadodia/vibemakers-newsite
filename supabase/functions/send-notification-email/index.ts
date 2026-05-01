import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Vibby — Telegram bot that mirrors form submissions to the vibemakers group chat.
// Both env vars are required for Telegram delivery; if either is missing, the
// Telegram step is skipped silently (email still sends).
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

const escapeMarkdown = (s: string) =>
  String(s ?? "").replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");

const formatTelegramMessage = (formType: string, data: Record<string, any>) => {
  const lines: string[] = [];
  switch (formType) {
    case "parent_interest":
      lines.push("*🎓 New Parent Interest*");
      lines.push(`Parent: ${escapeMarkdown(data.parent_name)} \\(${escapeMarkdown(data.parent_email)}\\)`);
      lines.push(`Student: ${escapeMarkdown(data.student_name)} \\(age ${escapeMarkdown(data.student_age)}\\)`);
      if (data.programme_interest) lines.push(`Interest: ${escapeMarkdown(data.programme_interest)}`);
      if (data.message) lines.push(`Message: ${escapeMarkdown(data.message)}`);
      break;
    case "school_enquiry":
      lines.push("*🏫 New School Enquiry*");
      lines.push(`From: ${escapeMarkdown(data.contact_name)}${data.contact_role ? ` \\(${escapeMarkdown(data.contact_role)}\\)` : ""}`);
      if (data.school_name) lines.push(`School: ${escapeMarkdown(data.school_name)}`);
      lines.push(`Email: ${escapeMarkdown(data.contact_email)}`);
      if (data.number_of_students || data.student_level) {
        lines.push(`Cohort: ${escapeMarkdown(data.number_of_students || "-")} ${escapeMarkdown(data.student_level || "")}`.trim());
      }
      const schoolMsg = data.message || data.programme_objectives;
      if (schoolMsg) lines.push(`Message: ${escapeMarkdown(schoolMsg)}`);
      break;
    case "hackathon_waitlist":
      lines.push("*🏆 New Hackathon Signup*");
      lines.push(`Name: ${escapeMarkdown(data.name)} \\(${escapeMarkdown(data.email)}\\)`);
      lines.push(`School: ${escapeMarkdown(data.school)}, age ${escapeMarkdown(data.age_group)}`);
      lines.push(`Parental consent: ${data.parental_consent ? "✓" : "✗"}`);
      break;
    case "deploy":
      // Used by GitHub Actions / Railway hook to ping the chat on each deploy.
      lines.push("*🚀 Site updated*");
      if (data.commit) lines.push(`Commit: \`${escapeMarkdown(data.commit)}\``);
      if (data.message) lines.push(escapeMarkdown(data.message));
      if (data.url) lines.push(`URL: ${escapeMarkdown(data.url)}`);
      break;
    default:
      lines.push("*New form submission*");
      lines.push("```");
      lines.push(JSON.stringify(data, null, 2));
      lines.push("```");
  }
  return lines.join("\n");
};

const sendTelegramNotification = async (
  formType: string,
  data: Record<string, any>,
) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
    return;
  }
  try {
    const text = formatTelegramMessage(formType, data);
    const resp = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        }),
      },
    );
    if (!resp.ok) {
      const err = await resp.text();
      console.error("Telegram send failed:", resp.status, err);
    }
  } catch (e) {
    console.error("Telegram error:", e);
  }
};

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

    // Mirror to Telegram (vibby). Fire-and-forget so a Telegram failure
    // doesn't block the email-success response.
    await sendTelegramNotification(formType, data);

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
