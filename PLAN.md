# PLAN.md — Maderolux

Spec vivo del proyecto. Se actualiza al cerrar cada tarea.

## Contexto

Web de **Maderolux**, servicio de maderoterapia y tratamientos estéticos **a domicilio en Madrid**, de Lucía Sánchez. Objetivo: que quien busque "maderoterapia a domicilio Madrid" la encuentre, entienda el servicio y reserve por WhatsApp.

Referencia visual: [docs/referencia/mockup-home.jpg](docs/referencia/mockup-home.jpg) (hero, "La maderoterapia", beneficios, "Cómo lo hacemos").

Proyecto hermano con la misma arquitectura: `alejo-viera-decor`.

## Estructura de páginas

| Ruta                   | Contenido                                                                                                                                                 | Estado             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `/`                    | Una sección por opción del menú, en su orden: Inicio · Tratamientos (maderoterapia, beneficios, cómo trabajo) · Sobre mí · Tarifas · Cobertura · Contacto | Maquetada          |
| `/tratamientos`        | Listado de tratamientos                                                                                                                                   | Esqueleto          |
| `/tratamientos/[slug]` | Una página por tratamiento (generada desde `src/lib/data/tratamientos.ts`)                                                                                | Solo maderoterapia |
| `/sobre-mi`            | Lucía: historia, formación                                                                                                                                | Esqueleto          |
| `/tarifas`             | Sesiones y bonos                                                                                                                                          | Esqueleto          |
| `/cobertura`           | Zonas de Madrid atendidas                                                                                                                                 | Esqueleto          |
| `/contacto`            | WhatsApp + email                                                                                                                                          | Esqueleto          |

Las secciones de la home son un resumen; cada una enlaza a su página dedicada, que es la que posiciona en Google.

## Fases

### Fase 0 — Scaffolding ✅

- [x] Next.js 16 + React 19.2 (React Compiler) + TypeScript + Tailwind v4 + shadcn/ui (Base UI)
- [x] Prettier + ESLint + hook de formateo automático para Claude Code
- [x] Vitest + Testing Library con umbral de cobertura del 100%
- [x] Rutas, layout raíz, header con menú móvil, footer, 404 y error
- [x] Fuentes únicas de verdad: `contacto.ts`, `navegacion.ts`, `tratamientos.ts`, `seo.ts`
- [x] SEO base: metadata por página, `sitemap.ts`, `robots.ts`, JSON-LD (`HealthAndBeautyBusiness` + `BreadcrumbList`)

### Fase 1 — Identidad visual

- [x] Paleta "madera" (Lino, Papel, Arena, Borde, Miel, Nogal, Corteza, Ébano) como tokens oklch en `globals.css`, con contrastes AA comprobados
- [x] Tipografías: Cormorant Garamond 300 (titulares, cursiva para la palabra clave) + Jost (texto, menú, etiquetas); escala `text-display` / `text-titulo` / `text-etiqueta`
- [x] Logo tipográfico (`logo.tsx`), sello circular (`sello.tsx`), favicon (`icon.svg`) e icono de iOS (`apple-icon.png`)
- [x] CTA reutilizable: `CtaLink` + `ctaVariants` (sólido / contorno / claro)
- [x] Home maquetada según el mockup: hero oscuro, esencia con sello, banda de beneficios, protocolo a sangre, reserva
- [x] ~~Elemento propio: la veta de madera~~ → sustituida por texturas de microcemento (`scripts/generar-microcemento.mjs` → `public/texturas/`) en huecos de foto y secciones oscuras
- [x] Gancho: explorador de instrumentos (números sobre la foto de herramientas + ficha de cada una) en "Cómo trabajo"; textos en borrador para que Lucía los valide
- [x] Transiciones suaves al hacer scroll (CSS puro, respetan "reducir movimiento") y menú móvil con entrada deslizada
- [x] Paleta aclarada hacia el caramelo (botones Caramelo `#8C5D3A`, secciones Chocolate `#45301F`)
- [ ] Revisión visual en navegador real (escritorio + móvil) y ajustes finos
- [ ] Tests en verde: requieren Node ≥ 22.22.2 / 24.15 (jsdom 30); la máquina local tiene 22.13.1

Decisiones de diseño:

- Sin numeración "01 / 02" en las secciones del mockup: las secciones no son una secuencia y el número no aportaba información.
- Header sólido y fijo en vez de transparente sobre la foto: sin foto real no hay nada que transparentar, y evita un listener de scroll en cliente. Se puede revisar en la Fase 2.

### Fase 2 — Contenido real

Estructura lista: todo el contenido vive en `src/lib/data/` y meter los datos reales es editar esos archivos, sin tocar componentes. Convención: **`null` = pendiente de Lucía**, y la página lo muestra como un hueco visible (`TextoPendiente`, "Por confirmar" o el placeholder de foto con la veta), para que nada se publique a medias sin notarlo.

