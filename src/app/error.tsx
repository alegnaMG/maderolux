'use client'; // Los error boundaries deben ser Client Components

import Link from 'next/link';

import { ctaVariants } from '@/components/cta-link';
import { WHATSAPP_URL } from '@/lib/data/contacto';

export default function Error({ retry }: { retry: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-6 py-24">
      <h1 className="font-heading text-titulo font-light">
        Algo ha <em>fallado</em>.
      </h1>
      <p className="mt-6 max-w-prose text-muted-foreground">
        Ha ocurrido un error inesperado al cargar esta página. Puedes volver a
        intentarlo; si sigue sin funcionar, escríbeme por WhatsApp y reservamos
        igualmente.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-8">
        {/* Es una acción, no una navegación: <button> con el aspecto de CTA. */}
        <button onClick={() => retry()} className={ctaVariants()}>
          Reintentar
        </button>
        <Link
          href="/"
          className="text-sm underline decoration-miel underline-offset-4"
        >
          Volver al inicio
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground underline decoration-miel underline-offset-4"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </main>
  );
}
