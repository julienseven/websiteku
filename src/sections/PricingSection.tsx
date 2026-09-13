import { Link } from "react-router-dom";
import { getPackages } from "../data/pricing";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal, MaskReveal } from "../components/motion/Reveal";
import { ArrowRight } from "../components/ui/icons";
import { track } from "../lib/analytics";
import { useI18n } from "../lib/i18n";
import { cn } from "../utils/cn";

export function PricingSection({ showHeading = true }: { showHeading?: boolean }) {
  const { t, lang } = useI18n();
  const packages = getPackages(lang);

  return (
    <section className={cn("bg-cream-2", showHeading ? "py-24 md:py-32" : "py-12 md:py-16")}>
      <div className="container-shell">
        {showHeading && <>
        <Reveal>
          <Eyebrow>{t("nav.pricing")}</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.98] tracking-tight">
            <MaskReveal>{t("pricing.heading")}</MaskReveal>
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-ink-soft">{t("pricing.sub")}</p>
          </Reveal>
        </div>
        </>}
        <div className={cn("border-t border-ink/10", showHeading && "mt-16")}>
          <div className="lg:grid lg:grid-cols-3 lg:divide-x lg:divide-ink/10">
            {packages.map((p, i) => (
              <div
                key={p.name}
                className={cn(
                  "relative flex min-w-0 flex-col py-10 lg:px-6 lg:py-12 xl:px-10",
                  i > 0 && "border-t border-ink/10 lg:border-t-0",
                  i === 0 && "lg:pl-0",
                  i === packages.length - 1 && "lg:pr-0",
                  p.featured && "lg:bg-cream"
                )}
              >
                {p.featured && (
                  <span
                    className="absolute inset-x-0 top-0 h-0.5 bg-accent"
                    aria-hidden="true"
                  />
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
                    {p.name}
                  </h3>
                  {p.featured && (
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-deep">
                      {t("pricing.popular")}
                    </span>
                  )}
                </div>

                <p className="mt-7 font-display text-[2.5rem] font-bold leading-none tracking-tight md:text-[2.75rem]">
                  {p.from ? (
                    <>
                      <span className="mb-2 block text-sm font-medium text-ink-soft">
                        {t("pricing.from")}
                      </span>
                      {p.price}
                    </>
                  ) : (
                    p.price
                  )}
                </p>

                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
                  {p.tagline}
                </p>

                <ul className="mt-8 flex-1 space-y-2.5 border-t border-ink/10 pt-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                      <span className="text-accent" aria-hidden="true">
                        –
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    to={`/contact?package=${p.name.toLowerCase()}`}
                    onClick={() => track("pricing_cta", { package: p.name })}
                    className={cn(
                      "group inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors",
                      p.featured
                        ? "rounded-full bg-ink px-6 py-3.5 text-cream hover:bg-accent"
                        : "border-b border-ink/30 pb-1 text-ink hover:border-accent hover:text-accent"
                    )}
                  >
                    {p.cta}
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        !p.featured && "group-hover:translate-x-1"
                      )}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm font-medium text-ink md:mt-16">
            {t("pricing.note")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
