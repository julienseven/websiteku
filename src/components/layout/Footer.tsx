import { Link } from "react-router-dom";
import { site, waLink } from "../../lib/config";
import { useI18n } from "../../lib/i18n";
import { track } from "../../lib/analytics";
import { ArrowUpRight, InstagramIcon, WhatsAppIcon } from "../ui/icons";
import { AnimatedGrid } from "../effects/AnimatedGrid";
import { useSmoothScroll } from "../motion/SmoothScroll";

const explore = [
  { to: "/work", label: "nav.work" },
  { to: "/services", label: "nav.services" },
  { to: "/pricing", label: "nav.pricing" },
  { to: "/about", label: "nav.about" },
  { to: "/contact", label: "nav.contact" },
  { to: "/visual", label: "nav.visual" },
];

export function Footer() {
  const { t } = useI18n();
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="studio-footer">
      <div className="liquid-glass footer-shell">
        <div className="footer-content">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Link
                to="/"
                className="font-display text-2xl font-bold tracking-tight"
              >
                Websiteku
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {t("footer.tagline")}
              </p>
            </div>

            <div className="flex flex-wrap gap-12 md:gap-20">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                  {t("footer.explore")}
                </p>
                <ul className="mt-4">
                  {explore.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="inline-flex min-h-10 items-center text-sm text-ink transition-colors hover:text-accent"
                      >
                        {t(l.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                  {t("footer.connect")}
                </p>
                <ul className="mt-4">
                  <li>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                    >
                      <InstagramIcon className="h-4 w-4" />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href={waLink(t("contact.whatsappMessage"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("whatsapp_click", { source: "footer" })}
                      className="inline-flex min-h-10 items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>

        </div>
        <div className="footer-signature">
          <AnimatedGrid />
          <div className="footer-signature-top">
            <p>{t("footer.signature")}</p>
            <button type="button" onClick={() => scrollTo(0)}>{t("common.top")}<ArrowUpRight className="h-4 w-4" /></button>
          </div>
          <Link to="/" aria-label={t("common.home")} className="footer-wordmark">Websiteku</Link>
        </div>
        <div className="footer-bottom">
          <p>{t("footer.location")}</p>
          <p>© Websiteku 2026</p>
          <p>{t("footer.made")}</p>
        </div>
      </div>
    </footer>
  );
}
