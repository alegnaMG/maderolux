import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Foto } from './foto';

const CON_FOTO = {
  pendiente: 'Retrato de Lucía',
  foto: { src: '/fotos/lucia.jpg', alt: 'Lucía sonriendo', ia: false },
};

describe('Foto', () => {
  it('muestra el placeholder con la descripción mientras no hay foto', () => {
    render(
      <Foto
        hueco={{ pendiente: 'Retrato de Lucía', foto: null }}
        sizes="100vw"
        className="aspect-4/5"
      />,
    );

    const placeholder = screen.getByRole('img', { name: 'Retrato de Lucía' });
    expect(placeholder.parentElement).toHaveClass('aspect-4/5');
  });

  it('muestra la foto real con su texto alternativo cuando la hay', () => {
    render(<Foto hueco={CON_FOTO} sizes="100vw" className="aspect-4/5" />);

    const foto = screen.getByRole('img', { name: 'Lucía sonriendo' });
    expect(foto.getAttribute('src')).toContain('lucia.jpg');
    expect(foto.parentElement).toHaveClass('aspect-4/5');
    expect(
      screen.queryByRole('img', { name: 'Retrato de Lucía' }),
    ).not.toBeInTheDocument();
  });

  it('no añade fundido si no se pide', () => {
    const { container } = render(<Foto hueco={CON_FOTO} sizes="100vw" />);

    // El fundido es decorativo (aria-hidden) y no tiene rol: se busca en el DOM.
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it.each([
    ['izquierda', 'md:bg-linear-to-r'],
    ['derecha', 'md:bg-linear-to-l'],
  ] as const)(
    'funde la foto hacia el texto cuando está a la %s',
    (fundido, direccion) => {
      const { container } = render(
        <Foto hueco={CON_FOTO} sizes="100vw" fundido={fundido} />,
      );

      // La dirección del degradado es justo lo que cambia entre lados, así
      // que aquí sí se comprueba la clase.
      expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
        direccion,
      );
    },
  );
});
