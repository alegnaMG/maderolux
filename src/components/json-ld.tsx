/**
 * Datos estructurados Schema.org. Escapar "<" impide que un valor que
 * contenga "</script>" cierre la etiqueta antes de tiempo (inyección de HTML).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
