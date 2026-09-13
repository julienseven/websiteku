import { useId } from "react";
import { Link } from "react-router-dom";
import { site, waLink } from "../lib/config";
import { useI18n } from "../lib/i18n";
import { track } from "../lib/analytics";
import { Eyebrow } from "../components/ui/Eyebrow";
import { AsciiPixelsBackground } from "../components/effects/AsciiPixelsBackground";
import { ArrowRight, InstagramIcon, WhatsAppIcon } from "../components/ui/icons";

export function FinalCta() {
  const { t } = useI18n();
  const titleId = useId();

  return (
    <section className="ascii-surface final-cta" aria-labelledby={titleId}>
      <AsciiPixelsBackground variant="start" dark />
      <div className="container-shell relative z-10">
        <div className="page-header-top">
          <Eyebrow className="text-cream/75">{t("final.eyebrow")}</Eyebrow>
        </div>

        <h2 id={titleId} className="final-cta-title">
          <span className="block">{t("final.l1")}</span>
          <span className="block text-cream/80">{t("final.l2")}</span>
        </h2>

        <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <Link
                to="/contact"
                onClick={() => track("project_start", { source: "final_cta" })}
                className="inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-full bg-cream px-6 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-accent hover:text-cream sm:px-8"
              >
                {t("final.cta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="mt-5 max-w-sm text-cream/70">{t("final.copy")}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={waLink(t("contact.whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { source: "final_cta" })}
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-sm font-medium transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>

              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-sm font-medium transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}
