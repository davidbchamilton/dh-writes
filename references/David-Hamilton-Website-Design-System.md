# David Hamilton — Author Website
## V1 Design System & Page Blueprints

**Status:** Implementation specification based on the user's approved V1 sitemap and Google Stitch homepage export.

**Reference assets supplied:**
- `stitch_david_hamilton_author_website.zip`: `code.html`, `screen.png`, `DESIGN.md` (one homepage mockup)
- `Bois Cover Art Final.webp`: lossless WebP conversion of the original illustration for *Bois*, 2400 × 3600 pixels

**Design source of truth:** Preserve the visual intent of Stitch's **Nocturne Verdant** design. Reuse its style language across pages; do not carry its invented copy into production.

## 1. Brand and positioning

- Site: **David Hamilton — Author** (long-term author identity, not limited to YA fantasy).
- Featured work: **Bois**, contemporary Caribbean young adult fantasy inspired by Trinidad and Tobago's supernatural folklore.
- Core reader journey: discover the author/book → learn about *Bois* → read an excerpt or folklore article → subscribe for updates → purchase when links exist.
- Mood: nocturnal forest, warm light in darkness, editorial prestige, quietly supernatural, distinctly Caribbean but not a generic tropical travel aesthetic.
- No fake availability, publication dates, awards, endorsements, ISBNs, agents, publication houses, prices or biographies.

## 2. Design tokens

The ZIP exposes Stitch's tokens in `DESIGN.md` and `code.html`. Align production tokens to the values below. Some of Stitch's descriptive prose suggests subtly different shades; prioritize its executable HTML/Tailwind configuration for strict homepage parity.

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#101412` | Global page background |
| `--surface-lowest` | `#0A0F0C` | Dark ribbon sections, footer |
| `--surface-low` | `#181D1A` | Secondary surfaces |
| `--surface` | `#1C211E` | Cards and editorial panels |
| `--surface-high` | `#262B28` | Elevated cards and input treatments |
| `--surface-highest` | `#313632` | Hover or strong surface definition |
| `--text` | `#DFE4DE` | Main text |
| `--text-soft` | `#D7C3AE` | Descriptions/secondary copy from Stitch |
| `--text-muted` | `#9F8E7A` | Metadata, labels; audit contrast at small sizes |
| `--amber` | `#E89A1B` | CTA fill / actionable highlights |
| `--amber-light` | `#FFB959` | Selected emphasis, focus and hovers |
| `--lavender` | `#846A92` | Restrained decorative/literary accents (derived from descriptive Stitch notes) |
| `--lavender-light` | `#DABCE8` | Accessible text on darker surfaces |
| `--forest` | `#3A4F36` | Restrained atmospheric illustration backgrounds |
| `--hairline` | `rgba(237,232,222,0.08)` | Dividers and card outlines |

**Fonts:** Newsreader (headlines, display text, italics, excerpts, pull quotes); Plus Jakarta Sans (body, controls, navigation, labels). Load via `next/font/google` if available in the target environment. Do not distribute font files.

**Typography:**
- Display XL: Newsreader 56/64 desktop, 38/44 mobile, normal weight.
- H1 / page title: Newsreader 40/48 desktop, 30/36 mobile.
- H2: Newsreader 28/34.
- Card or article subheading: Newsreader 22/28.
- Body large: Plus Jakarta Sans 18/28.
- Body: Plus Jakarta Sans 16/24, long-form articles may be 17–18px with line height 1.75.
- Metadata: Plus Jakarta Sans 11–13px, 600 weight, 0.06–0.08em tracking, uppercase where appropriate. Avoid tiny unreadable text.

**Grid:** max content width ~1200px; desktop 12 columns, tablet 8, mobile single-column composition. Use asymmetrical 5/7 column split for featured book layouts. Gutter around 24px desktop, 16px mobile. Page-section padding roughly 64–96px desktop, 40–64px mobile. Avoid compressed text on narrow displays.

**Shape and effects:** sharp editorial book-cover corners; 4–8px radii for controls and cards; restrained warm halo on key actions, `0 8px 32px -4px rgba(232,154,27,.12)`; faint borders instead of heavy shadows. Gentle transitions 150–250ms with reduced-motion support. Do not add animation as decoration on every section.

**Imagery:** Original *Bois* artwork is the principal visual hero and should remain uncropped where a book-cover portrait is shown; contain rather than cover. Use atmospheric cropped detail/gradient only where appropriate, without losing the protagonist. Do not generate a fake dust jacket or add invented title/subtitle to the image. Decorative background images require clear rights. Require a real author photograph before displaying any photograph as David Hamilton.

## 3. Global layout components

