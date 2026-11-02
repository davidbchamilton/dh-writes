# Phase 1 validation — 2 November 2026

## Hostinger deployment fix

The supplied GitHub deployment log showed Turbopack failing to connect to its
CSS helper process. Changed `npm run build` to use `next build --webpack`, as
required by Hostinger for Next.js 16.3.3 and newer. The webpack production build
passed locally, including TypeScript, static generation and build tracing, with
no warnings. Hostinger redeployment remains to be verified after this change
is pushed to GitHub. The original Turbopack results below are historical.

## Automated checks

- `npm run lint`: passed, no errors or warnings.
- `npm run typecheck`: passed (Next.js route type generation and TypeScript).
- `npm test`: all 5 tests passed. Covers local MDX compilation, draft exclusion,
  published-post ordering, invalid metadata, missing configuration, unsafe URL
  rejection and placeholder indexing behavior.
- `npm run build`: passed with Next.js 16.4.4 / React 19.3.1; 13 static outputs
  generated, no warnings in the final build. The journal dynamic route has no
  public slugs because the only MDX file is a draft.
- `node scripts/smoke.mjs`: passed against the production server. All 8 public
  pages returned 200 and included branded titles and semantic main landmarks.
  Placeholder pages remained `noindex`. Draft, unknown article and unknown page
  URLs returned 404. Sitemap, robots and the PNG Open Graph image returned 200.
  No fake forms or `href="#"` links were found.
- `npm audit --omit=dev`: zero vulnerabilities in production dependencies.
  Full audit reports 16 moderate findings in the development ESLint dependency
  tree, stemming from minimatch glob amplification. No forced downgrades or
  incompatible transitive overrides were applied. Recheck the lint toolchain
  when compatible upstream fixes are available.

The sandbox initially prevented Google Font fetching. Builds succeeded with
network access. A stale generated Turbopack cache caused one subsequent worker
failure; clearing only this project's `.next` directory resolved it. The journal
loader was adjusted to scope filesystem tracing to `content/journal`, eliminating
the initial broad tracing warnings.

## Browser checks

Inspected the actual production build in the in-app browser at:

| Viewport | Result |
| --- | --- |
| 375 × 812 | Single-column layout, original artwork visible without cropping, no horizontal overflow; mobile navigation opens and closes. |
| 768 × 1024 | Tablet split layout, readable copy and functioning menu/CTA; no horizontal overflow. |
| 1440 × 1000 | Asymmetric desktop layout; verified 1104px content grid, loaded fonts and optimized image; no horizontal overflow. |

Verified mobile menu Escape dismissal and focus return, navigation to the
newsletter page, its honest unavailable-subscription message, and real internal
destinations. Source review confirms skip link, reduced-motion styles and visible
keyboard focus. This is targeted QA, not a full accessibility certification or a
cross-browser audit.

The first desktop review caught a Tailwind `container` utility collision. Renamed
the shared wrapper to `site-container` and rechecked the corrected layout.

Review captures are saved locally and ignored by Git:

- `artifacts/homepage-hero.jpg`
- `artifacts/homepage-desktop.jpg` (complete desktop page)
- `artifacts/homepage-tablet.jpg`
- `artifacts/homepage-mobile.jpg`

## Intentional Phase 1 limits

Only the homepage is fully implemented. Remaining pages use the shared shell and
clear preparation messages. No real journal article, excerpt, contact form,
retailer integration or newsletter subscription form is published. Canonical
URLs and a nonempty sitemap require the real public origin; the external
newsletter link requires the confirmed Substack URL. Those live configurations
have not been supplied, so live subscription and production-domain behavior were
not end-to-end tested. The URL validation and indexing safeguards are unit-tested.

The approved design is preserved through typography, palette, composition,
artwork framing and editorial rhythm. Sections relying on fabricated Stitch copy
use factual text, a monogram, or an empty state, so the result intentionally differs
from the reference's fake reviews, portrait, excerpt and article cards.

The repository is initialized with Git; files remain uncommitted for review.
No deployment or remote repository was created.
