import { ImageResponse } from "next/og";

export const alt = "CloudAI Enterprise — AI Adoption & Training for Business Leaders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0c12",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(59, 107, 255, 0.08)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(96, 165, 250, 0.06)",
            filter: "blur(80px)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #3b6bff, #60a5fa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            CA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#f0f2f5", fontSize: 28, fontWeight: 700 }}>
              CloudAI Enterprise
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              color: "#f0f2f5",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.1,
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Stop guessing with AI.
          </span>
          <span
            style={{
              color: "#3b6bff",
              fontSize: 52,
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            Start leading with it.
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            color: "#8a8f9c",
            fontSize: 22,
            marginTop: 24,
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          AI Adoption & Training for CEOs and Business Leaders
        </span>

        {/* Bottom stats */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 48,
            padding: "16px 32px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(17, 20, 32, 0.8)",
          }}
        >
          {[
            { value: "200+", label: "Leaders Trained" },
            { value: "3.2x", label: "Productivity Gain" },
            { value: "<90", label: "Days to ROI" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <span style={{ color: "#3b6bff", fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>
                {stat.value}
              </span>
              <span style={{ color: "#5a5f6d", fontSize: 13 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
