import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft",
        className
      )}
    >
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
