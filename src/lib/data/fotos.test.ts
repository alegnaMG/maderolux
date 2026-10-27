import { describe, expect, it } from 'vitest';

import { FOTOS, hayFotosConIA, type HuecoFoto } from './fotos';

const huecos: [string, HuecoFoto][] = Object.entries(FOTOS);

describe('FOTOS', () => {
  it.each(huecos)('%s dice qué foto falta', (_, hueco) => {
    expect(hueco.pendiente.trim()).not.toBe('');
  });

  it.each(huecos)(
    '%s, si ya tiene foto, la sirve desde public/fotos con texto alternativo',
    (_, hueco) => {
      if (!hueco.foto) return;
      expect(hueco.foto.src).toMatch(/^\/fotos\//);
      expect(hueco.foto.alt.trim()).not.toBe('');
    },
  );

  it('nunca usa una imagen de IA como retrato de Lucía', () => {
    // Tipado como HuecoFoto: con `satisfies`, TypeScript sabe que hoy el
    // retrato es literalmente null, y el test debe seguir valiendo cuando
    // llegue la foto.
    const retrato: HuecoFoto = FOTOS.sobreMi;
    expect(retrato.foto?.ia ?? false).toBe(false);
  });
});

describe('hayFotosConIA', () => {
  const real = { src: '/fotos/a.jpg', alt: 'a', ia: false };
  const ia = { src: '/fotos/b.jpg', alt: 'b', ia: true };

  it('es true si alguna foto está generada con IA', () => {
    expect(
      hayFotosConIA({
        a: { pendiente: 'a', foto: real },
        b: { pendiente: 'b', foto: ia },
      }),
    ).toBe(true);
  });

  it('es false si todas son reales o están pendientes', () => {
    expect(
      hayFotosConIA({
        a: { pendiente: 'a', foto: real },
        b: { pendiente: 'b', foto: null },
      }),
    ).toBe(false);
  });

  it('usa FOTOS por defecto', () => {
    expect(hayFotosConIA()).toBe(
      Object.values(FOTOS).some((h) => h.foto?.ia === true),
    );
  });
});
