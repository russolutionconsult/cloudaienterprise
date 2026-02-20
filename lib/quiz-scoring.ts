export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; weight: number }[];
}

export interface QuizResult {
  score: number;
  level: "Beginner" | "Experimenter" | "Adopter" | "Leader";
  advice: string;
  nextStep: string;
  color: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you describe your company's current AI usage?",
    options: [
      { label: "We haven't started — AI feels overwhelming", value: "none", weight: 0 },
      { label: "We've tried a few tools but nothing stuck", value: "experimenting", weight: 1 },
      { label: "Some teams use AI regularly, but it's not coordinated", value: "partial", weight: 2 },
      { label: "AI is embedded across departments with clear processes", value: "embedded", weight: 3 },
    ],
  },
  {
    id: 2,
    question: "Do you have a formal AI strategy tied to business goals?",
    options: [
      { label: "No — we're just reacting to trends", value: "none", weight: 0 },
      { label: "We've discussed it but haven't documented anything", value: "informal", weight: 1 },
      { label: "We have a strategy but struggle with execution", value: "documented", weight: 2 },
      { label: "Yes — clear strategy, KPIs, and executive ownership", value: "formal", weight: 3 },
    ],
  },
  {
    id: 3,
    question: "How does your team feel about AI adoption?",
    options: [
      { label: "Resistant or afraid — lots of job security concerns", value: "resistant", weight: 0 },
      { label: "Curious but untrained — they don't know where to start", value: "curious", weight: 1 },
      { label: "Mixed — some champions, some skeptics", value: "mixed", weight: 2 },
      { label: "Enthusiastic — most people actively use AI tools daily", value: "enthusiastic", weight: 3 },
    ],
  },
  {
    id: 4,
    question: "Can you measure the ROI of your AI investments today?",
    options: [
      { label: "No — we're not even sure what to measure", value: "none", weight: 0 },
      { label: "We track anecdotal improvements but no hard numbers", value: "anecdotal", weight: 1 },
      { label: "We have some metrics but they're inconsistent", value: "partial", weight: 2 },
      { label: "Yes — clear metrics, dashboards, and quarterly reviews", value: "comprehensive", weight: 3 },
    ],
  },
];

export function calculateScore(answers: Record<number, number>): number {
  const totalWeight = Object.values(answers).reduce((sum, w) => sum + w, 0);
  const maxWeight = quizQuestions.length * 3;
  // Map 0–12 to 20–95
  const normalized = (totalWeight / maxWeight) * 75 + 20;
  return Math.round(normalized);
}

export function getResult(score: number): QuizResult {
  if (score < 40) {
    return {
      score,
      level: "Beginner",
      advice:
        "You're at the starting line — and that's okay. Most companies in your position waste money on tools before building a strategy. The good news? Starting with a clear roadmap means you'll avoid the mistakes 77% of companies make.",
      nextStep: "AI Readiness Assessment",
      color: "#f59e0b",
    };
  }
  if (score < 60) {
    return {
      score,
      level: "Experimenter",
      advice:
        "You've taken the first steps but lack coordination and strategy. This is the most common — and most dangerous — stage. Without a plan, experiments fizzle out and budgets get cut. You need a strategy to turn experiments into results.",
      nextStep: "AI Strategy & Implementation",
      color: "#3b6bff",
    };
  }
  if (score < 80) {
    return {
      score,
      level: "Adopter",
      advice:
        "You're ahead of most companies. AI is being used, but there's room to scale, systematize, and measure impact more rigorously. The gap between where you are and AI leadership is smaller than you think — it's about optimization, not starting over.",
      nextStep: "AI Strategy & Implementation",
      color: "#22c55e",
    };
  }
  return {
    score,
    level: "Leader",
    advice:
      "You're in the top 8% of companies when it comes to AI maturity. Your focus should be on scaling what works, exploring advanced use cases (custom agents, AI-native workflows), and building competitive moats. Let's talk about what's next.",
    nextStep: "Full Transformation Program",
    color: "#a855f7",
  };
}
