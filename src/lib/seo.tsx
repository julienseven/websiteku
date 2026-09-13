import { useEffect } from "react";
import { site } from "./config";
import { useI18n } from "./i18n";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

/** Client-side metadata per route. */
export function Seo({ title, description, path = "/", noindex = false }: SeoProps) {
  const { lang } = useI18n();
  useEffect(() => {
    document.title = title;
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${site.url}${path}`);
    setMeta("property", "og:locale", lang === "id" ? "id_ID" : "en_GB");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${site.url}${path}`;
  }, [title, description, path, lang, noindex]);

  return null;
}
