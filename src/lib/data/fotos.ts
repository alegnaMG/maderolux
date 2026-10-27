export type Foto = {
  /** Ruta dentro de public/, p. ej. '/fotos/hero.jpg'. */
  src: string;
  /** Qué se ve en la foto, para lectores de pantalla y Google Imágenes. */
  alt: string;
  /**
   * Generada con IA. Obligatorio a propósito: cada foto declara su origen, y
   * mientras alguna sea de IA el footer lo avisa (ver `hayFotosConIA`).
   */
  ia: boolean;
  /**
   * Tamaño real en px. Solo hace falta donde la foto se pinta sin recortar,
   * con su proporción exacta (el explorador de instrumentos pone puntos en %
   * sobre ella).
   */
  ancho?: number;
  alto?: number;
};

export type HuecoFoto = {
  /** Qué foto va aquí; se muestra mientras `foto` sea null. */
  pendiente: string;
  foto: Foto | null;
};

// Cada hueco de foto del sitio. Para poner una foto: copiarla a public/fotos/
// y rellenar `foto`; ningún componente cambia.
//
// Las de IA son ilustrativas, para el boceto: muestran la técnica, no a
// Lucía ni a sus clientas. El retrato nunca puede ser de IA: es una persona
// real y la página dice "soy yo".
// TODO(Fase 2): fotos propias (ver PLAN.md, "Fotos: cómo prepararlas").
export const FOTOS = {
  hero: {
    pendiente: 'Maderoterapia con rodillo',
    foto: {
      src: '/fotos/maderoterapia-rodillo-panoramica.webp',
      alt: 'Masaje de maderoterapia con un rodillo de madera sobre la pierna',
      ia: true,
    },
  },
  esencia: {
    pendiente: 'Maderoterapia con copa de madera',
    foto: {
      src: '/fotos/maderoterapia-copa-espalda.webp',
      alt: 'Copa de madera deslizándose sobre la espalda durante una sesión',
      ia: true,
    },
  },
  protocolo: {
    pendiente: 'Instrumentos de madera sobre toalla',
    foto: {
      src: '/fotos/instrumentos-madera.webp',
      alt: 'Rodillos, copas y tabla de maderoterapia sobre una toalla',
      ia: true,
      ancho: 734,
      alto: 423,
    },
  },
  maderoterapia: {
    pendiente: 'Sesión de maderoterapia',
    foto: {
      src: '/fotos/maderoterapia-rodillo-panoramica.webp',
      alt: 'Masaje de maderoterapia con un rodillo de madera sobre la pierna',
      ia: true,
    },
  },
  sobreMi: { pendiente: 'Retrato de Lucía', foto: null },
} satisfies Record<string, HuecoFoto>;

/** Si alguna foto publicada está generada con IA (para el aviso del footer). */
export function hayFotosConIA(
  fotos: Record<string, HuecoFoto> = FOTOS,
): boolean {
  return Object.values(fotos).some((hueco) => hueco.foto?.ia === true);
}
