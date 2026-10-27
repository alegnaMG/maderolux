import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ImagePlaceholder } from './image-placeholder';

describe('ImagePlaceholder', () => {
  it('se anuncia como imagen con la descripción de la foto pendiente', () => {
    render(<ImagePlaceholder label="Foto del equipo" />);

    expect(screen.getByRole('img', { name: 'Foto del equipo' })).toBeVisible();
  });

  it('aplica la className recibida al contenedor', () => {
    render(<ImagePlaceholder label="Foto del equipo" className="aspect-4/5" />);

    expect(screen.getByRole('img', { name: 'Foto del equipo' })).toHaveClass(
      'aspect-4/5',
    );
  });
});
