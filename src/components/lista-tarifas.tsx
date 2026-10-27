import type { Tarifa } from '@/lib/data/tarifas';
import { formatearPrecio } from '@/lib/formato';

/** Carta de precios con línea de puntos; la usan la home y /tarifas. */
export function ListaTarifas({ tarifas }: { tarifas: Tarifa[] }) {
  return (
    <ul className="border-t border-border">
      {tarifas.map((tarifa) => (
        <li
          key={tarifa.id}
          className="flex items-baseline gap-4 border-b border-border py-6"
        >
          <span>
            <span className="block font-heading text-3xl">{tarifa.nombre}</span>
            {tarifa.sesiones > 1 && tarifa.precio !== null && (
              <span className="mt-1 block text-sm text-muted-foreground">
                {formatearPrecio(tarifa.precio / tarifa.sesiones)} por sesión
              </span>
            )}
          </span>
          {/* Línea de puntos de carta de precios, solo decorativa. */}
          <span
            aria-hidden="true"
            className="min-w-8 flex-1 border-b border-dotted border-foreground/30"
          />
          <span className="font-heading text-3xl">
            {tarifa.precio !== null ? (
              formatearPrecio(tarifa.precio)
            ) : (
              <span className="text-xl text-muted-foreground italic">
                Por confirmar
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
