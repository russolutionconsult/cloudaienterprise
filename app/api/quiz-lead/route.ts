import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { getResult } from "@/lib/quiz-scoring";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, score, level, answers } = body;

    if (!name || !email || score === undefined) {
      return NextResponse.json(
        { error: "Name, email, and score are required" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error: dbError } = await getSupabaseAdmin()
      .from("quiz_leads")
      .insert({
        name,
        email,
        company,
        score,
        level,
        answers,
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    // Send results email to the user
    const result = getResult(score);

    try {
      await getResend().emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Your AI Readiness Score: ${score}/100 — ${level}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; background: #0a0c12; color: #f0f2f5; padding: 40px; border-radius: 16px;">
            <h1 style="text-align: center; font-size: 24px; margin-bottom: 8px;">
              Your AI Readiness Score
            </h1>

            <div style="text-align: center; margin: 32px 0;">
              <div style="display: inline-block; width: 100px; height: 100px; border-radius: 50%; border: 6px solid ${result.color}; line-height: 88px; font-size: 36px; font-weight: bold; font-family: monospace;">
                ${score}
              </div>
              <div style="margin-top: 12px;">
                <span style="background: ${result.color}20; color: ${result.color}; padding: 4px 16px; border-radius: 20px; font-size: 14px; font-family: monospace;">
                  ${level}
                </span>
              </div>
            </div>

            <p style="color: #8a8f9c; line-height: 1.6; margin-bottom: 24px;">
              ${result.advice}
            </p>

            <div style="background: #111420; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <div style="color: #5a5f6d; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 1px;">
                Recommended Next Step
              </div>
              <div style="font-weight: 600; margin-top: 4px;">
                ${result.nextStep}
              </div>
            </div>

            <div style="text-align: center;">
              <a href="https://cloudaienterprise.com/contact"
                 style="display: inline-block; background: #3b6bff; color: white; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 500;">
                Book a Free Strategy Call
              </a>
            </div>

            <p style="color: #5a5f6d; font-size: 12px; text-align: center; margin-top: 32px;">
              — The CloudAI Enterprise Team
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Quiz results email error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quiz lead error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
