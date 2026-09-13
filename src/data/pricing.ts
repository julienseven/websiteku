import { compactRupiah } from "../lib/format";

export type Package = {
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  from?: boolean;
};

export const packages: Package[] = [
  {
    name: "Start",
    price: "Rp2,9jt",
    tagline: "Untuk bisnis yang butuh kehadiran web yang kuat dengan cepat.",
    features: [
      "1-page website",
      "Custom design",
      "Responsive / mobile",
      "WhatsApp integration",
      "Basic SEO",
      "Contact form",
      "Domain setup assistance",
      "2 revision rounds",
    ],
    cta: "Pilih Start",
  },
  {
    name: "Business",
    price: "Rp5,9jt",
    tagline: "Untuk bisnis yang butuh website lengkap yang terasa premium.",
    features: [
      "Up to 5 pages",
      "Custom design",
      "CMS",
      "Contact forms",
      "Google Maps",
      "Analytics",
      "SEO setup",
      "Custom motion",
      "WhatsApp integration",
      "2 revision rounds",
    ],
    cta: "Mulai Business",
    featured: true,
  },
  {
    name: "Premium",
    price: "Mulai Rp9,9jt",
    tagline: "Untuk project yang membutuhkan fungsi dan pengalaman khusus.",
    features: [
      "Fully custom website",
      "Advanced interactions",
      "Custom animation",
      "Advanced CMS",
      "API integrations",
      "Custom functionality",
      "Analytics",
      "Performance optimisation",
      "SEO foundation",
    ],
    cta: "Diskusikan Project",
  },
];

export const carePackage = {
  price: "Mulai Rp500rb/bulan",
  features: [
    "Minor website edits",
    "CMS updates",
    "Uptime monitoring",
    "Technical maintenance",
    "Analytics check",
    "Backups where applicable",
    "Monthly support",
  ],
};

const amounts: Record<string, number> = { Start: 2_900_000, Business: 5_900_000, Premium: 9_900_000 };
const localFeatures: Record<string, string[]> = {
  Start: ["Website 1 halaman", "Desain khusus", "Responsif di HP", "Integrasi WhatsApp", "SEO dasar", "Formulir kontak", "Bantuan pengaturan domain", "2 ronde revisi"],
  Business: ["Hingga 5 halaman", "Desain khusus", "CMS untuk mengelola konten", "Formulir kontak", "Google Maps", "Analitik pengunjung", "Pengaturan SEO", "Animasi khusus", "Integrasi WhatsApp", "2 ronde revisi"],
  Premium: ["Website sepenuhnya khusus", "Interaksi lanjutan", "Animasi khusus", "CMS lanjutan", "Integrasi API", "Fungsi khusus", "Analitik pengunjung", "Optimasi performa", "Fondasi SEO"],
};
const englishPackageCopy: Record<string, { tagline: string; cta: string }> = {
  Start: { tagline: "For businesses that need a strong web presence, without the wait.", cta: "Choose Start" },
  Business: { tagline: "A complete, considered website for a business ready to grow.", cta: "Start Business" },
  Premium: { tagline: "For projects that need a truly tailored experience and custom functionality.", cta: "Let's Talk" },
};

export function getPackages(lang: "id" | "en"): Package[] {
  return packages.map((item) => ({
    ...item,
    price: compactRupiah(amounts[item.name], lang),
    from: item.name === "Premium",
    tagline: lang === "en" ? englishPackageCopy[item.name].tagline : item.tagline.replace("project", "proyek"),
    features: lang === "en" ? item.features : localFeatures[item.name],
    cta: lang === "en" ? englishPackageCopy[item.name].cta : item.cta.replace("Project", "Proyek"),
  }));
}

export function getCareFeatures(lang: "id" | "en") {
  return lang === "en" ? carePackage.features : [
    "Perubahan kecil pada website", "Pembaruan CMS", "Pemantauan ketersediaan", "Pemeliharaan teknis", "Pemeriksaan analitik", "Pencadangan sesuai kebutuhan", "Dukungan bulanan",
  ];
}
