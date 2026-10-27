import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TRATAMIENTOS } from '@/lib/data/tratamientos';

import { TarifasSection } from './tarifas-section';

describe('TarifasSection', () => {
  it('es la sección "tarifas" a la que salta el menú', () => {
    render(<TarifasSection />);

    expect(
      screen.getByRole('region', { name: 'Sesiones y bonos.' }),
    ).toHaveAttribute('id', 'tarifas');
  });

  it('agrupa las tarifas por tratamiento', () => {
    render(<TarifasSection />);

    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual(TRATAMIENTOS.map((t) => t.nombre));
  });

  it('enlaza a la página de tarifas', () => {
    render(<TarifasSection />);

    expect(
      screen.getByRole('link', { name: 'Ver tarifas y condiciones' }),
    ).toHaveAttribute('href', '/tarifas');
  });
});
