import { describe, expect, it } from 'vitest';

import { SOBRE_MI } from './sobre-mi';

describe('SOBRE_MI', () => {
  it.each(Object.entries(SOBRE_MI))(
    '%s está pendiente (null) o es una lista de textos no vacíos',
    (_, valor) => {
      if (valor === null) return;
      expect(valor.length).toBeGreaterThan(0);
      for (const texto of valor) expect(texto.trim()).not.toBe('');
    },
  );
});
