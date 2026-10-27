// Es la voz y la historia de Lucía: no se rellena con texto de relleno.
// TODO(Fase 2): pedirle su presentación y su formación. Mientras sean `null`,
// /sobre-mi muestra huecos pendientes en su lugar.
export const SOBRE_MI: {
  /** Párrafos en primera persona: quién es y por qué hace esto. */
  presentacion: string[] | null;
  /** Cursos, certificaciones y años de experiencia, uno por línea. */
  formacion: string[] | null;
} = {
  presentacion: null,
  formacion: null,
};