1. `SiteHeader`: name wordmark, compact tagline `Author & Novelist`, primary links Home, Books, About, Journal, Contact; high-contrast CTA `Get Book Updates` linking to `/newsletter`. Active route marked; mobile menu accessible to keyboard and screen readers. Stitch's `Order Bois` button must NOT appear until a real purchase URL exists.
2. `SiteFooter`: author brand, concise optional bio line, sitemap links, newsletter CTA, social links only once confirmed, copyright year dynamic, privacy link. No fictional agency or film-rights representatives.
3. `PageHero`: small uppercase overline, Newsreader H1, concise supporting intro, optional right-aligned art/quote.
4. `EditorialSection`: contrasting tonal band with large serif heading, optional eyebrow label, section body.
5. `BookFeature`: two-column visual + copy layout, genre label, synopsis, buttons for `Explore Bois` or `Read an Excerpt` (only if excerpt supplied).
6. `JournalCard`: image (optional), category, publication date, title, two-line description, text link. Keep title prominent, minimal decorative icons.
7. `QuotePanel`: serif italic editorial excerpt with hairline/lavender rule, source attribution only when real.
8. `NewsletterCTA`: Lantern Ochre CTA and concise promise, linking to known Substack address; embedded form only after an actually supported integration is configured. No pretend success state.
9. `Breadcrumbs`: used on book and journal detail pages.
10. `MetaRow`, `TagChip`, `Divider`, `PrimaryButton`, `SecondaryButton`, `TextLink`, `EmptyState`.

**Visual rhythm:** alternate `#101412` base and subtle `#0A0F0C` / `#1C211E` sections. Editorial typography is the primary ornament. Use glow only sparingly.

## 4. Approved sitemap and page-by-page visual blueprints

### `/` — Home
**Relationship to Stitch:** The supplied `screen.png` is the homepage visual reference, not a factual copy reference.

1. Header + editorial hero: illustration prominent, `BOIS`, accurate pre-release category *Caribbean YA Fantasy*, short intrigue-driven synopsis; primary CTA `Discover Bois`, secondary `Get Book Updates`.
2. Featured novel module: story premise and setting; avoid spoilers.
3. About David: small author bio or text-led feature; photo only if provided. Link to `/about`.
4. Opening excerpt panel: optional; if no authorized final excerpt, show an editorial thematic note instead.
5. Journal / folklore: three article cards if published; graceful empty state if not.
6. Newsletter banner and footer.

**Do NOT reproduce:** fake award ribbon, Guardian/Paris Review quotes, fabricated release year or order price, publisher/agent, invented audio excerpt, 342-page figure.

### `/books` — Books index
- Large `Books` page hero and one featured-book editorial block.
- `Bois` image with label `Upcoming novel` until release is verified; genre, one-sentence premise, `Explore the Book` CTA.
- Grid-ready architecture for future books; no invented second titles or empty fake cards.
- Low-contrast atmospheric forest illustration or gradient; moderate image use.
- Small signup ribbon at bottom.

### `/books/bois` — Book detail
- Breadcrumb `Books / Bois`.
- 5/7 split with full artwork (do not crop protagonist or the hillside composition), headline `BOIS`, `Caribbean Young Adult Fantasy`, refined synopsis, launch status (no fabricated date), CTA `Get Launch Updates`.
- Section `The Story`: protagonist August, his brother Kwame, contemporary Trinidad, supernatural folklore; avoid ending/climax spoilers.
- Section `Inside the World`: links to actual journal pieces about soucouyants, Papa Bois and other lore only when published.
- Optional `Read an Excerpt` (final approved sample only); optional reviews/retailers/ISBN/audio only when authentic and available.
- Repeated newsletter CTA near footer.

### `/about` — About David Hamilton
- Literary editorial header `About David Hamilton` with warm serif lead.
- Bio text in a readable 65–75-character column; actual biography to be supplied, do not infer personal career milestones.
- Optional image column reserved for a real author portrait. Until then use typography or subtle illustration texture.
- Sections `Why I Write` and `Stories & Influences` with emphasis on Caribbean roots/folklore without trapping the entire brand in one genre.
- CTA links to books and contact.

### `/journal` — Journal index
- Heading `Journal` / optional `Essays & Field Notes` visual subtitle.
- Featured article hero, followed by 2- or 3-column `JournalCard` grid.
- Topic filter chips (Folklore, Writing, News) only when meaningful; never create dead filters.
- Dates and metadata, no fabricated articles. Use MDX content under `/content/journal`.
- Journal should retain the site palette while improving reading clarity and text contrast.
- CTA to Substack newsletter after article list.

