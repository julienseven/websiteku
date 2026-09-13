import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Navbar } from "../navigation/Navbar";
import { Footer } from "./Footer";
import { waLink } from "../../lib/config";
import { track } from "../../lib/analytics";
import { WhatsAppIcon } from "../ui/icons";
import { useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useI18n } from "../../lib/i18n";

function WhatsAppFloat() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const footerVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > 500 && pathname !== "/contact" && !footerVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <a
      href={waLink(t("contact.whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { source: "floating" })}
      aria-label={t("common.chat")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "whatsapp-float fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 hidden min-h-11 items-center gap-2 rounded-full border border-cream/20 bg-ink px-4 py-3 text-xs font-medium text-cream shadow-lg transition-[opacity,transform,background-color] duration-300 hover:bg-accent sm:right-5 sm:flex sm:text-sm",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <WhatsAppIcon className="h-4 w-4" />
      <span className="hidden sm:inline">{t("common.chat")}</span>
    </a>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const frame = requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById("main-content")?.focus();
      }}>{t("common.skip")}</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">
        <noscript>
          <style>{'.no-js-links{padding:100px 24px 24px;display:flex;flex-wrap:wrap;gap:20px}.enquiry-form,.service-tabs-rail,header button{display:none!important}.service-tabs-card{display:none!important}'}</style>
          <nav className="no-js-links" aria-label="Navigasi tanpa JavaScript">
            <a href="/work">Karya</a><a href="/services">Layanan</a><a href="/pricing">Harga</a><a href="/about">Studio</a><a href="/contact">Kontak</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">Mulai melalui WhatsApp ↗</a>
          </nav>
        </noscript>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
