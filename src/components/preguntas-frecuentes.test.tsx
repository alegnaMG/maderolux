import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PreguntasFrecuentes } from './preguntas-frecuentes';

const PREGUNTAS = [
  { pregunta: '¿Duele?', respuesta: 'No debería.' },
  { pregunta: '¿Qué necesito en casa?', respuesta: null },
];

describe('PreguntasFrecuentes', () => {
  it('es una región con nombre y una pregunta plegable por entrada', () => {
    render(<PreguntasFrecuentes preguntas={PREGUNTAS} />);

    expect(
      screen.getByRole('region', { name: 'Preguntas frecuentes' }),
    ).toBeVisible();
    expect(screen.getAllByRole('group')).toHaveLength(2);
  });

  it('despliega la respuesta al pulsar la pregunta', async () => {
    const user = userEvent.setup();
    render(<PreguntasFrecuentes preguntas={PREGUNTAS} />);

    const [primera] = screen.getAllByRole('group');
    expect(primera).not.toHaveAttribute('open');

    await user.click(screen.getByText('¿Duele?'));

    expect(primera).toHaveAttribute('open');
    expect(screen.getByText('No debería.')).toBeInTheDocument();
  });

  it('anuncia como próxima la respuesta que aún no existe', () => {
    render(<PreguntasFrecuentes preguntas={PREGUNTAS} />);

    expect(screen.getByText('Respuesta muy pronto.')).toBeInTheDocument();
  });
});
