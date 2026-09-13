const px = (id: number, w = 960, _h = 900) =>
  `/images/reference/${id}-${w <= 640 ? 640 : w <= 960 ? 960 : 1600}.jpg`;

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: "company-profile",
    title: "Profil Perusahaan",
    description:
      "Website profesional untuk memperkenalkan perusahaan, layanan, proyek, dan kontak.",
    image: px(6010424),
    features: ["Struktur yang jelas", "Profil & layanan", "Kontak langsung"],
  },
  {
    id: "property",
    title: "Properti",
    description:
      "Katalog properti, proyek pengembangan, profil agen, dan pertanyaan langsung melalui WhatsApp.",
    image: px(8134750),
    features: ["Katalog properti", "Filter & detail", "Pertanyaan via WhatsApp"],
  },
  {
    id: "restaurant-cafe",
    title: "Restoran & Kafe",
    description:
      "Menu, lokasi, reservasi, galeri, cerita bisnis, dan integrasi media sosial.",
    image: px(39268201),
    features: ["Menu & lokasi", "Reservasi", "Cerita & galeri"],
  },
  {
    id: "hospitality",
    title: "Hotel & Vila",
    description: "Website vila, hotel, dan resor dengan galeri, pengalaman menginap, serta akses pemesanan yang jelas.",
    image: px(18971223),
    features: ["Galeri & pengalaman", "Tombol pemesanan", "Tarif & fasilitas"],
  },
  {
    id: "landing-page",
    title: "Landing Page",
    description:
      "Halaman terarah untuk produk, kampanye, acara, atau peluncuran. Satu pesan, satu langkah berikutnya.",
    image: px(261985),
    features: ["Satu pesan utama", "Aksi yang jelas", "Cepat & ringkas"],
  },
  {
    id: "custom-website",
    title: "Website Khusus",
    description:
      "Untuk proyek yang membutuhkan CMS, integrasi sistem, interaksi khusus, atau pengembangan yang lebih mendalam.",
    image: px(29206852),
    features: ["CMS & integrasi", "Interaksi khusus", "Pengembangan khusus"],
  },
];

const english: Record<string, Pick<Service, "title" | "description" | "features">> = {
  "company-profile": {
    title: "Company Profile",
    description: "A considered website to introduce your company, expertise, projects, and the people behind the business.",
    features: ["Clear structure", "Company & services", "Direct contact"],
  },
  property: {
    title: "Property",
    description: "Property listings, development projects, agent profiles, and a direct path to a WhatsApp inquiry.",
    features: ["Property catalogue", "Filters & details", "WhatsApp inquiries"],
  },
  "restaurant-cafe": {
    title: "Restaurant & Café",
    description: "Bring the atmosphere online with menus, locations, reservations, a gallery, and your story.",
    features: ["Menu & location", "Reservations", "Story & gallery"],
  },
  hospitality: {
    title: "Hospitality",
    description: "Immersive websites for villas, hotels, and resorts, with galleries, experiences, and clear booking calls to action.",
    features: ["Gallery & experiences", "Booking CTA", "Rates & amenities"],
  },
  "landing-page": {
    title: "Landing Page",
    description: "Focused pages for a product, campaign, event, or launch. One message, one clear next step.",
    features: ["One clear message", "Focused CTA", "Fast & concise"],
  },
  "custom-website": {
    title: "Custom Website",
    description: "For projects that need a CMS, integrations, tailored interactions, or more specialised development.",
    features: ["CMS & integrations", "Custom interactions", "Bespoke development"],
  },
};

export function getServices(lang: "id" | "en"): Service[] {
  return lang === "en" ? services.map((service) => ({ ...service, ...english[service.id] })) : services;
}
