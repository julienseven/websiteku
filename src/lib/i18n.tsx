import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "id" | "en";

type Dict = Record<string, string>;

const id = {
  "nav.cta": "Mulai Proyek",
  "nav.open": "Buka menu navigasi",
  "nav.close": "Tutup menu",
  "nav.work": "Karya",
  "nav.services": "Layanan",
  "nav.pricing": "Harga",
  "nav.about": "Studio",
  "nav.contact": "Kontak",
  "nav.visual": "Eksplorasi Visual",
  "common.home": "Kembali ke Websiteku",
  "common.skip": "Langsung ke konten",
  "common.top": "Kembali ke atas",
  "common.email": "Email",
  "common.chat": "Chat Websiteku",
  "common.caseStudy": "Lihat studi kasus",
  "common.of": "dari",
  "common.step": "Tahap",
  "common.process": "Proses",
  "common.faq": "Tanya jawab",
  "common.industry": "Bidang usaha",
  "services.hoverHint": "Arahkan kursor untuk menjelajahi",
  "services.tapHint": "Pilih layanan untuk menjelajahi",
  "services.preview": "Websiteku Concept / Arah desain",
  "services.empty": "Layanan sedang diperbarui. Ceritakan kebutuhanmu melalui halaman kontak.",

  "hero.eyebrow": "Studio web independen / Indonesia",
  "hero.l1": "Website bagus.",
  "hero.l2": "Bisnis terlihat",
  "hero.l3": "lebih serius.",
  "hero.copy":
    "Website premium untuk bisnis Indonesia. Cepat, mobile-first, dan dibuat untuk menghasilkan pelanggan.",
  "hero.cta1": "Mulai Proyek",
  "hero.cta2": "Lihat Karya",
  "hero.from": "Mulai",
  "hero.days": "7–14 hari",
  "hero.country": "Indonesia",
  "hero.time": "Waktu",
  "hero.loc": "Lokasi",

  "work.actualPreview": "Preview website / Websiteku Concept",
  "work.referenceVisual": "Fotografi referensi / Arah konsep",
  "work.sub":
    "Eksplorasi website untuk bisnis Indonesia. Semua proyek berikut adalah Websiteku Concept.",
  "work.viewAll": "Lihat semua proyek",
  "work.title": "Karya Pilihan",
  "work.desc":
    "Pilihan proyek untuk bisnis Indonesia, beserta eksplorasi konsep yang menunjukkan arah desain kami.",

  "value.heading": "Website bukan sekadar halaman internet.",
  "value.copy":
    "Website adalah tempat calon pelanggan memutuskan apakah bisnis kamu terlihat cukup terpercaya untuk dihubungi.",
  "value.01.title": "Cepat",
  "value.01.text": "Sebagian besar proyek dirancang untuk tayang dalam 7–14 hari setelah konten utama siap.",
  "value.02.title": "Nyaman di HP",
  "value.02.text":
    "Dibangun untuk pelanggan yang datang dari Instagram, Google, dan WhatsApp melalui HP.",
  "value.03.title": "Mudah dihubungi",
  "value.03.text":
    "Tombol WhatsApp, formulir, reservasi, dan informasi penting dibuat mudah ditemukan.",
  "value.04.title": "Tidak terasa template",
  "value.04.text":
    "Visual dan pengalaman disesuaikan dengan identitas setiap bisnis.",

  "services.heading": "Apa yang kami buat",
  "services.detail": "Lihat detail layanan",
  "services.desc":
    "Dari profil perusahaan hingga website khusus. Setiap proyek dirancang untuk membuka percakapan dengan calon pelanggan, bukan sekadar tampil.",

  "pricing.heading": "Harga jelas. Tanpa teka-teki.",
  "pricing.sub":
    "Harga akhir menyesuaikan kebutuhan proyek. Ini adalah titik awalnya.",
  "pricing.note": "50% untuk mulai. 50% sebelum website tayang.",
  "pricing.popular": "Rekomendasi Studio",
  "pricing.from": "Mulai",

  "care.heading": "Setelah tayang, kami masih ada.",
  "care.copy":
    "Website yang baik perlu dirawat. Website Care membantu menjaga website tetap cepat, aman, dan terbarui tanpa harus kamu tangani sendiri.",
  "care.optional": "Opsional, bukan kewajiban. Pilih hanya jika kamu membutuhkan.",
  "care.cta": "Tanya tentang Website Care",
  "care.price": "Mulai Rp500rb/bulan",

  "process.heading": "Dari brief sampai online.",
  "process.sub":
    "Proses yang ringkas dan transparan. Kamu selalu tahu di tahap mana proyek kamu berada.",
  "process.01.title": "Kenalan",
  "process.01.text": "Ceritakan tentang bisnis dan tujuan kamu.",
  "process.02.title": "Arah desain",
  "process.02.text": "Kita menyepakati struktur, arah desain, dan konten utama.",
  "process.03.title": "Desain & bangun",
  "process.03.text": "Website dirancang dan dibangun bersamaan.",
  "process.04.title": "Tinjau bersama",
  "process.04.text": "Kamu mendapat pratinjau dan dua ronde revisi untuk menyempurnakan detail.",
  "process.05.title": "Tayang",
  "process.05.text": "Pelunasan, penyambungan domain, lalu website siap dikunjungi.",
  "process.01.headline": "Bisnis kamu dulu. Website menyusul.",
  "process.02.headline": "Satu arah. Semua lebih jelas.",
  "process.03.headline": "Dari ide, menjadi pengalaman.",
  "process.04.headline": "Detail kecil. Perbedaan besar.",
  "process.05.headline": "Siap dilihat. Siap dihubungi.",
  "process.navigate": "Jelajahi tahap pengerjaan",
  "process.scroll": "Gulir untuk mengikuti proses",
  "process.end": "Siap memulai cerita kamu?",

  "industries.heading": "Untuk bisnis Indonesia yang ingin melangkah lebih jauh.",
  "industry.property": "Properti",
  "industry.food": "Kuliner",
  "industry.hospitality": "Penginapan",
  "industry.architecture": "Arsitektur",
  "industry.interior": "Interior",
  "industry.automotive": "Otomotif",
  "industry.professional": "Jasa Profesional",
  "industry.startups": "Bisnis Rintisan",
  "industry.personal": "Personal Brand",

  "phil.eyebrow": "Tentang studio",
  "phil.l1": "Studio kecil.",
  "phil.l2": "Komunikasi langsung.",
  "phil.l3": "Hasil lebih baik.",
  "phil.p1":
    "Kamu berbicara langsung dengan orang yang merancang dan membangun website kamu. Tanpa perantara, proses panjang, atau lapisan agensi yang tidak perlu.",
  "phil.p2":
    "Websiteku menyatukan desain, pengembangan, animasi, dan strategi konversi dalam satu proses yang ringkas.",
  "phil.cta": "Kenali Websiteku",

  "faq.heading": "Pertanyaan yang sering muncul.",
  "faq.1.q": "Berapa lama membuat website?",
  "faq.1.a":
    "Sebagian besar proyek membutuhkan sekitar 7–14 hari setelah seluruh konten utama tersedia. Proyek yang lebih kompleks dapat membutuhkan waktu lebih lama.",
  "faq.2.q": "Apakah domain dan hosting termasuk?",
  "faq.2.a":
    "Kami dapat membantu menyiapkan domain dan hosting. Biaya penyedia pihak ketiga akan diinformasikan secara transparan dan terpisah.",
  "faq.3.q": "Apakah saya bisa update website sendiri?",
  "faq.3.a":
    "Bisa. Untuk proyek dengan pembaruan rutin, kami dapat menggunakan CMS agar konten bisa diubah tanpa menulis kode.",
  "faq.4.q": "Bagaimana sistem pembayaran?",
  "faq.4.a": "Uang muka 50% sebelum proyek dimulai dan pelunasan 50% sebelum website tayang.",
  "faq.5.q": "Berapa kali revisi?",
  "faq.5.a":
    "Paket standar mencakup dua ronde revisi. Perubahan besar di luar kebutuhan yang disepakati dapat dikenakan biaya tambahan.",
  "faq.6.q": "Apakah Websiteku hanya menerima klien Indonesia?",
  "faq.6.a":
    "Fokus utama kami adalah bisnis Indonesia, tetapi kami juga terbuka untuk proyek internasional.",

  "cred.1": "Desain khusus",
  "cred.2": "Nyaman di HP",
  "cred.3": "7–14 hari",
  "cred.4": "2 ronde revisi",
  "cred.5": "Dukungan WhatsApp",

  "final.eyebrow": "Mulai",
  "final.l1": "Bisnis kamu sudah bagus.",
  "final.l2": "Websitenya juga harus begitu.",
  "final.cta": "Mulai Website Kamu",
  "final.copy":
    "Ceritakan bisnis kamu. Kami akan membantu menentukan website yang tepat.",

  "footer.tagline": "Website bagus untuk bisnis yang serius.",
  "footer.explore": "Jelajahi",
  "footer.connect": "Terhubung",
  "footer.made": "Dibuat untuk bisnis yang layak dilihat.",
  "footer.signature": "Studio independen. Sentuhan personal.",
  "footer.location": "Berbasis di Indonesia",

  "about.title": "Website bagus untuk bisnis yang serius.",
  "about.desc":
    "Websiteku adalah studio web independen untuk bisnis Indonesia. Kecil, teliti, dan mudah diajak bicara.",
  "about.eyebrow": "Cara kami bekerja",
  "about.01.title": "Komunikasi langsung",
  "about.01.text":
    "Kamu bicara langsung dengan orang yang merancang dan membangun website kamu.",
  "about.02.title": "Dipandu desain",
  "about.02.text":
    "Setiap keputusan dimulai dari kualitas visual dan pengalaman, bukan template.",
  "about.03.title": "Punya tujuan",
  "about.03.text":
    "Website dibuat agar calon pelanggan mengambil langkah berikutnya, bukan sekadar ada di internet.",
  "about.04.title": "Ringkas",
  "about.04.text":
    "Tanpa perantara, proses panjang, atau lapisan agensi yang tidak perlu.",
  "about.p2note": "karena kualitas tidak harus rumit.",

  "case.project": "Proyek",
  "case.industry": "Bidang usaha",
  "case.year": "Tahun",
  "case.services": "Layanan",
  "case.website": "Website",
  "case.overview": "Gambaran proyek",
  "case.challenge": "Tantangan",
  "case.solution": "Pendekatan",
  "case.screens": "Galeri visual",
  "case.mobile": "Tampilan di HP",
  "case.details": "Detail",
  "case.result": "Arah konsep",
  "case.next": "Proyek berikutnya",
  "case.unpublished": "Tautan belum tersedia",

  "contact.title": "Ceritakan proyek kamu.",
  "contact.desc": "Ceritakan kebutuhan website kamu, lalu kirim brief melalui WhatsApp.",
  "contact.direct": "Kontak langsung",
  "contact.chat": "Chat langsung",
  "contact.next.title": "Setelah kamu mengirim cerita",
  "contact.next.1": "1. Kami membaca kebutuhan kamu.",
  "contact.next.2": "2. Kita diskusikan kebutuhan melalui WhatsApp.",
  "contact.next.3": "3. Diskusi singkat untuk menyepakati kebutuhan dan harga.",
  "contact.subject": "Proyek website baru",
  "contact.whatsappMessage": "Halo Websiteku, saya tertarik membuat website untuk bisnis saya.",
  "contact.careMessage": "Halo Websiteku, saya ingin tahu lebih banyak tentang Website Care.",

  "form.name": "Nama",
  "form.business": "Nama bisnis",
  "form.email": "Email",
  "form.whatsapp": "WhatsApp",
  "form.website": "Instagram / Website saat ini",
  "form.type": "Jenis website",
  "form.type.placeholder": "Pilih jenis website",
  "form.budget": "Anggaran",
  "form.timeline": "Target waktu",
  "form.message": "Ceritakan tentang bisnis dan website yang ingin dibuat",
  "form.message.placeholder":
    "Ceritakan bisnis kamu, siapa pelanggannya, dan apa yang ingin kamu capai melalui website ini...",
  "form.submit": "Kirim Proyek",
  "form.submitting": "Mengirim…",
  "form.success.title": "Terima kasih.",
  "form.success.text": "Kami akan menghubungi kamu melalui WhatsApp atau email.",
  "form.err.name": "Nama wajib diisi.",
  "form.err.email": "Email wajib diisi.",
  "form.err.emailFormat": "Format email tidak valid.",
  "form.err.type": "Pilih jenis website.",
  "form.err.budget": "Pilih kisaran anggaran.",
  "form.err.timeline": "Pilih target waktu.",
  "form.err.message": "Ceritakan sedikit tentang bisnis kamu (min. 20 karakter).",
  "form.err.whatsapp": "Masukkan nomor WhatsApp yang valid, termasuk kode negara jika di luar Indonesia.",
  "form.err.send": "Pesan belum terkirim. Coba lagi atau hubungi kami melalui WhatsApp.",
  "form.err.unconfigured": "Formulir belum tersambung ke email studio. Kamu bisa mengirim brief ini langsung melalui WhatsApp.",
  "form.err.summary": "Periksa bagian yang ditandai di bawah.",
  "form.placeholder.name": "Nama kamu",
  "form.placeholder.business": "Nama bisnis atau merek",
  "form.placeholder.email": "nama@email.com",
  "form.placeholder.website": "@namabisnis atau alamat website",
  "form.whatsappBrief": "Kirim brief lewat WhatsApp",
  "form.selectedPackage": "Paket pilihan",
  "form.required": "Bagian bertanda * wajib diisi.",
  "service.company-profile": "Profil Perusahaan",
  "service.property": "Properti",
  "service.restaurant-cafe": "Restoran & Kafe",
  "service.hospitality": "Hotel & Vila",
  "service.landing-page": "Landing Page",
  "service.custom-website": "Website Khusus",
  "service.portfolio": "Portofolio",
  "service.unsure": "Belum yakin",
  "budget.2-5": "Rp2–5 juta",
  "budget.5-10": "Rp5–10 juta",
  "budget.10-20": "Rp10–20 juta",
  "budget.20-plus": "Rp20 juta+",
  "timeline.asap": "Secepatnya",
  "timeline.w1": "1–2 minggu",
  "timeline.w2": "2–4 minggu",
  "timeline.m": "1–2 bulan",
  "timeline.flex": "Fleksibel",
  "preview.explore": "Jelajahi",
  "preview.discover": "Lihat lebih dekat",
  "preview.perspective": "SUDUT PANDANG BARU",
  "notFound.heading": "Halaman ini belum punya website.",
  "notFound.copy": "Mungkin halamannya sudah dipindah, atau alamatnya salah ketik.",
  "seo.home.title": "Websiteku | Website Premium untuk Bisnis Indonesia",
  "seo.home.description": "Websiteku membantu bisnis Indonesia membangun website modern, cepat, nyaman di HP, dan dirancang untuk mendatangkan calon pelanggan.",
  "seo.work.description": "Jelajahi proyek dan konsep website Websiteku untuk bisnis properti, kuliner, dan penginapan.",
  "seo.services.description": "Website profil perusahaan, properti, restoran, penginapan, landing page, dan website khusus untuk bisnis Indonesia.",
  "seo.pricing.description": "Harga pembuatan website mulai Rp2,9 juta. Pilihan Start, Business, dan Premium, dengan pembayaran 50% di awal dan 50% sebelum tayang.",
  "seo.about.description": "Kenali Websiteku, studio web independen untuk bisnis Indonesia. Berkomunikasi langsung dengan orang yang merancang dan membangun websitemu.",
  "seo.contact.description": "Ceritakan kebutuhan website bisnis kamu. Siapkan brief dan hubungi Websiteku melalui WhatsApp.",
  "seo.visual.description": "Eksplorasi visual Websiteku: animasi ASCII dan warna pastel yang lembut.",
};

