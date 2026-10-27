import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EncabezadoPagina } from './encabezado-pagina';

describe('EncabezadoPagina', () => {
  it('pinta la etiqueta, el h1 y la entradilla', () => {
    render(
      <EncabezadoPagina
        etiqueta="Sesiones y bonos"
        titulo={
          <>
            Nuestras <em>tarifas</em>
          </>
        }
      >
        Precios a domicilio.
      </EncabezadoPagina>,
    );

    expect(screen.getByText('Sesiones y bonos')).toBeVisible();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Nuestras tarifas' }),
    ).toBeVisible();
    expect(screen.getByText('Precios a domicilio.')).toBeVisible();
  });

  it('omite la entradilla si no se pasa', () => {
    const { container } = render(
      <EncabezadoPagina etiqueta="Sobre mí" titulo="Hola" />,
    );

    // Solo queda el párrafo de la etiqueta.
    expect(container.querySelectorAll('p')).toHaveLength(1);
  });

  it('aplica la className recibida', () => {
    const { container } = render(
      <EncabezadoPagina etiqueta="x" titulo="y" className="mt-8" />,
    );

    expect(container.firstChild).toHaveClass('mt-8');
  });
});
