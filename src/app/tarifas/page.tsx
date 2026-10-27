import { CtaLink } from '@/components/cta-link';
import { EncabezadoPagina } from '@/components/encabezado-pagina';
import { JsonLd } from '@/components/json-ld';
import { ListaTarifas } from '@/components/lista-tarifas';
import { TextoPendiente } from '@/components/texto-pendiente';
import { WHATSAPP_URL } from '@/lib/data/contacto';
import {
  FORMAS_DE_PAGO,
  SUPLEMENTO_DESPLAZAMIENTO,
  tarifasDe,
} from '@/lib/data/tarifas';
import { TRATAMIENTOS } from '@/lib/data/tratamientos';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

const title = 'Tarifas';
const description =
  'Precios de las sesiones y bonos de maderoterapia a domicilio en Madrid.';

export const metadata = pageMetadata({ title, description, path: '/tarifas' });

export default function TarifasPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 md:py-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: title, path: '/tarifas' },
        ])}
      />
      <EncabezadoPagina etiqueta="Sesiones y bonos" titulo={title}>
        Sesiones sueltas y bonos para tratamientos a domicilio en Madrid.
      </EncabezadoPagina>

      {TRATAMIENTOS.map((tratamiento) => (
        <section
          key={tratamiento.slug}
          aria-labelledby={`tarifas-${tratamiento.slug}`}
          className="mt-16"
        >
          <h2
            id={`tarifas-${tratamiento.slug}`}
            className="text-etiqueta text-muted-foreground uppercase"
          >
            {tratamiento.nombre}
          </h2>
          <div className="mt-4">
            <ListaTarifas tarifas={tarifasDe(tratamiento.slug)} />
          </div>
        </section>
      ))}

      <section aria-labelledby="condiciones-titulo" className="mt-16">
        <h2
          id="condiciones-titulo"
          className="text-etiqueta text-muted-foreground uppercase"
        >
          Condiciones
        </h2>
        <dl className="mt-4 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          <div>
            <dt className="font-heading text-2xl">Desplazamiento</dt>
            <dd className="mt-2 text-muted-foreground">
              {SUPLEMENTO_DESPLAZAMIENTO ?? (
                <TextoPendiente>Por confirmar.</TextoPendiente>
              )}
            </dd>
          </div>
          <div>
            <dt className="font-heading text-2xl">Formas de pago</dt>
            <dd className="mt-2 text-muted-foreground">
              {FORMAS_DE_PAGO?.join(', ') ?? (
                <TextoPendiente>Por confirmar.</TextoPendiente>
              )}
            </dd>
          </div>
        </dl>
      </section>

      <CtaLink href={WHATSAPP_URL} externo className="mt-16">
        Reservar por WhatsApp
      </CtaLink>
    </main>
  );
}
