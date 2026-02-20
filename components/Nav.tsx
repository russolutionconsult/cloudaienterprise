"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#results", label: "Results" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-2xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-content mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-bold text-[17px] leading-tight text-text-primary tracking-tight">
            Cloud<span className="text-accent">AI</span>
          </span>
          <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase hidden sm:block">
            Enterprise
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-text-muted hover:text-text-primary px-4 py-2 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-4 bg-border mx-2" />
          <Link
            href="/#quiz"
            className="text-[13px] font-medium text-text-primary hover:text-accent px-4 py-2 transition-colors"
          >
            Free Assessment
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-[22px] h-[1.5px] bg-text-primary transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-text-primary transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-text-primary transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
              style={{ top: 72 }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-bg border-b border-border"
            >
              <div className="px-6 py-8 flex flex-col gap-1 max-w-content mx-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-text-secondary hover:text-text-primary transition-colors py-3 text-lg"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="pt-4 mt-4 border-t border-border"
                >
                  <Link
                    href="/#quiz"
                    onClick={() => setMobileOpen(false)}
                    className="block text-accent text-lg"
                  >
                    Free Assessment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
