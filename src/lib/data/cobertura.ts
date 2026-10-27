// TODO(Fase 2): confirmar con Lucía qué zonas cubre. Mientras `confirmada`
// sea false, /cobertura avisa de que la lista es provisional. Por defecto se
// proponen los 21 distritos de Madrid capital, que es lo que promete el
// "a domicilio en Madrid" del resto de la web.
export const COBERTURA: {
  confirmada: boolean;
  distritos: string[];
  /** Municipios fuera de Madrid capital. */
  municipios: string[];
} = {
  confirmada: false,
  distritos: [
    'Arganzuela',
    'Barajas',
    'Carabanchel',
    'Centro',
    'Chamartín',
    'Chamberí',
    'Ciudad Lineal',
    'Fuencarral-El Pardo',
    'Hortaleza',
    'Latina',
    'Moncloa-Aravaca',
    'Moratalaz',
    'Puente de Vallecas',
    'Retiro',
    'Salamanca',
    'San Blas-Canillejas',
    'Tetuán',
    'Usera',
    'Vicálvaro',
    'Villa de Vallecas',
    'Villaverde',
  ],
  municipios: [],
};
