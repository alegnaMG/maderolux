import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EsenciaSection } from './esencia-section';

describe('EsenciaSection', () => {
  it('es una región con nombre, navegable desde el hero', () => {
    render(<EsenciaSection />);

    expect(
      screen.getByRole('region', { name: 'La maderoterapia.' }),
    ).toHaveAttribute('id', 'esencia');
  });

  it('enlaza a la página del tratamiento', () => {
    render(<EsenciaSection />);

    expect(
      screen.getByRole('link', { name: 'Descubre el tratamiento' }),
    ).toHaveAttribute('href', '/tratamientos/maderoterapia');
  });
});
