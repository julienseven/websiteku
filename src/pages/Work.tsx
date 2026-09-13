import { Seo } from "../lib/seo";
import { getProjects } from "../data/projects";
import { ProjectShowcase } from "../components/work/ProjectShowcase";
import { PageHeader } from "../components/ui/PageHeader";
import { useI18n } from "../lib/i18n";

export default function Work() {
  const { t, lang } = useI18n();
  const projects = getProjects(lang);

  return (
    <>
      <Seo
        title={`${t("nav.work")} | Websiteku`}
        description={t("seo.work.description")}
        path="/work"
      />
      <PageHeader
        eyebrow={t("nav.work")}
        ascii="work"
        title={t("work.title")}
        description={t("work.desc")}
      />

      <section className="pb-24 md:pb-32">
        <div className="container-shell flex flex-col pt-10">
          {projects.map((p, i) => (
            <ProjectShowcase key={p.slug} project={p} index={i} headingLevel={2} />
          ))}
        </div>
      </section>
    </>
  );
}
