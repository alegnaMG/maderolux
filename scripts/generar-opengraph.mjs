// Genera la imagen que se ve al compartir el enlace (WhatsApp, Instagram,
// redes): public/opengraph.jpg, 1200×630. La declara IMAGEN_COMPARTIR en
// src/lib/seo.ts para todas las páginas.
// Uso: node scripts/generar-opengraph.mjs
//
// Sin ella, WhatsApp y compañía tiran del icono de la app (la ramita). El
// sello va centrado sobre Lino liso para que sobreviva al recorte cuadrado
// de las vistas previas pequeñas; el fondo blanco del JPG se funde con
// `multiply`, igual que en <Sello>. El logo actual mide 150 px y se amplía
// algo más del doble: cuando llegue una versión ≥ 600 px, basta con volver
// a ejecutar este script.

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// sharp llega como dependencia de Next; no está en el package.json raíz.
const sharp = require(
  require.resolve('sharp', { paths: [require.resolve('next')] }),
);

const ANCHO = 1200;
const ALTO = 630;
const LADO_SELLO = 330;
const LINO = '#F7F0E6';

const sello = await sharp('public/logo.jpg')
  .resize(LADO_SELLO, LADO_SELLO, { kernel: 'lanczos3' })
  .toBuffer();

await sharp({
  create: { width: ANCHO, height: ALTO, channels: 3, background: LINO },
})
  .composite([{ input: sello, blend: 'multiply', gravity: 'center' }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/opengraph.jpg');

console.log('public/opengraph.jpg');
