import { CtaLink } from '@/components/cta-link';
import { EncabezadoPagina } from '@/components/encabezado-pagina';
import { Foto } from '@/components/foto';
import { JsonLd } from '@/components/json-ld';
import { Sello } from '@/components/sello';
import { TextoPendiente } from '@/components/texto-pendiente';
import { CONTACTO, WHATSAPP_URL } from '@/lib/data/contacto';
import { FOTOS } from '@/lib/data/fotos';
import { SOBRE_MI } from '@/lib/data/sobre-mi';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

const title = 'Sobre mí';
const description = `Conoce a ${CONTACTO.nombre}, la profesional detrás de Maderolux: maderoterapia a domicilio en Madrid.`;
const nombrePila = CONTACTO.nombre.split(' ')[0];

export const metadata = pageMetadata({ title, description, path: '/sobre-mi' });

export default function SobreMiPage() {
  return (
    <main className="grid md:grid-sangrado">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: title, path: '/sobre-mi' },
        ])}
      />

      <div className="relative md:col-[borde-inicio/mitad]">
        <Foto
          hueco={FOTOS.sobreMi}
          fundido="derecha"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-4/5 h-full w-full md:aspect-auto md:min-h-[40rem]"
        />
        <div className="absolute right-6 -bottom-14 rounded-full bg-background p-2 md:top-16 md:-right-20 md:bottom-auto">
          <Sello className="size-28 md:size-36" />
        </div>
      </div>

      <div className="px-6 py-20 md:col-[mitad/contenido-fin] md:py-28 md:pr-0 md:pl-24">
        <EncabezadoPagina
          etiqueta={title}
          titulo={
            <>
              Hola, soy <em>{nombrePila}</em>.
            </>
          }
        />

        <div className="mt-8 max-w-prose space-y-6 text-lg leading-relaxed text-muted-foreground">
          {SOBRE_MI.presentacion?.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          )) ?? (
            <TextoPendiente>
              Muy pronto, mi historia y mi forma de trabajar.
            </TextoPendiente>
          )}
        </div>

        <section aria-labelledby="formacion-titulo" className="mt-14">
          <h2
            id="formacion-titulo"
            className="text-etiqueta text-muted-foreground uppercase"
          >
            Formación
          </h2>
          {SOBRE_MI.formacion ? (
            <ul className="mt-4 border-t border-border">
              {SOBRE_MI.formacion.map((linea) => (
                <li key={linea} className="border-b border-border py-4">
                  {linea}
                </li>
              ))}
            </ul>
          ) : (
            <TextoPendiente className="mt-4">
              Formación y experiencia, muy pronto.
            </TextoPendiente>
          )}
        </section>

        <CtaLink href={WHATSAPP_URL} externo className="mt-14">
          Reservar por WhatsApp
        </CtaLink>
      </div>
    </main>
  );
}
