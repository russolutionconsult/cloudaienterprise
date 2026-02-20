"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-36">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Image — single, strong */}
          <div className="lg:col-span-5">
            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden img-reveal sticky top-24">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=900&fit=crop"
                  alt="CloudAI Enterprise team"
                  width={700}
                  height={900}
                  className="rounded-2xl object-cover w-full aspect-[3/4]"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 lg:pt-8">
            <AnimatedSection>
              <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-4">
                About
              </p>
              <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-8">
                We&apos;ve been where
                <br />
                <span className="font-serif italic font-normal">you are.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-5 text-text-secondary text-[0.9375rem] leading-[1.8] mb-12">
                <p>
                  CloudAI Enterprise was founded by a team of former enterprise
                  consultants who watched company after company waste millions on
                  AI projects that went nowhere.
                </p>
                <p>
                  The problem was never the technology — it was the approach.
                  Companies buying tools before building strategy. Skipping
                  training. Measuring the wrong things.
                </p>
                <p>
                  We built CloudAI to fix that. Our methodology combines
                  battle-tested change management with cutting-edge AI expertise
                  to help business leaders adopt AI in a way that actually sticks.
                </p>
              </div>
            </AnimatedSection>

            {/* Credentials — tight, no cards */}
            <AnimatedSection delay={0.2}>
              <div className="border-t border-border pt-8 space-y-4">
                {[
                  "Former Big 4 consulting team",
                  "500+ AI implementations across 30 industries",
                  "Published in HBR & Forbes",
                  "Partners: OpenAI, Microsoft, Google Cloud",
                ].map((cred, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{cred}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Stats — inline */}
            <AnimatedSection delay={0.3}>
              <div className="flex gap-12 mt-12">
                <div>
                  <span className="block text-3xl font-bold font-mono tracking-tight">8+</span>
                  <span className="text-xs text-text-muted mt-1 block">Years</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-mono tracking-tight">30+</span>
                  <span className="text-xs text-text-muted mt-1 block">Industries</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold font-mono tracking-tight">500+</span>
                  <span className="text-xs text-text-muted mt-1 block">Implementations</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
