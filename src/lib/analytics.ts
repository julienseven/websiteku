/**
 * Lightweight analytics abstraction.
 * Plug in a provider (GA4, Plausible, Fathom, PostHog…) without touching
 * the rest of the codebase.
 */

export type AnalyticsEvent =
  | "project_start"
  | "whatsapp_click"
  | "contact_started"
  | "contact_submitted"
  | "pricing_cta"
  | "project_view"
  | "email_click";

type Provider = (event: AnalyticsEvent, props?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const gtmProvider: Provider = (event, props) => {
  (window.dataLayer ??= []).push({ ...props, event });
};

let providers: Provider[] = [gtmProvider];

export function registerProvider(provider: Provider) {
  providers.push(provider);
}

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  for (const p of providers) {
    try {
      p(event, props);
    } catch {
      /* ignore provider errors in production */
    }
  }
}
