import { getCareFeatures } from "../data/pricing";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal, MaskReveal } from "../components/motion/Reveal";
import { CheckIcon } from "../components/ui/icons";
import { waLink } from "../lib/config";
import { useI18n } from "../lib/i18n";
import { track } from "../lib/analytics";

export function CareSection() {
  const { t, lang } = useI18n();
  const features = getCareFeatures(lang);

  return (
    <section className="py-24 md:py-32">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Website Care</Eyebrow>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-tight">
              <MaskReveal>{t("care.heading")}</MaskReveal>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-ink-soft">{t("care.copy")}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm text-ink-soft">{t("care.optional")}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink/10 bg-cream-2/60 p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold tracking-tight">
                  Website Care
                </h3>
                <p className="text-right font-display text-lg font-bold text-accent-deep">
                  {t("care.price")}
                </p>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-ink-soft">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={waLink(t("contact.careMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { source: "care" })}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-accent"
              >
                {t("care.cta")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
