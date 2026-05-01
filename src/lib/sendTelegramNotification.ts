// Mirror form submissions to the vibemakers Telegram group via vibby2_bot.
// POSTs to the same Railway service that serves the static build (server.js
// at the repo root); the bot token + chat id live in Railway env vars, never
// in the client bundle.
//
// Fire-and-forget: a Telegram failure must NOT block the user-facing form
// success path. Always swallow errors, just log to console.

export type TelegramFormType =
  | "parent_interest"
  | "school_enquiry"
  | "hackathon_waitlist"
  | "deploy"
  | "test";

export async function sendTelegramNotification(
  formType: TelegramFormType | string,
  data: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch("/api/notify-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType, data }),
    });
  } catch (e) {
    console.warn("[telegram] notification failed:", e);
  }
}
