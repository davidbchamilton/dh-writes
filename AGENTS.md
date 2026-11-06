# Website asset and performance rules

- Use `.webp` for all new or modified website images, including artwork,
  favicons, social sharing images, and reference image masters. Convert images
  before adding them; do not introduce JPEG, PNG, GIF, or SVG image files.
- Preserve artwork masters as lossless WebP in `references/`. Generate deployed
  derivatives from those masters, rather than recompressing smaller derivatives.
- For the hero, run `npm run images:generate` after changing its master. Keep
  responsive candidates, intrinsic dimensions, accurate `sizes`, and one matching
  high-priority responsive preload. Serve these pre-encoded assets directly.
- Run `npm run images:social` after editing the social image generator. Keep
  its shared alt text in `src/lib/site.ts` accurate.
- Keep images out of the critical JavaScript path. Avoid automatic route
  prefetches from shared navigation and retain deferred analytics loading.
- Historical files inside the original ZIP archive, its ignored `references/stitch/`
  extraction, and ignored QA screenshots
  are archival material, not website assets. Do not rewrite archives to satisfy
  the website format rule.
- Validate with `npm test`, `npm run typecheck`, `npm run build`, and the
  production smoke checks. Report measured savings separately from Lighthouse
  scores; do not claim that a collapsed audit is fixed without a fresh trace.
