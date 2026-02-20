"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    question: "How is CloudAI different from hiring a freelance AI consultant?",
    answer:
      "Freelancers often focus on a single tool or use case. We bring a systems-level approach — assessing your operations, building a strategy, training your team, and measuring ROI across the entire organization. Our methodology has been tested across 500+ implementations in 30 industries.",
  },
  {
    question: "We've already invested in AI tools. Can you still help?",
    answer:
      "Absolutely — and this is one of our most common scenarios. Most companies we work with have already spent money on tools that aren't being used effectively. We audit what you have, identify what's working, cut what's not, and build a strategy around the tools that actually matter for your business.",
  },
  {
    question: "How long until we see measurable ROI?",
    answer:
      "Our clients typically see measurable results within 90 days. The Assessment alone often reveals cost savings and efficiency gains that justify the investment. Our ROI measurement framework tracks impact from day one so you can show concrete numbers to your board.",
  },
  {
    question: "What size companies do you work with?",
    answer:
      "We primarily work with mid-market and enterprise companies (50–5,000+ employees). Our sweet spot is organizations large enough to have complex operations but agile enough to implement changes quickly. That said, we've worked with smaller companies through our Assessment package.",
  },
  {
    question: "Do you build custom AI tools or software?",
    answer:
      "Our Full Transformation package includes custom AI agent development. However, our primary focus is strategy, implementation, and training — helping you get the most out of existing AI tools and platforms rather than building from scratch. We partner with specialized development firms when custom builds are needed.",
  },
  {
    question: "What if our team is resistant to AI adoption?",
    answer:
      "This is exactly why we exist. Change management is at the core of everything we do. We've developed a training methodology that turns AI skeptics into advocates — typically within 4–8 weeks. We address fears directly, show practical wins early, and build confidence through hands-on workshops.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-[0.9375rem] font-medium group-hover:text-accent transition-colors leading-snug">
          {faq.question}
        </span>
        <span
          className={`mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center text-text-muted group-hover:text-accent transition-all duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-sm leading-[1.8] pb-6 max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-36 bg-bg-surface">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Heading */}
          <div className="lg:col-span-4">
            <AnimatedSection>
              <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-4">
                FAQ
              </p>
              <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-6">
                Common
                <br />
                <span className="font-serif italic font-normal">
                  questions.
                </span>
              </h2>
              <p className="text-text-secondary text-[0.9375rem] leading-[1.8]">
                Can&apos;t find what you&apos;re looking for? Book a free
                discovery call and we&apos;ll answer everything.
              </p>
            </AnimatedSection>
          </div>

          {/* Questions */}
          <div className="lg:col-span-8">
            <AnimatedSection delay={0.1}>
              <div className="border-t border-border">
                {faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    faq={faq}
                    isOpen={openIndex === i}
                    onToggle={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
