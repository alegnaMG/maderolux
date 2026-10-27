/**
 * Precio en formato español: "45 €" o "37,50 €". Los decimales solo aparecen
 * cuando hay céntimos, y entonces siempre dos.
 */
export function formatearPrecio(euros: number) {
  const decimales = Number.isInteger(euros) ? 0 : 2;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(euros);
}
