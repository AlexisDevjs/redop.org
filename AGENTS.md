# AGENTS.md

## Project

Static marketing site for REDOPS (video surveillance, network security, and construction/finishing services). Astro 7 + Tailwind CSS 4 with one React island for the gallery, no backend, no forms. All user-visible copy is Spanish (`<html lang="es">`); keep it Spanish.

## Commands

- Package manager: pnpm (Node >= 22.23.4).
- `pnpm dev --background` — start the dev server on :4321. Manage it with `pnpm astro dev status`, `pnpm astro dev logs`, `pnpm astro dev stop`.
- `pnpm build` — static build to `dist/`. No type checking is configured (`@astrojs/check` is not installed), so build success does not mean types are valid.
- `pnpm lint` / `pnpm lint:fix` — Biome, scoped to `src`, `astro.config.mjs`, and `package.json`. It also enforces formatting, so a clean run may require `pnpm lint:fix`.
- There is no test suite or CI. Verify with `pnpm lint` + `pnpm build` and a browser check.

## Architecture

- Two routes: `src/pages/index.astro` composes the landing page and `src/pages/galeria.astro` renders the full gallery. `src/layouts/Layout.astro` owns `<html>`, fonts, meta, favicon, and the inline theme bootstrap.
- Behavior lives in two places. `src/scripts/interactions.ts` (loaded by both pages) handles the theme, the mobile menu, and the contact dialog. The gallery is a React island in `src/components/gallery/`: `client:visible` for the home preview and `client:load` on `/galeria`.
- The vanilla script finds markup by ID: `#theme-toggle`, `#menu-toggle`, `#main-nav`, `#contact-open`, `#contact-dialog`, and `[data-close]`. If you rename or move that markup, update the script.
- Gallery images stay server-side until Astro resolves them: `src/lib/gallery-images.ts` calls `getImage()` and returns plain strings/numbers. Pass those props to React; never pass `ImageMetadata` across the island boundary. The lightbox is a native `<dialog>`, so keep the `html:has(dialog[open])` scroll lock in `global.css`.
- Theme: `data-theme` on `<html>` (`dark` by default, `light` opt-in), persisted as `redops-theme` in `localStorage`. The `dark:` variant is custom-mapped to `[data-theme="dark"]` in `global.css`, not the OS preference. Add new color tokens to both `:root` blocks and expose them through `@theme inline`.

## Styling

- Use the semantic Tailwind color utilities backed by tokens in `src/styles/global.css` (`bg-page`, `bg-surface`, `text-content`, `text-muted`, `border-outline`, `text-accent-red/green/purple`). Don't hardcode brand hex values in markup.
- Keep class names complete and static so Tailwind can detect them; never interpolate class strings.
- Use the `site-container` utility for page width and Tailwind's standard `md:` / `lg:` breakpoints for responsive behavior.
- `global.css` is intentionally small (~150 lines) after the Tailwind migration. Keep brand-specific gradients and graphics scoped in `BrandNetwork.astro` / `ServiceGraphic.astro`; read `docs/tailwind-migration.md` before adding global CSS.
- Biome formats with tabs and double quotes. Prefer canonical spacing values (e.g. `px-4.5`) over arbitrary ones (e.g. `px-[18px]`).

## Content and data

- `src/data/gallery.ts` lists the 20 published photos with titles, Spanish alt text, category, and `featured` flags. Don't invent project photos, testimonials, or statistics.
- Published photos live in `src/assets/images/gallery/` and are privacy-redacted derivatives. `scripts/redact-gallery.py` (Pillow) regenerates them from the untouched originals in `src/assets/images/`; re-check faces, client names, screens, and plates before adding a photo. Never bundle the originals.
- `/galeria` uses `?categoria=` and `?foto=` deep links. Keep those params in sync with `GalleryPage` when changing filter or lightbox behavior.
- `src/data/contact.ts` is provisional. Keep the placeholder WhatsApp display and only add a `https://wa.me/...` link once a real number is supplied (see `docs/content-notes.md`).
- Use `Icon.astro` (path map) for icons and `Button.astro` for links/buttons instead of ad hoc markup.
- Reference docs: `docs/design-direction.md` (visual system), `docs/content-notes.md` (client facts and pending items), `docs/tailwind-migration.md` (styling rules).

## Don't touch

- `dist/`, `.astro/` — generated.
- `.agents/`, `.local-tools/`, `.model-cache/`, `skills-lock.json` — local-only and gitignored. `.local-tools` is an unrelated Python transcription toolchain.
