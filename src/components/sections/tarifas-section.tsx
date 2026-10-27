import { CtaLink } from '@/components/cta-link';
import { ListaTarifas } from '@/components/lista-tarifas';
import { tarifasDe } from '@/lib/data/tarifas';
import { TRATAMIENTOS } from '@/lib/data/tratamientos';

export function TarifasSection() {
  return (
    <section
      id="tarifas"
      aria-labelledby="tarifas-titulo"
      className="scroll-mt-20 border-y border-border bg-muted"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:gap-20 md:py-28">
        <div className="flex revelar flex-col items-start">
          <p className="text-etiqueta text-muted-foreground uppercase">
            Tarifas
          </p>
          <h2
            id="tarifas-titulo"
            className="mt-6 font-heading text-titulo font-light"
          >
            Sesiones y <em>bonos</em>.
          </h2>
          <p className="mt-8 max-w-sm leading-relaxed text-muted-foreground">
            Precios de cada tratamiento a domicilio en Madrid.
          </p>
          <CtaLink href="/tarifas" variante="contorno" className="mt-10">
            Ver tarifas y condiciones
          </CtaLink>
        </div>

        <div className="revelar space-y-12">
          {TRATAMIENTOS.map((tratamiento) => (
            <div key={tratamiento.slug}>
              <h3 className="text-etiqueta text-muted-foreground uppercase">
                {tratamiento.nombre}
              </h3>
              <div className="mt-4">
                <ListaTarifas tarifas={tarifasDe(tratamiento.slug)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
