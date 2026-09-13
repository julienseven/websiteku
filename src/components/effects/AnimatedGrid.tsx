import { useEffect, useRef } from "react";
import { createRenderLoop, type RenderLoop } from "../../lib/motion/renderLoop";

type Dot = { x: number; y: number; phase: number };

/** Adapted from AnimatedGrid: drifting dots and an eased, growing pointer field. */
export function AnimatedGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const surface = canvas?.closest<HTMLElement>(".footer-signature");
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || !surface) return;
    const c = canvas;
    const ctx = context;
    const root = surface;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let loop: RenderLoop | undefined;
    let bounds = root.getBoundingClientRect();
    let boundsDirty = true;
    const target = { x: 0, y: 0, alpha: 0 };
    const pointer = { x: 0, y: 0, alpha: 0 };

    function resize() {
      width = root.clientWidth;
      height = root.clientHeight;
      if (!width || !height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(1_200_000 / (width * height)));
      c.width = Math.round(width * dpr);
      c.height = Math.round(height * dpr);
      const cell = width < 768 ? 22 : 26;
      dots = [];
      for (let y = 0; y <= height; y += cell) {
        for (let x = 0; x <= width; x += cell) {
          dots.push({ x, y, phase: x * 0.014 + y * 0.012 });
        }
      }
      boundsDirty = true;
      loop?.invalidate();
    }

    function draw(time: number, delta: number) {
      const ease = 1 - Math.exp(-Math.max(delta, 1 / 60) * 7);
      pointer.x += (target.x - pointer.x) * ease;
      pointer.y += (target.y - pointer.y) * ease;
      pointer.alpha += (target.alpha - pointer.alpha) * ease;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      for (const dot of dots) {
        const wave = Math.sin(dot.phase + time * 0.38);
        const x = dot.x + wave * 3.5;
        const y = dot.y + Math.cos(dot.phase * 0.8 - time * 0.28) * 4;
        const influence = Math.max(0, 1 - ((x - pointer.x) ** 2 + (y - pointer.y) ** 2) / (160 * 160)) * pointer.alpha;
        const radius = 0.7 + (wave + 1) * 0.35 + influence * 2.5;
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = "rgba(109,106,101,0.25)";
      ctx.fill();

      if (pointer.alpha > 0.01) {
        ctx.beginPath();
        for (const dot of dots) {
          const influence = Math.max(0, 1 - ((dot.x - pointer.x) ** 2 + (dot.y - pointer.y) ** 2) / (130 * 130)) * pointer.alpha;
          if (influence < 0.08) continue;
          const x = dot.x + Math.sin(dot.phase + time * 0.38) * 3.5;
          const y = dot.y + Math.cos(dot.phase * 0.8 - time * 0.28) * 4;
          const radius = 0.8 + influence * 2.4;
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = "rgba(196,85,45,0.48)";
        ctx.fill();
      }
    }

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || preference.matches) return;
      if (boundsDirty) { bounds = root.getBoundingClientRect(); boundsDirty = false; }
      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      target.alpha = 1;
    };
    const leave = () => { target.alpha = 0; };
    const scroll = () => { boundsDirty = true; };

    resize();
    loop = createRenderLoop(root, draw);
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });

    return () => {
      loop?.destroy();
      observer.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scroll);
      dots = [];
      c.width = c.height = 0;
    };
  }, []);

  return <canvas ref={ref} className="footer-animated-grid" aria-hidden="true" />;
}