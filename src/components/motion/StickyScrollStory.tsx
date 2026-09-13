import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "../../lib/i18n";
import { useSmoothScroll } from "./SmoothScroll";

export type StoryStep = { id: string; title: string; headline: string; description: string };

/** The reference's pinned, five-part narrative, with a readable native-scroll fallback. */
export function StickyScrollStory({ steps }: { steps: StoryStep[] }) {
  const { t } = useI18n();
  const { scrollTo } = useSmoothScroll();
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const metrics = useRef({ start: 0, range: 1 });
  const fingerprint = steps.map((step) => step.headline + step.description).join("|");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnhanced(media.matches && "IntersectionObserver" in window && "ResizeObserver" in window);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = track.current;
    const pinned = panel.current;
    if (!enhanced || !element || !pinned || !steps.length) return;
    let frame = 0;
    let visible = true;

    function update() {
      frame = 0;
      if (!element || !visible) return;
      const progress = Math.min(1, Math.max(0, (window.scrollY - metrics.current.start) / metrics.current.range));
      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      element.style.setProperty("--story-progress", String(progress));
      if (activeRef.current !== next) {
        activeRef.current = next;
        setActive(next);
      }
    }
    function schedule() { if (!frame && visible) frame = requestAnimationFrame(update); }
    function measure() {
      if (!element || !pinned) return;
      const bounds = element.getBoundingClientRect();
      metrics.current = { start: bounds.top + window.scrollY - 112, range: Math.max(1, bounds.height - pinned.offsetHeight) };
      schedule();
    }

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) measure();
    }, { rootMargin: "100px" });
    intersection.observe(element);
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [enhanced, steps.length, fingerprint]);

  function goTo(index: number) {
    const target = metrics.current.start + metrics.current.range * ((index + 0.15) / steps.length);
    scrollTo(target);
  }

  if (!steps.length) return null;

  return (
    <div
      ref={track}
      className="story-track"
      data-enhanced={enhanced}
      style={{ "--story-steps": steps.length } as CSSProperties}
    >
      <div ref={panel} className="story-panel">
        <div className="story-rail">
          <p className="story-position">{t("common.step")} <span>{String(active + 1).padStart(2, "0")}</span> / {String(steps.length).padStart(2, "0")}</p>
          <nav aria-label={t("process.navigate")}>
            <ol>
              {steps.map((step, index) => (
                <li key={step.id}>
                  <button type="button" aria-current={index === active ? "step" : undefined} onClick={() => goTo(index)}>
                    <span className="story-dot" aria-hidden="true" />
                    <span>{step.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className="story-progress" aria-hidden="true"><span /></div>
          <p className="story-scroll-hint">{t("process.scroll")}</p>
        </div>

        <div className="story-scenes">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className={`story-scene${index === active ? " is-current" : ""}`}
              id={`${id}-${step.id}`}
              aria-hidden={enhanced && index !== active ? true : undefined}
              aria-labelledby={`${id}-title-${step.id}`}
            >
              <span className="story-numeral" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <p className="story-step-label">{String(index + 1).padStart(2, "0")} / {step.title}</p>
              <h3 id={`${id}-title-${step.id}`}>{step.headline}</h3>
              <p className="story-description">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}