import { CtaLink } from '@/components/cta-link';
import { EncabezadoPagina } from '@/components/encabezado-pagina';
import { InstagramIcon } from '@/components/icons/instagram-icon';
import { JsonLd } from '@/components/json-ld';
import { CONTACTO, WHATSAPP_URL } from '@/lib/data/contacto';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';

const title = 'Contacto';
const description =
  'Reserva tu sesión de maderoterapia a domicilio en Madrid por WhatsApp o email.';

export const metadata = pageMetadata({ title, description, path: '/contacto' });

const PASOS = [
  {
    titulo: 'Escríbeme',
    texto:
      'Cuéntame qué tratamiento te interesa y en qué zona de Madrid vives.',
  },
  {
    titulo: 'Elegimos el día',
    texto: 'Te propongo días y horas libres y elegimos la que mejor te venga.',
  },
  {
    titulo: 'Voy a tu casa',
    texto: 'El día acordado hacemos la sesión en tu casa.',
  },
] as const;

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: title, path: '/contacto' },
        ])}
      />
      <EncabezadoPagina
        etiqueta={title}
        titulo={
          <>
            Reserva tu <em>sesión</em>.
          </>
        }
      >
        La forma más rápida es WhatsApp. Si lo prefieres, también puedes
        escribirme un email o un mensaje por Instagram.
      </EncabezadoPagina>

      <div className="mt-10 flex flex-wrap items-center gap-8">
        <CtaLink href={WHATSAPP_URL} externo>
          Reservar por WhatsApp
        </CtaLink>
        <a
          href={`mailto:${CONTACTO.email}`}
          className="text-sm underline decoration-miel underline-offset-4"
        >
          {CONTACTO.email}
        </a>
        <a
          href={CONTACTO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${CONTACTO.instagramUsuario}`}
          className="inline-flex items-center gap-2 text-sm underline decoration-miel underline-offset-4"
        >
          <InstagramIcon className="size-4 text-primary" />
          {CONTACTO.instagramUsuario}
        </a>
      </div>

      <section aria-labelledby="pasos-titulo" className="mt-24">
        <h2
          id="pasos-titulo"
          className="text-etiqueta text-muted-foreground uppercase"
        >
          Cómo reservar
        </h2>
        <ol className="mt-6 grid gap-10 md:grid-cols-3">
          {PASOS.map((paso, i) => (
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
              <h3 className="mt-4 font-heading text-2xl">{paso.titulo}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {paso.texto}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
