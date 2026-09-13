/**
 * Central configuration for Websiteku.
 * Edit these values to update WhatsApp, contact, and site details everywhere.
 */

export const site = {
  name: "Websiteku",
  tagline: "Website bagus untuk bisnis yang serius.",
  url: "https://websiteku.id",
  // Email is not available yet; the customer journey uses verified WhatsApp.
  email: "",
  instagram: "https://instagram.com/websiteku.studio",
  instagramHandle: "@websiteku.studio",

  /**
   * WhatsApp number in international format WITHOUT the leading "+".
   * Example: "6281234567890"
   */
  whatsappNumber: "6289674395121",

  location: "Indonesia",
  startPrice: "Rp2,9jt",
  timeline: "7–14 hari pengerjaan",
};

export const whatsappDefaultMessage =
  "Halo Websiteku, saya tertarik membuat website untuk bisnis saya.";

/** Build a wa.me link with a pre-filled message. */
export function waLink(message?: string): string {
  const text = encodeURIComponent(message ?? whatsappDefaultMessage);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

