'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CONTACTO, WHATSAPP_URL } from '@/lib/data/contacto';
import { NAV_LINKS } from '@/lib/data/navegacion';
import { scrollSuaveAElemento, scrollSuaveHasta } from '@/lib/scroll-suave';
import { CtaLink } from '@/components/cta-link';
import { InstagramIcon } from '@/components/icons/instagram-icon';
import { Logo } from '@/components/logo';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type NavLink = (typeof NAV_LINKS)[number];

// Ctrl/Cmd/Mays/Alt+clic o clic central (abrir en pestaña nueva, etc.) tienen
// que seguir funcionando como enlace; solo el clic normal lo gestionamos.
const esClicNormal = (event: MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Sección elegida en el menú móvil, a la espera de que el panel termine de
  // cerrarse para saltar a ella (ver irASeccionDesdeMenuMovil).
  const seccionPendiente = useRef<string | null>(null);

  // Scroll-spy: en la home cada opción del menú es una sección de la misma
  // página, y se marca la que cruza la línea central de la pantalla.
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    for (const { id } of NAV_LINKS) {
      const seccion = document.getElementById(id);
      if (seccion) observer.observe(seccion);
    }

    return () => observer.disconnect();
  }, [isHome]);

  // En la home el menú salta a las secciones; desde cualquier otra ruta lleva
  // a la página de cada apartado (y marca también sus subrutas, p. ej.
  // /tratamientos/maderoterapia activa "Tratamientos").
  const hrefFor = (link: NavLink) => (isHome ? `#${link.id}` : link.href);
  const isActive = (link: NavLink) =>
    isHome
      ? activeSection === link.id
      : link.href !== '/' && pathname.startsWith(link.href);
  // "true" marca la sección visible dentro de la página; "page", la página.
  const ariaCurrent = (link: NavLink) =>
    isActive(link) ? (isHome ? 'true' : 'page') : undefined;

  // En la home, un <Link href="/"> apunta a la URL actual y Next no hace
  // nada, así que el logo sube a mano.
  const subirAlInicio = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome || !esClicNormal(event)) return;
    event.preventDefault();
    scrollSuaveHasta(0);
    // Quita el #seccion que hubiera dejado el menú.
    window.history.replaceState(null, '', '/');
  };

  // En la home el menú anima el scroll nosotros (lib/scroll-suave) en vez de
  // dejar el salto al ancla: el scroll suave del CSS tiene la duración y la
  // curva del navegador, y entre secciones de una pantalla sale seco. Al
  // cancelar el ancla nativa también se pierde que el siguiente Tab continúe
  // desde la sección, así que se le da el foco (sin scroll, ya lo anima el
  // script). Con la sección ausente el enlace sigue su curso normal.
  const desplazarASeccion = (id: string) => {
    const seccion = document.getElementById(id);
    if (!seccion) return false;
    seccion.tabIndex = -1;
    seccion.focus({ preventScroll: true });
    scrollSuaveAElemento(seccion);
    window.history.replaceState(null, '', `#${id}`);
    return true;
  };

  const irASeccion = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome || !esClicNormal(event)) return;
    if (desplazarASeccion(id)) event.preventDefault();
  };

  // En el menú móvil no se salta en el clic: mientras el panel está abierto
  // Base UI bloquea el scroll de la página y, al cerrarlo, la devuelve a donde
  // estaba al abrirlo, lo que pisaría la animación. Se espera a que termine de
  // cerrarse (onOpenChangeComplete).
  const irASeccionDesdeMenuMovil = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    setMobileNavOpen(false);
    if (!isHome || !esClicNormal(event) || !document.getElementById(id)) return;
    event.preventDefault();
    seccionPendiente.current = id;
  };

  const alTerminarDeCambiarElMenuMovil = (abierto: boolean) => {
    const id = seccionPendiente.current;
    seccionPendiente.current = null;
    if (!abierto && id !== null) desplazarASeccion(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          onClick={subirAlInicio}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={hrefFor(link)}
                  onClick={(event) => irASeccion(event, link.id)}
                  aria-current={ariaCurrent(link)}
                  className={cn(
                    // Subrayado fino que crece desde la izquierda: marca la
                    // sección actual y se anticipa en hover.
                    'relative py-2 text-[0.7rem] tracking-[0.18em] uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 motion-reduce:after:transition-none',
                    isActive(link)
                      ? 'text-foreground after:scale-x-100'
                      : 'text-muted-foreground after:scale-x-0',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 lg:gap-2">
          {/* Un <a> nativo con el aspecto de botón (buttonVariants), no
            <Button render={<a/>}>: Base UI le pondría role="button" a algo
            que navega. Un solo enlace, visible en escritorio y en móvil. */}
          <a
            href={CONTACTO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={buttonVariants({ variant: 'ghost', size: 'icon-lg' })}
          >
            <InstagramIcon className="size-5 text-primary" />
          </a>

          <CtaLink
            href={WHATSAPP_URL}
            externo
            variante="contorno"
            className="hidden h-10 px-4 lg:inline-flex"
          >
            Reservar por WhatsApp
          </CtaLink>

          <Sheet
            open={mobileNavOpen}
            onOpenChange={setMobileNavOpen}
            onOpenChangeComplete={alTerminarDeCambiarElMenuMovil}
          >
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Abrir menú"
                  className="xl:hidden"
                />
              }
            >
              <MenuIcon strokeWidth={1.25} />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader className="px-8 pt-8">
                <SheetTitle className="text-etiqueta font-normal text-muted-foreground uppercase">
                  Menú
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Principal" className="px-8">
                <ul className="flex flex-col gap-2">
                  {NAV_LINKS.map((link, i) => (
                    <li
                      key={link.id}
                      // Entrada escalonada mientras el panel termina de deslizar.
                      style={{ animationDelay: `${150 + i * 60}ms` }}
                      className="animate-in duration-500 ease-out fill-mode-both fade-in slide-in-from-right-6 motion-reduce:animate-none"
                    >
                      <Link
                        href={hrefFor(link)}
                        onClick={(event) =>
                          irASeccionDesdeMenuMovil(event, link.id)
                        }
                        aria-current={ariaCurrent(link)}
                        className={cn(
                          'block py-1 font-heading text-4xl font-light transition-colors hover:text-foreground',
                          isActive(link)
                            ? 'text-foreground italic'
                            : 'text-muted-foreground',
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <CtaLink
                href={WHATSAPP_URL}
                externo
                className="mx-8 mt-auto mb-8"
              >
                Reservar por WhatsApp
              </CtaLink>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
