import { describe, expect, it } from 'vitest';

import { formatearPrecio } from './formato';

// Intl separa la cifra y el símbolo con un espacio duro (U+00A0). Va como
// constante para que no quede un carácter invisible en el código.
const NBSP = String.fromCharCode(0xa0);

describe('formatearPrecio', () => {
  it('muestra los euros enteros sin decimales', () => {
    expect(formatearPrecio(45)).toBe(`45${NBSP}€`);
  });

  it('muestra siempre dos decimales cuando hay céntimos', () => {
    expect(formatearPrecio(37.5)).toBe(`37,50${NBSP}€`);
  });
});
