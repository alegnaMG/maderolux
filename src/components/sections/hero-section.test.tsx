import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HeroSection } from './hero-section';

describe('HeroSection', () => {
  it('contiene el único h1 de la home con la propuesta de valor', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Tu momento de bienestar, sin salir de casa.',
      }),
    ).toBeVisible();
  });

  it('usa el microcemento de fondo mientras no hay foto', () => {
    render(<HeroSection foto={null} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('usa la foto real de fondo cuando la hay', () => {
    render(
      <HeroSection
        foto={{
          src: '/fotos/hero.jpg',
          alt: 'Sesión con rodillo de madera',
          ia: false,
        }}
      />,
    );

    expect(
      screen.getByRole('img', { name: 'Sesión con rodillo de madera' }),
    ).toBeInTheDocument();
  });

  it('lleva a la sección de tratamientos', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('link', { name: 'Descubre Maderolux' }),
    ).toHaveAttribute('href', '#tratamientos');
  });
});
