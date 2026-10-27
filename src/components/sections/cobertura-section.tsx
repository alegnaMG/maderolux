import { CtaLink } from '@/components/cta-link';
import { TextoPendiente } from '@/components/texto-pendiente';
import { COBERTURA } from '@/lib/data/cobertura';

export function CoberturaSection({
  cobertura = COBERTURA,
}: {
  cobertura?: typeof COBERTURA;
}) {
  return (
    <section
      id="cobertura"
      aria-labelledby="cobertura-titulo"
      className="scroll-mt-20 text-oscuro-foreground microcemento-oscuro"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:gap-20 md:py-28">
        <div className="flex revelar flex-col items-start">
          <p className="text-etiqueta text-oscuro-foreground/75 uppercase">
            Cobertura
          </p>
          <h2
            id="cobertura-titulo"
            className="mt-6 font-heading text-titulo font-light"
          >
            Voy a tu <em>casa</em>.
          </h2>
          <p className="mt-8 max-w-sm leading-relaxed text-oscuro-foreground/80">
            Hago los tratamientos a domicilio en estas zonas de Madrid.
          </p>
          <CtaLink href="/cobertura" variante="claro" className="mt-10">
            Ver zonas de cobertura
          </CtaLink>
        </div>

        <div className="revelar">
          {!cobertura.confirmada && (
            <TextoPendiente className="mb-8 text-oscuro-foreground/80">
              Listado de zonas por confirmar.
            </TextoPendiente>
          )}
          <h3 className="text-etiqueta text-oscuro-foreground/75 uppercase">
            Madrid capital
          </h3>
          <ul className="mt-4 columns-2 gap-8 border-t border-oscuro-foreground/15 pt-4 sm:columns-3">
            {cobertura.distritos.map((distrito) => (
              <li
                key={distrito}
                className="break-inside-avoid py-1.5 text-oscuro-foreground/85"
              >
                {distrito}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