### `/journal/[slug]` — Article detail
- Narrow text layout max 720–760px, centred on dark editorial canvas.
- Breadcrumb, eyebrow topic, title in Newsreader, dek, date and author, optional hero image.
- MDX-provided `h2/h3`, linked references, blockquotes, images/captions, accessible callouts.
- Floating sidebar or in-page table of contents only if article length justifies it; mobile remains single column.
- End card: `Discover Bois` and a newsletter invitation; related articles if real.
- SEO: per-article title/description/canonical, Open Graph tags, `Article`/`BlogPosting` structured data where appropriate, index only published posts.

### `/newsletter` — Newsletter
- Warm atmospheric hero with `Stories from the Caribbean. Legends from Beyond.` or copy approved later.
- Short explanation of frequency/content: book updates, folklore essays, behind-the-scenes development; do not promise exclusive content unless planned.
- Primary CTA `Subscribe on Substack`, linking to actual publication URL when supplied.
- Optional preview of recent letters, if supplied; clear acknowledgement that subscriptions are managed by Substack.
- Avoid a faux locally handled subscription form.

### `/contact` — Contact
- Concise editorial hero `Get in Touch`.
- Distinct contact purposes as text: readers, press, booksellers, events. Do not invent addresses.
- Safe implementation options: real contact email when supplied, or functional validated server-side contact route with spam prevention and email service (not a pretend frontend-only form).
- Social links only when confirmed; friendly, not corporate.

### `/privacy` — Privacy policy
- Calm and readable editorial document layout, constrained text column.
- Real policy text based on actual analytics, contact form, Substack and hosting setup; mark draft sections as needing review rather than inventing compliance claims.
- Last-updated date based on actual publication date.

## 5. Content boundaries / correction of Stitch placeholders

**Do not publish any of these copied from generated mockup:** fictitious publishers `Faber & Faber`, `Farrar, Straus and Giroux`, `Fitzcarraldo Editions`; literary agency `Curtis Brown`; invented prize nomination, Guardian/Paris Review acclaim, reviewer names, author photograph, audio narrator, sample quote/excerpt, retailer pricing, 2024 release timeline, 342-page length, fake book ISBN, bookshop URLs, and the invented hillside-labourer plot or setting in `Morne-Chanté`.

**Grounded description for development:** *Bois* is a contemporary Caribbean YA fantasy set in Trinidad, involving August and Kwame and supernatural elements inspired by local folklore. Keep broader plot text intentionally concise until the author provides approved copy. Feature the supplied original illustration, not Stitch's hosted image URLs.

## 6. Technical build notes

- Next.js App Router, TypeScript, Tailwind CSS, MDX; avoid separate Node.js API unless a concrete feature requires it.
- Project pages: `/`, `/books`, `/books/bois`, `/about`, `/journal`, `/journal/[slug]`, `/newsletter`, `/contact`, `/privacy`.
- No extra category index routes in V1; categories may be local UI filters in journal when enough content exists.
- MDX content resides in repository; use frontmatter schema: `title`, `slug`, `description`, `publishedAt`, `category`, `coverImage` (optional), `draft`, `canonical` (optional).
- Build local MDX loader with type validation; static route generation from published slugs and draft exclusion.
- Use Next.js Metadata API, `sitemap.ts`, `robots.ts`, Open Graph metadata and generated article routes.
- SEO should prioritize site's own original articles. Substack newsletter should send adapted excerpts with links to the canonical site article rather than full identical reposts when possible.
- Email subscriptions delegated to Substack. Request the actual URL before wiring final actions.
- Internal links use real route destinations, no `href="#"` placeholders pretending to work.
- Use local public assets, `next/image`, meaningful alt text; do not depend on Google-hosted Stitch image URLs.
- Accessibility: semantic landmarks, visible focus, navigation via keyboard, target 44px tap controls, enough contrast, reduced-motion support, real form validation, no invisible scrollbar blanket rule.
- No fabricated business, rights, agent or publication facts.

## 7. Acceptance criteria

1. Home resembles the Stitch screenshot in layout feel, typography, colour and surface hierarchy, with factual copy corrected.
2. All approved V1 routes render without errors and have consistent header/footer/components.
3. *Bois* original artwork is used consistently at appropriate aspect ratio.
4. Site is responsive at 375px, 768px and 1440px, without overflow.
5. Journal index and sample article load from real local MDX; sample must be visibly marked draft or internal-only until approved.
6. Buttons have functional targets; unavailable external CTAs use non-deceptive placeholders or are omitted.
7. No invented awards, book data, author photo, biography, endorsements, pricing, publication date or contact information.
8. Per-page metadata, XML sitemap and robots generation included; only published pages appear in sitemap.
9. Build, lint and type-check pass, and key navigation and content views are tested.
10. Replace Stitch's CDN Tailwind script / direct HTML with production Next.js components and local Tailwind build.
