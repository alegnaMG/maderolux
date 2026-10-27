import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { EncabezadoPagina } from '@/components/encabezado-pagina';
import { Foto } from '@/components/foto';
import { JsonLd } from '@/components/json-ld';
import { precioDesde } from '@/lib/data/tarifas';
import { TRATAMIENTOS } from '@/lib/data/tratamientos';
import { formatearPrecio } from '@/lib/formato';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

const title = 'Tratamientos';
const description =
  'Maderoterapia y tratamientos estéticos corporales a domicilio en Madrid.';

export const metadata = pageMetadata({
  title,
  description,
  path: '/tratamientos',
});

export default function TratamientosPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: title, path: '/tratamientos' },
        ])}
      />
      <EncabezadoPagina etiqueta="A domicilio en Madrid" titulo={title}>
        Tratamientos corporales manuales que hago en tu casa, con el tiempo y la
        calma que necesitan.
      </EncabezadoPagina>

      <ul className="mt-16 grid gap-10 md:grid-cols-2">
        {TRATAMIENTOS.map((tratamiento) => {
          const desde = precioDesde(tratamiento.slug);
          return (
            <li key={tratamiento.slug}>
              {/* Toda la tarjeta es el enlace; su nombre accesible sale del h2. */}
              <Link
                href={`/tratamientos/${tratamiento.slug}`}
                className="group block h-full border border-border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <Foto
                  hueco={tratamiento.foto}
                  sizes="(min-width: 768px) 36rem, 100vw"
                  className="aspect-3/2"
                />
                <div className="p-8">
                  <h2 className="font-heading text-4xl font-light">
                    {tratamiento.nombre}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {tratamiento.resumen}
                  </p>
                  <p className="mt-6 flex items-center justify-between text-etiqueta uppercase">
                    {desde !== null
                      ? `Desde ${formatearPrecio(desde)} / sesión`
                      : 'Ver tratamiento'}
                    <ArrowRightIcon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    />
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
