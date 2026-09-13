# Websiteku launch audit

Completed 13 September 2026 against the local production build. The approved cream, ink, terracotta, typography, editorial layout, and existing visual effects are retained. This is an audit and targeted repair of the existing site, not a replacement design.

## Customer journey and credibility

- The first screen states premium websites for Indonesian businesses, starting at Rp2,9jt, typical delivery of 7–14 days, and a project CTA. Checked at all seven requested widths.
- Navigation, pricing and service selections, case-study routes, legacy hash links, footer navigation, and the custom 404 work. Missing paths return HTTP 404 in the production preview.
- WhatsApp links use the owner-confirmed number `6289674395121`. Instagram uses `https://instagram.com/websiteku.studio`. Unconfigured business email links were removed.
- With no enquiry endpoint configured, the form validates and prepares a WhatsApp brief. The ready state explicitly says no message has been sent. The visitor reviews and sends the message in WhatsApp. No message was sent during testing.
- All three portfolio entries are labeled **Websiteku Concept**. No client relationship, testimonial, award, commercial result, or performance metric is invented. Unix Property appears first with actual screenshots and the verified public preview at `https://unix-property.vercel.app/`.
- Aluna's supplied preview required login during the audit, so its public CTA is omitted. Aluna and Villa Lontar imagery is labeled as visual reference, not screenshots of delivered client work. Confirmed client work remains unavailable and must only be added when approved.

## Targeted repairs

- Tightened the hero and responsive wrapping so its key offer is visible without scrolling at the tested heights. Fixed supporting-text contrast using the existing palette.
- Important headings, navigation, project images, and service content no longer depend on hidden entrance states. Static HTML is generated for each route, with a no-JavaScript navigation and WhatsApp fallback. FAQ disclosures use native HTML.
- Preserved reduced-motion behavior and the sequential process fallback. Three.js renderers load separately from the initial application. Existing canvas loops stop when offscreen or hidden.
- Self-hosted fonts and portfolio/reference images; added a branded social-sharing image. Removed the unused single-file bundling dependency.
- Preserved keyboard focus through route changes, mobile menu opening/closing, and form state changes. Mobile menu traps focus, supports Escape, restores focus, and closes on desktop resize.
- Floating WhatsApp is hidden below 640px so it cannot cover mobile text or FAQ controls. Inline WhatsApp links remain available. On larger screens, the float hides on the contact page and near the footer.
- Added per-route static metadata, canonical URLs, OpenGraph metadata, sitemap, robots.txt, and a noindex 404. Kept one H1 per page and corrected the portfolio heading hierarchy.

## Verification evidence

| Check | Result |
| --- | --- |
| Production build and TypeScript | Passed |
| End-to-end customer and failure-state tests | 17 passed |
| 11 routes × 360, 390, 430, 768, 1024, 1440, 1920px | 77 checks; no horizontal overflow or broken images |
| English layouts: 10 routes × 360, 768, 1440px | 30 checks; no horizontal overflow |
| axe WCAG A/AA checks on 8 representative pages | Zero reported violations |
| Browser runtime exceptions during audit | None captured |
| JavaScript disabled, JavaScript requests held pending | Important static content and a contact route remain visible |
| Missing animation/observer APIs | Important content remains visible; sequential process fallback works |
| Normal and reduced motion | All five desktop process stages verified; reduced-motion canvas stays unchanged |
| Visual review | Homepage inspected from hero through footer; responsive route screenshots and final mobile viewport checks inspected |

Mobile viewport height was 844px; tablet/desktop height was 900px. These are Chrome browser viewport tests on Windows, not physical-device or Safari tests. Automated accessibility scans do not establish complete WCAG conformance.

Artifacts are in `artifacts/audit/`, `artifacts/final/`, and `artifacts/test-results.json`. The complete suite passed 17 tests; the latest JSON contains the two passing contact/FAQ spot checks repeated after the final mobile float adjustment. A local, unthrottled homepage observation recorded CLS 0.0036 and LCP 2.496 seconds. These are diagnostic observations, not production Core Web Vitals or a mobile performance guarantee. The retained motion libraries still produce a Vite bundle-size warning; the initial application is about 170 kB gzipped and the separate Three.js chunk about 128 kB gzipped.

## Analytics

The following events are implemented and queue into `window.dataLayer`. A custom collector can be connected using `registerProvider` in `src/lib/analytics.ts`.

| Customer action | Event |
| --- | --- |
| Mulai Project and equivalent project CTAs | `project_start` |
| WhatsApp link click | `whatsapp_click` |
| Pricing package CTA | `pricing_cta` |
| Case-study page view | `project_view` |
| First contact-form edit | `contact_started` |
| Valid brief preparation or accepted endpoint response | `contact_submitted` |

WhatsApp brief preparation uses `method: whatsapp_brief` and `delivery: not_sent`; it must not be counted as delivered leads. The endpoint path uses `delivery: accepted`. Event tests verify counts and avoid duplicate case-study views when changing language. Personal brief contents are not sent as event properties.

**No analytics account/container or production collector is configured.** The event hooks exist, but remote event collection and reporting still require the owner's analytics configuration.

## Running and deploying

1. Install dependencies with `npm ci`.
2. Run `npm run build` to typecheck, compile, and generate route HTML.
3. Run `npm run preview` to inspect `http://127.0.0.1:4173` with real 404 responses.
4. Run `npm run test:e2e` for the customer-flow suite. The current test configuration uses installed Google Chrome. Run `npm run audit` while the preview is available for the full width/route audit.

Deploy the generated `dist` directory. The host must serve `/route/index.html` for clean URLs and return `404.html` with HTTP 404 for unknown paths. Do not configure an unconditional SPA fallback that returns HTTP 200 for every missing route. Canonicals and the sitemap currently use the existing `https://websiteku.id` configuration; verify that this is the final production domain and that HTTPS, redirects, and the host's 404 behavior match after deployment. No deployment was performed in this audit.

Leave `VITE_CONTACT_ENDPOINT` empty for the current WhatsApp flow. If direct delivery is added later, configure a real server-side receiver that validates input and returns HTTP 204 or JSON `{ "ok": true }` / `{ "success": true }` only after accepting the enquiry. The frontend rejects HTTP errors, timeouts, network errors, HTML fallbacks, and negative JSON responses. Do not put secrets in `VITE_` variables. Real backend delivery was simulated in tests; no backend is currently configured.

Remaining external launch checks: connect the chosen analytics collector, verify the deployed domain and routing, and check a physical Android/iPhone. Replace concept/reference material only when approved work or public previews become available.
