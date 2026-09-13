import { Fragment, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Port of Framer's "Text Reveal on Scroll" — words/characters color in as the
 * user scrolls, with a spring-smoothed scroll progress.
 */

type Transition = {
  stiffness?: number;
  damping?: number;
  mass?: number;
  duration?: number;
};

function toSpringOptions(transition?: Transition) {
  const hasSpringValues =
    typeof transition?.stiffness === "number" ||
    typeof transition?.damping === "number" ||
    typeof transition?.mass === "number";

  if (!hasSpringValues && typeof transition?.duration === "number") {
    const duration = Math.max(transition.duration, 0.05);
    return {
      stiffness: 170 / (duration * duration),
      damping: 26 / duration,
      mass: 1,
      restDelta: 0.001,
    };
  }
  return {
    stiffness: typeof transition?.stiffness === "number" ? transition.stiffness : 100,
    damping: typeof transition?.damping === "number" ? transition.damping : 30,
    mass: typeof transition?.mass === "number" ? transition.mass : 1,
    restDelta: 0.001,
  };
}

type Props = {
  text: string;
  mutedColor?: string;
  primaryColor?: string;
  balance?: boolean;
  mode?: "word" | "character" | "sentence";
  replay?: boolean;
  transition?: Transition;
  className?: string;
};

function RevealItem({
  children,
  progress,
  range,
  mutedColor,
  primaryColor,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  mutedColor: string;
  primaryColor: string;
}) {
  const color = useTransform(progress, range, [mutedColor, primaryColor]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

export function TextRevealOnScroll({
  text,
  mutedColor = "#6d6a65",
  primaryColor = "#111111",
  balance = true,
  mode = "word",
  replay = true,
  transition = { duration: 0.4 },
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress.get()) maxProgress.set(latest);
  });

  const sourceProgress = replay ? scrollYProgress : maxProgress;
  const progress = useSpring(sourceProgress, toSpringOptions(transition));

  let items: string[] = [];
  if (mode === "character") {
    items = text.split("");
  } else if (mode === "word") {
    items = text.match(/(\S+|\s+)/g) || [];
  } else {
    items = text.match(/[^.!?\n]+(?:[.!?]+)?|\n|\s+/g) || [];
  }

  let totalValids = 0;
  items.forEach((item) => {
    if (item.trim().length > 0) totalValids++;
  });
  let currentIdx = 0;

  if (reduce) {
    return <div ref={containerRef} className={className} style={{ color: primaryColor }} aria-hidden="true">{text}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textWrap: balance ? "balance" : "wrap" }}
    >
      {/* Visual text is decorative; consumers provide accessible text (e.g. an
          adjacent sr-only heading) to avoid duplicated screen-reader output. */}
      <span aria-hidden="true">
        {items.map((itemStr, idx) => {
          if (itemStr.trim().length === 0 && itemStr !== "\n") {
            return <Fragment key={`space-${idx}`}>{itemStr}</Fragment>;
          }
          if (itemStr === "\n") {
            return <br key={`br-${idx}`} />;
          }
          const start = currentIdx / Math.max(totalValids, 1);
          const end = (currentIdx + 1) / Math.max(totalValids, 1);
          currentIdx++;
          return (
            <RevealItem
              key={`w-${idx}`}
              progress={progress}
              range={[start, end]}
              mutedColor={mutedColor}
              primaryColor={primaryColor}
            >
              {itemStr}
            </RevealItem>
          );
        })}
      </span>
    </div>
  );
}
