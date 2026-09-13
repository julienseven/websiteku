import { useEffect, useRef } from "react";
import type { AsciiPixelsHandle, AsciiVariant } from "../../three/asciiPixels";

export function AsciiPixelsBackground({
  variant = "work", dark = false,
}: { variant?: AsciiVariant; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = useRef<AsciiPixelsHandle | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let cancelled = false;
    let started = false;

    async function initialize() {
      if (started || cancelled) return;
      started = true;
      try {
        const { createAsciiPixels } = await import("../../three/asciiPixels");
        if (cancelled || !element) return;
        handle.current = createAsciiPixels(element, { variant, dark, paused: false });
      } catch {
        // The local poster stays visible if WebGL is unavailable.
        if (element) element.dataset.ready = "false";
      }
    }

    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          void initialize();
        }, { rootMargin: "160px" })
      : null;
    if (observer) observer.observe(element);
    else void initialize();

    return () => {
      cancelled = true;
      observer?.disconnect();
      handle.current?.destroy();
      handle.current = null;
    };
  }, [variant, dark]);

  return <div ref={ref} className={`ascii-pixels-background${dark ? " is-dark" : ""}`} aria-hidden="true" />;
}