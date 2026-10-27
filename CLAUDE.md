# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing site for Maderolux, a home-visit maderoterapia / body-aesthetics service in Madrid run by Lucía Sánchez. It is also the owner's learning project, so explain the _why_ of non-obvious decisions when making changes. Sibling project with the same architecture: `../alejo-viera-decor`.

**Read [PLAN.md](PLAN.md) before structural or design changes** — it's the living spec (phases, pages, pending decisions). Tick its checklist when you finish a listed task. Visual reference: `docs/referencia/mockup-home.jpg`.

## Commands

- `pnpm dev` — dev server (Turbopack; regenerates the AGENTS.md block)
- `pnpm build` / `pnpm start` — production build / serve it
- `pnpm lint` — ESLint (flat config: next core-web-vitals + typescript + `eslint-config-prettier`)
- `pnpm test` / `pnpm test:watch` / `pnpm test:coverage`
- `npx shadcn@latest add <component>` — adds a shadcn/ui component into `src/components/ui/` (downloads code: ask first)

No `format` script on purpose: `.claude/settings.json` registers a `PostToolUse` hook on `Write|Edit` that runs `.claude/hooks/format-file.mjs` (`prettier --write` with `prettier-plugin-tailwindcss`, then `eslint --fix`). Don't hand-sort Tailwind classes.

## Testing

Vitest 4 + React Testing Library + jsdom. jsdom 30 needs Node ≥ 22.22.2 / 24.15; on older Node the whole suite fails to start, but the `src/lib` tests don't need a DOM and run with `pnpm exec vitest run src/lib --environment node`. Tests are colocated (`footer.tsx` → `footer.test.tsx`). Coverage threshold is **100%** over `src/components/**` and `src/lib/**`, excluding `src/components/ui/**` (shadcn-generated); `src/app/**` is out of scope. A new file in scope without a colocated test is incomplete work. Query by role/accessible name, never by Tailwind class. `next/navigation` needs `vi.mock`; `next/link` and `next/image` work unmocked. Async Server Components can't be unit-tested with Vitest.

## Architecture

**Stack**: Next.js 16.3 (App Router, Turbopack), React 19.2 with React Compiler (`reactCompiler: true`), TypeScript, Tailwind CSS v4 (theme only in `src/app/globals.css`, no `tailwind.config.js`), shadcn/ui on Base UI (style `base-nova`), pnpm. **This is not the Next.js in your training data** — check `node_modules/next/dist/docs/` before touching routing, data, caching or metadata APIs.

**Single sources of truth** (`src/lib/`) — never inline these values elsewhere:

- `data/contacto.ts` — `CONTACTO` + derived `WHATSAPP_URL` (WhatsApp and Instagram are real; the email is still assumed)
- `data/navegacion.ts` — `NAV_LINKS`, shared by header and footer
- `data/tratamientos.ts` — `TRATAMIENTOS` (full page content per treatment, a draft the owner must validate); drives `/tratamientos`, `/tratamientos/[slug]` (`generateStaticParams` + `dynamicParams = false`), the sitemap and the JSON-LD offers
- `data/tarifas.ts` (`TARIFAS`, `precioDesde()`), `data/cobertura.ts`, `data/sobre-mi.ts`, `data/fotos.ts` (every photo slot; `Foto` renders the real image or the placeholder)

**Content not yet provided is `null`, never invented.** Business facts (prices, zones, bio, duration, what she brings) come from the owner only; the UI renders `null` as a visible gap (`TextoPendiente`, "Por confirmar", `ImagePlaceholder` → "Foto próximamente"). Gap copy is written for the visitor, not as an internal note: "Listado de zonas por confirmar", "Muy pronto, mi historia…" — never "Pendiente", never "confirmar con Lucía". The list of what's missing lives in PLAN.md (Fase 2). Treatment copy must not promise health outcomes ("ayuda a mejorar el aspecto", not "elimina").

- `seo.ts` — `SITE_NAME`, `SITE_URL` (`NEXT_PUBLIC_SITE_URL` fallback), `pageMetadata()` (every interior page builds its full metadata with it), `breadcrumbJsonLd()`

**Structured data** goes through `src/components/json-ld.tsx` (escapes `<`). `HealthAndBeautyBusiness` is emitted once in `layout.tsx`; each interior page adds its own `BreadcrumbList`.

