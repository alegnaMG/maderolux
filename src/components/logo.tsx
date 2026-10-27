import { cn } from '@/lib/utils';
import { SITE_NAME } from '@/lib/seo';

/**
 * Logotipo tipográfico del mockup: MADEROLUX en versalitas espaciadas y
 * "Madrid" entre dos filetes. Es texto, no imagen: pesa cero y se ve nítido
 * a cualquier tamaño. Toma el color de `currentColor`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex flex-col items-center leading-none',
        className,
      )}
    >
      <span className="font-heading text-[1.7rem] tracking-[0.12em] uppercase">
        {SITE_NAME}
      </span>
      {/* Decorativo: el nombre accesible del logo es solo "Maderolux". */}
      <span
        aria-hidden="true"
        className="mt-1 flex items-center gap-2 text-[0.55rem] tracking-[0.42em] uppercase"
      >
        <span className="h-px w-7 bg-current opacity-50" />
        Madrid
        <span className="h-px w-7 bg-current opacity-50" />
      </span>
    </span>
  );
}
