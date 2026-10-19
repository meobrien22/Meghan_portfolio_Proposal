# Meghan Fasano — Proposal Portfolio

An independent copy of Meghan Fasano’s Peerless portfolio, prepared for GitHub Pages. The original Sites portfolio is maintained separately.

## Publish

In **Settings → Pages**, select **Deploy from a branch**, then **main** and **/docs**, and click **Save**.

Expected site address: https://meobrien22.github.io/Meghan_portfolio_Proposal/

The `docs/` directory contains the ready-to-publish website, including all slide images, PDFs, fonts and other assets. `.nojekyll` keeps Next.js assets available on GitHub Pages.

## Edit and rebuild

- Application pages and interactive components: `app/`
- Reusable UI components: `components/`
- Workshop content: `content/`
- Original slide catalogs, images and downloads: `public/`
- Repository path and static export settings: `next.config.ts`

Use Node.js 22.13 or newer and the pnpm version in `package.json`:

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

The build exports the site to `out/`, then refreshes `docs/`. Commit both edited source files and `docs/` to publish updates. The base path is `/Meghan_portfolio_Proposal`; local preview uses that same path.

## Content notes

All portfolio content and project disclosures are preserved from the copied source. Illustrative projects, generated workshop imagery and simulated data retain their existing labels. Interactive workshop and prototype state stays in the browser and resets on reload.

Copied from the portfolio source at commit `85baac8f3bc01c25703350468622bf28e9424186` on October 19, 2026.
