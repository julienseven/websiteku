import { Seo } from "../lib/seo";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/motion/Reveal";
import { useI18n } from "../lib/i18n";

export function NotFound() {
  const { t } = useI18n();
  return (
    <>
      <Seo
        title="404 | Websiteku"
        description={t("notFound.heading")}
        path="/404"
        noindex
      />
      <section className="flex min-h-[80vh] items-center pt-20">
        <div className="container-shell">
          <Reveal>
            <span className="font-display text-sm font-bold text-accent">
              404
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.98] tracking-tight">
              {t("notFound.heading")}
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-soft">
              {t("notFound.copy")}
            </p>
            <div className="mt-10">
              <Button to="/" size="lg">
                {t("common.home")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default NotFound;
