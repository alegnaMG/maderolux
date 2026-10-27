import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { Instrumento } from '@/lib/data/instrumentos';

import { ExploradorInstrumentos } from './explorador-instrumentos';

const FOTO = {
  src: '/fotos/instrumentos.webp',
  alt: 'Instrumentos de madera',
  ia: true,
  ancho: 800,
  alto: 400,
};

const INSTRUMENTOS: Instrumento[] = [
  {
    id: 'rodillo',
    nombre: 'Rodillo',
    zonas: 'Piernas',
    descripcion: 'Amasa el tejido.',
    posicion: { x: 20, y: 30 },
  },
  {
    id: 'copa',
    nombre: 'Copa',
    zonas: 'Abdomen',
    descripcion: 'Desliza con succión.',
    posicion: { x: 60, y: 50 },
  },
];

function renderizar() {
  return render(
    <ExploradorInstrumentos foto={FOTO} instrumentos={INSTRUMENTOS} />,
  );
}

describe('ExploradorInstrumentos', () => {
  it('muestra la foto con su texto alternativo', () => {
    renderizar();

    expect(
      screen.getByRole('img', { name: 'Instrumentos de madera' }),
    ).toBeVisible();
  });

  it('ofrece un botón accesible por instrumento, con el primero elegido', () => {
    renderizar();

    expect(screen.getByRole('button', { name: /Rodillo/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: /Copa/ })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(
      screen.getByRole('heading', { level: 3, name: 'Rodillo' }),
    ).toBeVisible();
  });

  it('cambia la ficha al elegir otro instrumento en la lista', async () => {
    const user = userEvent.setup();
    renderizar();

    await user.click(screen.getByRole('button', { name: /Copa/ }));

    expect(screen.getByRole('button', { name: /Copa/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      screen.getByRole('heading', { level: 3, name: 'Copa' }),
    ).toBeVisible();
    expect(screen.getByText('Abdomen')).toBeVisible();
    expect(screen.getByText('Desliza con succión.')).toBeVisible();
  });

  it('también cambia la ficha al pulsar el número sobre la foto', async () => {
    const user = userEvent.setup();
    renderizar();

    // Los puntos están fuera del árbol accesible (la lista es el control
    // real), así que se buscan incluyendo los elementos ocultos.
    const puntos = screen
      .getAllByRole('button', { hidden: true })
      .filter((boton) => boton.getAttribute('aria-hidden') === 'true');
    expect(puntos).toHaveLength(2);
    expect(puntos[1]).toHaveAttribute('tabindex', '-1');

    await user.click(puntos[1]);

    expect(
      screen.getByRole('heading', { level: 3, name: 'Copa' }),
    ).toBeVisible();
  });

  it('coloca cada punto en su posición sobre la foto', () => {
    renderizar();

    const [primero] = screen
      .getAllByRole('button', { hidden: true })
      .filter((boton) => boton.getAttribute('aria-hidden') === 'true');
    expect(primero).toHaveStyle({ left: '20%', top: '30%' });
  });

  it('anuncia la ficha nueva a los lectores de pantalla', () => {
    renderizar();

    const ficha = screen
      .getByRole('heading', { level: 3, name: 'Rodillo' })
      .closest('[aria-live]');
    expect(ficha).toHaveAttribute('aria-live', 'polite');
    expect(within(ficha as HTMLElement).getByText('Piernas')).toBeVisible();
  });
});
