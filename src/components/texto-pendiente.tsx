import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Texto que aún falta (precio, biografía, zonas…), escrito para el visitante
 * ("Listado de zonas por confirmar", "Muy pronto, mi historia…") y no como
 * nota interna: el sitio puede enseñarse tal cual mientras llega el contenido.
 * La cursiva y el filete miel lo distinguen sin parecer un aviso. El color se
 * hereda o se ajusta con `className` (sobre fondo oscuro, p. ej.).
 */
export function TextoPendiente({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-baseline gap-3 text-muted-foreground italic',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-px w-5 shrink-0 -translate-y-1 bg-miel"
      />
      <span>{children}</span>
    </p>
  );
}
