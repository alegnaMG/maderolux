// @vitest-environment node
//
// Entorno node a propósito: la animación depende solo de unas pocas APIs de
// window, y simuladas a mano el reloj y los fotogramas son deterministas.
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  detenerScrollSuave,
  duracionPara,
  easeInOutCubic,
  scrollSuaveAElemento,
  scrollSuaveHasta,
} from './scroll-suave';

/** Monta un window mínimo con un reloj y una cola de fotogramas que se avanzan a mano. */
function montarVentana({
  scrollY = 0,
  scrollHeight = 5000,
  innerHeight = 800,
  movimientoReducido = false,
  margenSuperior = '0px',
} = {}) {
  const fotogramas = new Map<number, FrameRequestCallback>();
  const escuchas = new Map<string, Set<EventListener>>();
  let ahora = 0;
  let siguiente = 1;

  const ventana = {
    scrollY,
    innerHeight,
    scrollTo: vi.fn((opciones: ScrollToOptions) => {
      ventana.scrollY = opciones.top ?? 0;
    }),
    matchMedia: vi.fn(() => ({ matches: movimientoReducido })),
    getComputedStyle: vi.fn(() => ({ scrollMarginTop: margenSuperior })),
    requestAnimationFrame: vi.fn((callback: FrameRequestCallback) => {
      fotogramas.set(siguiente, callback);
      return siguiente++;
    }),
    cancelAnimationFrame: vi.fn((id: number) => fotogramas.delete(id)),
    addEventListener: vi.fn((tipo: string, escucha: EventListener) => {
      escuchas.set(tipo, (escuchas.get(tipo) ?? new Set()).add(escucha));
    }),
    removeEventListener: vi.fn((tipo: string, escucha: EventListener) => {
      escuchas.get(tipo)?.delete(escucha);
    }),
  };

  vi.stubGlobal('window', ventana);
  vi.stubGlobal('document', { documentElement: { scrollHeight } });
  vi.spyOn(performance, 'now').mockImplementation(() => ahora);

  return {
    ventana,
    /** Avanza el reloj y ejecuta los fotogramas que estuvieran pendientes. */
    avanzar(ms: number) {
      ahora += ms;
      const pendientes = [...fotogramas];
      fotogramas.clear();
      for (const [, callback] of pendientes) callback(ahora);
    },
    fotogramasPendientes: () => fotogramas.size,
    escuchasActivas: () =>
      [...escuchas.values()].reduce((total, set) => total + set.size, 0),
    disparar(tipo: string) {
      for (const escucha of escuchas.get(tipo) ?? []) escucha(new Event(tipo));
    },
  };
}

afterEach(() => {
  detenerScrollSuave();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('easeInOutCubic', () => {
  it('arranca en 0, termina en 1 y pasa por la mitad en el centro', () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(0.5)).toBe(0.5);
    expect(easeInOutCubic(1)).toBe(1);
  });

  it('es lenta en los extremos y simétrica', () => {
    expect(easeInOutCubic(0.25)).toBeCloseTo(0.0625);
    expect(easeInOutCubic(0.75)).toBeCloseTo(0.9375);
  });
});

describe('duracionPara', () => {
  it('no baja del mínimo en saltos cortos', () => {
    expect(duracionPara(0)).toBe(700);
    expect(duracionPara(400)).toBe(700);
  });

  it('crece con la distancia', () => {
    expect(duracionPara(2000)).toBe(1000);
  });

  it('no pasa del máximo en saltos largos', () => {
    expect(duracionPara(50000)).toBe(1400);
  });
});

