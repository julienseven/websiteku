import type { Project } from "./projects";

type ProjectCopy = Pick<Project, "category" | "industry" | "description" | "overview" | "challenge" | "solution" | "result" | "services" | "details"> & { galleryAlts: string[] };

export const englishProjects: Record<string, ProjectCopy> = {
  "unix-property": {
    category: "Property / Website Design & Development",
    industry: "Property",
    description: "A property website that turns a listing catalogue into a more premium, intuitive browsing experience.",
    services: ["Art Direction", "Web Design", "Development", "CMS", "Motion"],
    overview: "An independent property website exploration, not an official client commission. This concept explores a clear and approachable property catalogue.",
    challenge: "A busy property catalogue can feel like a spreadsheet. The challenge was to keep prices, locations, and specifications clear without losing the sense of quality behind the brand.",
    solution: "Large imagery, lightweight filters, and subtle motion shape the catalogue. Each listing brings three things to the foreground: clear photos, the price, and an easy-to-reach WhatsApp button.",
    result: "An experience as calm as a property showroom. Every page guides visitors toward a clear next step: contact an agent and arrange a viewing.",
    details: [
      { label: "Project", value: "Company profile & property catalogue" },
      { label: "Industry", value: "Property" },
      { label: "Year", value: "2025" },
      { label: "Services", value: "Web design, development, CMS" },
      { label: "Focus", value: "Listings, WhatsApp enquiries, mobile-first" },
    ],
    galleryAlts: ["Unix Property concept on desktop", "Property catalogue in the Unix Property concept", "Unix Property concept on mobile"],
  },
  "aluna-bake-brew": {
    category: "Food & Beverage / Brand Website",
    industry: "Food & Beverage",
    description: "A digital experience that brings the character of a cafe online through imagery, menus, and motion.",
    services: ["Brand Website", "Web Design", "Motion", "Development"],
    overview: "An independent cafe website exploration, not an official client commission. This concept brings visual character, menus, and visitor information together.",
    challenge: "Most visitors arrive from Instagram looking for three things: the location, opening hours, and the menu. If these are hard to find on a phone, they will look elsewhere.",
    solution: "A visual story connects the opening impression, the cafe's story, the menu, and reservations. Large photographs and gentle motion set the mood, while practical information stays one tap away.",
    result: "A consistent experience between Instagram and the website. The cafe's character carries through, and customers can easily find the information they need.",
    details: [
      { label: "Project", value: "Cafe brand website" },
      { label: "Industry", value: "Food & Beverage" },
      { label: "Year", value: "2025" },
      { label: "Services", value: "Web design, motion, development" },
      { label: "Focus", value: "Menu, location, reservations, social media" },
    ],
    galleryAlts: ["Warm cafe interior with wooden furniture", "Coffee counter with an espresso machine", "Cafe interior in afternoon light", "Coffee brewing equipment on the counter"],
  },
  "villa-lontar": {
    category: "Hospitality / Websiteku Concept",
    industry: "Hospitality",
    description: "A hospitality website concept that brings galleries, guest experiences, and booking into one calm journey.",
    services: ["Art Direction", "Web Design", "Development", "Motion"],
    overview: "A concept study for hospitality. We explored how a villa could feel premium on screen, from the opening view to the booking button, without relying on a familiar template.",
    challenge: "Villa websites often fall into one of two extremes: too plain or too busy. Visitors need to get a feel for the place while finding rates and a way to book without friction.",
    solution: "Cinematic imagery and generous typography set the atmosphere. Availability information and booking actions appear consistently throughout the experience.",
    result: "A design direction ready to be developed into a live website. It balances a premium atmosphere with a clear path to booking.",
    details: [
      { label: "Project", value: "Villa website concept" },
      { label: "Industry", value: "Hospitality" },
      { label: "Year", value: "2026" },
      { label: "Services", value: "Art direction, web design, motion" },
      { label: "Focus", value: "Gallery, experiences, booking" },
    ],
    galleryAlts: ["Villa with an infinity pool at sunset", "Resort pool overlooking the mountains", "Quiet villa terrace and garden", "Swimming pool in a villa garden"],
  },
};