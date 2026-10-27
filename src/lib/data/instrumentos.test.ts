import { describe, expect, it } from 'vitest';

import { INSTRUMENTOS } from './instrumentos';

describe('INSTRUMENTOS', () => {
  it('usa ids únicos', () => {
    const ids = INSTRUMENTOS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(INSTRUMENTOS)('$nombre tiene su punto dentro de la foto', (i) => {
    for (const valor of [i.posicion.x, i.posicion.y]) {
      expect(valor).toBeGreaterThanOrEqual(0);
      expect(valor).toBeLessThanOrEqual(100);
    }
  });

  it.each(INSTRUMENTOS)('$nombre dice dónde se usa y para qué', (i) => {
    expect(i.zonas.trim()).not.toBe('');
    expect(i.descripcion.trim()).not.toBe('');
  });
});
