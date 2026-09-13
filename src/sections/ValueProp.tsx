import { Reveal } from "../components/motion/Reveal";
import { TextRevealOnScroll } from "../components/motion/TextRevealOnScroll";
import { TextRevealScrollHelper } from "../components/motion/TextRevealScrollHelper";
import { useI18n } from "../lib/i18n";

export function ValueProp() {
  const { t } = useI18n();

  const principles = [
    { n: "01", title: t("value.01.title"), text: t("value.01.text") },
    { n: "02", title: t("value.02.title"), text: t("value.02.text") },
    { n: "03", title: t("value.03.title"), text: t("value.03.text") },
    { n: "04", title: t("value.04.title"), text: t("value.04.text") },
  ];

  return (
    <section className="bg-cream-2 py-24 md:py-32">
      <div className="container-shell">
        <div className="max-w-4xl">
          <h2 className="sr-only">{t("value.heading")}</h2>
          <TextRevealOnScroll
            text={t("value.heading")}
            className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold leading-[1.02] tracking-tight"
          />
          <TextRevealScrollHelper
            text={t("value.copy")}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          />
        </div>

        <div className="mt-16 border-t border-ink/10">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="group grid grid-cols-[auto_1fr] gap-6 border-b border-ink/10 py-8 transition-colors hover:bg-cream/60 md:grid-cols-[120px_220px_1fr] md:items-baseline md:gap-10 md:py-10">
                <span className="font-display text-sm font-bold text-accent-deep">
                  {p.n}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {p.title}
                </h3>
                <p className="col-span-2 max-w-xl text-ink-soft md:col-span-1">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
