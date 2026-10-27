import type { ReactNode } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Las tres píldoras del mockup. Exportado aparte para dar el mismo aspecto a
 * un <button> (p. ej. "Reintentar" en error.tsx) sin convertirlo en enlace.
 */
export const ctaVariants = cva(
  'group inline-flex h-12 items-center justify-center gap-3 rounded-full px-7 text-etiqueta uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
  {
    variants: {
      variante: {
        solido: 'bg-primary text-primary-foreground hover:bg-foreground',
        contorno:
          'border border-foreground/60 hover:bg-foreground hover:text-background',
        // Para fondos oscuros (hero, protocolo).
        claro:
          'border border-oscuro-foreground/60 text-oscuro-foreground hover:bg-oscuro-foreground hover:text-oscuro focus-visible:outline-oscuro-foreground',
      },
    },
    defaultVariants: { variante: 'solido' },
  },
);

type CtaLinkProps = VariantProps<typeof ctaVariants> & {
  href: string;
  children: ReactNode;
  /** Sitio externo (WhatsApp, Instagram): abre en pestaña nueva. */
  externo?: boolean;
  className?: string;
};

export function CtaLink({
  href,
  children,
  variante,
  externo = false,
  className,
}: CtaLinkProps) {
  const clases = cn(ctaVariants({ variante }), className);
  const contenido = (
    <>
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </>
  );

  if (externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clases}
      >
        {contenido}
      </a>
    );
  }

  return (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}
