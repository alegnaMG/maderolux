import { describe, expect, it } from 'vitest';

import { NAV_LINKS } from './navegacion';

describe('NAV_LINKS', () => {
  it('empieza por Inicio apuntando a la home', () => {
    expect(NAV_LINKS[0]).toEqual({ id: 'inicio', href: '/', label: 'Inicio' });
  });

  it('usa rutas internas absolutas y sin repetir', () => {
    const hrefs = NAV_LINKS.map((link) => link.href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) {
      expect(href).toMatch(/^\//);
    }
  });

  it('usa ids de sección únicos y aptos para un ancla', () => {
    const ids = NAV_LINKS.map((link) => link.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z]+(-[a-z]+)*$/);
    }
  });
});
