import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CoberturaSection } from './cobertura-section';

const zonas = (confirmada: boolean) => ({
  confirmada,
  distritos: ['Centro', 'Retiro'],
  municipios: [],
});

describe('CoberturaSection', () => {
  it('es la sección "cobertura" a la que salta el menú', () => {
    render(<CoberturaSection />);

    expect(
      screen.getByRole('region', { name: 'Voy a tu casa.' }),
    ).toHaveAttribute('id', 'cobertura');
  });

  it('lista los distritos', () => {
    render(<CoberturaSection cobertura={zonas(true)} />);

    expect(screen.getByText('Centro')).toBeVisible();
    expect(screen.getByText('Retiro')).toBeVisible();
  });

  it('avisa de que la lista es provisional mientras no esté confirmada', () => {
    render(<CoberturaSection cobertura={zonas(false)} />);

    expect(screen.getByText('Listado de zonas por confirmar.')).toBeVisible();
  });

  it('no muestra el aviso cuando las zonas están confirmadas', () => {
    render(<CoberturaSection cobertura={zonas(true)} />);

    expect(screen.queryByText(/por confirmar/)).not.toBeInTheDocument();
  });

  it('enlaza a la página de cobertura', () => {
    render(<CoberturaSection />);

    expect(
      screen.getByRole('link', { name: 'Ver zonas de cobertura' }),
    ).toHaveAttribute('href', '/cobertura');
  });
});