**Home mirrors the menu.** `src/app/page.tsx` has one section per `NAV_LINKS` entry, in the same order, each with `id` = the entry's `id` (`#tratamientos` wraps Esencia + Beneficios + Protocolo). The header is a scroll-spy on `/` (links are `#id`, `aria-current="true"` on the section crossing mid-screen) and links to each entry's `href` page elsewhere (`aria-current="page"`, sub-routes included); the footer always links to the pages. Sections are teasers whose CTA leads to the dedicated page, which is the SEO target. Each section's eyebrow is its menu label. Adding a menu entry means adding its section too. Exactly one `h1` per page (the home's lives in `HeroSection`); sections use `aria-labelledby` on their `h2`.

**Copy conventions**: first person singular (Lucía works alone: "utilizo", "escríbeme"); every booking CTA is labelled exactly "Reservar por WhatsApp".

**Design system** (all in `src/app/globals.css`; rationale in PLAN.md, Fase 1):

- Palette "madera" as oklch tokens in `:root`, mapped in `@theme inline` — add tokens there, never arbitrary colors. Beyond the shadcn names: `oscuro`/`oscuro-foreground` (dark wood sections, footer) and `miel` (decoration only — 3.1:1 on the background, never for text). The contrast ratios are documented next to the palette; keep body text ≥ 4.5:1.
- Type: Cormorant Garamond weight 300 (`font-heading font-light`) for headings, with `<em>` italicising the key word of each heading; Jost (`--font-sans`) for body, nav and labels. Use the scale utilities `text-display` (hero h1), `text-titulo` (h1 of interior pages, section h2) and `text-etiqueta` (uppercase tracked eyebrows/labels; pair with `uppercase`) — they carry their own leading/tracking.
- Surfaces: **microcement textures** generated by `scripts/generar-microcemento.mjs` (SVG fractal noise rendered with sharp) into `public/texturas/`. `microcemento-oscuro` is the background of every dark section (hero fallback, protocolo, cobertura) — it keeps Lino text ≥ 6.5:1. `microcemento` (light) is only for photo placeholders: its darker patches would drop secondary text below AA. The footer stays flat `bg-oscuro` (small text at 60%).
- `grid-sangrado` utility: 4-column grid (gutters + two 36rem halves) so one half can bleed to the viewport edge — see `EsenciaSection`/`ProtocoloSection` (`md:col-[mitad/borde-fin]`).
- CTAs always through `CtaLink` (`variante`: `solido` default, `contorno`, `claro` for dark backgrounds; `externo` for off-site links) or `ctaVariants()` on a `<button>`.
- Brand marks: `Logo` (typographic, "Madrid" is `aria-hidden`), `Sello` (the real client logo, `public/logo.jpg`, white JPG background removed with `mix-blend-multiply` over a `bg-background` disc — never redraw or imitate it), `src/app/icon.svg` + `apple-icon.png` (a sprig mark echoing the logo's olive branch; the full seal is illegible at favicon size).
- Motion: the hero's staggered load entrance (tw-animate-css); scroll-driven reveals via the `revelar` (content blocks, never whole sections, so backgrounds don't move) and `acercar` (photos, applied inside `Foto`) utilities — pure CSS `animation-timeline: view()` behind `@supports` and `prefers-reduced-motion: no-preference`, so unsupported browsers just show static content; the mobile menu slides fully in (`sheet.tsx` customised: 100% translate, Chocolate veil) with staggered links. Every animation has a `motion-reduce` fallback.
- Hook: **`ExploradorInstrumentos`** in the protocolo section — numbered hotspots over the instruments photo (`FOTOS.protocolo`, drawn at its exact aspect from `ancho`/`alto` so % positions hold) plus a numbered list of real buttons (the hotspots are `aria-hidden`/`tabIndex=-1` duplicates for pointer users) and an `aria-live` detail card. Data and hotspot positions live in `src/lib/data/instrumentos.ts`; if the photo changes, the positions must be redone.
- Light theme only; `dark:` variants are tied to a `.dark` class that is never set. `ImagePlaceholder` marks slots awaiting real photos.

**shadcn/ui is deliberately narrow**: only behavior/accessibility-heavy primitives (today `button` + `sheet` for the mobile menu). Layout and editorial pieces are hand-built with Tailwind. External links are native `<a>` (not `<Button render={<a/>}>`, which would expose `role="button"`).

## Conventions

- Server Components by default; `'use client'` only where state/effects are needed (today: `header.tsx`, `error.tsx`).
- No manual `useMemo`/`useCallback` — React Compiler handles it.
- All visible copy is in Spanish; Spanish identifiers for domain data (`tratamientos`, `contacto`).
- Use `/frontend-design` when designing UI.
