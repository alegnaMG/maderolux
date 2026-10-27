import { describe, expect, it } from 'vitest';

import { CONTACTO, WHATSAPP_URL } from './contacto';

describe('CONTACTO', () => {
  it('expone el teléfono en formato internacional', () => {
    expect(CONTACTO.telefonoWhatsapp).toMatch(/^\+\d+$/);
  });

  it('apunta al perfil de Instagram con URL absoluta', () => {
    expect(CONTACTO.instagram).toBe(
      'https://www.instagram.com/maderolux_madrid',
    );
  });

  it('muestra la cuenta de Instagram con su arroba', () => {
    expect(CONTACTO.instagramUsuario).toBe('@maderolux_madrid');
    expect(
      CONTACTO.instagram.endsWith(CONTACTO.instagramUsuario.slice(1)),
    ).toBe(true);
  });
});

describe('WHATSAPP_URL', () => {
  it('deriva del teléfono quitando todo lo que no sea dígito', () => {
    const soloDigitos = CONTACTO.telefonoWhatsapp.replace(/\D/g, '');

    expect(WHATSAPP_URL).toBe(`https://wa.me/${soloDigitos}`);
    expect(WHATSAPP_URL).not.toContain('+');
  });
});
