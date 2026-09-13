import { Seo } from "../lib/seo";
import { getServices } from "../data/services";
import { PageHeader } from "../components/ui/PageHeader";
import { TabsCard, type TabsCardItem } from "../components/ui/TabsCard";
import { ServiceInterfacePreview } from "../components/work/ServiceInterfacePreview";
import { useI18n } from "../lib/i18n";
import { FinalCta } from "../sections/FinalCta";

export default function Services() {
  const { t, lang } = useI18n();
  const services = getServices(lang);

  const items: TabsCardItem[] = services.map((s) => ({
    id: s.id,
    label: s.title,
    title: s.title,
    description: s.description,
    image: s.image,
    media: <ServiceInterfacePreview service={s} />,
    features: s.features,
    cta: { to: `/contact?service=${s.id}`, label: t("nav.cta") },
  }));

  return (
    <>
      <Seo
        title={`${t("nav.services")} | Websiteku`}
        description={t("seo.services.description")}
        path="/services"
      />

      <PageHeader
        eyebrow={t("nav.services")}
        ascii="services"
        title={t("services.heading")}
        description={t("services.desc")}
      />

      <section className="pt-10 pb-20 md:pt-12 md:pb-28">
        <div className="container-shell">
          <p className="mb-5 text-xs text-ink-soft">
            <span className="hidden lg:inline">{t("services.hoverHint")}</span>
            <span className="lg:hidden">{t("services.tapHint")}</span>
          </p>
          <TabsCard items={items} />
          <noscript><div className="space-y-10">{services.map(service => <article key={service.id}><h2 className="text-2xl font-semibold">{service.title}</h2><p className="mt-3 text-ink-soft">{service.description}</p><a className="mt-4 inline-flex min-h-11 items-center underline" href={`/contact?service=${service.id}`}>{t("nav.cta")}</a></article>)}</div></noscript>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
