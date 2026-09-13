import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

type ScrollOptions = { immediate?: boolean; offset?: number };
type ScrollContext = {
  scrollTo: (target: number | HTMLElement, options?: ScrollOptions) => void;
  setLocked: (locked: boolean) => void;
};
const Context = createContext<ScrollContext | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const instance = useRef<Lenis | null>(null);
  const wake = useRef<() => void>(() => {});
  const locked = useRef(false);
  const editorialRoute = pathname !== "/contact" && pathname !== "/visual";

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = () => {};

    function setup() {
      cleanup();
      cleanup = () => {};
      if (!editorialRoute || preference.matches || !pointer.matches) return;

      const lenis = new Lenis({
        lerp: 0.14,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        autoResize: true,
        anchors: false,
        infinite: false,
        // The router owns navigation. Forms and dialogs keep native scrolling.
        prevent: (node) => node.hasAttribute("data-lenis-prevent") || /^(INPUT|TEXTAREA|SELECT)$/.test(node.tagName),
      });
      instance.current = lenis;
      if (locked.current) lenis.stop();
      let frame = 0;
      let disposed = false;
      let idle = true;

      function schedule() {
        if (!frame && !disposed && !document.hidden && !lenis.isStopped) {
          // Do not feed the time spent idle into the next wheel gesture.
          if (idle) { lenis.time = performance.now(); idle = false; }
          frame = requestAnimationFrame(tick);
        }
      }
      function tick(time: number) {
        frame = 0;
        if (disposed || document.hidden) return;
        lenis.raf(time);
        if (lenis.isScrolling === "smooth") schedule();
        else idle = true;
      }
      const unbindVirtual = lenis.on("virtual-scroll", schedule);
      const unbindScroll = lenis.on("scroll", () => {
        if (lenis.isScrolling === "smooth") schedule();
      });
      const onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
          idle = true;
          lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true });
        } else {
          lenis.resize();
          schedule();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      wake.current = schedule;

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(frame);
        unbindVirtual();
        unbindScroll();
        document.removeEventListener("visibilitychange", onVisibility);
        lenis.destroy();
        instance.current = null;
        wake.current = () => {};
      };
    }

    setup();
    preference.addEventListener("change", setup);
    pointer.addEventListener("change", setup);
    return () => {
      cleanup();
      preference.removeEventListener("change", setup);
      pointer.removeEventListener("change", setup);
    };
  }, [editorialRoute]);

  useLayoutEffect(() => {
    instance.current?.resize();
    instance.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  const scrollTo = useCallback((target: number | HTMLElement, options: ScrollOptions = {}) => {
    if (locked.current) return;
    if (instance.current) {
      instance.current.resize();
      instance.current.scrollTo(target, { immediate: options.immediate, offset: options.offset ?? 0 });
      wake.current();
    } else {
      const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: top + (options.offset ?? 0), behavior: options.immediate || reduce ? "instant" : "smooth" });
    }
  }, []);

  const setLocked = useCallback((value: boolean) => {
    locked.current = value;
    if (value) instance.current?.stop();
    else instance.current?.start();
  }, []);

  const value = useMemo(() => ({ scrollTo, setLocked }), [scrollTo, setLocked]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSmoothScroll() {
  const value = useContext(Context);
  if (!value) throw new Error("useSmoothScroll requires SmoothScrollProvider");
  return value;
}