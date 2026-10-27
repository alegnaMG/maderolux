import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CONTACTO, WHATSAPP_URL } from '@/lib/data/contacto';
import { NAV_LINKS } from '@/lib/data/navegacion';

import { Footer } from './footer';

afterEach(() => {
  vi.useRealTimers();
});

describe('Footer', () => {
  it('repite el menú principal para reforzar el enlazado interno', () => {
    render(<Footer />);

    const enlaces = within(
      screen.getByRole('navigation', { name: 'Pie de página' }),
    ).getAllByRole('link');

    expect(
      enlaces.map((el) => [el.textContent, el.getAttribute('href')]),
    ).toEqual(NAV_LINKS.map((link) => [link.label, link.href]));
  });

  it('ofrece el email como enlace mailto', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: CONTACTO.email })).toHaveAttribute(
      'href',
      `mailto:${CONTACTO.email}`,
    );
  });

  it('abre WhatsApp e Instagram en pestañas nuevas y seguras', () => {
    render(<Footer />);

    const whatsapp = screen.getByRole('link', { name: 'WhatsApp' });
    const instagram = screen.getByRole('link', {
      name: 'Instagram @maderolux_madrid',
    });

    expect(whatsapp).toHaveAttribute('href', WHATSAPP_URL);
    expect(instagram).toHaveAttribute('href', CONTACTO.instagram);
    expect(instagram).toHaveTextContent('@maderolux_madrid');
    for (const enlace of [whatsapp, instagram]) {
      expect(enlace).toHaveAttribute('target', '_blank');
      expect(enlace).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('muestra el año en curso en el aviso de copyright', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2031-03-07T10:00:00Z'));

    render(<Footer />);

    expect(
      screen.getByText(/© 2031 Maderolux\. Todos los derechos/),
    ).toBeVisible();
  });

  it('avisa de que hay imágenes generadas con IA', () => {
    render(<Footer avisoIA />);

    expect(
      screen.getByText(/Imágenes ilustrativas generadas con inteligencia/),
    ).toBeVisible();
  });

  it('no muestra el aviso cuando todas las fotos son reales', () => {
    render(<Footer avisoIA={false} />);

    expect(
      screen.queryByText(/generadas con inteligencia artificial/),
    ).not.toBeInTheDocument();
  });
});
