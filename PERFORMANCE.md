# Mobile performance review - November 6, 2026

The initial supplied report measured mobile performance at 79, LCP at 5.2s,
FCP at 0.8s, total blocking time at 90ms, speed index at 3.6s, and CLS at 0.
The follow-up screenshot flags legacy JavaScript, render-blocking requests,
forced reflow, and a network dependency tree, without expanded resource details.

## Current implementation

- All deployed images are WebP: seven responsive hero candidates, the favicon,
  and the social sharing card. Both tracked artwork masters in `references/`
  are lossless WebP conversions. The original ZIP and ignored reference/QA
  materials remain archival. `AGENTS.md` records this rule; asset tests enforce it.
- The hero uses pre-encoded, content-hashed static files with immutable caching.
  A matching high-priority responsive preload starts the request from the HTML.
  It no longer waits for the runtime image optimizer or hydrates a client image
  component. Dimensions and aspect ratio reserve the full layout space.
- `npm run images:generate` regenerates hero candidates directly from the
  lossless master. `npm run images:social` regenerates the sharing card.
  Keep these outputs in source control; they do not need regeneration on deployment.
- Tailwind scans application source and MDX content, excluding incidental
  utility names in documentation and design references.
- Shared navigation, footer links, and buttons do not automatically prefetch
  routes. Navigation remains available on click.
- Mobile headers use an opaque background without backdrop blur to reduce
  scrolling paint work. No application layout-reading loop was found; this
  paint change is not evidence that the forced-reflow audit is resolved.
- GA configuration and events remain queued immediately; the external tag waits
  for page load and idle time, with tracked clicks triggering immediate loading.

## Measured local results

Compared with the previous local performance commit:

| Resource | Previous build | Current build |
| --- | ---: | ---: |
| Homepage script files | 9 | 8 |
| Homepage JavaScript (uncompressed) | 589,771 bytes | 577,036 bytes |
| Homepage JavaScript (local gzip estimate) | 184,298 bytes | 178,867 bytes |
| Shared CSS (uncompressed) | 25,746 bytes | 23,948 bytes |
| 828px hero WebP | 52,064 bytes | 42,892 bytes |

The 828px image is a further 18% smaller than the previous change, and 32%
smaller than the original quality-75 result of 62,752 bytes. The smallest 360px
candidate is 9,682 bytes. Gzip sizes are local estimates, not observed CDN bytes.

## Verification

- Production webpack build passed, including TypeScript and static rendering.
- All 15 tests and the standalone type check passed.
- Production smoke checks passed for all public routes, draft exclusion, SEO
  endpoints, WebP social metadata on every page, the favicon, hero candidates,
  image preload, and immutable image caching.
- Mobile browser check at 390px: direct static WebP loaded, no overflow,
  mobile menu and Escape dismissal work, header backdrop filter is disabled.
- Desktop browser check at 1440px: expected 412px artwork width, no overflow.
- Review capture: `artifacts/webp-mobile-after.webp` (ignored by Git).

## Remaining measurement

Changes are local and have not been deployed to Hostinger. Re-run mobile
PageSpeed on the deployed build to measure LCP and the overall score.

The shared stylesheet remains render-blocking. Next.js runtime compatibility
code remains, so legacy/unused-JavaScript findings may persist. Framework
polyfills were not manually removed. CSS inlining remains disabled because the
available Next.js option is experimental and not recommended for production.
Expanded audits or a fresh performance trace are needed to attribute the
remaining forced reflow and dependency-tree findings to particular resources.

Implementation references:

- https://react.dev/reference/react-dom/preload
- https://tailwindcss.com/docs/detecting-classes-in-source-files
- https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss
