import { useId } from "react";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal, MaskReveal } from "../components/motion/Reveal";
import { useI18n } from "../lib/i18n";

export function Faq() {
  const { t } = useI18n();
  const prefix = useId();
  return (
    <section className="py-24 md:py-32">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Reveal><Eyebrow>{t("common.faq")}</Eyebrow></Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-tight"><MaskReveal delay={0.08}>{t("faq.heading")}</MaskReveal></h2>
          </div>
          <div className="border-t border-ink/10">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <details key={number} name={prefix} open={number === 1} className="faq-item group border-b border-ink/10">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
                  <span className="font-display text-lg font-semibold tracking-tight md:text-xl">{t(`faq.${number}.q`)}</span>
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-lg transition-transform group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-cream">+</span>
                </summary>
                <p className="max-w-xl pb-6 text-ink-soft">{t(`faq.${number}.a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
