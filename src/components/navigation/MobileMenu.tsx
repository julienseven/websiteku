import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { waLink } from "../../lib/config";
import { useI18n } from "../../lib/i18n";
import { track } from "../../lib/analytics";
import { CloseIcon, WhatsAppIcon } from "../ui/icons";
import { LanguageToggle } from "./LanguageToggle";

const links = [
  { to: "/work", label: "nav.work" },
  { to: "/services", label: "nav.services" },
  { to: "/pricing", label: "nav.pricing" },
  { to: "/about", label: "nav.about" },
  { to: "/contact", label: "nav.contact" },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          id="mobile-navigation"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.open")}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-cream lg:hidden"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex min-h-20 shrink-0 items-center justify-between border-b border-ink/10 px-6">
            <span className="font-display text-lg font-bold tracking-tight">
              Websiteku
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink"
              aria-label={t("nav.close")}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6 py-5">
            {links.map((l) => (
              <motion.div
                key={l.to}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={l.to}
                  onClick={() => { if (l.to === "/contact") track("project_start", { source: "mobile_menu" }); onClose(); }}
                  className="flex items-center justify-between border-b border-ink/10 py-4 font-display text-3xl font-bold tracking-tight"
                >
                  {t(l.label)}
                  <span className="text-ink-soft" aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="shrink-0 space-y-3 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-center pb-1">
              <LanguageToggle />
            </div>
            <a
              href={waLink(t("contact.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "mobile_menu" })}
              className="flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-medium text-cream"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t("common.chat")}
            </a>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

