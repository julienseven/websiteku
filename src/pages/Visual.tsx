import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Seo } from "../lib/seo";
import { AsciiDreamHero } from "../components/AsciiDreamHero";
import { ArrowRight } from "../components/ui/icons";
import { useI18n } from "../lib/i18n";

/**
 * Standalone showcase of the "ASCII motioned hero" over a dreamy pastel
 * gradient background — presented as a wide horizontal UI card.
 */
export default function Visual() {
  const { t } = useI18n();
  return (
    <>
      <Seo
        title={`${t("nav.visual")} | Websiteku`}
        description={t("seo.visual.description")}
        path="/visual"
      />

      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f8fd] px-4 pt-24 pb-16 sm:px-8">
        <h1 className="sr-only">{t("nav.visual")}</h1>
        <motion.div
          className="w-full max-w-[1200px]"
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AsciiDreamHero />
        </motion.div>

        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-ink hover:text-slate-800"
        >
          <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          {t("common.home")}
        </Link>
      </div>
    </>
  );
}
