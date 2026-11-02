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
| `NEXT_PUBLIC_SUBSTACK_URL` | Confirmed HTTPS publication URL, including any custom publication domain. When unset, `/newsletter` explains that subscriptions are not yet available. When set, it displays a real external Substack link. |

Set these before building; rebuild after changing them. Never put secrets in
`NEXT_PUBLIC_*` variables. All Phase 1 placeholder pages remain `noindex` and
outside the sitemap even after an origin is configured. Only the complete
homepage appears in the configured sitemap. Review the privacy policy and
remaining content before a public launch.

Without a configured public origin, the generated social image uses a local
`http://localhost:3000` metadata base for preview only. This is not a production
domain or a canonical URL. Set the real origin before launch.

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

All pages are server components except the small navigation component, which
handles active links and the mobile disclosure. The menu supports keyboard
navigation, Escape with focus return, outside-click dismissal, and closing
after navigation. Shared CSS provides focus indicators, reduced-motion support,
and a skip link. The portrait artwork uses a static `next/image` import with
intrinsic dimensions, responsive sizes, blur placeholder and priority loading.

## Phase 1 routes

- `/`: fully implemented homepage.
- `/books`, `/books/bois`, `/about`, `/journal`, `/newsletter`, `/contact`,
  `/privacy`: intentionally minimal shared-layout placeholders.
- `/journal/[slug]`: route foundation only. Drafts and unknown slugs return 404;
  there are no public articles. The full article layout is reserved for Phase 2.
- `/robots.txt`, `/sitemap.xml`, `/opengraph-image`: generated SEO endpoints.

The Stitch reference's invented awards, reviews, author photo, biography,
publisher, agent, prices, release dates, retail actions, audio and excerpt have
been omitted. The excerpt band uses a short factual thematic note. Journal
previews use an honest empty state until approved entries exist. No contact or
subscription form claims to submit data.

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
# coverImage: "/images/approved-image.jpg" # optional
# canonical: "https://..."                # optional confirmed canonical URL
```

Required fields and dates are validated; filenames must match kebab-case slugs.
Keep content draft-only in Phase 1. In Phase 2, finish the index and article
layout, per-article metadata and sitemap inclusion before publishing an article.
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
