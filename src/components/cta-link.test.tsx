import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CtaLink, ctaVariants } from './cta-link';

describe('CtaLink', () => {
  it('navega dentro del sitio sin abrir pestaña nueva', () => {
    render(<CtaLink href="/tarifas">Ver tarifas</CtaLink>);

    const enlace = screen.getByRole('link', { name: 'Ver tarifas' });
    expect(enlace).toHaveAttribute('href', '/tarifas');
    expect(enlace).not.toHaveAttribute('target');
  });

  it('abre los enlaces externos en una pestaña nueva y segura', () => {
    render(
      <CtaLink href="https://example.com/reservas" externo>
        Reservar
      </CtaLink>,
    );

    const enlace = screen.getByRole('link', { name: 'Reservar' });
    expect(enlace).toHaveAttribute('href', 'https://example.com/reservas');
    expect(enlace).toHaveAttribute('target', '_blank');
    expect(enlace).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('deja la flecha fuera del nombre accesible', () => {
    render(<CtaLink href="/">Volver al inicio</CtaLink>);

    expect(
      screen.getByRole('link', { name: 'Volver al inicio' }),
    ).toBeVisible();
  });

  it('aplica la variante y la className recibidas', () => {
    render(
      <CtaLink href="/" variante="claro" className="mt-10">
        Inicio
      </CtaLink>,
    );

    const enlace = screen.getByRole('link', { name: 'Inicio' });
    expect(enlace).toHaveClass('mt-10', 'text-oscuro-foreground');
  });
});

describe('ctaVariants', () => {
  it('usa la variante sólida por defecto', () => {
    expect(ctaVariants()).toContain('bg-primary');
  });
});
