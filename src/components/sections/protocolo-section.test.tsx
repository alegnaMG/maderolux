import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { INSTRUMENTOS } from '@/lib/data/instrumentos';

import { ProtocoloSection } from './protocolo-section';

describe('ProtocoloSection', () => {
  it('es una región con nombre', () => {
    render(<ProtocoloSection />);

    expect(
      screen.getByRole('region', {
        name: 'Cada herramienta tiene un propósito.',
      }),
    ).toBeVisible();
  });

  it('enlaza a los pasos de una sesión en la página del tratamiento', () => {
    render(<ProtocoloSection />);

    expect(
      screen.getByRole('link', { name: 'Cómo es una sesión' }),
    ).toHaveAttribute('href', '/tratamientos/maderoterapia#sesion');
  });

  it('deja explorar cada instrumento de la foto', () => {
    render(<ProtocoloSection />);

    for (const instrumento of INSTRUMENTOS) {
      expect(
        screen.getByRole('button', { name: new RegExp(instrumento.nombre) }),
      ).toBeInTheDocument();
    }
  });
});
