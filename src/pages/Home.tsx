import { Seo } from "../lib/seo";
import { Hero } from "../sections/Hero";
import { SelectedWork } from "../sections/SelectedWork";
import { ValueProp } from "../sections/ValueProp";
import { ServicesSection } from "../sections/ServicesSection";
import { PricingSection } from "../sections/PricingSection";
import { CareSection } from "../sections/CareSection";
import { ProcessSection } from "../sections/ProcessSection";
import { Industries } from "../sections/Industries";
import { Philosophy } from "../sections/Philosophy";
import { Faq } from "../sections/Faq";
import { CredibilityStrip } from "../components/ui/CredibilityStrip";
import { FinalCta } from "../sections/FinalCta";
import { useI18n } from "../lib/i18n";

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        path="/"
      />
      <Hero />
      <SelectedWork />
      <ValueProp />
      <ServicesSection />
      <PricingSection />
      <CareSection />
      <ProcessSection />
      <Industries />
      <Philosophy />
      <Faq />
      <CredibilityStrip />
      <FinalCta />
    </>
  );
}
