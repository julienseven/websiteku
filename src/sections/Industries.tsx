import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal } from "../components/motion/Reveal";
import { useI18n } from "../lib/i18n";

const industries = [
  "property", "food", "hospitality", "architecture", "interior",
  "automotive", "professional", "startups", "personal",
];

export function Industries() {
  const { t } = useI18n();
  const row = [...industries, ...industries];

  return (
    <section className="py-16 md:py-20">
      <div className="container-shell">
        <Reveal>
          <Eyebrow>{t("common.industry")}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
            {t("industries.heading")}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-8 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10 border-y border-ink/10 py-6">
            {row.map((name, i) => (
              <span key={i} aria-hidden={i >= industries.length ? true : undefined} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-display text-2xl font-semibold text-ink-soft transition-colors hover:text-ink md:text-4xl">
                  {t(`industry.${name}`)}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
