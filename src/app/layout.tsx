import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';

import './globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { CONTACTO } from '@/lib/data/contacto';
import { TRATAMIENTOS } from '@/lib/data/tratamientos';
import {
  SITE_NAME,
  SITE_OG_DEFAULTS,
  SITE_TWITTER_DEFAULTS,
  SITE_URL,
} from '@/lib/seo';

// Jost (geométrica, de la familia de Futura) para texto, menú y etiquetas:
// con mayúsculas y tracking amplio da el tono del mockup. Cormorant Garamond
// para titulares: fina en peso 300 y con una cursiva caligráfica que
// reservamos para la palabra clave de cada titular.
const jost = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
});

const title = 'Maderolux | Maderoterapia a domicilio en Madrid';
const description =
  'Maderoterapia y tratamientos estéticos a domicilio en Madrid. Tu momento de bienestar, sin salir de casa.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
    ...SITE_OG_DEFAULTS,
  },
  twitter: {
    title,
    description,
    ...SITE_TWITTER_DEFAULTS,
  },
};

// Servicio a domicilio sin local físico: por eso no hay streetAddress y la
// zona se declara con areaServed.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: SITE_NAME,
  description,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  telephone: CONTACTO.telefonoWhatsapp,
  email: CONTACTO.email,
  areaServed: { '@type': 'City', name: 'Madrid' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madrid',
    addressCountry: 'ES',
  },
  sameAs: [CONTACTO.instagram],
  founder: { '@type': 'Person', name: CONTACTO.nombre },
  makesOffer: TRATAMIENTOS.map((tratamiento) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: tratamiento.nombre,
      url: `${SITE_URL}/tratamientos/${tratamiento.slug}`,
    },
  })),
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es"
      className={`${jost.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={jsonLd} />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
