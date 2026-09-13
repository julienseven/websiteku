import { useEffect, useRef } from "react";
import type { AsciiFlowHandle } from "../three/asciiFlow";
import { cn } from "../utils/cn";

/**
 * Dreamy pastel backdrop: soft sky-blue → cyan → lavender → periwinkle → white
 * gradient with slowly drifting, heavily blurred organic forms.
 */
export function DreamyBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, #eaf6fb 0%, #d9f0f5 16%, #dfe7fa 40%, #e4defa 62%, #eef2fd 82%, #fbfcff 100%)",
        }}
      />

      {/* Diffused light: soft white glow from the upper-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 18%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      {/* Blurred organic forms */}
      <div
        className="dream-blob"
        style={{
          width: "46%",
          height: "70%",
          left: "-8%",
          top: "-14%",
          background: "radial-gradient(circle, #a9d9f2 0%, rgba(169,217,242,0) 70%)",
          animation: "drift-a 24s ease-in-out infinite",
        }}
      />
      <div
        className="dream-blob"
        style={{
          width: "42%",
          height: "64%",
          right: "-6%",
          top: "6%",
          background: "radial-gradient(circle, #c9f0ee 0%, rgba(201,240,238,0) 70%)",
          animation: "drift-b 30s ease-in-out infinite",
        }}
      />
      <div
        className="dream-blob"
        style={{
          width: "52%",
          height: "72%",
          left: "22%",
          bottom: "-26%",
          background: "radial-gradient(circle, #cbb8f0 0%, rgba(203,184,240,0) 72%)",
          animation: "drift-c 27s ease-in-out infinite",
        }}
      />
      <div
        className="dream-blob"
        style={{
          width: "40%",
          height: "60%",
          right: "16%",
          bottom: "-18%",
          background: "radial-gradient(circle, #b3b8f0 0%, rgba(179,184,240,0) 72%)",
          animation: "drift-b 33s ease-in-out infinite reverse",
        }}
      />
      <div
        className="dream-blob"
        style={{
          width: "34%",
          height: "52%",
          left: "38%",
          top: "-20%",
          background: "radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0) 68%)",
          animation: "drift-a 20s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

/**
 * A self-contained "ASCII motioned hero": a wide horizontal card whose
 * background is the dreamy pastel gradient, overlaid with a slowly flowing
 * field of monospace glyphs.
 */
export function AsciiDreamHero({
  className,
  aspect = "aspect-[16/9] sm:aspect-[16/7]",
}: {
  className?: string;
  aspect?: string;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    let handle: AsciiFlowHandle | undefined;
    let cancelled = false;
    import("../three/asciiFlow").then(({ createAsciiFlow }) => {
      if (!cancelled) handle = createAsciiFlow(el);
    }).catch(() => {});
    return () => { cancelled = true; handle?.destroy(); };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] shadow-[0_50px_120px_-40px_rgba(120,140,190,0.55)]",
        aspect,
        className
      )}
    >
      <DreamyBackdrop />
      <div ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
