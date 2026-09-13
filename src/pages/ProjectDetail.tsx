import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "../lib/seo";
import { getProject, getNextProject } from "../data/projects";
import { track } from "../lib/analytics";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Reveal, MaskReveal } from "../components/motion/Reveal";
import { ArrowRight } from "../components/ui/icons";
import { useI18n } from "../lib/i18n";
import { NotFound } from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const project = getProject(slug ?? "", lang);

  const viewed = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (project && viewed.current !== project.slug) {
      track("project_view", { slug: project.slug });
      viewed.current = project.slug;
    }
  }, [project?.slug]);

  if (!project) return <NotFound />;

  const next = getNextProject(project.slug, lang);

  const meta = [
    { label: t("case.project"), value: project.client ?? project.title },
    { label: t("case.industry"), value: project.industry },
    { label: t("case.year"), value: project.year },
    { label: t("case.services"), value: project.services.join(", ") },
    { label: t("case.website"), value: project.url ?? t("case.unpublished") },
  ];

  return (
    <>
      <Seo
        title={`${project.title} | Websiteku`}
        description={project.description}
        path={`/work/${project.slug}`}
      />

      <article>
        {/* Header */}
        <section className="pt-28 pb-10 md:pt-36 md:pb-16">
          <div className="container-shell">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{project.category}</Eyebrow>
                {project.concept && (
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-deep">
                    Websiteku Concept
                  </span>
                )}
              </div>
            </Reveal>

            <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
              <MaskReveal>{project.title}</MaskReveal>
            </h1>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-8 sm:grid-cols-3 lg:grid-cols-5">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
                      {m.label}
                    </dt>
                    <dd className="mt-2 break-words text-sm font-medium text-ink">{m.label === t("case.website") && project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">{lang === "id" ? "Buka preview konsep ↗" : "Open concept preview ↗"}</a> : m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Hero visual */}
        <section>
          <div className="container-shell">
            <Reveal>
              <div className="overflow-hidden rounded-xl">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  width={1600} height={1000} decoding="async" fetchPriority="high"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-28">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-16">
              <Reveal>
                <Eyebrow>{t("case.overview")}</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-display text-2xl font-semibold leading-snug tracking-tight md:text-[2rem]">
                  {project.overview}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Challenge + Solution */}
        <section className="bg-cream-2 py-16 md:py-28">
          <div className="container-shell">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <Reveal>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  {t("case.challenge")}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  {project.challenge}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  {t("case.solution")}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  {project.solution}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 md:py-28">
          <div className="container-shell">
            <Reveal>
              <Eyebrow>{t("case.screens")}</Eyebrow>
              <p className="mt-3 text-sm text-ink-soft">{lang === "id" ? (project.screenshots ? "Tangkapan layar preview konsep. Eksplorasi mandiri, bukan proyek klien resmi." : "Fotografi referensi untuk arah konsep, bukan tangkapan layar website klien.") : (project.screenshots ? "Screenshots of the concept preview. An independent exploration, not an official client commission." : "Reference photography for the concept direction, not screenshots of a client website.")}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {project.gallery.map((g, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <figure
                    className={
                      g.ratio === "portrait"
                        ? "mx-auto max-w-xs md:max-w-sm"
                        : ""
                    }
                  >
                    <div className="overflow-hidden rounded-xl bg-cream-2">
                      <img
                        src={g.src}
                        alt={g.alt}
                        loading="lazy" decoding="async" width={1200} height={900}
                        className={
                          g.ratio === "portrait"
                            ? "h-auto w-full"
                            : project.screenshots ? "h-auto w-full" : "aspect-[4/3] w-full object-cover"
                        }
                      />
                    </div>
                    <figcaption className="mt-3 text-xs text-ink-soft">
                      {g.alt}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Details + Result */}
        <section className="bg-cream-2 py-16 md:py-28">
          <div className="container-shell grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <Eyebrow>{t("case.details")}</Eyebrow>
              <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {project.details.map((d) => (
                  <div key={d.label} className="flex justify-between gap-6 py-4">
                    <dt className="text-sm text-ink-soft">{d.label}</dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>{t("case.result")}</Eyebrow>
              <p className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight md:text-[1.75rem]">
                {project.result}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Next project */}
        {next && <section className="border-t border-ink/10">
          <Link to={`/work/${next.slug}`} className="group block">
            <div className="container-shell py-16 md:py-24">
              <p className="text-sm text-ink-soft">{t("case.next")}</p>
              <div className="mt-4 flex items-center justify-between gap-6">
                <h2 className="font-display text-4xl font-bold tracking-tight transition-colors group-hover:text-accent-deep md:text-6xl">
                  {next.title}
                </h2>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream">
                  <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </section>}
      </article>
    </>
  );
}
