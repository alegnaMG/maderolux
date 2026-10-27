export type Instrumento = {
  id: string;
  nombre: string;
  /** Dónde se usa, en pocas palabras. */
  zonas: string;
  descripcion: string;
  /**
   * Dónde está en la foto de FOTOS.protocolo, en % del ancho y del alto.
   * Si cambia la foto, hay que recolocar los puntos.
   */
  posicion: { x: number; y: number };
};

// Los instrumentos que se ven en public/fotos/instrumentos-madera.webp, en
// el orden de los números que se pintan sobre la foto.
//
// BORRADOR: descripciones generales de la técnica; Lucía debe validarlas y
// ajustarlas a los instrumentos que usa de verdad. Mismo cuidado que en
// tratamientos.ts: no prometer resultados de salud.
export const INSTRUMENTOS: Instrumento[] = [
  {
    id: 'rodillo-ondas',
    nombre: 'Rodillo de ondas',
    zonas: 'Piernas y glúteos',
    descripcion:
      'Sus discos ondulados amasan el tejido en zonas amplias. Es el instrumento más reconocible de la maderoterapia.',
    posicion: { x: 33, y: 29 },
  },
  {
    id: 'rodillo-cilindros',
    nombre: 'Rodillo de cilindros',
    zonas: 'Piernas, brazos y espalda',
    descripcion:
      'Desliza con una presión uniforme y acompaña las maniobras de drenaje.',
    posicion: { x: 22, y: 52 },
  },
  {
    id: 'copa-sueca',
    nombre: 'Copa sueca',
    zonas: 'Muslos, glúteos y abdomen',
    descripcion:
      'Su borde crea un leve efecto de succión al deslizar. Se usa sobre todo en las zonas con piel de naranja.',
    posicion: { x: 52, y: 40 },
  },
  {
    id: 'tabla-moldeadora',
    nombre: 'Tabla moldeadora',
    zonas: 'Cintura y abdomen',
    descripcion:
      'Su forma curva se adapta al contorno del cuerpo para trabajar la silueta con movimientos amplios.',
    posicion: { x: 54, y: 77 },
  },
  {
    id: 'seta',
    nombre: 'Seta',
    zonas: 'Zonas pequeñas y localizadas',
    descripcion:
      'Su cabeza redondeada permite una presión precisa donde el rodillo no llega.',
    posicion: { x: 71, y: 52 },
  },
  {
    id: 'masajeador-esferas',
    nombre: 'Masajeador de esferas',
    zonas: 'Espalda y hombros',
    descripcion:
      'Sus esferas recorren la piel con suavidad y ayudan a relajar la musculatura.',
    posicion: { x: 85, y: 58 },
  },
];
