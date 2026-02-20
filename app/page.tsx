"use client";

import { useState } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ClientLogos from "@/components/ClientLogos";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import QuizModal from "@/components/QuizModal";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <Hero />
      <Ticker />
      <ClientLogos />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />

      {/* Quiz CTA Section */}
      <section id="quiz" className="py-28 md:py-36">
        <div className="max-w-content mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="lg:col-span-5">
              <AnimatedSection>
                <div className="rounded-2xl overflow-hidden img-reveal">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=750&fit=crop"
                    alt="Business leader reviewing AI readiness results"
                    width={600}
                    height={750}
                    className="w-full object-cover aspect-[4/5] rounded-2xl"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Content */}
            <div className="lg:col-span-7">
              <AnimatedSection delay={0.1}>
                <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-4">
                  Free Assessment
                </p>
                <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-6">
                  How AI-ready is
                  <br />
                  <span className="font-serif italic font-normal">
                    your business?
                  </span>
                </h2>
                <p className="text-text-secondary text-[0.9375rem] leading-[1.8] max-w-lg mb-8">
                  Take our 2-minute AI Readiness Quiz and get a personalized
                  score, maturity level, and recommended next steps — completely
                  free. No email required to start.
                </p>

                <div className="border-t border-border pt-6 mb-10 space-y-4">
                  {[
                    "4 questions — takes under 2 minutes",
                    "Personalized score with maturity level",
                    "Custom recommendations for your stage",
                    "Detailed results emailed to you",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="font-mono text-xs text-text-muted pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setQuizOpen(true)}
                  className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-white font-medium px-7 py-3.5 rounded-xl transition-colors text-[0.9375rem]"
                >
                  Start the Quiz
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <FAQSection />
      <ContactSection />

      {/* Final CTA */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=700&fit=crop&q=70"
            alt=""
            width={1400}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-bg/85" />
        </div>

        <div className="relative max-w-content mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-8">
              Get started
            </p>
            <h2 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6 max-w-2xl mx-auto">
              Don&apos;t let AI be the thing you{" "}
              <span className="font-serif italic font-normal">wished</span> you
              started sooner.
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-10 text-[0.9375rem] leading-[1.8]">
              Every month you wait, your competitors get further ahead.
              Let&apos;s have a conversation about where AI fits in your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setQuizOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-7 py-3.5 rounded-xl transition-colors text-[0.9375rem]"
              >
                Take the AI Assessment
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary font-medium px-7 py-3.5 rounded-xl transition-colors text-[0.9375rem] border border-border hover:border-border-hover"
              >
                Book a Free Call
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}
