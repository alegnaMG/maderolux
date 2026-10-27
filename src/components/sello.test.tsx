import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CONTACTO } from '@/lib/data/contacto';

import { Sello } from './sello';

describe('Sello', () => {
  it('muestra el logo real con la marca y la profesional como texto alternativo', () => {
    render(<Sello />);

    const logo = screen.getByRole('img', {
      name: `Logo de Maderolux, ${CONTACTO.nombre}`,
    });
    expect(logo.getAttribute('src')).toContain('logo.jpg');
  });

  it('aplica la className recibida al contenedor', () => {
    render(<Sello className="size-20" />);

    expect(screen.getByRole('img').parentElement).toHaveClass('size-20');
  });
});
