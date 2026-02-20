"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  target: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  duration = 2000,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(target);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse the numeric part from the target string
    const match = target.match(/([<>]?)(\d+\.?\d*)(.*)/);
    if (!match) return;

    const prefix = match[1];
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3];
    const isDecimal = match[2].includes(".");

    startTime.current = null;

    function animate(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue = eased * numericTarget;
      const formatted = isDecimal
        ? currentValue.toFixed(1)
        : Math.round(currentValue).toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, target, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
