import { Link } from "react-router-dom";
import { getProjects } from "../data/projects";
import { ProjectShowcase } from "../components/work/ProjectShowcase";
import { MaskReveal } from "../components/motion/Reveal";
import { useI18n } from "../lib/i18n";

export function SelectedWork() {
  const { t, lang } = useI18n();
  const projects = getProjects(lang);

  return (
    <section className="py-16 md:py-24">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">
            <MaskReveal>{t("work.title")}</MaskReveal>
          </h2>
          <p className="max-w-sm text-ink-soft">{t("work.sub")}</p>
        </div>

        <div className="mt-14 flex flex-col md:mt-20">
          {projects.map((p, i) => (
            <ProjectShowcase key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            {t("work.viewAll")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
