import type { Metadata } from 'next';

export const SITE_NAME = 'Maderolux';

// TODO(Fase 4): confirmar el dominio definitivo antes del despliegue.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maderolux.com';

/**
 * La vista previa al compartir un enlace (WhatsApp, redes). Va en los
 * defaults y no como `app/opengraph-image.jpg` porque cada página declara su
 * propio `openGraph` y Next lo sustituye entero en vez de fusionarlo: la
 * imagen del layout solo llegaría a la home. La genera
 * scripts/generar-opengraph.mjs.
 */
export const IMAGEN_COMPARTIR = {
  url: '/opengraph.jpg',
  width: 1200,
  height: 630,
  alt: 'Sello de Maderolux, Lucía Sánchez: maderoterapia a domicilio en Madrid',
} as const;

// Sin `as const` en el objeto: volvería `images` un array de solo lectura,
// y Metadata lo espera mutable.
export const SITE_OG_DEFAULTS = {
  siteName: SITE_NAME,
  locale: 'es_ES',
  type: 'website' as const,
  images: [IMAGEN_COMPARTIR],
};

export const SITE_TWITTER_DEFAULTS = {
  card: 'summary_large_image' as const,
  images: [IMAGEN_COMPARTIR],
};

/** Sufijo de marca para openGraph.title, que a diferencia de <title> no hereda el title.template del layout raíz. */
export function withBrand(title: string) {
  return `${title} | ${SITE_NAME}`;
}

/**
 * Metadata completa de una página interior: title (el layout le añade la
 * marca vía template), canonical, Open Graph y Twitter. Así ninguna página
 * hereda por error el openGraph de la home.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: withBrand(title),
      description,
      url: path,
      ...SITE_OG_DEFAULTS,
    },
    twitter: {
      title: withBrand(title),
      description,
      ...SITE_TWITTER_DEFAULTS,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
