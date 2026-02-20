"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "A free 30-minute call. We learn about your business, current AI usage, and goals. No pitch — just clarity.",
    duration: "30 min",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    number: "02",
    title: "Assessment",
    description:
      "We audit your operations, identify the highest-impact AI opportunities, and deliver a clear 90-day roadmap.",
    duration: "1–2 weeks",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "We set up the tools, design the workflows, and train your team. Everyone knows what to do and why.",
    duration: "4–8 weeks",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "We track ROI from day one. Monthly check-ins ensure everything is performing. We optimize where needed.",
    duration: "Ongoing",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-28 md:py-36">
      <div className="max-w-content mx-auto px-6">
        <AnimatedSection>
          <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-4">
            Process
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-6">
            From confusion to clarity.
          </h2>
          <p className="text-text-secondary max-w-lg text-[0.9375rem] leading-relaxed mb-20">
            A proven framework that&apos;s helped 200+ leaders adopt AI without
            the chaos. Four steps. Measurable results.
          </p>
        </AnimatedSection>

        <div className="space-y-20">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-5 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden img-reveal">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="w-full object-cover aspect-[3/2] rounded-2xl"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="group">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-5xl md:text-6xl font-bold font-mono text-white/20 group-hover:text-accent/30 transition-colors duration-500 select-none leading-none">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">
                          {step.title}
                        </h3>
                        <span className="font-mono text-[11px] text-text-muted">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-text-secondary text-[0.9375rem] leading-relaxed pl-0 md:pl-[4.5rem]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
