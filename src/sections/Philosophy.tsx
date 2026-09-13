import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal, MaskReveal } from "../components/motion/Reveal";
import { TextRevealScrollHelper } from "../components/motion/TextRevealScrollHelper";
import { Button } from "../components/ui/Button";
import { useI18n } from "../lib/i18n";

export function Philosophy() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{t("phil.eyebrow")}</Eyebrow>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.0] tracking-tight">
              <MaskReveal>{t("phil.l1")}</MaskReveal>
              <MaskReveal delay={0.08}>{t("phil.l2")}</MaskReveal>
              <MaskReveal delay={0.16}>
                <span className="text-accent">{t("phil.l3")}</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <TextRevealScrollHelper
              text={t("phil.p1")}
              className="text-lg leading-relaxed text-ink-soft"
            />
            <Reveal delay={0.18}>
              <p className="text-lg leading-relaxed text-ink-soft">{t("phil.p2")}</p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-2">
                <Button to="/about" variant="link" className="text-base">
                  {t("phil.cta")}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