const en: Record<keyof typeof id, string> = {
  "nav.cta": "Start a Project",
  "nav.open": "Open navigation menu",
  "nav.close": "Close menu",
  "nav.work": "Work",
  "nav.services": "Services",
  "nav.pricing": "Pricing",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.visual": "Visual Explorations",
  "common.home": "Back to Websiteku",
  "common.skip": "Skip to content",
  "common.top": "Back to top",
  "common.email": "Email",
  "common.chat": "Chat with Websiteku",
  "common.caseStudy": "View case study",
  "common.of": "of",
  "common.step": "Step",
  "common.process": "Process",
  "common.faq": "FAQ",
  "common.industry": "Industries",
  "services.hoverHint": "Hover to explore",
  "services.tapHint": "Choose a service to explore",
  "services.preview": "Websiteku Concept / Design direction",
  "services.empty": "Services are being updated. Tell us what you need on the contact page.",

  "hero.eyebrow": "Independent web studio / Indonesia",
  "hero.l1": "Great websites.",
  "hero.l2": "For serious",
  "hero.l3": "businesses.",
  "hero.copy":
    "Premium websites for Indonesian businesses. Fast, mobile-first, and built to bring in customers.",
  "hero.cta1": "Start a Project",
  "hero.cta2": "See Work",
  "hero.from": "From",
  "hero.days": "7–14 days",
  "hero.country": "Indonesia",
  "hero.time": "Timeline",
  "hero.loc": "Location",

  "work.actualPreview": "Website preview / Websiteku Concept",
  "work.referenceVisual": "Reference photography / Concept direction",
  "work.sub": "Website explorations for Indonesian businesses. All projects shown are Websiteku Concept.",
  "work.viewAll": "View all projects",
  "work.title": "Selected Work",
  "work.desc":
    "Selected projects for Indonesian businesses, alongside concepts that explore our design direction.",

  "value.heading": "A website is more than a page on the internet.",
  "value.copy":
    "It's where prospective customers decide whether your business looks trustworthy enough to contact.",
  "value.01.title": "Fast",
  "value.01.text": "Most projects are designed to launch in 7–14 days once the main content is ready.",
  "value.02.title": "Mobile first",
  "value.02.text":
    "Built for customers arriving from Instagram, Google, and WhatsApp on their phone.",
  "value.03.title": "Designed to convert",
  "value.03.text":
    "CTAs, WhatsApp, forms, booking, and information are made easy to find.",
  "value.04.title": "Never feels templated",
  "value.04.text":
    "Visuals and experience are tailored to each business's identity.",

  "services.heading": "What we build",
  "services.detail": "See service details",
  "services.desc":
    "From company profiles to custom websites. Every project is built to start conversations with customers, not just to be seen.",

  "pricing.heading": "Simple pricing. No mystery.",
  "pricing.sub": "Final price depends on project scope. This is a starting point.",
  "pricing.note": "50% to start. 50% before the website launches.",
  "pricing.popular": "Studio Recommendation",
  "pricing.from": "From",

  "care.heading": "After launch, we're still here.",
  "care.copy":
    "A good website needs care. Website Care helps keep your site fast, secure, and up to date without you handling the technical details.",
  "care.optional": "Optional, never required. Choose it only if you need it.",
  "care.cta": "Ask about Website Care",
  "care.price": "From Rp500k/month",

  "process.heading": "From brief to launch.",
  "process.sub":
    "A concise, transparent process. You always know where your project stands.",
  "process.01.title": "Brief",
  "process.01.text": "Tell us about your business and goals.",
  "process.02.title": "Direction",
  "process.02.text": "We define the structure, visual direction, and content.",
  "process.03.title": "Design + Build",
  "process.03.text": "The website is designed and built in parallel.",
  "process.04.title": "Review",
  "process.04.text": "You get a preview and up to 2 revision rounds.",
  "process.05.title": "Launch",
  "process.05.text": "Final payment, domain connection, and your website is ready for the world.",
  "process.01.headline": "Your business first. The website follows.",
  "process.02.headline": "One direction. Everything becomes clearer.",
  "process.03.headline": "From an idea to an experience.",
  "process.04.headline": "Small details. A big difference.",
  "process.05.headline": "Ready to be seen. Ready to connect.",
  "process.navigate": "Explore the project stages",
  "process.scroll": "Scroll through the process",
  "process.end": "Ready to start your story?",

  "industries.heading": "Built for ambitious Indonesian businesses.",
  "industry.property": "Property",
  "industry.food": "Food & Beverage",
  "industry.hospitality": "Hospitality",
  "industry.architecture": "Architecture",
  "industry.interior": "Interior",
  "industry.automotive": "Automotive",
  "industry.professional": "Professional Services",
  "industry.startups": "Startups",
  "industry.personal": "Personal Brands",

  "phil.eyebrow": "About the studio",
  "phil.l1": "Small studio.",
  "phil.l2": "Direct communication.",
  "phil.l3": "Better results.",
  "phil.p1":
    "You talk directly with the person designing and building your website. No account managers, no drawn-out process, no unnecessary agency layers.",
  "phil.p2":
    "Websiteku combines design, development, motion, and conversion thinking into one concise process.",
  "phil.cta": "Get to know Websiteku",

  "faq.heading": "Frequently asked questions.",
  "faq.1.q": "How long does a website take?",
  "faq.1.a":
    "Most Websiteku projects take around 7–14 days once all the main content is available. More complex projects can take longer.",
  "faq.2.q": "Are domain and hosting included?",
  "faq.2.a":
    "Websiteku can help set up your domain and hosting. Third-party provider fees are communicated transparently.",
  "faq.3.q": "Can I update the website myself?",
  "faq.3.a":
    "Yes. For projects that need regular updates, we can use a CMS so content can be changed without coding.",
  "faq.4.q": "How does payment work?",
  "faq.4.a": "50% deposit before the project starts, and 50% before the website goes live.",
  "faq.5.q": "How many revision rounds?",
  "faq.5.a":
    "Standard packages include two revision rounds. Major scope changes after design approval may incur additional costs.",
  "faq.6.q": "Does Websiteku only work with Indonesian clients?",
  "faq.6.a":
    "Websiteku's main focus is Indonesian businesses, but we can work on international projects.",

  "cred.1": "Custom design",
  "cred.2": "Mobile-first",
  "cred.3": "7–14 days",
  "cred.4": "2 revision rounds",
  "cred.5": "WhatsApp support",

  "final.eyebrow": "Start",
  "final.l1": "Your business is already great.",
  "final.l2": "Your website should be, too.",
  "final.cta": "Start Your Website",
  "final.copy":
    "Tell us about your business. We'll help you find the right website.",

  "footer.tagline": "Good websites for serious businesses.",
  "footer.explore": "Explore",
  "footer.connect": "Connect",
  "footer.made": "Made for businesses worth noticing.",
  "footer.signature": "Independent studio. Personal touch.",
  "footer.location": "Based in Indonesia",

  "about.title": "Good websites for serious businesses.",
  "about.desc":
    "Websiteku is an independent web studio for Indonesian businesses. Small, meticulous, and easy to talk to.",
  "about.eyebrow": "How we work",
  "about.01.title": "Direct access",
  "about.01.text":
    "You talk directly with the person designing and building your website.",
  "about.02.title": "Design-led",
  "about.02.text":
    "Every decision starts with visual and experiential quality, not a template.",
  "about.03.title": "Conversion thinking",
  "about.03.text":
    "Websites are built to help potential customers take the next step, not just to exist online.",
  "about.04.title": "Concise",
  "about.04.text":
    "No account managers, no drawn-out process, no unnecessary agency layers.",
  "about.p2note": "because quality doesn't have to be complicated.",

  "case.project": "Project",
  "case.industry": "Industry",
  "case.year": "Year",
  "case.services": "Services",
  "case.website": "Website",
  "case.overview": "Overview",
  "case.challenge": "Challenge",
  "case.solution": "Solution",
  "case.screens": "Concept gallery",
  "case.mobile": "Mobile view",
  "case.details": "Details",
  "case.result": "Concept direction",
  "case.next": "Next project",
  "case.unpublished": "Link not available yet",

  "contact.title": "Tell us about your project.",
  "contact.desc":
    "Tell us what your website needs, then send your brief through WhatsApp.",
  "contact.direct": "Direct contact",
  "contact.chat": "Chat now",
  "contact.next.title": "What happens after you submit",
  "contact.next.1": "1. We read your brief.",
  "contact.next.2": "2. We discuss your requirements through WhatsApp.",
  "contact.next.3": "3. A short chat to define scope & price.",
  "contact.subject": "New website project",
  "contact.whatsappMessage": "Hello Websiteku, I'd like to create a website for my business.",
  "contact.careMessage": "Hello Websiteku, I'd like to learn more about Website Care.",

  "form.name": "Name",
  "form.business": "Business name",
  "form.email": "Email",
  "form.whatsapp": "WhatsApp",
  "form.website": "Current Instagram / Website",
  "form.type": "Website type",
  "form.type.placeholder": "Select website type",
  "form.budget": "Budget",
  "form.timeline": "Timeline",
  "form.message": "Tell us about your business and the website you want",
  "form.message.placeholder":
    "Tell us about your business, your customers, and what you'd like to achieve with your website...",
  "form.submit": "Send Project Enquiry",
  "form.submitting": "Sending…",
  "form.success.title": "Thank you.",
  "form.success.text": "We'll get in touch via WhatsApp or email.",
  "form.err.name": "Name is required.",
  "form.err.email": "Email is required.",
  "form.err.emailFormat": "Email format is invalid.",
  "form.err.type": "Choose a website type.",
  "form.err.budget": "Choose a budget range.",
  "form.err.timeline": "Choose a timeline.",
  "form.err.message": "Tell us a bit about your business (min. 20 characters).",
  "form.err.whatsapp": "Enter a valid WhatsApp number, including your country code if outside Indonesia.",
  "form.err.send": "Your message hasn't been sent. Please try again or contact us on WhatsApp.",
  "form.err.unconfigured": "The form is not connected to the studio inbox yet. You can send this brief directly through WhatsApp.",
  "form.err.summary": "Please check the highlighted fields below.",
  "form.placeholder.name": "Your name",
  "form.placeholder.business": "Business or brand name",
  "form.placeholder.email": "you@example.com",
  "form.placeholder.website": "@yourbusiness or your website URL",
  "form.whatsappBrief": "Send brief via WhatsApp",
  "form.selectedPackage": "Selected package",
  "form.required": "Fields marked * are required.",
  "service.company-profile": "Company Profile",
  "service.property": "Property",
  "service.restaurant-cafe": "Restaurant & Café",
  "service.hospitality": "Hospitality",
  "service.landing-page": "Landing Page",
  "service.custom-website": "Custom Website",
  "service.portfolio": "Portfolio",
  "service.unsure": "Not sure yet",
  "budget.2-5": "Rp2–5 million",
  "budget.5-10": "Rp5–10 million",
  "budget.10-20": "Rp10–20 million",
  "budget.20-plus": "Rp20 million+",
  "timeline.asap": "ASAP",
  "timeline.w1": "1–2 weeks",
  "timeline.w2": "2–4 weeks",
  "timeline.m": "1–2 months",
  "timeline.flex": "Flexible",
  "preview.explore": "Explore",
  "preview.discover": "Discover more",
  "preview.perspective": "A NEW PERSPECTIVE",
  "notFound.heading": "This page doesn't have a website yet.",
  "notFound.copy": "The page may have moved, or there could be a typo in the address.",
  "seo.home.title": "Websiteku | Premium Websites for Indonesian Businesses",
  "seo.home.description": "Websiteku builds modern, fast, mobile-first websites for Indonesian businesses, designed to bring in more customer enquiries.",
  "seo.work.description": "Explore Websiteku projects and website concepts for property, food and beverage, and hospitality businesses.",
  "seo.services.description": "Company profiles, property websites, restaurant and hospitality websites, landing pages, and custom web development for Indonesian businesses.",
  "seo.pricing.description": "Transparent website pricing from Rp2.9 million. Choose Start, Business, or Premium, with 50% paid upfront and 50% before launch.",
  "seo.about.description": "Meet Websiteku, an independent web studio for Indonesian businesses. Talk directly to the person designing and building your website.",
  "seo.contact.description": "Tell us what your business website needs. Prepare a brief and contact Websiteku through WhatsApp.",
  "seo.visual.description": "Websiteku visual explorations: flowing ASCII animation and soft pastel colour.",
};

export type TranslationKey = keyof typeof id;
export const dictionaries: Record<Lang, Dict> = { id, en };

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id";
    try {
      return window.localStorage.getItem("wk-lang") === "en" ? "en" : "id";
    } catch {
      return "id";
    }
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("wk-lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === "wk-lang") setLangState(event.newValue === "en" ? "en" : "id");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "id" ? "id" : "en";
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key) => dictionaries[lang][key] ?? dictionaries.id[key] ?? key,
    }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
