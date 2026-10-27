import Image from 'next/image';

import { FOTOS, type Foto } from '@/lib/data/fotos';
import { CtaLink } from '@/components/cta-link';

// Entrada escalonada del titular: es la única animación de la página.
const entrada =
  'animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-1000 ease-out motion-reduce:animate-none';

export function HeroSection({
  foto = FOTOS.hero.foto,
}: {
  foto?: Foto | null;
}) {
  return (
    <section
      id="inicio"
      className="relative isolate scroll-mt-20 overflow-hidden bg-oscuro text-oscuro-foreground"
    >
      {foto ? (
        // La imagen LCP de la home: la única del sitio con `preload`.
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 microcemento-oscuro"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-oscuro via-oscuro/70 to-oscuro/10"
      />

      {/* Alto acotado (40rem como mucho) y texto centrado: ocupar toda la
          pantalla dejaba un hueco grande entre la cabecera y el titular. */}
      <div className="mx-auto flex min-h-[min(calc(100svh-5rem),40rem)] max-w-6xl flex-col justify-center px-6 py-14 md:py-20">
        {/* Los espacios entre líneas son explícitos: sin ellos el nombre
            accesible del h1 juntaría "momento" y "de". */}
        <h1 className="font-heading text-display font-light">
          <span className={`block ${entrada}`}>Tu momento</span>{' '}
          <span className={`block delay-150 ${entrada}`}>
            de <em>bienestar</em>,
          </span>{' '}
          <span className={`block delay-300 ${entrada}`}>
            sin salir de casa.
          </span>
        </h1>
        <p
          className={`mt-10 max-w-xs text-etiqueta text-oscuro-foreground/80 uppercase delay-500 ${entrada}`}
        >
          Tratamientos estéticos a domicilio en Madrid
        </p>
        <div className={`mt-10 delay-700 ${entrada}`}>
          <CtaLink href="#tratamientos" variante="claro">
            Descubre Maderolux
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
