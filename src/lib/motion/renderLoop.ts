export type RenderLoop = {
  invalidate: () => void;
  setPaused: (paused: boolean) => void;
  destroy: () => void;
};

/** No React updates, work in hidden tabs, or accumulating time while off-screen. */
export function createRenderLoop(
  element: HTMLElement,
  draw: (elapsed: number, delta: number) => void,
  initiallyPaused = false,
): RenderLoop {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const box = element.getBoundingClientRect();
  let visible = box.bottom > 0 && box.top < window.innerHeight;
  let paused = initiallyPaused;
  let destroyed = false;
  let frame = 0;
  let last = 0;
  let accumulator = 0;
  let elapsed = 2.4;
  let lastDraw = elapsed;
  const interval = 1000 / 60;

  const canAnimate = () => visible && !document.hidden && !paused && !preference.matches;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    accumulator = 0;
  }

  function tick(now: number) {
    frame = 0;
    if (destroyed || !canAnimate()) return;
    const delta = last ? Math.min(now - last, 50) : interval;
    last = now;
    elapsed += delta / 1000;
    accumulator += delta;
    if (accumulator >= interval - 0.5) {
      const step = elapsed - lastDraw;
      lastDraw = elapsed;
      accumulator = Math.max(0, accumulator - interval * Math.max(1, Math.floor(accumulator / interval)));
      draw(elapsed, step);
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    if (destroyed) return;
    if (!canAnimate()) stop();
    if (visible && !document.hidden) {
      draw(elapsed, 0);
      if (canAnimate() && !frame) frame = requestAnimationFrame(tick);
    }
  }

  const observer = typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      }, { threshold: 0 })
    : null;
  observer?.observe(element);
  preference.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  sync();

  return {
    invalidate: sync,
    setPaused(value) {
      paused = value;
      sync();
    },
    destroy() {
      destroyed = true;
      stop();
      observer?.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    },
  };
}