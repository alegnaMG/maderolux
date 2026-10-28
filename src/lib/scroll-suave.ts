// Scroll animado con duración y curva propias.
//
// `scroll-behavior: smooth` del CSS no deja elegir ni lo uno ni lo otro: cada
// navegador usa la suya, y en una home con secciones de una pantalla o más el
// salto entre ellas sale rápido y seco. Aquí se anima a mano con
// requestAnimationFrame; cada fotograma usa `behavior: 'instant'` para que el
// `scroll-smooth` de <html> no intente suavizar además cada paso.

const DURACION_MIN = 700;
const DURACION_MAX = 1400;

// Si la usuaria toma el control (rueda, dedo, teclado, barra de scroll), la
// animación se aparta: seguir moviendo la página sería pelear con ella.
const EVENTOS_DE_USUARIO = ['wheel', 'touchstart', 'keydown', 'mousedown'];

/** Arranca y termina despacio; la velocidad máxima está en mitad del recorrido. */
export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Más distancia, más tiempo, pero con tope: un salto a la otra punta de la
 * home no debe hacerse eterno ni el de una sección a la contigua, brusco.
 */
export function duracionPara(distancia: number) {
  return Math.min(DURACION_MAX, Math.max(DURACION_MIN, 500 + distancia * 0.25));
}

let detener: (() => void) | null = null;

/** Corta la animación en curso, si la hay, dejando la página donde esté. */
export function detenerScrollSuave() {
  detener?.();
}

/** Desplaza la página hasta `destino` (px desde arriba) con la animación propia. */
export function scrollSuaveHasta(destino: number) {
  detenerScrollSuave();

  // El navegador recortaría el destino igualmente, pero la duración se calcula
  // con la distancia real, y para eso hay que recortarlo antes.
  const maximo = document.documentElement.scrollHeight - window.innerHeight;
  const fin = Math.max(0, Math.min(destino, maximo));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: fin, behavior: 'instant' });
    return;
  }

  const inicio = window.scrollY;
  const duracion = duracionPara(Math.abs(fin - inicio));
  const arranque = performance.now();
  let fotograma = 0;

  const parar = () => {
    window.cancelAnimationFrame(fotograma);
    for (const evento of EVENTOS_DE_USUARIO) {
      window.removeEventListener(evento, parar);
    }
    detener = null;
  };

  const paso = (ahora: number) => {
    const progreso = Math.min((ahora - arranque) / duracion, 1);
    window.scrollTo({
      top: inicio + (fin - inicio) * easeInOutCubic(progreso),
      behavior: 'instant',
    });
    if (progreso < 1) fotograma = window.requestAnimationFrame(paso);
    else parar();
  };

  for (const evento of EVENTOS_DE_USUARIO) {
    window.addEventListener(evento, parar, { passive: true });
  }
  detener = parar;
  fotograma = window.requestAnimationFrame(paso);
}

/**
 * Desplaza la página hasta un elemento respetando su `scroll-margin-top`
 * (las secciones llevan `scroll-mt-20` para no quedar bajo el header fijo),
 * igual que haría un ancla nativa.
 */
export function scrollSuaveAElemento(elemento: HTMLElement) {
  const margen = parseFloat(window.getComputedStyle(elemento).scrollMarginTop);
  scrollSuaveHasta(
    elemento.getBoundingClientRect().top + window.scrollY - margen,
  );
}
