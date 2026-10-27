import { PlusIcon } from 'lucide-react';

import type { PreguntaFrecuente } from '@/lib/data/tratamientos';
import { TextoPendiente } from '@/components/texto-pendiente';

/**
 * Acordeón con <details>/<summary> nativos: accesible por teclado y lector
 * de pantalla sin una línea de JavaScript, y Google indexa las respuestas
 * aunque estén plegadas.
 */
export function PreguntasFrecuentes({
  preguntas,
}: {
  preguntas: PreguntaFrecuente[];
}) {
  return (
    <section aria-labelledby="preguntas-titulo">
      <h2 id="preguntas-titulo" className="font-heading text-titulo font-light">
        Preguntas <em>frecuentes</em>
      </h2>
      <div className="mt-10 border-t border-border">
        {preguntas.map(({ pregunta, respuesta }) => (
          <details key={pregunta} className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              {pregunta}
              <PlusIcon
                aria-hidden="true"
                strokeWidth={1.25}
                className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>
            <div className="max-w-prose pb-6">
              {respuesta ? (
                <p className="leading-relaxed text-muted-foreground">
                  {respuesta}
                </p>
              ) : (
                <TextoPendiente>Respuesta muy pronto.</TextoPendiente>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
