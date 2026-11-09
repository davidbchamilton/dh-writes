# David Hamilton — Author Website

Phase 1: a complete homepage based on the approved Stitch **Nocturne Verdant**
design, with the original _Bois_ illustration and minimal shared-layout pages for
the remaining V1 routes. No deployment or Phase 2 content is included.

## Run locally

Use Node.js 22.13 or newer (Node 22 LTS recommended) and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env.local`. Open the local URL printed
by Next.js, normally `http://localhost:3000`. To choose port 3100 on PowerShell:

```powershell
node node_modules/next/dist/bin/next dev --port 3100
```

For a production preview:

```sh
npm run build
npm start
```

Production builds use `next build --webpack` for Hostinger compatibility.
Hostinger currently requires webpack for Next.js 16.3.3 and newer; its build
environment can fail when Turbopack starts its CSS helper process. Keep the
Hostinger build command as `npm run build`, output directory `.next`, framework
Next.js, and Node.js 22.x. See the
[Hostinger troubleshooting guide](https://www.hostinger.com/support/how-to-fix-next-js-16-turbopack-build-errors-on-hostinger/).

The initial build requires access to Google Fonts for `next/font/google` to fetch
Newsreader and Plus Jakarta Sans. Next.js serves the optimized fonts locally;
visitors do not fetch fonts from Google. Source font files are not distributed
in this repository. If a build is interrupted and Turbopack reports a CSS worker
failure, remove only this project's generated `.next` directory and retry.

## Configuration

| Variable                   | Behavior                                                                                                                                                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Real public site origin, including `https://`. No default production domain. When unset, pages are `noindex`, robots disallows crawling, canonical URLs are omitted, and the sitemap is empty.              |
| `NEXT_PUBLIC_SUBSTACK_URL` | Optional confirmed HTTPS Substack publication URL. Displays a secondary reading link when configured; Kit remains the primary signup. |

The primary newsletter signup is the live Kit form `1f64be7eb2`, embedded only
on `/newsletter`. All main Get Book Updates buttons lead there. The existing
`NEXT_PUBLIC_SUBSTACK_URL`, when configured, appears as a quieter secondary
Read David on Substack link. It is no longer required for subscriptions.
The form's wording, fields, confirmation message, and subscriber delivery remain
managed in Kit; changes there flow through the JavaScript embed. The site loads
the embed on newsletter-page visits, with a direct hosted-form fallback.

Set these before building; rebuild after changing them. Never put secrets in
`NEXT_PUBLIC_*` variables. All Phase 1 placeholder pages remain `noindex` and
outside the sitemap even after an origin is configured. Completed pages
(`/`, `/newsletter`, and `/privacy`) allow indexing and appear in the configured
sitemap. The journal index and published articles join the sitemap automatically;
an empty journal index stays excluded.
Without `NEXT_PUBLIC_SITE_URL`, every page remains `noindex` and the sitemap
stays empty. Rebuild after changing the production origin or indexing settings.

Without a configured public origin, the generated social image uses a local
`http://localhost:3000` metadata base for preview only. This is not a production
domain or a canonical URL. Set the real origin before launch.

## Google Analytics

GA4 property `G-0JBYL3J2YD` is configured in `src/lib/analytics.ts` and loaded
once by the root layout. It runs only on `davidhamiltonwrites.com` and
`www.davidhamiltonwrites.com`; localhost and preview hosts send no events.
No additional hosting environment variable is needed. Deploy a fresh build
to activate the integration on the live website.

The integration uses Google's automatic page views. In the GA4 web data stream,
keep Enhanced Measurement > Page views > Page changes based on browser history
events enabled so Next.js client navigation is counted. Do not add a second
Google tag or manual page-view tracker.

| Event | Meaning |
| --- | --- |
| `page_view` | Initial page load and client navigation (Enhanced Measurement). |
| `substack_subscribe_click` | Click on the external Substack subscribe link; not a confirmed subscription. |
| `newsletter_signup_click` | Click through to the Kit signup page or hosted form; not a confirmed subscription. |
| `contact_click` | Contact-page, social-profile, email, or telephone link click. `contact_method` distinguishes them. |
| `book_link_click` | Book-page or retailer link click. `link_type` distinguishes `book_page` and `retailer`; the Island Voices retailer link also sends `book_title`. |

The current checkout contains no contact form, so no submission event is sent.
When a real form is added, send the recommended `generate_lead` event only after
the server confirms successful submission. Never include form field values.
For future external book links, add `data-analytics="book"` and optionally
`data-book-title="Approved title"`. Substack custom domains must retain
`data-analytics="substack"`. Custom click parameters omit queries, fragments,
email addresses, phone numbers, and link text. Standard Google Analytics page
measurement still collects page URLs; do not put personal information in URLs.

After deployment, use Google Tag Assistant and GA4 Realtime to verify the tag,
navigate between pages, and click each action once. Confirm one page view per
navigation and the corresponding custom event. Optionally mark
`substack_subscribe_click` as a key event, recognizing that it measures clicks.
For breakdowns in reports, register event-scoped custom dimensions for
`contact_method`, `link_type`, and `book_title` in GA4. Property settings and live
event delivery cannot be verified from this source checkout alone.

References: [Google tag installation](https://developers.google.com/tag-platform/gtagjs),
[page-view measurement](https://developers.google.com/analytics/devguides/collection/ga4/views).

## Architecture

```text
src/app/                 App Router pages, root layout, metadata, robots, sitemap
src/components/          Shared UI and editorial components
src/lib/site.ts          Site identity, URL validation, metadata helper
src/lib/journal.ts       Local MDX discovery, validation, draft filtering
src/lib/mdx.tsx          Trusted local MDX compiler prepared for Phase 2
content/journal/         Author-controlled MDX; internal sample is draft-only
content/books/           Future approved book copy
public/images/           Original Bois illustration
references/              Original approved design inputs
tests/                   Content gating and configuration checks
scripts/smoke.mjs        Production route, metadata, draft and endpoint checks
```

`globals.css` contains the semantic design tokens and reusable component styles;
Tailwind v4 is compiled locally through PostCSS. The `@theme` block exposes
semantic tokens to Tailwind utilities. The content grid is capped at 1104px
inside the original 1200px layout footprint. Mobile, tablet, and desktop rules
retain the source's asymmetric hero, tonal section bands, editorial serif
headings, lavender metadata, fine borders, and amber controls.

Shared components include `SiteHeader`, `SiteNavigation`, `SiteFooter`, `Button`
(primary, secondary and text variants), `PageHero`, `SectionHeading`,
`BookFeature`, `ContentCard` / `JournalCard`, `NewsletterCTA`, `TagChip`, `MetaRow`,
`Breadcrumbs`, `EditorialSection`, `QuotePanel`, and `PlaceholderPage`.
`QuotePanel` is available but unused because no approved quotation was supplied.
The author panel uses a typographic monogram rather than an invented portrait.

### Image format rule

All website images and reference masters must use `.webp`, including the favicon
and social sharing image. See [AGENTS.md](AGENTS.md) for the maintained rule.
The lossless artwork master is `references/bois-artwork-master.webp`.
Run `npm run images:generate` to rebuild responsive hero images and
`npm run images:social` to regenerate the social sharing image. Generated images
belong in source control, so production builds do not need to run these commands.

All pages are server components except the small navigation component, which
handles active links and the mobile disclosure. The menu supports keyboard
navigation, Escape with focus return, outside-click dismissal, and closing
after navigation. Shared CSS provides focus indicators, reduced-motion support,
and a skip link. The portrait artwork uses pre-encoded responsive WebP assets,
content-hashed static imports, intrinsic dimensions, and a high-priority preload.
It does not require a runtime image optimizer or client image component.

## Phase 1 routes

- `/`: fully implemented homepage.
- `/newsletter`: live embedded Kit signup, with a direct hosted-form fallback.
- `/privacy`: privacy information, eligible for indexing with a configured origin.
- `/books`, `/books/bois`, `/about`, `/contact`: retain their existing
  preparation-stage indexing restrictions.
- `/journal`: published article listing with cover previews; indexable when it has articles.
- `/journal/[slug]`: full MDX article, author/date, uncropped cover, Markdown links,
  subscription CTA, and article sharing metadata. Drafts and unknown slugs return 404.
- `/robots.txt`, `/sitemap.xml`: generated SEO endpoints; `/opengraph-image.webp`:
  pre-generated social sharing image.

The Stitch reference's invented awards, reviews, author photo, biography,
publisher, agent, prices, release dates, retail actions, audio and excerpt have
been omitted. The excerpt band uses a short factual thematic note. Journal
previews use an honest empty state until approved entries exist. There is no
contact form. Newsletter subscriptions use the live Kit form.

## MDX preparation

`content/journal/internal-example.mdx` is explicitly internal and `draft: true`.
It is tested for MDX compilation and excluded from public discovery and routes.
Only trusted, source-controlled MDX may be passed to `compileLocalMdx`; MDX is
executable code. Do not use this helper for visitor input or remote content.

Frontmatter fields:

```yaml
title: "Author-approved title"
slug: "filename-without-extension"
description: "Author-approved description"
publishedAt: "2026-11-02" # quote dates; use the actual publication date
category: "Writing"
draft: true
# coverImage: "/images/approved-image.webp" # optional
# coverAlt: "Describe the image for readers who cannot see it" # optional
# canonical: "https://..."                # optional confirmed canonical URL
```

Required fields and dates are validated; filenames must match kebab-case slugs.
To publish, add a valid MDX file and any local WebP images, set `draft: false`,
run the checks and build, then commit/push and deploy the rebuilt site. Published
articles automatically appear in the journal, homepage previews, and configured
sitemap. Keep `draft: true` while preparing an article; it is excluded from
public routes, listings, and the sitemap. Changing an article requires a rebuild.
Cover paths must begin with `/images/` and end with `.webp`. The build validates
published cover files and reads their real dimensions to prevent layout shifts.
Cover images display uncropped on articles; card previews crop to 16:9.
The full original article belongs on this site; adapted newsletter versions can
link back from Substack.

## Validation

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

With a production server running on port 3100:

```sh
npm run test:smoke
# Or: node scripts/smoke.mjs http://localhost:3000
```

See [VALIDATION.md](VALIDATION.md) for the actual Phase 1 verification results.
Git has been initialized locally. No remote, commit, deployment or production
domain was created.

## Content needed from the author

- Approved short and full _Bois_ synopsis; optional authorized excerpt.
- Approved short/full biography and optional real author portrait with credits.
- Confirmed publication status/date and any authentic publisher, ISBN, retailer
  links, reviews or other book metadata when available.
- Substack publication URL and approved newsletter copy/frequency.
- Approved journal articles, dates, categories, sources and optional images.
- Contact destination and confirmed social/representation links, if desired.
- Public site origin, hosting choice, image credits and reviewed privacy copy
  based on the actual services used.

## Phase 2 recommendations

Review the homepage's visual accuracy and shared components first. Then extend
the approved layout to Books and Bois, add the approved biography, and build
the journal index/detail reading experience around local MDX. Wire the confirmed
Substack URL and contact details, complete the privacy page, and expand metadata
and the sitemap only as pages become ready. Confirm any excerpt, purchase links,
and book data before showing them. Phase 1 stops here.
