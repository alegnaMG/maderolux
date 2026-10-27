import Image from 'next/image';

import { cn } from '@/lib/utils';
import { CONTACTO } from '@/lib/data/contacto';

/**
 * El logo real de la marca (public/logo.jpg): sello circular con
 * "maderolux" y la firma de Lucía. Va sobre un disco del color de fondo.
 *
 * El JPG tiene fondo blanco; `mix-blend-mode: multiply` lo funde con el
 * disco (blanco × color = color) y deja el trazo gris intacto, sin necesidad
 * de un PNG transparente.
 *
 * TODO(Fase 2): pedir el original en SVG o PNG ≥ 600 px; el actual mide
 * 150 px y se ve algo borroso en pantallas de alta densidad.
 */
export function Sello({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'block size-36 overflow-hidden rounded-full bg-background',
        className,
      )}
    >
      <Image
        src="/logo.jpg"
        alt={`Logo de Maderolux, ${CONTACTO.nombre}`}
        width={150}
        height={150}
        sizes="144px"
        className="size-full mix-blend-multiply"
      />
    </span>
  );
}