describe('scrollSuaveHasta', () => {
  it('recorre la distancia poco a poco y termina exactamente en el destino', () => {
    const { ventana, avanzar, fotogramasPendientes } = montarVentana();

    scrollSuaveHasta(2000); // 2000 px → 1000 ms
    expect(ventana.scrollTo).not.toHaveBeenCalled();

    avanzar(500);
    expect(ventana.scrollY).toBe(1000); // mitad de tiempo, mitad de camino

    avanzar(250);
    expect(ventana.scrollY).toBeGreaterThan(1000);
    expect(ventana.scrollY).toBeLessThan(2000);

    avanzar(500);
    expect(ventana.scrollY).toBe(2000);
    expect(fotogramasPendientes()).toBe(0);
  });

  it('mueve la página siempre de golpe por fotograma, para no sumar el suavizado del CSS', () => {
    const { ventana, avanzar } = montarVentana();

    scrollSuaveHasta(2000);
    avanzar(300);

    expect(ventana.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'instant',
    });
  });

  it('también sube', () => {
    const { ventana, avanzar } = montarVentana({ scrollY: 3000 });

    scrollSuaveHasta(0);
    avanzar(2000);

    expect(ventana.scrollY).toBe(0);
  });

  it('recorta el destino a lo que la página puede desplazarse', () => {
    const { ventana, avanzar } = montarVentana({
      scrollHeight: 5000,
      innerHeight: 800,
    });

    scrollSuaveHasta(99999);
    avanzar(2000);
    expect(ventana.scrollY).toBe(4200);

    scrollSuaveHasta(-300);
    avanzar(2000);
    expect(ventana.scrollY).toBe(0);
  });

  it('con una página más corta que la pantalla se queda en 0', () => {
    const { ventana, avanzar } = montarVentana({
      scrollHeight: 500,
      innerHeight: 800,
    });

    scrollSuaveHasta(1000);
    avanzar(2000);

    expect(ventana.scrollY).toBe(0);
  });

  it('con movimiento reducido salta directo, sin animar', () => {
    const { ventana, fotogramasPendientes, escuchasActivas } = montarVentana({
      movimientoReducido: true,
    });

    scrollSuaveHasta(2000);

    expect(ventana.scrollTo).toHaveBeenCalledOnce();
    expect(ventana.scrollTo).toHaveBeenCalledWith({
      top: 2000,
      behavior: 'instant',
    });
    expect(fotogramasPendientes()).toBe(0);
    expect(escuchasActivas()).toBe(0);
  });

  it.each(['wheel', 'touchstart', 'keydown', 'mousedown'])(
    'se aparta si la usuaria toma el control (%s)',
    (evento) => {
      const {
        ventana,
        avanzar,
        disparar,
        fotogramasPendientes,
        escuchasActivas,
      } = montarVentana();
      scrollSuaveHasta(2000);
      avanzar(300);
      const donde = ventana.scrollY;
      const llamadas = ventana.scrollTo.mock.calls.length;

      disparar(evento);
      avanzar(1000);

      expect(ventana.scrollTo).toHaveBeenCalledTimes(llamadas);
      expect(ventana.scrollY).toBe(donde);
      expect(fotogramasPendientes()).toBe(0);
      expect(escuchasActivas()).toBe(0);
    },
  );

  it('escucha esos eventos sin bloquear el scroll (passive)', () => {
    const { ventana } = montarVentana();

    scrollSuaveHasta(2000);

    expect(ventana.addEventListener).toHaveBeenCalledWith(
      'wheel',
      expect.any(Function),
      { passive: true },
    );
  });

  it('deja de escuchar al terminar', () => {
    const { avanzar, escuchasActivas } = montarVentana();

    scrollSuaveHasta(2000);
    expect(escuchasActivas()).toBe(4);

    avanzar(1000);
    expect(escuchasActivas()).toBe(0);
  });

  it('una animación nueva sustituye a la anterior', () => {
    const { ventana, avanzar, escuchasActivas } = montarVentana();

    scrollSuaveHasta(2000);
    avanzar(300);
    scrollSuaveHasta(500);

    expect(ventana.cancelAnimationFrame).toHaveBeenCalled();
    expect(escuchasActivas()).toBe(4); // solo las de la nueva

    avanzar(2000);
    expect(ventana.scrollY).toBe(500);
  });
});

describe('detenerScrollSuave', () => {
  it('sin animación en curso no hace nada', () => {
    const { ventana } = montarVentana();

    expect(() => detenerScrollSuave()).not.toThrow();
    expect(ventana.cancelAnimationFrame).not.toHaveBeenCalled();
  });

  it('corta la animación en curso', () => {
    const { ventana, avanzar } = montarVentana();
    scrollSuaveHasta(2000);
    avanzar(300);
    const donde = ventana.scrollY;

    detenerScrollSuave();
    avanzar(1000);

    expect(ventana.scrollY).toBe(donde);
  });
});

describe('scrollSuaveAElemento', () => {
  it('apunta al elemento dejando su scroll-margin-top libre para el header', () => {
    const { ventana, avanzar } = montarVentana({
      scrollY: 100,
      margenSuperior: '80px',
    });
    const seccion = {
      getBoundingClientRect: () => ({ top: 1200 }),
    } as HTMLElement;

    scrollSuaveAElemento(seccion);
    avanzar(2000);

    // 1200 (relativo a la pantalla) + 100 (ya recorrido) - 80 (header)
    expect(ventana.scrollY).toBe(1220);
  });
});
