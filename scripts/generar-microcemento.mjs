// Genera las texturas de microcemento del sitio:
//   public/texturas/microcemento-claro.webp   (huecos de foto, fondos claros)
//   public/texturas/microcemento-oscuro.webp  (secciones oscuras)
// Uso: node scripts/generar-microcemento.mjs
//
// Ruido fractal (feTurbulence) en capas: manchas amplias como de llana,
// brillos, trazos alargados, textura media y grano fino. Es una sola pieza
// grande que se pinta con background-size: cover: el renderizador de sharp
// no respeta stitchTiles y un mosaico repetido dejaría costuras.
// Determinista: cada capa tiene su `seed` fija.

import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// sharp llega como dependencia de Next; no está en el package.json raíz.
const sharp = require(
  require.resolve('sharp', { paths: [require.resolve('next')] }),
);

const ANCHO = 1600;
const ALTO = 1000;

const VARIANTES = {
  claro: { base: '#EFE3D2', sombra: '#8A7360', luz: '#FFFDF9' },
  oscuro: { base: '#45301F', sombra: '#1E130C', luz: '#6E5444' },
};

/** Capa de ruido coloreada: el canal R del ruido decide la opacidad. */
function capa({
  id,
  frecuencia,
  octavas,
  semilla,
  color,
  opacidad,
  contraste,
}) {
  const [r, g, b] = [1, 3, 5].map(
    (i) => parseInt(color.slice(i, i + 2), 16) / 255,
  );
  return `
  <filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="${frecuencia}" numOctaves="${octavas}" seed="${semilla}"/>
    <feColorMatrix type="matrix" values="0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  ${contraste} 0 0 0 ${(-contraste / 2).toFixed(3)}"/>
  </filter>
  <rect width="${ANCHO}" height="${ALTO}" filter="url(#${id})" opacity="${opacidad}"/>`;
}

function svg({ base, sombra, luz }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <rect width="${ANCHO}" height="${ALTO}" fill="${base}"/>
  ${capa({ id: 'manchas', frecuencia: '0.004', octavas: 5, semilla: 3, color: sombra, opacidad: 0.42, contraste: 1.8 })}
  ${capa({ id: 'brillos', frecuencia: '0.006', octavas: 4, semilla: 11, color: luz, opacidad: 0.45, contraste: 1.8 })}
  ${capa({ id: 'llana', frecuencia: '0.0025 0.012', octavas: 3, semilla: 5, color: sombra, opacidad: 0.22, contraste: 2.2 })}
  ${capa({ id: 'textura', frecuencia: '0.02', octavas: 2, semilla: 17, color: sombra, opacidad: 0.08, contraste: 1.4 })}
  ${capa({ id: 'grano', frecuencia: '0.8', octavas: 1, semilla: 9, color: sombra, opacidad: 0.1, contraste: 1.8 })}
</svg>`;
}

mkdirSync(new URL('../public/texturas/', import.meta.url), { recursive: true });
for (const [nombre, colores] of Object.entries(VARIANTES)) {
  const destino = new URL(
    `../public/texturas/microcemento-${nombre}.webp`,
    import.meta.url,
  );
  const info = await sharp(Buffer.from(svg(colores)))
    .webp({ quality: 86 })
    .toFile(destino.pathname.replace(/^\/([A-Za-z]:)/, '$1'));
  console.log(
    `microcemento-${nombre}.webp — ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`,
  );
}
