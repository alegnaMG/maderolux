import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Logo } from './logo';

describe('Logo', () => {
  it('se anuncia solo como "Maderolux": "Madrid" es decorativo', () => {
    // Cualquier contenedor con nombre accesible calculado desde su contenido
    // sirve; en el header es un <Link>.
    render(
      <h2>
        <Logo />
      </h2>,
    );

    expect(screen.getByRole('heading')).toHaveAccessibleName('Maderolux');
  });

  it('aplica la className recibida', () => {
    const { container } = render(<Logo className="text-primary" />);

    expect(container.firstChild).toHaveClass('text-primary');
  });
});
