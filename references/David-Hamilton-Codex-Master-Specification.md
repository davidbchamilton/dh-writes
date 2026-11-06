# Codex Implementation Prompt — David Hamilton Author Website (V1)

You are a senior Next.js engineer and design-system implementer. Build a production-quality **David Hamilton author website** from an existing Google Stitch homepage export, using the author's original *Bois* illustration as the featured artwork.

## Inputs

The source repository or working directory will contain:
- A Stitch export ZIP named `stitch_david_hamilton_author_website.zip` with `code.html`, `screen.png`, and `DESIGN.md`.
- The author's illustration `Bois Cover Art Final.webp` (converted losslessly from the original JPEG).
- `david-hamilton-design-system-v1.md`, the complete design tokens, global components, page-by-page blueprints, correction list, and acceptance criteria.

**Read all these inputs first.** Treat the attached design system as the implementation specification, `screen.png` as visual reference, `DESIGN.md` as token/visual intent reference, and `code.html` as a non-production HTML reference. If an asset is missing, report it and use clearly identified local placeholder treatment rather than fabricating anything.

## Goal

Implement the approved V1 sitemap in a coherent extension of Stitch's **Nocturne Verdant** style:

- `/` — Home
- `/books` — Books listing
- `/books/bois` — Book detail
- `/about` — About
- `/journal` — MDX journal listing
- `/journal/[slug]` — MDX article detail
- `/newsletter` — Substack subscribe landing page
- `/contact` — Contact
- `/privacy` — Privacy

Primary nav: Home, Books, About, Journal, Contact. Persistent CTA: `Get Book Updates` pointing to `/newsletter`. Secondary newsletter links may appear throughout. The sitemap contains Newsletter, but it need not be duplicated in the primary nav because the CTA covers it.

## Stack

- Next.js App Router and React with TypeScript
- Tailwind CSS (locally built, not CDN)
- `next/font` with Newsreader and Plus Jakarta Sans
- Local MDX files for journal content and optional book copy
- `next/image` for source-controlled visual assets
- Next.js metadata/sitemap/robots features
- Substack newsletter integration using a real external subscription destination when provided; make missing config explicit and safe
- No database, headless WordPress, NestJS or independent API in V1

## Visual behavior

Match the *look and feel* of the Stitch homepage: deep verdant charcoal canvas, lantern amber CTAs, serif editorial headings, lavender metadata accents, fine borders, roomy 12-column desktop composition, asymmetric hero, low-key glow and dusk mood. Reuse a single token system and shared components for all pages. Prioritize excellent mobile hierarchy and readability over pixel-identical scaling.

Use the author's original image for *Bois*. Do not rely on remote `lh3.googleusercontent.com` links from Stitch. It may be the **artwork**, not a finished jacket with title typeset; do not create a fictitious cover variant.

## Accuracy constraints — non-negotiable

Google Stitch invented most of its book-facing content. *Bois* is **contemporary Trinidadian Caribbean YA fantasy**, with August, his brother Kwame, and folklore-inspired supernatural conflict. The demo's literary fiction synopsis about a Morne-Chanté hillside labourer is false. Never invent a publication date, publisher, rights agency, reviewer quotes, awards, ISBN, book price, audiobook, sales link, author photo, excerpt or fake contact address. Remove all fictional Stitch acclaim. When authentic copy is not provided, use small developer-facing TODO markers or safe generic text such as `Publication details coming soon`. Do not invent a full bio. Avoid major plot spoilers.

## Interaction constraints

- All internal navigation must work; no `href="#"` pretending to link to real routes.
- `Discover Bois` → `/books/bois`; `Get Book Updates` → `/newsletter`.
- Real Substack publication URL must be configurable, e.g. `NEXT_PUBLIC_SUBSTACK_URL`; if unset, disable external sign-up with informative text, rather than claiming success.
- Contact page must not present a functioning submission experience unless an actual delivery mechanism is configured. Prefer clear contact information placeholder until author supplies a destination.
- Journal uses local MDX and excludes `draft: true` from published routes, metadata and sitemap.

## Engineering requirements

1. Create reusable components: `SiteHeader`, `SiteFooter`, `PageHero`, `BookFeature`, `JournalCard`, `EditorialSection`, `NewsletterCTA`, `Breadcrumbs`, `QuotePanel`, `Buttons`, `TagChip`.
2. Extract shared tokens in theme/CSS, with semantic token names. Avoid duplicating long Tailwind utility sequences everywhere.
3. Preserve headings and content hierarchy; semantic HTML, ARIA when necessary, keyboard accessible nav, focus states, reduced motion.
4. Make article pages comfortable for long reading (narrow measure, high-contrast body, clear heading hierarchy, captions and links).
5. Provide root and page-specific metadata and correct canonical URLs based on environment-configured `NEXT_PUBLIC_SITE_URL`, plus `sitemap.ts` and `robots.ts`.
6. Avoid ungrounded SEO promises or dual-host identical article canonical assumptions. Primary complete posts should be MDX on site; newsletters can excerpt/link to originals.
7. Ensure static-friendly pages and avoid adding a backend unless necessary.
8. Document any manual configuration in a concise README (site URL, Substack URL, author copy/assets).
9. Test desktop and mobile, run build/lint/type checks and resolve issues.

## Suggested execution order

A. Review `DESIGN.md`, `code.html`, `screen.png`, source illustration and this design-system specification. Summarize design tokens, component map, and factual placeholders to remove.

B. Scaffold the Next.js TypeScript Tailwind project and implement global style tokens, fonts, header, footer and navigation.

C. Recreate homepage faithfully in design style with corrected narrative copy and source art; clearly mark or omit content awaiting author approval.

D. Build `/books`, `/books/bois`, `/about`, `/newsletter`, `/contact`, `/privacy`, extending shared visual components and not making each page feel like a separate theme.

E. Implement MDX journal listing and `[slug]` page, draft gating, metadata and sitemaps.

F. Complete responsive, accessibility, interaction and SEO QA. Document exact commands and results.

## Final deliverables

- Working Next.js app with every V1 route
- Design-system implementation aligned with Stitch
- Original book image integrated correctly
- MDX content infrastructure
- Functional navigation and honest subscription/contact treatment
- README, configuration notes, and list of information required from author
- Build/test results and brief summary of any remaining limitations

**Do not stop after building the homepage. The main requirement is to use the Stitch homepage's visual language to design and implement every V1 page consistently.**
