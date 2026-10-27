import { describe, expect, it } from 'vitest';

import { precioDesde, type Tarifa, TARIFAS, tarifasDe } from './tarifas';
import { getTratamiento } from './tratamientos';

const tarifa = (parcial: Partial<Tarifa>): Tarifa => ({
  id: 'x',
  tratamiento: 'maderoterapia',
  nombre: 'Sesión suelta',
  sesiones: 1,
  precio: null,
  ...parcial,
});

describe('TARIFAS', () => {
  it('usa ids únicos', () => {
    const ids = TARIFAS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('solo referencia tratamientos que existen', () => {
    for (const t of TARIFAS) {
      expect(getTratamiento(t.tratamiento)).toBeDefined();
    }
  });
});

describe('tarifasDe', () => {
  it('devuelve solo las tarifas del tratamiento pedido', () => {
    const lista = [
      tarifa({ id: 'a', tratamiento: 'maderoterapia' }),
      tarifa({ id: 'b', tratamiento: 'otro' }),
    ];

    expect(tarifasDe('maderoterapia', lista).map((t) => t.id)).toEqual(['a']);
  });

  it('usa TARIFAS por defecto', () => {
    expect(tarifasDe('maderoterapia')).toEqual(
      TARIFAS.filter((t) => t.tratamiento === 'maderoterapia'),
    );
  });
});

describe('precioDesde', () => {
  it('devuelve el precio por sesión más bajo entre sesiones y bonos', () => {
    const lista = [
      tarifa({ id: 'suelta', sesiones: 1, precio: 50 }),
      tarifa({ id: 'bono', sesiones: 5, precio: 225 }),
    ];

    expect(precioDesde('maderoterapia', lista)).toBe(45);
  });

  it('ignora las tarifas sin precio confirmado', () => {
    const lista = [
      tarifa({ id: 'suelta', sesiones: 1, precio: 50 }),
      tarifa({ id: 'bono', sesiones: 10, precio: null }),
    ];

    expect(precioDesde('maderoterapia', lista)).toBe(50);
  });

  it('devuelve null si no hay ningún precio confirmado', () => {
    expect(precioDesde('maderoterapia', [tarifa({})])).toBeNull();
  });

  it('devuelve null si el tratamiento no tiene tarifas', () => {
    expect(precioDesde('no-existe')).toBeNull();
  });
});
