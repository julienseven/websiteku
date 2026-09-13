import { Seo } from "../lib/seo";
import { PageHeader } from "../components/ui/PageHeader";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal, MaskReveal } from "../components/motion/Reveal";
import { useI18n } from "../lib/i18n";
import { FinalCta } from "../sections/FinalCta";

export default function About() {
  const { t } = useI18n();

  const values = [
    { n: "01", title: t("about.01.title"), text: t("about.01.text") },
    { n: "02", title: t("about.02.title"), text: t("about.02.text") },
    { n: "03", title: t("about.03.title"), text: t("about.03.text") },
    { n: "04", title: t("about.04.title"), text: t("about.04.text") },
  ];

  return (
    <>
      <Seo
        title={`${t("nav.about")} | Websiteku`}
        description={t("seo.about.description")}
        path="/about"
      />

      <PageHeader
        eyebrow={t("nav.about")}
        ascii="about"
        title={t("about.title")}
        description={t("about.desc")}
      />

      <section className="py-16 md:py-24">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-tight">
                <MaskReveal>{t("phil.l1")}</MaskReveal>
                <MaskReveal delay={0.08}>{t("phil.l2")}</MaskReveal>
                <MaskReveal delay={0.16}>
                  <span className="text-accent-deep">{t("phil.l3")}</span>
                </MaskReveal>
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-ink-soft">{t("phil.p1")}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-lg leading-relaxed text-ink-soft">
                  {t("phil.p2")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-2 py-16 md:py-24">
        <div className="container-shell">
          <Reveal>
            <Eyebrow>{t("about.eyebrow")}</Eyebrow>
          </Reveal>
          <div className="mt-10 border-t border-ink/10">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.05}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-ink/10 py-8 md:grid-cols-[120px_240px_1fr] md:items-baseline md:gap-10 md:py-10">
                  <span className="font-display text-sm font-bold text-accent-deep">
                    {v.n}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {v.title}
                  </h3>
                  <p className="col-span-2 max-w-xl text-ink-soft md:col-span-1">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
