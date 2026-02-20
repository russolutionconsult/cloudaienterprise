import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Email sending will fail.");
  }
  _resend = new Resend(apiKey);
  return _resend;
}

export const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "hello@cloudaienterprise.com";

export const FROM_EMAIL = "CloudAI Enterprise <noreply@cloudaienterprise.com>";
