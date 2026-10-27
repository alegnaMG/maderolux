import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WHATSAPP_URL } from '@/lib/data/contacto';

import { ContactoSection } from './contacto-section';

describe('ContactoSection', () => {
  it('es una región con nombre', () => {
    render(<ContactoSection />);

    expect(
      screen.getByRole('region', { name: 'Reserva tu sesión.' }),
    ).toBeVisible();
  });

  it('abre WhatsApp en una pestaña nueva y segura', () => {
    render(<ContactoSection />);

    const whatsapp = screen.getByRole('link', {
      name: 'Reservar por WhatsApp',
    });
    expect(whatsapp).toHaveAttribute('href', WHATSAPP_URL);
    expect(whatsapp).toHaveAttribute('target', '_blank');
    expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
