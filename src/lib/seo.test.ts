import { afterEach, describe, expect, it, vi } from 'vitest';

describe('SITE_URL', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('usa el dominio de producción como fallback cuando no hay variable de entorno', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', undefined);
    vi.resetModules();

    const { SITE_URL } = await import('./seo');

    expect(SITE_URL).toBe('https://maderolux.com');
  });

  it('usa NEXT_PUBLIC_SITE_URL cuando está definida', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://staging.maderolux.com');
    vi.resetModules();

    const { SITE_URL } = await import('./seo');

    expect(SITE_URL).toBe('https://staging.maderolux.com');
  });
});

describe('SITE_OG_DEFAULTS', () => {
  it('expone los valores por defecto de Open Graph del sitio', async () => {
    const { SITE_OG_DEFAULTS } = await import('./seo');

    expect(SITE_OG_DEFAULTS).toEqual({
      siteName: 'Maderolux',
      locale: 'es_ES',
      type: 'website',
    });
  });
});

describe('withBrand', () => {
  it('añade el sufijo de marca al título recibido', async () => {
    const { withBrand } = await import('./seo');

    expect(withBrand('Tarifas')).toBe('Tarifas | Maderolux');
  });
});

describe('pageMetadata', () => {
  it('genera title, canonical, Open Graph y Twitter coherentes para la ruta', async () => {
    const { pageMetadata } = await import('./seo');

    expect(
      pageMetadata({
        title: 'Tarifas',
        description: 'Precios de las sesiones.',
        path: '/tarifas',
      }),
    ).toEqual({
      title: 'Tarifas',
      description: 'Precios de las sesiones.',
      alternates: { canonical: '/tarifas' },
      openGraph: {
        title: 'Tarifas | Maderolux',
        description: 'Precios de las sesiones.',
        url: '/tarifas',
        siteName: 'Maderolux',
        locale: 'es_ES',
        type: 'website',
      },
      twitter: {
        title: 'Tarifas | Maderolux',
        description: 'Precios de las sesiones.',
        card: 'summary_large_image',
      },
    });
  });
});

describe('breadcrumbJsonLd', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('genera un BreadcrumbList con posiciones consecutivas desde 1 y URLs absolutas', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://maderolux.com');
    vi.resetModules();

    const { breadcrumbJsonLd } = await import('./seo');

    expect(
      breadcrumbJsonLd([
        { name: 'Inicio', path: '/' },
        { name: 'Tarifas', path: '/tarifas' },
      ]),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://maderolux.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tarifas',
          item: 'https://maderolux.com/tarifas',
        },
      ],
    });
  });
});
