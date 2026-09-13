import { useEffect, useRef } from "react";
import type { MetalFlowHandle } from "../three/metalFlow";
import { cn } from "../utils/cn";

/**
 * Molten-chrome background layer. Alpha-transparent and pointer-events:none so
 * it can sit behind gradients or text without intercepting interaction.
 */
export function MetalFlowBackground({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let handle: MetalFlowHandle | undefined;
    let cancelled = false;
    import("../three/metalFlow").then(({ createMetalFlow }) => {
      if (!cancelled) handle = createMetalFlow(el, { intensity });
    }).catch(() => {
      // Keep a dark, readable hero on devices without WebGL.
      el.style.backgroundColor = "#171918";
    });
    return () => { cancelled = true; handle?.destroy(); };
  }, [intensity]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    />
  );
}
