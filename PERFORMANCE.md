# Mobile performance review - November 6, 2026

The supplied PageSpeed report measured mobile performance at 79, LCP at 5.2s,
FCP at 0.8s, total blocking time at 90ms, speed index at 3.6s, and CLS at 0.
Its audit details were collapsed, so it does not identify the individual
resources responsible for the unused-JavaScript and dependency-tree findings.

## Changes

- The hero image is eager with explicit high fetch priority. React emits its
  responsive preload into the server-rendered document. Intrinsic dimensions
  and the blur placeholder remain in place.
- Responsive sizes now account for the image frame, mobile width cap, and grid
  breakpoints. Added 360px, 480px, and 960px image candidates to reduce oversizing.
- Hero quality is 65, with both 65 and the existing default 75 allowed by the
  Next.js image endpoint. The original illustration is unchanged.
- GA configuration and events are queued immediately, while the external tag
  downloads after page load during browser idle time (with a 2s idle timeout).
  Tracked clicks trigger immediate loading. Preview-host exclusions, automatic
  page views, and event filtering remain intact. Cleanup cancels pending work.

## Verification

- Production build passed with webpack and all 13 static outputs generated.
- Type checking and all 13 tests passed, including four new analytics effect
  tests for delayed loading, early clicks, browser fallback, and cleanup.
- Production route, metadata, draft exclusion, and SEO endpoint smoke checks passed.
- The actual image endpoint returned WebP at 828px: 62,752 bytes at quality 75
  versus 52,064 bytes at quality 65 (17% smaller).
- Browser preview at 390px: image loaded with eager/high priority, no horizontal
  overflow, menu opens and Escape closes it. Desktop at 1440px: no overflow and
  the artwork retains its expected width. Mobile capture:
  `artifacts/pagespeed-mobile-after.png` (ignored by Git).

## Remaining measurement

These changes are local and have not been deployed to Hostinger. Re-run mobile
PageSpeed on the deployed build to measure LCP and the overall score; local
image transfer savings are not a measured PageSpeed score improvement.

The shared stylesheet and Next.js runtime remain. Their render-blocking and
legacy/unused-JavaScript notices may persist. CSS inlining is experimental and
not recommended for production by Next.js, so it was not enabled solely to
remove the stylesheet warning. No custom framework-polyfill removal was added.

Implementation reference: https://nextjs.org/docs/app/api-reference/components/image
CSS trade-offs: https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss
