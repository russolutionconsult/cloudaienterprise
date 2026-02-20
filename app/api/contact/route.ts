import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, NOTIFICATION_EMAIL, FROM_EMAIL } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, package: pkg, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error: dbError } = await getSupabaseAdmin().from("contacts").insert({
      name,
      email,
      company,
      package: pkg,
      message,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    // Send notification email to CloudAI team
    try {
      await getResend().emails.send({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `New Contact: ${name} from ${company || "Unknown"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Package Interest:</strong> ${pkg || "Not selected"}</p>
          <p><strong>Message:</strong></p>
          <p>${message || "No message"}</p>
        `,
      });
    } catch (emailErr) {
      console.error("Notification email error:", emailErr);
    }

    // Send confirmation email to the submitter
    try {
      await getResend().emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "We received your message — CloudAI Enterprise",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="color: #f0f2f5;">Thanks for reaching out, ${name}!</h2>
            <p style="color: #8a8f9c; line-height: 1.6;">
              We've received your message and will get back to you within 24 hours (Monday–Friday).
            </p>
            <p style="color: #8a8f9c; line-height: 1.6;">
              In the meantime, you can take our free
              <a href="https://cloudaienterprise.com/#quiz" style="color: #3b6bff;">AI Readiness Assessment</a>
              to see where your business stands.
            </p>
            <p style="color: #5a5f6d; font-size: 12px; margin-top: 32px;">
              — The CloudAI Enterprise Team
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Confirmation email error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
