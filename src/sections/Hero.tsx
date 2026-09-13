import { Button } from "../components/ui/Button";
import { Eyebrow } from "../components/ui/Eyebrow";
import { MetalFlowBackground } from "../components/MetalFlowBackground";
import { useI18n } from "../lib/i18n";
import { compactRupiah } from "../lib/format";

export function Hero() {
  const { t, lang } = useI18n();

  const meta = [
    { label: t("hero.from"), value: compactRupiah(2_900_000, lang) },
    { label: t("hero.time"), value: t("hero.days") },
    { label: t("hero.loc"), value: t("hero.country") },
  ];

  return (
    <section className="hero-section relative flex flex-col justify-center overflow-x-clip bg-ink text-cream">
      {/* Kinetic metal flow background */}
      <MetalFlowBackground className="absolute inset-0" />

      {/* Readability overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/45 to-ink/55"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <Eyebrow className="text-cream/60">{t("hero.eyebrow")}</Eyebrow>

        <h1 className="hero-title mt-8 font-display text-[clamp(2.4rem,9vw,9rem)] font-bold leading-[0.9] tracking-[-0.035em] [text-shadow:0_2px_48px_rgba(0,0,0,0.45)] md:mt-10">
          <span className="hero-line">
            <span>{t("hero.l1")}</span>
          </span>
          <span className="hero-line">
            <span>{t("hero.l2")}</span>
          </span>
          <span className="hero-line">
            <span className="text-accent">{t("hero.l3")}</span>
          </span>
        </h1>

        <div className="hero-details border-t border-cream/15">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-xl">
              <p className="text-lg leading-relaxed text-cream/75 md:text-xl">
                {t("hero.copy")}
              </p>
              <div className="hero-actions mt-6 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primaryOnDark" size="lg">
                  {t("hero.cta1")}
                </Button>
                <Button to="/work" variant="secondaryOnDark" size="lg">
                  {t("hero.cta2")}
                </Button>
              </div>
            </div>

            <dl className="flex flex-wrap items-start gap-x-8 gap-y-5 md:gap-x-12">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/70">
                    {m.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-semibold tracking-tight text-cream">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
