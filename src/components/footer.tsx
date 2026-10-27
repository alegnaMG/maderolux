import Link from 'next/link';

import { CONTACTO, WHATSAPP_URL } from '@/lib/data/contacto';
import { hayFotosConIA } from '@/lib/data/fotos';
import { NAV_LINKS } from '@/lib/data/navegacion';
import { SITE_NAME } from '@/lib/seo';
import { cn } from '@/lib/utils';
import { InstagramIcon } from '@/components/icons/instagram-icon';
import { Logo } from '@/components/logo';

const enlace =
  'text-oscuro-foreground/75 transition-colors hover:text-oscuro-foreground';

export function Footer({
  avisoIA = hayFotosConIA(),
}: {
  /** Aviso de imágenes generadas con IA; por defecto, si alguna de FOTOS lo es. */
  avisoIA?: boolean;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-oscuro text-oscuro-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-oscuro-foreground/75">
            Maderoterapia y tratamientos estéticos a domicilio en Madrid.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-etiqueta text-oscuro-foreground/60 uppercase">
            Páginas
          </h2>
          <ul className="mt-5 flex flex-col gap-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={enlace}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-etiqueta text-oscuro-foreground/60 uppercase">
            Reservas
          </h2>
          <ul className="mt-5 flex flex-col gap-2.5 text-sm">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={enlace}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACTO.email}`} className={enlace}>
                {CONTACTO.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACTO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${CONTACTO.instagramUsuario}`}
                className={cn(enlace, 'inline-flex items-center gap-2')}
              >
                <InstagramIcon className="size-4" />
                {CONTACTO.instagramUsuario}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-oscuro-foreground/15 px-6 py-6">
        <p className="mx-auto max-w-6xl text-xs text-oscuro-foreground/60">
          © {year} {SITE_NAME}. Todos los derechos reservados.
          {avisoIA &&
            ' Imágenes ilustrativas generadas con inteligencia artificial.'}
        </p>
      </div>
    </footer>
  );
}
