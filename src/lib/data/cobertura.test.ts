import { describe, expect, it } from 'vitest';

import { COBERTURA } from './cobertura';

describe('COBERTURA', () => {
  it('lista los 21 distritos de Madrid capital sin repetir', () => {
    expect(COBERTURA.distritos).toHaveLength(21);
    expect(new Set(COBERTURA.distritos).size).toBe(21);
  });

  it('no repite municipios', () => {
    expect(new Set(COBERTURA.municipios).size).toBe(
      COBERTURA.municipios.length,
    );
  });
});
