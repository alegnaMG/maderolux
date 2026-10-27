import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextoPendiente } from './texto-pendiente';

describe('TextoPendiente', () => {
  it('muestra el texto tal cual, sin etiquetas internas', () => {
    render(<TextoPendiente>Listado de zonas por confirmar.</TextoPendiente>);

    expect(screen.getByText('Listado de zonas por confirmar.')).toBeVisible();
    expect(screen.queryByText(/pendiente/i)).not.toBeInTheDocument();
  });

  it('aplica la className recibida', () => {
    render(<TextoPendiente className="mt-4">Por confirmar.</TextoPendiente>);

    expect(screen.getByText('Por confirmar.').parentElement).toHaveClass(
      'mt-4',
    );
  });
});
