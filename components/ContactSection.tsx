"use client";

import { useState, FormEvent } from "react";
import AnimatedSection from "./AnimatedSection";

const packages = [
  "AI Readiness Assessment — $4,500",
  "AI Strategy & Implementation — $12,000",
  "Full Transformation Program — $35,000+",
  "Not sure yet — help me decide",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    package: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setFormData({ name: "", email: "", company: "", package: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-border px-0 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors";

  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — info */}
          <div className="lg:col-span-5 lg:pt-4">
            <AnimatedSection>
              <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase mb-4">
                Contact
              </p>
              <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight mb-6">
                Let&apos;s talk about
                <br />
                <span className="font-serif italic font-normal">what&apos;s next.</span>
              </h2>
              <p className="text-text-secondary text-[0.9375rem] leading-[1.8] mb-12 max-w-sm">
                Book a free 30-minute discovery call. No pitch, no pressure — just
                a clear conversation about where AI fits in your business.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Email
                  </p>
                  <p className="text-sm text-text-secondary">
                    hello@cloudaienterprise.com
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Response Time
                  </p>
                  <p className="text-sm text-text-secondary">
                    Within 24 hours, Monday – Friday
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Based in
                  </p>
                  <p className="text-sm text-text-secondary">
                    United States — serving companies nationwide
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              {status === "success" ? (
                <div className="border-t border-border pt-12 text-center">
                  <p className="text-3xl font-bold mb-3">Sent.</p>
                  <p className="text-text-secondary text-[0.9375rem]">
                    We&apos;ll get back to you within 24 hours. Check your email
                    for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider pt-6 mb-0">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={inputClass}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider pt-6 mb-0">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={inputClass}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider pt-6 mb-0">
                        Company
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider pt-6 mb-0">
                        Package
                      </label>
                      <select
                        value={formData.package}
                        onChange={(e) =>
                          setFormData({ ...formData, package: e.target.value })
                        }
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="">Select...</option>
                        {packages.map((pkg) => (
                          <option key={pkg} value={pkg}>
                            {pkg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-muted uppercase tracking-wider pt-6 mb-0">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your AI goals..."
                    />
                  </div>

                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-sm"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </button>
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm pt-4">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
