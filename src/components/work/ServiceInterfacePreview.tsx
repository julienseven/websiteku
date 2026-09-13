import type { Service } from "../../data/services";
import { ArrowUpRight } from "../ui/icons";
import { useI18n } from "../../lib/i18n";

const directions: Record<string, { brand: string; line: string; footer: string }> = {
  "company-profile": { brand: "FORMA & CO.", line: "Built on trust. Designed for tomorrow.", footer: "Our story / Our expertise / Selected projects" },
  property: { brand: "PROPERTY / LIVING", line: "Find your place. Make it yours.", footer: "Explore properties / Find your neighbourhood" },
  "restaurant-cafe": { brand: "bake & brew", line: "Slow mornings. Good company.", footer: "The menu / Our story / Come on in" },
  hospitality: { brand: "LONTAR / STAY", line: "A little closer to nowhere.", footer: "The villas / The experience / Plan your stay" },
  "landing-page": { brand: "OBJECT / 01", line: "An icon. Reimagined.", footer: "Discover the details / Make it yours" },
  "custom-website": { brand: "STUDIO / EDIT", line: "A different perspective.", footer: "Selected work / Ideas / Get in touch" },
};

const localDirections: Record<string, { line: string; footer: string }> = {
  "company-profile": { line: "Berpijak pada kepercayaan.", footer: "Cerita kami / Keahlian / Proyek pilihan" },
  property: { line: "Ruang baru. Cerita baru.", footer: "Jelajahi properti / Temukan lingkunganmu" },
  "restaurant-cafe": { line: "Pagi tenang. Teman berbincang.", footer: "Menu / Cerita kami / Mampir, yuk" },
  hospitality: { line: "Sejenak, jauh dari ramai.", footer: "Vila / Pengalaman / Rencanakan kunjungan" },
  "landing-page": { line: "Ikon. Dalam wujud baru.", footer: "Lihat detail / Miliki sekarang" },
  "custom-website": { line: "Sudut pandang yang berbeda.", footer: "Karya pilihan / Ide / Hubungi kami" },
};

export function ServiceInterfacePreview({ service }: { service: Service }) {
  const { lang, t } = useI18n();
  const base = directions[service.id] ?? directions["company-profile"];
  const direction = lang === "id" ? { ...base, ...localDirections[service.id] } : base;
  const image = service.image.replace(/w=\d+/, "w=800").replace(/h=\d+/, "h=520");

  return (
    <div className={`interface-preview interface-preview--${service.id}`} aria-hidden="true">
      <div className="interface-window">
        <div className="interface-chrome">
          <span /><span /><span />
          <div>websiteku / concept</div>
        </div>
        <div className="interface-site">
          <div className="interface-nav">
            <span>{direction.brand}</span><span>{t("preview.explore")} <span aria-hidden="true">+</span></span>
          </div>
          <div className="interface-hero">
            <img src={image} alt="" loading="lazy" decoding="async" width="800" height="520" />
            <div className="interface-shade" />
            <div className="interface-headline">
              <span className="interface-kicker">{t("preview.perspective")}</span>
              <span className="interface-title">{direction.line}</span>
              <span className="interface-action">{t("preview.discover")} <ArrowUpRight className="h-[1.3em] w-[1.3em]" /></span>
            </div>
          </div>
          <div className="interface-footer"><span>{direction.footer}</span><span>2026</span></div>
        </div>
      </div>
    </div>
  );
}