import { CtaLink } from '@/components/cta-link';
import { FOTOS } from '@/lib/data/fotos';
import { Foto } from '@/components/foto';
import { Sello } from '@/components/sello';

export function EsenciaSection() {
  return (
    <section
      id="esencia"
      aria-labelledby="esencia-titulo"
      className="grid md:grid-sangrado"
    >
      <div className="flex revelar flex-col items-start px-6 py-20 md:col-[contenido-inicio/mitad] md:py-32 md:pr-16 md:pl-0">
        <p className="text-etiqueta text-muted-foreground uppercase">
          Tratamientos
        </p>
        <h2
          id="esencia-titulo"
          className="mt-6 font-heading text-titulo font-light"
        >
          La <em>maderoterapia</em>.
        </h2>
        <p className="mt-6 text-etiqueta uppercase">
          Mucho más que un masaje corporal.
        </p>
        {/* Filete del mockup, con un tramo en miel. */}
        <span aria-hidden="true" className="mt-8 flex h-px w-32 bg-border">
          <span className="w-12 bg-miel" />
        </span>
        <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
          La técnica con la que empezó todo y que sigue siendo el corazón de
          Maderolux. Un tratamiento manual y natural que combina instrumentos de
          madera y maniobras precisas para trabajar tu cuerpo de forma integral.
        </p>
        <CtaLink href="/tratamientos/maderoterapia" className="mt-10">
          Descubre el tratamiento
        </CtaLink>
      </div>

      <div className="relative md:col-[mitad/borde-fin]">
        <Foto
          hueco={FOTOS.esencia}
          fundido="izquierda"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-4/3 h-full w-full md:aspect-auto md:min-h-[36rem]"
        />
        {/* El sello cabalga el borde entre el texto y la foto, como en el mockup. */}
        <div className="absolute -top-14 right-6 rounded-full bg-background p-2 md:top-12 md:right-auto md:-left-20">
          <Sello className="size-28 md:size-36" />
        </div>
      </div>
    </section>
  );
}
