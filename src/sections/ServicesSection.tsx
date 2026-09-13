import { useState } from "react";
import { getServices } from "../data/services";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal, MaskReveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import { ServicePreview } from "../components/work/ServicePreview";
import { useI18n } from "../lib/i18n";
import { cn } from "../utils/cn";

export function ServicesSection() {
  const { t, lang } = useI18n();
  const services = getServices(lang);
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="py-24 md:py-32">
      <div className="container-shell">
        <Reveal>
          <Eyebrow>{t("nav.services")}</Eyebrow>
        </Reveal>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.98] tracking-tight">
          <MaskReveal>{t("services.heading")}</MaskReveal>
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Service list */}
          <div className="order-2 lg:order-1">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-center gap-4 border-b border-ink/10 py-6 text-left transition-colors",
                    isActive && "border-ink"
                  )}
                >
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-display text-2xl font-bold tracking-tight transition-colors md:text-3xl",
                        isActive ? "text-accent" : "text-ink"
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-soft">
                      {s.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "hidden font-display text-sm font-bold sm:block",
                      isActive ? "text-accent-deep" : "text-ink-soft"
                    )}
                  >
                    0{i + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sticky preview (desktop) */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-2">
                <div key={current.id} className="absolute inset-0">
                  <ServicePreview service={current} />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {current.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink-soft"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <Reveal delay={0.1}>
                <div className="mt-6">
                  <Button to="/services" variant="link" className="text-base">
                    {t("services.detail")}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
