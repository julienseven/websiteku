# Motion and Responsive QA

## Implemented

- Work, Services, Pricing, About, and Contact headers use a shared, transparent ASCII-pixels background. The final Start section uses its dark variant.
- The effect generates moving luminance in a single shader pass instead of downloading and decoding a full-screen video.
- Pointer input updates uniforms, not React state. Touch input is not captured and never prevents scrolling.
- Backgrounds play automatically without on-page pause controls. Canvas work stops outside the viewport, in hidden browser tabs, and under reduced-motion preferences.
- ASCII render budgets are capped at 650,000 pixels on narrow screens and 1,650,000 on larger screens, with adaptive reduction for slow frame delivery. Device pixel ratio is capped at 2.
- Shaders, textures, geometry, frame loops, observers, and event handlers are disposed on unmount. A local SVG poster is used while loading or when WebGL is unavailable.
- Page headings and the final CTA are ordinary visible HTML. Shared reveals never use hidden or clipped initial states.
- Services use pointer-hover, focus, and click activation. Arrow keys, Home, and End navigate tabs. Stable panel geometry and opacity/transform transitions prevent layout jumps.
- The desktop tab rail becomes a two-column selector on phones and a three-column selector on tablets. Navigation collapses below 1024px. Pricing stacks below 1024px.
- Service CTA selections prefill the contact form and survive language changes.
- ID/EN covers navigation, page copy, service details, package contents, case-study narratives, form errors, metadata, and the footer. Form values use stable IDs rather than translated labels.
- Lenis 1.3.25 smooths desktop wheel scrolling on editorial pages without scroll snapping. Touch, reduced-motion, forms, and the contact page retain native scrolling. Route changes cancel inertia and reset scroll.
- The five-step process uses a pinned Sticky Scroll Story on sufficiently tall desktops. Mobile, short windows, and reduced-motion users get the full sequential story in normal document flow.
- The extended footer uses a pointer-responsive AnimatedGrid canvas behind a large, live-text Websiteku wordmark. The canvas uses the visibility-aware render loop and a bounded pixel count.
- The enquiry form no longer simulates delivery. Set `VITE_CONTACT_ENDPOINT` to an actual receiver for direct delivery. Without it, a translated message offers a WhatsApp brief handoff; no success is claimed.

## Verified in This Environment

The September 2026 launch audit used a production build and installed Google Chrome through Playwright. See [launch-audit.md](launch-audit.md) for the complete scope and remaining external configuration.

- TypeScript and the production build pass.
- 77 route/viewport combinations at 360, 390, 430, 768, 1024, 1440, and 1920px have no horizontal overflow or broken images. Thirty additional English combinations pass.
- All five desktop process stages and their navigation were exercised. Reduced-motion canvas screenshots remain unchanged.
- JavaScript-disabled pages, deliberately delayed JavaScript, and missing animation/observer APIs retain important visible content and navigation.
- Service keyboard selection, mobile menu focus/Escape/resize behavior, FAQ disclosures, footer navigation, and form states are covered in the 17 passing end-to-end tests.
- Eight representative pages report no axe WCAG A/AA violations. Homepage sections and responsive route screenshots were visually inspected.

## Physical Device Checks

Safari, physical phones, sustained frame rate, GPU power use, and production network performance have not been measured. Check these on the deployed site. Local browser results do not establish a sustained 60 fps claim or production Core Web Vitals.
