import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SobreMiSection } from './sobre-mi-section';

describe('SobreMiSection', () => {
  it('es la sección "sobre-mi" a la que salta el menú', () => {
    render(<SobreMiSection />);

    expect(
      screen.getByRole('region', { name: 'Hola, soy Lucía.' }),
    ).toHaveAttribute('id', 'sobre-mi');
  });

  it('muestra solo el primer párrafo de la presentación', () => {
    render(<SobreMiSection presentacion={['Primero.', 'Segundo.']} />);

    expect(screen.getByText('Primero.')).toBeVisible();
    expect(screen.queryByText('Segundo.')).not.toBeInTheDocument();
  });

  it('anuncia la presentación como próxima mientras no exista', () => {
    render(<SobreMiSection presentacion={null} />);

    expect(
      screen.getByText('Muy pronto, mi historia y mi forma de trabajar.'),
    ).toBeVisible();
  });

  it('enlaza a la página completa', () => {
    render(<SobreMiSection />);

    expect(screen.getByRole('link', { name: 'Conóceme' })).toHaveAttribute(
      'href',
      '/sobre-mi',
    );
  });
});
