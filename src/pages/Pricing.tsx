import { Seo } from "../lib/seo";
import { PricingSection } from "../sections/PricingSection";
import { Faq } from "../sections/Faq";
import { FinalCta } from "../sections/FinalCta";
import { PageHeader } from "../components/ui/PageHeader";
import { useI18n } from "../lib/i18n";

export default function Pricing() {
  const { t } = useI18n();
  return (
    <>
      <Seo
        title={`${t("nav.pricing")} | Websiteku`}
        description={t("seo.pricing.description")}
        path="/pricing"
      />
      <PageHeader eyebrow={t("nav.pricing")} ascii="pricing" title={t("pricing.heading")} description={t("pricing.sub")} />
      <PricingSection showHeading={false} />
      <Faq />
      <FinalCta />
    </>
  );
}
