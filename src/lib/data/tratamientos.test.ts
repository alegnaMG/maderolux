import { describe, expect, it } from 'vitest';

import { getTratamiento, TRATAMIENTOS } from './tratamientos';

describe('TRATAMIENTOS', () => {
  it('usa slugs únicos y aptos para URL', () => {
    const slugs = TRATAMIENTOS.map((tratamiento) => tratamiento.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('incluye la maderoterapia, el tratamiento principal', () => {
    expect(TRATAMIENTOS.map((tratamiento) => tratamiento.slug)).toContain(
      'maderoterapia',
    );
  });
});

describe('getTratamiento', () => {
  it('devuelve el tratamiento que corresponde al slug', () => {
    expect(getTratamiento('maderoterapia')?.nombre).toBe('Maderoterapia');
  });

  it('devuelve undefined si el slug no existe', () => {
    expect(getTratamiento('no-existe')).toBeUndefined();
  });
});

describe('contenido de cada tratamiento', () => {
  it.each(TRATAMIENTOS)(
    '$nombre tiene todas sus secciones con contenido',
    (t) => {
      expect(t.descripcion.length).toBeGreaterThan(0);
      expect(t.beneficios.length).toBeGreaterThan(0);
      expect(t.sesion.length).toBeGreaterThan(0);
      expect(t.contraindicaciones.length).toBeGreaterThan(0);
      expect(t.preguntas.length).toBeGreaterThan(0);
    },
  );

  it.each(TRATAMIENTOS)('$nombre no repite preguntas frecuentes', (t) => {
    const preguntas = t.preguntas.map((p) => p.pregunta);
    expect(new Set(preguntas).size).toBe(preguntas.length);
  });
});
