"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Background image — full bleed, cinematic */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1000&fit=crop&q=80"
          alt=""
          width={1600}
          height={1000}
          className="w-full h-full object-cover"
          priority
        />
        {/* Cinematic grade — not a generic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/40" />
        <div className="absolute inset-0 bg-bg/30" />
      </div>

      <div className="relative max-w-content mx-auto px-6 pb-20 pt-40 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="font-mono text-xs tracking-[0.2em] text-text-secondary uppercase mb-8"
          >
            AI Adoption &amp; Training Consultancy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-7"
          >
            Stop guessing
            <br />
            with AI.{" "}
            <span className="font-serif italic font-normal text-accent">
              Start leading
            </span>{" "}
            with it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[1.125rem] text-text-secondary max-w-lg mb-10 leading-relaxed"
          >
            We help CEOs and business owners adopt AI strategically — so you
            stop wasting money on tools that don&apos;t deliver and start seeing
            real ROI in 90 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link
              href="/#quiz"
              className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-white font-medium px-7 py-3.5 rounded-xl transition-colors text-[0.9375rem]"
            >
              Take the Free AI Assessment
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary font-medium px-7 py-3.5 rounded-xl transition-colors text-[0.9375rem] border border-border hover:border-border-hover"
            >
              Book a Strategy Call
            </Link>
          </motion.div>

          {/* Social proof — understated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-8 text-text-muted"
          >
            <div className="flex -space-x-2.5">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
              ].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full border-[1.5px] border-bg object-cover"
                />
              ))}
            </div>
            <span className="text-[13px] leading-tight">
              200+ leaders trained across 30 industries
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
