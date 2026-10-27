// Compartido por header y footer para que el menú no se desincronice.
//
// Cada entrada existe dos veces, a propósito: como sección de la home
// (`id`, el ancla a la que salta el menú estando en "/") y como página propia
// (`href`, a la que lleva el menú desde cualquier otra ruta y el footer
// siempre). La home resume; la página desarrolla y es la que posiciona.
export const NAV_LINKS = [
  { id: 'inicio', href: '/', label: 'Inicio' },
  { id: 'tratamientos', href: '/tratamientos', label: 'Tratamientos' },
  { id: 'sobre-mi', href: '/sobre-mi', label: 'Sobre mí' },
  { id: 'tarifas', href: '/tarifas', label: 'Tarifas' },
  { id: 'cobertura', href: '/cobertura', label: 'Cobertura' },
  { id: 'contacto', href: '/contacto', label: 'Contacto' },
] as const;
