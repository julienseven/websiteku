import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

function useEntrance<T extends HTMLElement>(distance: number, delay: number) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduce || !element.animate || !window.IntersectionObserver) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      // Observe the visible wrapper, never a translated/clipped child. No hidden base state.
      animation = element.animate(
        [{ transform: `translateY(${Math.min(distance, 16)}px)` }, { transform: "translateY(0)" }],
        { duration: 650, delay: Math.min(delay, 0.2) * 1000, easing: "cubic-bezier(.22,1,.36,1)" },
      );
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [reduce, distance, delay]);

  return ref;
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 14, className }: RevealProps) {
  const ref = useEntrance<HTMLDivElement>(y, delay);
  return <div ref={ref} className={className}>{children}</div>;
}

type MaskRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Compatible with existing sections, without the unsafe text mask.
export function MaskReveal({ children, delay = 0, className }: MaskRevealProps) {
  const ref = useEntrance<HTMLSpanElement>(10, delay);
  return <span ref={ref} className={`block ${className ?? ""}`}>{children}</span>;
}
