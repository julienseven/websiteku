import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useI18n } from "../../lib/i18n";
import { track } from "../../lib/analytics";
import { ArrowUpRight } from "./icons";

export type TabsCardItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  media?: ReactNode;
  features: string[];
  cta?: { to: string; label: string };
};

/** Hover/click variants adapted from the supplied Framer Tabs card. */
export function TabsCard({
  items,
  className,
}: {
  items: TabsCardItem[];
  className?: string;
}) {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [vertical, setVertical] = useState(false);
  const prefix = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const active = Math.max(0, items.findIndex((item) => item.id === activeId));

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setVertical(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActiveId(items[next].id);
    buttons.current[next]?.focus({ preventScroll: true });
  }

  if (!items.length) return <p className="py-10 text-ink-soft">{t("services.empty")}</p>;

  return (
    <div className={cn("service-tabs-card", className)}>
      <div
        role="tablist"
        aria-label={t("nav.services")}
        aria-orientation={vertical ? "vertical" : "horizontal"}
        className="service-tabs-rail"
      >
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            ref={(element) => { buttons.current[i] = element; }}
            id={`${prefix}-tab-${it.id}`}
            aria-controls={`${prefix}-panel-${it.id}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) setActiveId(it.id);
            }}
            onFocus={() => setActiveId(it.id)}
            onClick={() => setActiveId(it.id)}
            onKeyDown={(event) => onKeyDown(event, i)}
            className={cn("service-tab", i === active && "is-active")}
          >
            <span className="service-tab-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="service-tab-label">
              <span>{it.label}</span>
              <span className="service-tab-caption" aria-hidden="true">{it.features[0]}</span>
            </span>
            <ArrowUpRight className="service-tab-arrow" />
          </button>
        ))}
      </div>

      <div className="service-tab-panels">
        {items.map((item, i) => (
          <div
            key={item.id}
            id={`${prefix}-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`${prefix}-tab-${item.id}`}
            aria-hidden={i !== active}
            inert={i !== active}
            tabIndex={i === active ? 0 : -1}
            className={cn("service-tab-panel", i === active && "is-active")}
          >
            <figure className="service-tab-figure">
              <div className="service-tab-media">
                {item.media ?? <img src={item.image} alt={item.title} loading={i === 0 ? "eager" : "lazy"} decoding="async" />}
              </div>
              <figcaption>{t("services.preview")}</figcaption>
            </figure>
            <div className="service-tab-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <ul className="service-tab-features">
                {item.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              {item.cta && <Link to={item.cta.to} onClick={() => track("project_start", { source: "service", service: item.id })} className="service-tab-cta">
                {item.cta.label}<ArrowUpRight className="h-5 w-5" />
              </Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
