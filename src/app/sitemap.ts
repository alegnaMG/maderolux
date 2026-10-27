import type { MetadataRoute } from 'next';

import { TRATAMIENTOS } from '@/lib/data/tratamientos';
import { SITE_URL } from '@/lib/seo';

/**
 * Fecha fija de la última revisión real del contenido de cada ruta: cuando
 * cambies una página, actualiza solo su entrada. Un `new Date()` en cada
 * build movería todas las fechas a la vez y Google dejaría de fiarse de ellas.
 */
const LAST_MODIFIED = {
  home: '2026-10-27',
  tratamientos: '2026-10-27',
  'sobre-mi': '2026-10-27',
  tarifas: '2026-10-27',
  cobertura: '2026-10-27',
  contacto: '2026-10-27',
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/tratamientos`,
      lastModified: LAST_MODIFIED.tratamientos,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...TRATAMIENTOS.map((tratamiento) => ({
      url: `${SITE_URL}/tratamientos/${tratamiento.slug}`,
      lastModified: LAST_MODIFIED.tratamientos,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/tarifas`,
      lastModified: LAST_MODIFIED.tarifas,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cobertura`,
      lastModified: LAST_MODIFIED.cobertura,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/sobre-mi`,
      lastModified: LAST_MODIFIED['sobre-mi'],
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: LAST_MODIFIED.contacto,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
