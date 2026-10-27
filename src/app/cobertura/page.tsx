import { CtaLink } from '@/components/cta-link';
import { EncabezadoPagina } from '@/components/encabezado-pagina';
import { JsonLd } from '@/components/json-ld';
import { TextoPendiente } from '@/components/texto-pendiente';
import { COBERTURA } from '@/lib/data/cobertura';
import { WHATSAPP_URL } from '@/lib/data/contacto';
import { SUPLEMENTO_DESPLAZAMIENTO } from '@/lib/data/tarifas';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

const title = 'Zonas de cobertura';
const description =
  'Zonas de Madrid donde Maderolux ofrece maderoterapia a domicilio.';

export const metadata = pageMetadata({
  title,
  description,
  path: '/cobertura',
});

export default function CoberturaPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: title, path: '/cobertura' },
        ])}
      />
      <EncabezadoPagina
        etiqueta="A domicilio"
        titulo={
          <>
            Zonas de <em>cobertura</em>
          </>
        }
      >
        Estas son las zonas de Madrid donde hago los tratamientos a domicilio.
      </EncabezadoPagina>

      {!COBERTURA.confirmada && (
        <TextoPendiente className="mt-10 max-w-xl">
          Listado de zonas por confirmar.
        </TextoPendiente>
      )}

      <section aria-labelledby="capital-titulo" className="mt-16">
        <h2 id="capital-titulo" className="font-heading text-4xl font-light">
          Madrid capital
        </h2>
        <ul className="mt-8 columns-2 gap-10 border-t border-border pt-6 md:columns-3">
          {COBERTURA.distritos.map((distrito) => (
            <li key={distrito} className="break-inside-avoid py-2">
              {distrito}
            </li>
          ))}
        </ul>
      </section>

      {COBERTURA.municipios.length > 0 && (
        <section aria-labelledby="municipios-titulo" className="mt-16">
          <h2
            id="municipios-titulo"
            className="font-heading text-4xl font-light"
          >
            Alrededores
          </h2>
          <ul className="mt-8 columns-2 gap-10 border-t border-border pt-6 md:columns-3">
            {COBERTURA.municipios.map((municipio) => (
              <li key={municipio} className="break-inside-avoid py-2">
                {municipio}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        aria-labelledby="desplazamiento-titulo"
        className="mt-16 max-w-xl"
      >
        <h2
          id="desplazamiento-titulo"
          className="text-etiqueta text-muted-foreground uppercase"
        >
          Desplazamiento
        </h2>
        <div className="mt-4 text-muted-foreground">
          {SUPLEMENTO_DESPLAZAMIENTO ?? (
            <TextoPendiente>
              Condiciones de desplazamiento por confirmar.
            </TextoPendiente>
          )}
        </div>
      </section>

      <div className="mt-20 flex flex-col items-start gap-6 border-t border-border pt-12">
        <p className="font-heading text-3xl">¿No ves tu zona?</p>
        <CtaLink href={WHATSAPP_URL} externo variante="contorno">
          Pregúntame por WhatsApp
        </CtaLink>
      </div>
    </main>
  );
}
