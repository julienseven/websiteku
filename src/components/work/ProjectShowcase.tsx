import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import { cn } from "../../utils/cn";
import { ArrowUpRight } from "../ui/icons";
import { useI18n } from "../../lib/i18n";

/**
 * Oversized, full-width editorial presentation of a single project.
 * Indexed, with a refined meta row and services — used on the homepage
 * "Selected Work" and the /work index.
 */
export function ProjectShowcase({
  project,
  index,
  headingLevel = 3,
}: {
  project: Project;
  index?: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const { t } = useI18n();
  const category = project.category.split(" / ")[0];
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : null;
  const sourceSet = project.coverImage.includes("/images/reference/")
    ? [640, 960, 1600].map((width) => `${project.coverImage.replace(/-\d+\.jpg$/, `-${width}.jpg`)} ${width}w`).join(", ")
    : undefined;

  return (
    <article className="group min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-5 border-t border-ink/10 pt-8">
        <div className="flex min-w-0 items-baseline gap-3 sm:gap-5">
          {num && (
            <span className="font-display text-sm font-semibold text-accent-deep">
              ({num})
            </span>
          )}
          <Heading className="min-w-0 font-display text-[clamp(1.9rem,6vw,4.5rem)] font-bold leading-[1.06] tracking-tight">
            <Link
              to={`/work/${project.slug}`}
              className="transition-colors hover:text-accent-deep"
            >
              {project.title}
            </Link>
          </Heading>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft sm:text-xs">
          <span>{category}</span>
          <span className="h-px w-6 bg-ink/20" aria-hidden="true" />
          <span>{project.year}</span>
          {project.concept && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent-deep">
              Websiteku Concept
            </span>
          )}
        </div>
      </div>

      <Link
        to={`/work/${project.slug}`}
        className="mt-7 block"
        aria-label={`${t("common.caseStudy")}: ${project.title}`}
      >
        <div className="overflow-hidden rounded-2xl bg-cream-2">
          <img
            src={project.coverImage}
            srcSet={sourceSet}
            sizes="(min-width: 1360px) 1280px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
            alt={project.title}
            loading="lazy"
            decoding="async"
            width="1600"
            height="1200"
            className={cn("aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none sm:aspect-[16/9]", project.screenshots && "aspect-[16/9] object-top")}
          />
        </div>
      </Link>
      <p className="mt-3 text-xs text-ink-soft">{project.screenshots ? t("work.actualPreview") : t("work.referenceVisual")}</p>

      <div className="mt-6 flex flex-col gap-6 border-b border-ink/10 pb-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="max-w-xl">
          <p className="text-base leading-relaxed text-ink-soft md:text-lg">
            {project.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-soft"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to={`/work/${project.slug}`}
          className="group/link inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent-deep"
        >
          {t("common.caseStudy")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
