"use client";

const stats = [
  "77% of AI projects fail before scaling",
  "Only 8% of companies see full ROI from AI",
  "$500B wasted on failed AI deployments in 2024",
  "62% of CEOs don't know where to start with AI",
  "AI-trained teams outperform by 40%",
  "Companies with AI strategy see 3.2x more productivity",
];

export default function Ticker() {
  return (
    <div className="border-y border-border bg-bg overflow-hidden py-3">
      <div className="ticker-track flex whitespace-nowrap">
        {[...stats, ...stats].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 mx-10 text-[13px] text-text-muted font-mono"
          >
            <span className="w-[3px] h-[3px] rounded-full bg-text-muted flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
