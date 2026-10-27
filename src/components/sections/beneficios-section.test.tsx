import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BeneficiosSection } from './beneficios-section';

describe('BeneficiosSection', () => {
  it('muestra los cuatro beneficios como h3 bajo un h2 accesible', () => {
    render(<BeneficiosSection />);

    const region = screen.getByRole('region', {
      name: 'Beneficios de la maderoterapia',
    });

    expect(
      within(region)
        .getAllByRole('heading', { level: 3 })
        .map((h) => h.textContent),
    ).toEqual([
      'Técnica natural',
      'Sensación de ligereza',
      'Mejora del aspecto de la piel',
      'Bienestar integral',
    ]);
  });
});
