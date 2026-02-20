"use client";

import AnimatedSection from "./AnimatedSection";

const clients = [
  { name: "Meridian Health", industry: "Healthcare" },
  { name: "Atlas Logistics", industry: "Logistics" },
  { name: "NovaTech", industry: "Technology" },
  { name: "Pinnacle Group", industry: "Finance" },
  { name: "Evergreen Capital", industry: "Investment" },
  { name: "Nexus Media", industry: "Media" },
];

export default function ClientLogos() {
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-content mx-auto px-6">
        <AnimatedSection>
          <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase text-center mb-10">
            Trusted by leaders at
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center justify-center gap-1 py-4"
              >
                <span className="text-[15px] font-bold text-text-primary/40 tracking-tight">
                  {client.name}
                </span>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  {client.industry}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
