import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { JsonLd } from './json-ld';

// Un <script> no tiene rol accesible: aquí sí es legítimo consultar el DOM.
function scriptJsonLd(container: HTMLElement) {
  return container.querySelector('script[type="application/ld+json"]');
}

describe('JsonLd', () => {
  it('serializa los datos en un script application/ld+json', () => {
    const data = { '@type': 'Thing', name: 'Maderolux' };

    const { container } = render(<JsonLd data={data} />);

    expect(JSON.parse(scriptJsonLd(container)!.textContent!)).toEqual(data);
  });

  it('escapa "<" para que un valor no pueda cerrar la etiqueta script', () => {
    const { container } = render(
      <JsonLd data={{ name: '</script><b>inyectado</b>' }} />,
    );

    const script = scriptJsonLd(container)!;
    expect(script.innerHTML).not.toContain('</script>');
    expect(script.innerHTML).toContain('\\u003c/script>');
    expect(container.querySelector('b')).toBeNull();
  });
});
