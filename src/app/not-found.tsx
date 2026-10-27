import Link from 'next/link';

import { CtaLink } from '@/components/cta-link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-6 py-24">
      <p className="text-etiqueta text-muted-foreground uppercase">Error 404</p>
      <h1 className="mt-6 font-heading text-titulo font-light">
        Esta página <em>no existe</em>.
      </h1>
      <p className="mt-6 max-w-prose text-muted-foreground">
        Puede que el enlace esté mal escrito o que la página se haya movido.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-8">
        <CtaLink href="/">Volver al inicio</CtaLink>
        <Link
          href="/tratamientos"
          className="text-sm underline decoration-miel underline-offset-4"
        >
          Ver tratamientos
        </Link>
      </div>
    </main>
  );
}
