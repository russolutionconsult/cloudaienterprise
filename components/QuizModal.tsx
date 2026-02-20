"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions, calculateScore, getResult, type QuizResult } from "@/lib/quiz-scoring";
import Link from "next/link";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Stage = "questions" | "lead-capture" | "results";

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    startTime.current = null;

    function animate(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return <>{count}</>;
}

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [stage, setStage] = useState<Stage>("questions");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [leadData, setLeadData] = useState({ name: "", email: "", company: "" });
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStage("questions");
        setCurrentQ(0);
        setAnswers({});
        setLeadData({ name: "", email: "", company: "" });
        setResult(null);
        setAnimateScore(false);
        setSelectedOption(null);
      }, 300);
    }
  }, [isOpen]);

  function handleAnswer(weight: number, index: number) {
    setSelectedOption(index);

    // Delay transition for visual feedback
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQ]: weight };
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setStage("lead-capture");
      }
    }, 300);
  }

  async function handleLeadSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const score = calculateScore(answers);
    const quizResult = getResult(score);
    setResult(quizResult);

    try {
      await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          score: quizResult.score,
          level: quizResult.level,
          answers,
        }),
      });
    } catch {
      // Still show results even if API fails
    }

    setSubmitting(false);
    setStage("results");
    setTimeout(() => setAnimateScore(true), 400);
  }

  const progress = stage === "questions"
    ? ((currentQ) / quizQuestions.length) * 100
    : 100;

  const circumference = 2 * Math.PI * 54;
  const targetOffset = result
    ? circumference - (result.score / 100) * circumference
    : circumference;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="AI Readiness Quiz"
            className="relative bg-bg-card border border-border rounded-3xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40"
          >
            {/* Top bar with progress + close */}
            <div className="sticky top-0 z-10 bg-bg-card/80 backdrop-blur-xl rounded-t-3xl border-b border-border">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white text-[10px] font-bold">
                    CA
                  </div>
                  <span className="text-sm font-medium text-text-secondary">
                    {stage === "questions"
                      ? "AI Readiness Quiz"
                      : stage === "lead-capture"
                        ? "Almost there..."
                        : "Your Results"
                    }
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-text-primary transition-all"
                  aria-label="Close quiz"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              {stage !== "results" && (
                <div className="h-[3px] bg-bg">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-blue-400 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
                  </motion.div>
                </div>
              )}
            </div>

            <div className="p-7">
              <AnimatePresence mode="wait">
                {/* QUESTIONS STAGE */}
                {stage === "questions" && (
                  <motion.div
                    key={`q-${currentQ}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Step dots */}
                    <div className="flex items-center gap-2 mb-5">
                      {quizQuestions.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i < currentQ
                              ? "bg-accent w-6"
                              : i === currentQ
                                ? "bg-accent w-8"
                                : "bg-white/15 w-6"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mb-7">
                      <span className="font-mono text-xs text-text-muted">
                        {currentQ + 1} / {quizQuestions.length}
                      </span>
                      <h3 className="text-xl font-bold mt-2 leading-snug">
                        {quizQuestions[currentQ].question}
                      </h3>
                    </div>

                    <div className="space-y-2.5">
                      {quizQuestions[currentQ].options.map((option, i) => (
                        <motion.button
                          key={i}
                          onClick={() => handleAnswer(option.weight, i)}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full text-left border rounded-xl p-4 text-sm transition-all group ${
                            selectedOption === i
                              ? "bg-accent/10 border-accent text-text-primary"
                              : "bg-bg border-border hover:border-accent/40 hover:bg-accent/10 text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono flex-shrink-0 transition-all ${
                                selectedOption === i
                                  ? "bg-accent text-white"
                                  : "border border-border group-hover:border-accent/40 text-text-muted group-hover:text-accent"
                              }`}
                            >
                              {selectedOption === i ? (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                String.fromCharCode(65 + i)
                              )}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{option.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* LEAD CAPTURE STAGE */}
                {stage === "lead-capture" && (
                  <motion.div
                    key="lead-capture"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="text-center mb-7">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-blue-400 text-white flex items-center justify-center mx-auto mb-4"
                      >
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      </motion.div>
                      <h3 className="text-xl font-bold">
                        Your results are ready!
                      </h3>
                      <p className="text-text-secondary text-sm mt-2">
                        Enter your details to see your personalized AI Readiness Score.
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-medium text-text-muted mb-1.5 ml-1">Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Smith"
                          value={leadData.name}
                          onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-muted mb-1.5 ml-1">Work email</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={leadData.email}
                          onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-muted mb-1.5 ml-1">Company</label>
                        <input
                          type="text"
                          required
                          placeholder="Acme Corp"
                          value={leadData.company}
                          onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-accent to-blue-400 hover:opacity-90 disabled:opacity-50 text-white font-medium py-3.5 rounded-xl transition-all mt-2 shadow-lg shadow-accent/20"
                      >
                        {submitting ? (
                          <span className="inline-flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-20" />
                              <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            Calculating your score...
                          </span>
                        ) : (
                          "See My Results"
                        )}
                      </button>
                      <p className="text-text-muted text-xs text-center pt-1">
                        We&apos;ll email you a copy. No spam, ever.
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* RESULTS STAGE */}
                {stage === "results" && result && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {/* Glow behind score ring */}
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute inset-0 rounded-full blur-2xl"
                        style={{ backgroundColor: result.color }}
                      />
                      <svg className="relative w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60" cy="60" r="54"
                          fill="none"
                          stroke="currentColor"
                          className="text-white/15"
                          strokeWidth="7"
                        />
                        <circle
                          cx="60" cy="60" r="54"
                          fill="none"
                          stroke={result.color}
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={animateScore ? targetOffset : circumference}
                          style={{
                            transition: "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                            filter: `drop-shadow(0 0 8px ${result.color}60)`,
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {animateScore ? (
                          <span className="text-4xl font-bold font-mono">
                            <AnimatedCounter target={result.score} duration={1800} />
                          </span>
                        ) : (
                          <span className="text-4xl font-bold font-mono text-text-muted">0</span>
                        )}
                        <span className="text-xs text-text-muted font-mono mt-0.5">/ 100</span>
                      </div>
                    </div>

                    {/* Level badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-6"
                    >
                      <span
                        className="inline-block px-5 py-2 rounded-full text-sm font-mono font-medium"
                        style={{
                          backgroundColor: `${result.color}15`,
                          color: result.color,
                          boxShadow: `0 0 20px ${result.color}10`,
                        }}
                      >
                        {result.level}
                      </span>
                    </motion.div>

                    {/* Advice */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <p className="text-text-secondary text-sm leading-relaxed mb-7 text-left">
                        {result.advice}
                      </p>

                      <div className="bg-bg border border-border rounded-xl p-5 mb-7 text-left">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${result.color}15` }}
                          >
                            <svg className="w-4 h-4" style={{ color: result.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                              Recommended Next Step
                            </span>
                            <p className="font-medium text-sm mt-0.5">{result.nextStep}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href="/contact"
                          onClick={onClose}
                          className="flex-1 bg-gradient-to-r from-accent to-blue-400 hover:opacity-90 text-white font-medium py-3.5 rounded-xl transition-all text-center text-sm shadow-lg shadow-accent/20"
                        >
                          Book a Strategy Call
                        </Link>
                        <button
                          onClick={onClose}
                          className="flex-1 border border-border hover:border-border-hover text-text-primary font-medium py-3.5 rounded-xl transition-colors text-sm"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
