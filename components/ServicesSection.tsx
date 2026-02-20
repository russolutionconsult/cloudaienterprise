"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    title: "AI Readiness Assessment",
    description:
      "A comprehensive audit of your operations, tech stack, and team capabilities. We identify the highest-impact AI opportunities and build a 90-day roadmap specific to your business.",
    features: [
      "Full operational audit",
      "AI opportunity mapping",
      "90-day implementation roadmap",
      "Tool & vendor recommendations",
      "Executive summary report",
    ],
    price: "$4,500",
    label: "Foundation",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
  },
  {
    title: "AI Strategy & Implementation",
    description:
      "End-to-end AI adoption. We don't just tell you what to do — we help you do it. From tool selection to workflow integration to team training.",
    features: [
      "Everything in Assessment",
      "Custom AI workflow design",
      "Tool setup & integration",
      "Team training (up to 25 people)",
      "30-day post-launch support",
      "ROI measurement framework",
    ],
    price: "$12,000",
    label: "Most Popular",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
  },
  {
    title: "Full Transformation",
    description:
      "For companies going all-in. A 6-month engagement that transforms your entire organization into an AI-powered operation with measurable results.",
    features: [
      "Everything in Strategy",
      "Department-by-department rollout",
      "Custom AI agent development",
      "Ongoing training & certification",
      "Quarterly strategy reviews",
      "Dedicated success manager",
    ],
    price: "$35,000+",
    label: "Enterprise",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 md:py-36 bg-bg-surface">
      <div className="max-w-content mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-4">
                Services
              </p>
              <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight">
                Three paths to
                <br />
                <span className="font-serif italic font-normal">
                  AI confidence.
                </span>
              </h2>
            </div>
            <p className="text-text-secondary max-w-sm text-[0.9375rem] leading-relaxed md:text-right">
              Every engagement starts with understanding your business. No
              cookie-cutter solutions.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                className={`bg-bg-card flex flex-col h-full relative ${
                  i === 1 ? "bg-bg-card-hover" : ""
                }`}
              >
                {/* Card image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
                  {i === 1 && (
                    <span className="absolute top-4 right-4 font-mono text-[10px] text-white bg-accent px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>

                <div className="p-8 md:p-9 flex flex-col flex-grow">
                  <p className="font-mono text-[10px] tracking-[0.15em] text-text-muted uppercase mb-5">
                    {service.label}
                  </p>

                  <h3 className="text-xl font-bold mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-10 flex-grow">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-text-secondary"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <p className="text-2xl font-bold font-mono tracking-tight mb-5">
                      {service.price}
                    </p>
                    <Link
                      href="/contact"
                      className={`block text-center py-3 rounded-xl text-sm font-medium transition-all ${
                        i === 1
                          ? "bg-accent hover:bg-accent-hover text-white"
                          : "text-text-secondary hover:text-text-primary border border-border hover:border-border-hover"
                      }`}
                    >
                      Get started
                    </Link>
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
