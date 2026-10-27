import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Tarifa } from '@/lib/data/tarifas';

import { ListaTarifas } from './lista-tarifas';

// Intl separa la cifra y el símbolo con un espacio duro (U+00A0).
const NBSP = String.fromCharCode(0xa0);

const tarifa = (parcial: Partial<Tarifa>): Tarifa => ({
  id: 'x',
  tratamiento: 'maderoterapia',
  nombre: 'Sesión suelta',
  sesiones: 1,
  precio: null,
  ...parcial,
});

describe('ListaTarifas', () => {
  it('muestra cada tarifa con su precio', () => {
    render(
      <ListaTarifas
        tarifas={[tarifa({ id: 'a', nombre: 'Sesión suelta', precio: 50 })]}
      />,
    );

    const fila = screen.getByRole('listitem');
    expect(within(fila).getByText('Sesión suelta')).toBeVisible();
    expect(within(fila).getByText(`50${NBSP}€`)).toBeVisible();
  });

  it('calcula el precio por sesión de los bonos', () => {
    render(
      <ListaTarifas
        tarifas={[tarifa({ nombre: 'Bono de 5', sesiones: 5, precio: 225 })]}
      />,
    );

    expect(screen.getByText(`45${NBSP}€ por sesión`)).toBeVisible();
  });

  it('no calcula precio por sesión en una sesión suelta', () => {
    render(<ListaTarifas tarifas={[tarifa({ sesiones: 1, precio: 50 })]} />);

    expect(screen.queryByText(/por sesión/)).not.toBeInTheDocument();
  });

  it('marca como "Por confirmar" las tarifas sin precio', () => {
    render(
      <ListaTarifas
        tarifas={[tarifa({ nombre: 'Bono de 10', sesiones: 10 })]}
      />,
    );

    expect(screen.getByText('Por confirmar')).toBeVisible();
    expect(screen.queryByText(/por sesión/)).not.toBeInTheDocument();
  });
});
