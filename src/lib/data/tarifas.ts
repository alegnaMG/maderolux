export type Tarifa = {
  id: string;
  /** Slug del tratamiento al que pertenece (ver tratamientos.ts). */
  tratamiento: string;
  nombre: string;
  sesiones: number;
  /** Precio total en euros; `null` mientras no esté confirmado. */
  precio: number | null;
};

// TODO(Fase 2): precios reales. La estructura (sesión suelta + bonos de 5 y
// 10) es una propuesta habitual en el sector; confirmarla con Lucía.
export const TARIFAS: Tarifa[] = [
  {
    id: 'maderoterapia-sesion',
    tratamiento: 'maderoterapia',
    nombre: 'Sesión suelta',
    sesiones: 1,
    precio: null,
  },
  {
    id: 'maderoterapia-bono-5',
    tratamiento: 'maderoterapia',
    nombre: 'Bono de 5 sesiones',
    sesiones: 5,
    precio: null,
  },
  {
    id: 'maderoterapia-bono-10',
    tratamiento: 'maderoterapia',
    nombre: 'Bono de 10 sesiones',
    sesiones: 10,
    precio: null,
  },
];

/** `null` mientras no esté decidido si hay suplemento y de cuánto. */
export const SUPLEMENTO_DESPLAZAMIENTO: string | null = null;

/** P. ej. ['Efectivo', 'Bizum']; `null` mientras no esté confirmado. */
export const FORMAS_DE_PAGO: string[] | null = null;

export function tarifasDe(slug: string, tarifas: Tarifa[] = TARIFAS) {
  return tarifas.filter((tarifa) => tarifa.tratamiento === slug);
}

/**
 * El precio por sesión más bajo del tratamiento (normalmente el del bono
 * más grande), para el "desde X €". `null` si aún no hay precios.
 */
export function precioDesde(slug: string, tarifas: Tarifa[] = TARIFAS) {
  const porSesion = tarifasDe(slug, tarifas).flatMap((tarifa) =>
    tarifa.precio === null ? [] : [tarifa.precio / tarifa.sesiones],
  );
  return porSesion.length > 0 ? Math.min(...porSesion) : null;
}
