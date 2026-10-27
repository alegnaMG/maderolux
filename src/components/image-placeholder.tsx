import { cn } from '@/lib/utils';

/**
 * Hueco para una foto que aún no tenemos; `label` dice cuál va. Se pinta con
 * la textura de microcemento para que la maqueta se lea terminada mientras
 * tanto.
 */
export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn('relative overflow-hidden microcemento', className)}
    >
      <p
        aria-hidden="true"
        className="absolute bottom-4 left-4 bg-background/85 px-3 py-1.5 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase"
      >
        Foto próximamente
      </p>
    </div>
  );
}
