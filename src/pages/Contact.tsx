import { Seo } from "../lib/seo";
import { PageHeader } from "../components/ui/PageHeader";
import { ContactForm } from "../components/forms/ContactForm";
import { Reveal } from "../components/motion/Reveal";
import { site, waLink } from "../lib/config";
import { useI18n } from "../lib/i18n";
import { track } from "../lib/analytics";
import { InstagramIcon, WhatsAppIcon } from "../components/ui/icons";

export default function Contact() {
  const { t } = useI18n();

  return (
    <>
      <Seo
        title={`${t("nav.contact")} | Websiteku`}
        description={t("seo.contact.description")}
        path="/contact"
      />

      <PageHeader
        eyebrow={t("nav.contact")}
        ascii="start"
        title={t("contact.title")}
        description={t("contact.desc")}
      />

      <section className="pt-12 pb-24 md:pb-32">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                    {t("contact.direct")}
                  </p>
                  <div className="mt-5 space-y-3">
                    <a
                      href={waLink(t("contact.whatsappMessage"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("whatsapp_click", { source: "contact_page" })}
                      className="contact-direct-link"
                    >
                      <span className="flex items-center gap-3">
                        <WhatsAppIcon className="h-5 w-5" />
                        <span className="font-medium">WhatsApp</span>
                      </span>
                      <span className="text-sm text-ink-soft">{t("contact.chat")}</span>
                    </a>

                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-direct-link"
                    >
                      <span className="flex items-center gap-3">
                        <InstagramIcon className="h-5 w-5" />
                        <span className="font-medium">Instagram</span>
                      </span>
                      <span className="text-sm text-ink-soft">{site.instagramHandle}</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-xl bg-cream-2/60 p-6">
                  <p className="text-sm font-medium">{t("contact.next.title")}</p>
                  <ol className="mt-4 space-y-3 text-sm text-ink-soft">
                    <li>{t("contact.next.1")}</li>
                    <li>{t("contact.next.2")}</li>
                    <li>{t("contact.next.3")}</li>
                  </ol>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
