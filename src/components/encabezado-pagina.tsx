import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Cabecera común de las páginas interiores: etiqueta, h1 y entradilla. */
export function EncabezadoPagina({
  etiqueta,
  titulo,
  children,
  className,
}: {
  etiqueta: string;
  /** Admite <em> para la palabra clave, como el resto de titulares. */
  titulo: ReactNode;
  /** Entradilla opcional bajo el título. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('flex flex-col items-start', className)}>
      <p className="text-etiqueta text-muted-foreground uppercase">
        {etiqueta}
      </p>
      <h1 className="mt-6 font-heading text-titulo font-light">{titulo}</h1>
      {children && (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {children}
        </p>
      )}
    </header>
  );
}