- [x] Modelo de datos: `tratamientos.ts` (descripción, beneficios, sesión, duración, contraindicaciones, FAQ), `tarifas.ts`, `cobertura.ts`, `sobre-mi.ts`, `fotos.ts`
- [x] Páginas maquetadas: detalle de tratamiento, listado, tarifas (carta de precios), cobertura, sobre mí, contacto (con "Cómo reservar")
- [x] Borrador del contenido general de maderoterapia (**Lucía debe validarlo**)
- [x] Componentes `Foto`, `TextoPendiente`, `EncabezadoPagina`, `PreguntasFrecuentes`
- [ ] Datos reales de Lucía (lista abajo)
- [x] Fotos ilustrativas generadas con IA en hero, esencia, protocolo y maderoterapia (`public/fotos/`, recortadas de los originales de `public/`), con `ia: true` y aviso automático en el footer
- [ ] Fotos propias que sustituyan a las de IA (sobre todo sesiones reales) y el retrato de Lucía, que nunca puede ser de IA

#### Datos que hay que pedirle a Lucía

| Dato                                                                                      | Dónde va                                                                                          |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Email (WhatsApp 613 569 064 e Instagram @maderolux_madrid ya son los reales)              | `src/lib/data/contacto.ts` (**el email actual es supuesto**)                                      |
| Logo en SVG o PNG ≥ 600 px (el de `public/logo.jpg` mide 150 px)                          | `public/` + `src/components/sello.tsx` (y volver a ejecutar `node scripts/generar-opengraph.mjs`) |
| Otros tratamientos que ofrece, además de la maderoterapia                                 | `src/lib/data/tratamientos.ts`                                                                    |
| Validar el borrador de maderoterapia (texto, pasos de la sesión, contraindicaciones, FAQ) | `src/lib/data/tratamientos.ts`                                                                    |
| Duración de la sesión                                                                     | `duracionMinutos` en `tratamientos.ts`                                                            |
| ¿Qué lleva ella y qué necesita la clienta en casa? (¿camilla?)                            | respuesta de la FAQ en `tratamientos.ts`                                                          |
| Precios de sesión suelta y bonos; ¿son esos bonos?                                        | `src/lib/data/tarifas.ts`                                                                         |
| Suplemento por desplazamiento y formas de pago                                            | `tarifas.ts`                                                                                      |
| Distritos y municipios que cubre                                                          | `src/lib/data/cobertura.ts` (+ `confirmada: true`)                                                |
| Presentación en primera persona y formación                                               | `src/lib/data/sobre-mi.ts`                                                                        |

#### Fotos: cómo prepararlas

- Huecos: hero, esencia, protocolo, tratamiento, retrato (`src/lib/data/fotos.ts` dice qué va en cada uno).
- Copiar a `public/fotos/` con nombre descriptivo en minúsculas y sin espacios (`maderoterapia-rodillo.jpg`), y rellenar `foto: { src, alt }` en `fotos.ts`.
- JPG de calidad ~85, lado largo de 2400 px para el hero y ~1600 px para el resto. No hace falta exportar WebP/AVIF ni varios tamaños: `next/image` los genera solo.
- Sin marcas de agua ni texto encima; luz cálida, en la línea del mockup. Si sale gente, con su permiso por escrito.
- El `alt` describe lo que se ve ("Lucía aplicando maderoterapia con rodillo en la pierna"), no repite el título.

Notas:

- Publicidad de tratamientos estéticos: no se pueden prometer resultados de salud ("elimina la celulitis", "adelgaza"). El borrador usa "ayuda a mejorar el aspecto" a propósito; mantener ese tono al editarlo.
- Los tests de `src/lib` se pueden ejecutar ya con Node 22.13: `pnpm exec vitest run src/lib --environment node` (no necesitan jsdom).

### Fase 3 — SEO

- [ ] Imágenes Open Graph (raíz y por ruta)
- [ ] Contenido de `/cobertura` orientado a búsquedas locales por barrio
- [ ] FAQ con `FAQPage` en las páginas de tratamiento
- [ ] Auditoría (Lighthouse + revisión on-page)

### Fase 4 — Publicación (la hace la propietaria del repo)

- [ ] Dominio definitivo: variable de entorno `NEXT_PUBLIC_SITE_URL` en Vercel (o el fallback de `SITE_URL` en `src/lib/seo.ts`). Canonical, sitemap, robots y JSON-LD salen de ahí.
- [ ] Despliegue en Vercel + Vercel Analytics
- [ ] Google Search Console + Google Business Profile

Antes de publicar, comprobar:

- [ ] Ningún hueco pendiente a la vista: `grep -rn "null" src/lib/data` y buscar "Pendiente" / "Por confirmar" / "Foto pendiente" en el sitio
- [ ] Email real en `contacto.ts`
- [ ] `COBERTURA.confirmada = true`
- [ ] Textos legales si hay analítica o formulario (ver "Decisiones pendientes")
- [ ] `pnpm lint`, `pnpm test:coverage` (con Node ≥ 24) y `pnpm build` en verde

## Decisiones pendientes

- Dominio: `maderolux.com` es provisional.
- ¿Qué otros tratamientos ofrece además de la maderoterapia?
- ¿Las reservas solo por WhatsApp, o también formulario / sistema de citas?
- ¿Se necesitan textos legales (aviso legal, privacidad, cookies)? Si hay analítica o formulario, sí.
