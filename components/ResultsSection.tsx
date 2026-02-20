"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import AnimatedCounter from "./AnimatedCounter";

const metrics = [
  { value: "3.2x", label: "Avg. productivity gain" },
  { value: "67%", label: "Reduction in manual tasks" },
  { value: "<90", label: "Days to measurable ROI" },
  { value: "200+", label: "Leaders trained" },
];

const testimonials = [
  {
    quote:
      "CloudAI didn't just give us tools — they gave us a strategy. Our team went from AI-skeptics to AI-advocates in 8 weeks.",
    name: "Sarah Chen",
    title: "CEO, Meridian Health Systems",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face",
  },
  {
    quote:
      "We'd wasted $200K on AI tools nobody used. CloudAI found the 3 tools that actually mattered and trained our entire team in 30 days.",
    name: "Marcus Thompson",
    title: "COO, Atlas Logistics",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
  },
  {
    quote:
      "The ROI framework alone was worth 10x what we paid. For the first time, I can show the board exactly what AI is doing for us.",
    name: "Jennifer Park",
    title: "VP Operations, NovaTech",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&fit=crop&crop=face",
  },
];

export default function ResultsSection() {
  return (
    <section
      id="results"
      className="py-28 md:py-36 bg-bg-surface relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop&q=60"
          alt=""
          width={1600}
          height={900}
          className="w-full h-full object-cover opacity-[0.03]"
        />
      </div>

      <div className="relative max-w-content mx-auto px-6">
        {/* Metrics with animated counters */}
        <AnimatedSection>
          <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-16">
            Results
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 mb-28">
          {metrics.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tighter text-text-primary leading-none">
                  <AnimatedCounter target={m.value} />
                </span>
                <span className="block text-sm text-text-muted mt-3">
                  {m.label}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Testimonials */}
        <div className="border-t border-border pt-20">
          <AnimatedSection>
            <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-12">
              From our clients
            </p>
          </AnimatedSection>

          {/* Featured testimonial */}
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-8">
                <blockquote className="text-2xl md:text-[1.75rem] font-medium leading-[1.45] tracking-tight text-text-primary">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </blockquote>
              </div>
              <div className="lg:col-span-4 flex items-end">
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {testimonials[0].name}
                    </p>
                    <p className="text-text-muted text-xs">
                      {testimonials[0].title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Supporting testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
            {testimonials.slice(1).map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-bg-card p-8 md:p-10 h-full">
                  <p className="text-text-secondary text-[0.9375rem] leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-text-muted text-xs">{t.title}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
