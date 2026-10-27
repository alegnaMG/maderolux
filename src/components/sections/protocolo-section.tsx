import { CtaLink } from '@/components/cta-link';
import { ExploradorInstrumentos } from '@/components/explorador-instrumentos';
import { FOTOS } from '@/lib/data/fotos';
import { INSTRUMENTOS } from '@/lib/data/instrumentos';

export function ProtocoloSection() {
  return (
    <section
      id="protocolo"
      aria-labelledby="protocolo-titulo"
      className="text-oscuro-foreground microcemento-oscuro"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid revelar gap-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
          <div>
            <p className="text-etiqueta text-oscuro-foreground/75 uppercase">
              Cómo trabajo
            </p>
            <h2
              id="protocolo-titulo"
              className="mt-6 font-heading text-titulo font-light"
            >
              Cada <em>herramienta</em> tiene un <em>propósito</em>.
            </h2>
          </div>
          <p className="leading-relaxed text-oscuro-foreground/80">
            Utilizo distintos instrumentos de madera, cada uno pensado para una
            zona y un tejido, y los combino con maniobras manuales de drenaje.{' '}
            <span className="text-oscuro-foreground">
              Pulsa cada número para ver para qué sirve.
            </span>
          </p>
        </div>

        <div className="mt-14 revelar">
          <ExploradorInstrumentos
            foto={FOTOS.protocolo.foto}
            instrumentos={INSTRUMENTOS}
          />
        </div>

        <CtaLink
          href="/tratamientos/maderoterapia#sesion"
          variante="claro"
          className="mt-14"
        >
          Cómo es una sesión
        </CtaLink>
      </div>
    </section>
  );
}
