import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CtaLink } from '@/components/cta-link';
import { EncabezadoPagina } from '@/components/encabezado-pagina';
import { Foto } from '@/components/foto';
import { JsonLd } from '@/components/json-ld';
import { PreguntasFrecuentes } from '@/components/preguntas-frecuentes';
import { ContactoSection } from '@/components/sections/contacto-section';
import { WHATSAPP_URL } from '@/lib/data/contacto';
import { precioDesde } from '@/lib/data/tarifas';
import { getTratamiento, TRATAMIENTOS } from '@/lib/data/tratamientos';
import { formatearPrecio } from '@/lib/formato';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

// Solo existen los slugs de TRATAMIENTOS: cualquier otro da 404 sin llegar a
// renderizar la página.
export const dynamicParams = false;

/** Una página estática por tratamiento, generada en el build. */
export function generateStaticParams() {
  return TRATAMIENTOS.map((tratamiento) => ({ slug: tratamiento.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/tratamientos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const tratamiento = getTratamiento(slug);
  if (!tratamiento) notFound();

  return pageMetadata({
    title: `${tratamiento.nombre} a domicilio en Madrid`,
    description: tratamiento.resumen,
    path: `/tratamientos/${slug}`,
  });
}

/** Valor de los datos rápidos que aún no está confirmado. */
function PorConfirmar() {
  return <span className="text-muted-foreground italic">Por confirmar</span>;
}

// Bloque de texto con el título en la columna estrecha y el contenido en la
// ancha; se repite en "Qué es", "Qué te aporta" y "Cuándo no está indicada".
const bloque =
  'grid gap-8 border-t border-border py-20 revelar md:grid-cols-[1fr_2fr] md:gap-16 md:py-28';
const tituloBloque = 'font-heading text-titulo font-light';

export default async function TratamientoPage({
  params,
}: PageProps<'/tratamientos/[slug]'>) {
  const { slug } = await params;
  const tratamiento = getTratamiento(slug);
  if (!tratamiento) notFound();

  const desde = precioDesde(slug);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Tratamientos', path: '/tratamientos' },
          { name: tratamiento.nombre, path: `/tratamientos/${slug}` },
        ])}
      />

      <div className="grid md:grid-sangrado">
        <div className="px-6 py-20 md:col-[contenido-inicio/mitad] md:py-28 md:pr-16 md:pl-0">
          <EncabezadoPagina
            etiqueta="Tratamiento a domicilio"
            titulo={tratamiento.nombre}
          >
            {tratamiento.resumen}
          </EncabezadoPagina>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-6">
            <div>
              <dt className="text-etiqueta text-muted-foreground uppercase">
                Duración
              </dt>
              <dd className="mt-2 font-heading text-2xl">
                {tratamiento.duracionMinutos ? (
                  `${tratamiento.duracionMinutos} min`
                ) : (
                  <PorConfirmar />
                )}
              </dd>
            </div>
            <div>
              <dt className="text-etiqueta text-muted-foreground uppercase">
                Precio
              </dt>
              <dd className="mt-2 font-heading text-2xl">
                {desde !== null ? (
                  `Desde ${formatearPrecio(desde)}`
                ) : (
                  <PorConfirmar />
                )}
              </dd>
            </div>
            <div>
              <dt className="text-etiqueta text-muted-foreground uppercase">
                Dónde
              </dt>
              <dd className="mt-2 font-heading text-2xl">En tu casa</dd>
            </div>
          </dl>

          <CtaLink href={WHATSAPP_URL} externo className="mt-10">
            Reservar por WhatsApp
          </CtaLink>
        </div>

        <Foto
          hueco={tratamiento.foto}
          fundido="izquierda"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-4/3 md:col-[mitad/borde-fin] md:aspect-auto md:min-h-[32rem]"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <section aria-labelledby="que-es-titulo" className={bloque}>
          <h2 id="que-es-titulo" className={tituloBloque}>
            Qué <em>es</em>
          </h2>
          <div className="max-w-prose space-y-6 text-lg leading-relaxed text-muted-foreground">
            {tratamiento.descripcion.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="beneficios-titulo" className={bloque}>
          <h2 id="beneficios-titulo" className={tituloBloque}>
            Qué te <em>aporta</em>
          </h2>
          <ul className="border-t border-border">
            {tratamiento.beneficios.map((beneficio) => (
              <li
                key={beneficio}
                className="flex items-baseline gap-5 border-b border-border py-5 text-lg"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-miel"
                />
                {beneficio}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Aquí la numeración sí cuenta algo: los pasos van en este orden. */}
      <section
        id="sesion"
        aria-labelledby="sesion-titulo"
        className="scroll-mt-20 border-y border-border bg-muted"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2 id="sesion-titulo" className={tituloBloque}>
            Cómo es una <em>sesión</em>
          </h2>
          <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {tratamiento.sesion.map((paso, i) => (
              <li
                key={paso.titulo}
                className="border-t border-foreground/20 pt-6"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-5xl font-light text-primary"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-etiqueta uppercase">{paso.titulo}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {paso.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <section
          aria-labelledby="contraindicaciones-titulo"
          className={cn(bloque, 'border-t-0')}
        >
          <h2 id="contraindicaciones-titulo" className={tituloBloque}>
            Cuándo <em>no</em> está indicada
          </h2>
          <div className="max-w-prose">
            <p className="text-lg leading-relaxed">
              La {tratamiento.nombre.toLowerCase()} no está indicada, o necesita
              el visto bueno de tu médico, si:
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-miel">
              {tratamiento.contraindicaciones.map((caso) => (
                <li key={caso}>{caso}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              En la valoración inicial repasamos estos puntos contigo. Si tienes
              dudas, consulta con tu médico antes de reservar.
            </p>
          </div>
        </section>

        <div className="border-t border-border py-20 md:py-28">
          <PreguntasFrecuentes preguntas={tratamiento.preguntas} />
        </div>
      </div>

      <div className="border-t border-border">
        <ContactoSection />
      </div>
    </main>
  );
}
