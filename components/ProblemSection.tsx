"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const problems = [
  {
    title: "Buying tools without a strategy",
    description:
      "ChatGPT Enterprise, Copilot, a dozen SaaS tools — but adoption is low and nobody knows how to use them effectively.",
  },
  {
    title: "No way to measure ROI",
    description:
      "Leadership wants numbers. You can't quantify the impact. Projects get shelved because there's no business case.",
  },
  {
    title: "Team resistance and confusion",
    description:
      "Your people don't trust AI, don't know how to use it, or are afraid it'll replace them. Change management is non-existent.",
  },
  {
    title: "Falling behind competitors",
    description:
      "Your competitors are moving fast with AI. You're figuring out where to start. Every month of delay widens the gap.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background image — subtle, atmospheric */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1600&h=900&fit=crop&q=60"
          alt=""
          width={1600}
          height={900}
          className="w-full h-full object-cover opacity-[0.04]"
        />
      </div>

      <div className="relative max-w-content mx-auto px-6">
        {/* Big editorial number */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start mb-20">
            <div className="lg:col-span-4">
              <span className="block text-[8rem] md:text-[11rem] font-bold font-mono leading-none text-white/20 select-none">
                77%
              </span>
            </div>
            <div className="lg:col-span-8 lg:pt-8">
              <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-5">
                of AI projects fail
                <br />
                before they scale.
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-lg">
                Most businesses are stuck in the same traps. You&apos;re not
                alone — and there&apos;s a clear way out.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Problem list */}
        <div className="border-t border-border">
          {problems.map((problem, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 border-b border-border group">
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-300">
                    {problem.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-text-secondary text-[0.9375rem] leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
