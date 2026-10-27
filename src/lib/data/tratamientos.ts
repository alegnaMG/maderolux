import { FOTOS, type HuecoFoto } from './fotos';

export type PasoSesion = { titulo: string; texto: string };

export type PreguntaFrecuente = {
  pregunta: string;
  /** `null` mientras Lucía no la responda: la página muestra un hueco pendiente. */
  respuesta: string | null;
};

export type Tratamiento = {
  /** Segmento de URL: /tratamientos/[slug]. */
  slug: string;
  nombre: string;
  /** Una frase; se usa en el listado y como meta description. */
  resumen: string;
  /** Párrafos de "Qué es". */
  descripcion: string[];
  beneficios: string[];
  /** Pasos de una sesión, en orden. */
  sesion: PasoSesion[];
  /** `null` mientras no esté confirmada. */
  duracionMinutos: number | null;
  contraindicaciones: string[];
  preguntas: PreguntaFrecuente[];
  foto: HuecoFoto;
};

// Cada entrada genera su página estática en /tratamientos/[slug], su URL en
// el sitemap y su oferta en el JSON-LD del layout.
//
// BORRADOR: el contenido es una propuesta general sobre la técnica y Lucía
// debe validarlo. Cuidado al editarlo: la publicidad de tratamientos
// estéticos no puede prometer resultados de salud ("elimina la celulitis",
// "adelgaza"); de ahí el "ayuda a mejorar el aspecto".
// TODO(Fase 2): añadir el resto de tratamientos que ofrece.
export const TRATAMIENTOS: Tratamiento[] = [
  {
    slug: 'maderoterapia',
    nombre: 'Maderoterapia',
    resumen:
      'Tratamiento manual y natural que combina instrumentos de madera y maniobras precisas para trabajar tu cuerpo de forma integral.',
    descripcion: [
      'La maderoterapia es una técnica de masaje corporal que utiliza instrumentos de madera de distintas formas y texturas: rodillos, copas, tablas y moldeadores. Cada uno está pensado para una zona y un tipo de maniobra, lo que permite trabajar con precisión y adaptar la presión a cada parte del cuerpo.',
      'La combino con maniobras manuales de drenaje para favorecer la circulación y la sensación de ligereza. Es un tratamiento manual, sin aparatos, y lo hago en tu casa: cuando termina, solo tienes que descansar.',
    ],
    beneficios: [
      'Favorece la circulación y el drenaje de líquidos.',
      'Ayuda a mejorar el aspecto de la celulitis y la piel de naranja.',
      'Aporta sensación de ligereza, sobre todo en las piernas.',
      'Relaja la musculatura y libera tensión acumulada.',
      'Es un rato de desconexión sin salir de casa.',
    ],
    sesion: [
      {
        titulo: 'Valoración',
        texto:
          'Antes de empezar hablamos de qué buscas, de las zonas que quieres trabajar y de tu salud, para descartar contraindicaciones.',
      },
      {
        titulo: 'Preparación',
        texto:
          'Preparo el espacio y aplico un aceite que facilita que la madera deslice sobre la piel.',
      },
      {
        titulo: 'Tratamiento',
        texto:
          'Trabajo cada zona con el instrumento que le corresponde, combinando maderoterapia y drenaje, y ajusto la intensidad a lo que tu cuerpo necesita.',
      },
      {
        titulo: 'Después',
        texto:
          'Te doy unas pautas sencillas, como beber agua y moverte, y si quieres continuar planificamos la frecuencia de las siguientes sesiones.',
      },
    ],
    duracionMinutos: null,
    foto: FOTOS.maderoterapia,
    contraindicaciones: [
      'Estás embarazada.',
      'Tienes varices importantes, flebitis o antecedentes de trombosis.',
      'Tomas anticoagulantes o tienes problemas de coagulación.',
      'Tienes heridas, infecciones o alteraciones en la piel de la zona.',
      'Estás en tratamiento oncológico.',
      'Te han operado hace poco.',
      'Tienes fiebre o un proceso infeccioso.',
    ],
    preguntas: [
      {
        pregunta: '¿Duele?',
        respuesta:
          'No debería. En algunas zonas la presión puede ser intensa, pero siempre la ajusto a lo que te resulte cómodo. Si algo molesta, paramos o cambiamos de instrumento.',
      },
      {
        pregunta: '¿Cuántas sesiones necesito?',
        respuesta:
          'Depende de tu objetivo y de cómo responda tu cuerpo. En la primera sesión lo valoramos y te propongo un plan.',
      },
      {
        pregunta: '¿Qué necesito tener en casa?',
        respuesta: null,
      },
      {
        pregunta: '¿Puede tener efectos secundarios?',
        respuesta:
          'Es normal notar la zona algo sensible o enrojecida durante unas horas. Si te salen moratones con facilidad, coméntamelo antes de empezar.',
      },
    ],
  },
];

export function getTratamiento(slug: string) {
  return TRATAMIENTOS.find((tratamiento) => tratamiento.slug === slug);
}
