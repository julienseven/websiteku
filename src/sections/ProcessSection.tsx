import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal } from "../components/motion/Reveal";
import { StickyScrollStory, type StoryStep } from "../components/motion/StickyScrollStory";
import { useI18n } from "../lib/i18n";

export function ProcessSection() {
  const { t } = useI18n();

  const steps: StoryStep[] = ["01", "02", "03", "04", "05"].map((number) => ({
    id: `stage-${number}`,
    title: t(`process.${number}.title`),
    headline: t(`process.${number}.headline`),
    description: t(`process.${number}.text`),
  }));

  return (
    <section className="process-story-section bg-cream-2 pt-20 pb-14 md:pt-28" aria-labelledby="process-heading">
      <div className="container-shell">
        <Reveal><Eyebrow>{t("common.process")}</Eyebrow></Reveal>
        <div className="process-story-intro">
          <h2 id="process-heading">{t("process.heading")}</h2>
          <p>{t("process.sub")}</p>
        </div>
        <StickyScrollStory steps={steps} />
      </div>
    </section>
  );
}
