/**
 * Portfolio data.
 * Replace coverImage / gallery URLs with real client assets when available.
 * Concept projects are clearly flagged (concept: true) and never presented as
 * real client work.
 */

import { englishProjects } from "./projectTranslations";

const px = (id: number, w = 960, _h = 900) =>
  `/images/reference/${id}-${w <= 640 ? 640 : w <= 960 ? 960 : 1600}.jpg`;

export type Project = {
  slug: string;
  title: string;
  client?: string;
  category: string;
  industry: string;
  year: string;
  description: string;
  services: string[];
  coverImage: string;
  gallery: { src: string; alt: string; ratio?: "landscape" | "portrait" }[];
  url?: string;
  screenshots?: boolean;
  concept?: boolean;
  overview: string;
  challenge: string;
  solution: string;
  details: { label: string; value: string }[];
  result: string;
};

export const projects: Project[] = [
  {
    slug: "unix-property",
    url: "https://unix-property.vercel.app/",
    screenshots: true,
    title: "Unix Property",
    concept: true,
    category: "Properti / Desain & Pengembangan Website",
    industry: "Properti",
    year: "2025",
    description:
      "Website properti yang mengubah katalog penawaran menjadi pengalaman yang lebih premium dan mudah dijelajahi.",
    services: ["Arah Visual", "Desain Web", "Pengembangan", "CMS", "Animasi"],
    coverImage: "/images/projects/unix-property-desktop.jpg",
    gallery: [
      { src: "/images/projects/unix-property-desktop.jpg", alt: "Tampilan desktop konsep Unix Property" },
      { src: "/images/projects/unix-property-listings.jpg", alt: "Katalog properti pada preview konsep Unix Property" },
      { src: "/images/projects/unix-property-mobile.jpg", alt: "Tampilan mobile konsep Unix Property", ratio: "portrait" },
    ],
    overview:
      "Eksplorasi mandiri untuk website properti, belum merupakan proyek klien resmi. Konsep ini mempelajari cara menyajikan katalog properti dengan jelas.",
    challenge:
      "Katalog properti yang padat sering terasa seperti tabel data. Tantangannya adalah menjaga kejelasan harga, lokasi, dan spesifikasi tanpa mengorbankan kesan premium sebuah bisnis properti.",
    solution:
      "Kami merancang katalog dengan visual besar, filter ringan, dan animasi halus. Setiap penawaran menonjolkan tiga hal yang dicari pembeli: foto yang jelas, harga, dan tombol WhatsApp yang mudah dijangkau.",
    details: [
      { label: "Proyek", value: "Profil perusahaan & katalog properti" },
      { label: "Bidang usaha", value: "Properti" },
      { label: "Tahun", value: "2025" },
      { label: "Layanan", value: "Desain web, pengembangan, CMS" },
      { label: "Fokus", value: "Katalog, pertanyaan via WhatsApp, kemudahan di HP" },
    ],
    result:
      "Pengalaman yang setenang ruang pamer properti. Setiap halaman memandu pengunjung menuju satu langkah yang jelas: menghubungi agen dan menjadwalkan survei.",
  },
  {
    slug: "aluna-bake-brew",
    title: "Aluna Bake & Brew",
    concept: true,
    category: "Kuliner / Website Merek",
    industry: "Kuliner",
    year: "2025",
    description:
      "Pengalaman digital yang membawa karakter kafe ke web melalui visual, menu, dan animasi.",
    services: ["Website Merek", "Desain Web", "Animasi", "Pengembangan"],
    coverImage: px(5812847, 1600, 1200),
    gallery: [
      { src: px(5812847, 1600, 1200), alt: "Suasana hangat kafe dengan meja kayu" },
      { src: px(31907940, 1200, 800), alt: "Meja bar kopi dengan mesin espresso" },
      { src: px(31321857, 1200, 800), alt: "Interior kafe dengan cahaya sore" },
      { src: px(13305634, 900, 1200), alt: "Peralatan seduh kopi di meja bar", ratio: "portrait" },
    ],
    overview:
      "Eksplorasi mandiri untuk website kafe, belum merupakan proyek klien resmi. Konsep ini mempelajari cara menyatukan karakter visual, menu, dan informasi kunjungan.",
    challenge:
      "Sebagian besar pelanggan datang dari Instagram dan langsung mencari tiga hal: lokasi, jam buka, dan menu. Jika ketiganya sulit ditemukan di HP, mereka pergi ke tempat lain.",
    solution:
      "Kami menyusun cerita visual dari tampilan pembuka, kisah kafe, menu, hingga reservasi. Foto yang dominan dan animasi lembut membangun suasana. Lokasi, jam buka, dan menu bisa diakses dengan satu ketukan.",
    details: [
      { label: "Proyek", value: "Website merek kafe" },
      { label: "Bidang usaha", value: "Kuliner" },
      { label: "Tahun", value: "2025" },
      { label: "Layanan", value: "Desain web, animasi, pengembangan" },
      { label: "Fokus", value: "Menu, lokasi, reservasi, media sosial" },
    ],
    result:
      "Pengalaman yang konsisten antara Instagram dan website. Karakter kafe terbawa ke web, dan pelanggan bisa menemukan informasi yang mereka butuhkan dengan mudah.",
  },
  {
    slug: "villa-lontar",
    title: "Villa Lontar",
    category: "Penginapan / Websiteku Concept",
    industry: "Penginapan",
    year: "2026",
    description:
      "Konsep website penginapan yang menyatukan galeri, pengalaman menginap, dan pemesanan dalam alur yang tenang.",
    services: ["Arah Visual", "Desain Web", "Pengembangan", "Animasi"],
    coverImage: px(31817157, 1600, 1200),
    gallery: [
      { src: px(31817157, 1600, 1200), alt: "Vila dengan kolam infinity saat matahari terbenam" },
      { src: px(18971223, 1200, 800), alt: "Kolam resor dengan pemandangan pegunungan" },
      { src: px(6032280, 1200, 800), alt: "Teras vila dan taman yang tenang" },
      { src: px(8143671, 900, 1200), alt: "Kolam renang di halaman vila", ratio: "portrait" },
    ],
    concept: true,
    overview:
      "Studi konsep untuk bisnis penginapan. Kami mengeksplorasi bagaimana sebuah vila bisa tampil premium di layar, dari tampilan pembuka hingga tombol pemesanan, tanpa terasa seperti templat.",
    challenge:
      "Website vila sering terjebak di dua ekstrem: terlalu polos atau terlalu ramai. Pengunjung perlu merasakan suasananya sekaligus menemukan tarif dan akses pemesanan tanpa hambatan.",
    solution:
      "Foto sinematik dan tipografi besar membangun suasana. Informasi ketersediaan dan tombol pemesanan ditempatkan secara konsisten di seluruh halaman.",
    details: [
      { label: "Proyek", value: "Website vila (konsep)" },
      { label: "Bidang usaha", value: "Penginapan" },
      { label: "Tahun", value: "2026" },
      { label: "Layanan", value: "Arah visual, desain web, animasi" },
      { label: "Fokus", value: "Galeri, pengalaman, pemesanan" },
    ],
    result:
      "Arah desain yang dapat dikembangkan menjadi website siap tayang. Kesan premium tetap hadir tanpa mengorbankan kemudahan pemesanan.",
  },
];

const translatedProjects = projects.map((project): Project => {
  const copy = englishProjects[project.slug];
  if (!copy) return project;
  const { galleryAlts, ...content } = copy;
  return { ...project, ...content, gallery: project.gallery.map((image, index) => ({ ...image, alt: galleryAlts[index] ?? image.alt })) };
});

export function getProjects(lang: "id" | "en" = "id"): Project[] {
  return lang === "en" ? translatedProjects : projects;
}

export function getProject(slug: string, lang: "id" | "en" = "id"): Project | undefined {
  return getProjects(lang).find((p) => p.slug === slug);
}

export function getNextProject(slug: string, lang: "id" | "en" = "id"): Project | undefined {
  const list = getProjects(lang);
  const i = list.findIndex((p) => p.slug === slug);
  return list.length ? list[(i + 1) % list.length] : undefined;
}
