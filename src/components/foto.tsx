import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { HuecoFoto } from '@/lib/data/fotos';
import { ImagePlaceholder } from '@/components/image-placeholder';

/**
 * Dónde está el texto que acompaña a la foto. La foto se funde con el color
 * de fondo hacia ese lado, para que texto y foto se lean como una sola
 * composición y no como dos bloques cortados en seco.
 *   izquierda → texto a la izquierda en escritorio y encima en móvil
 *   derecha   → texto a la derecha en escritorio y debajo en móvil
 */
type Fundido = 'izquierda' | 'derecha';

const FUNDIDOS: Record<Fundido, string> = {
  izquierda:
    'inset-x-0 top-0 h-1/4 bg-linear-to-b md:inset-y-0 md:right-auto md:h-auto md:w-2/5 md:bg-linear-to-r',
  derecha:
    'inset-x-0 bottom-0 h-1/4 bg-linear-to-t md:inset-y-0 md:left-auto md:h-auto md:w-2/5 md:bg-linear-to-l',
};

/**
 * Pinta la foto real de un hueco si ya la tenemos y, si no, el placeholder de
 * microcemento. Así poner una foto es solo rellenar `FOTOS` en
 * lib/data/fotos.ts. La foto se asienta suavemente al entrar en pantalla
 * (`acercar`); el contenedor recorta el zoom.
 */
export function Foto({
  hueco,
  sizes,
  fundido,
  className,
}: {
  hueco: HuecoFoto;
  /** Ancho que ocupa en pantalla, para que next/image elija la resolución. */
  sizes: string;
  fundido?: Fundido;
  className?: string;
}) {
  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      {hueco.foto ? (
        <Image
          src={hueco.foto.src}
          alt={hueco.foto.alt}
          fill
          sizes={sizes}
          className="acercar object-cover"
        />
      ) : (
        <ImagePlaceholder
          label={hueco.pendiente}
          className="absolute inset-0"
        />
      )}
      {fundido && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute from-background via-background/40 to-transparent',
            FUNDIDOS[fundido],
          )}
        />
      )}
    </div>
  );
}
