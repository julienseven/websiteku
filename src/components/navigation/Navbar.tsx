import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useI18n } from "../../lib/i18n";
import { Button } from "../ui/Button";
import { MenuIcon } from "../ui/icons";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { useSmoothScroll } from "../motion/SmoothScroll";

const links = [
  { to: "/work", label: "nav.work" },
  { to: "/services", label: "nav.services" },
  { to: "/pricing", label: "nav.pricing" },
  { to: "/about", label: "nav.about" },
];

export function Navbar() {
  const { t } = useI18n();
  const { setLocked } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    setLocked(true);
    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.querySelectorAll<HTMLElement>("main, footer, .whatsapp-float"));
    const previousInert = siblings.map((element) => element.inert);
    siblings.forEach((element) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    return () => {
      setLocked(false);
      document.body.style.overflow = previousOverflow;
      siblings.forEach((element, i) => { element.inert = previousInert[i]; });
    };
  }, [open, setLocked]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const glass = scrolled || !isHome;
  const overDark = isHome && !scrolled;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 transition-[height,background-color,padding,box-shadow] duration-300",
            glass
              ? "liquid-glass h-14 rounded-full pl-5 pr-3 md:h-16 md:pl-7 md:pr-3"
              : "h-16 bg-transparent md:h-20"
          )}
        >
          <Link
            to="/"
            className={cn(
              "font-display text-lg font-bold tracking-tight transition-colors md:text-xl",
              overDark ? "text-cream" : "text-ink"
            )}
          >
            Websiteku
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "relative py-3 text-sm transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100",
                    overDark
                      ? "text-cream/70 hover:text-cream"
                      : "text-ink-soft hover:text-ink",
                    isActive && (overDark ? "font-medium text-cream after:scale-x-100" : "font-medium text-ink after:scale-x-100")
                  )
                }
              >
                {t(l.label)}
              </NavLink>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <LanguageToggle dark={overDark} />
            <Button
              to="/contact"
              variant={overDark ? "primaryOnDark" : "primary"}
              size="md"
              className="hidden sm:inline-flex"
            >
              {t("nav.cta")}
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors lg:hidden",
                overDark
                  ? "border-cream/30 text-cream hover:bg-cream hover:text-ink"
                  : "border-ink/15 text-ink hover:bg-ink hover:text-cream"
              )}
              aria-label={t("nav.open")}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} onClose={closeMenu} />
    </>
  );
}
