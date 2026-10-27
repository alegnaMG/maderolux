import { CtaLink } from '@/components/cta-link';
import { Foto } from '@/components/foto';
import { TextoPendiente } from '@/components/texto-pendiente';
import { CONTACTO } from '@/lib/data/contacto';
import { FOTOS } from '@/lib/data/fotos';
import { SOBRE_MI } from '@/lib/data/sobre-mi';

const nombrePila = CONTACTO.nombre.split(' ')[0];

export function SobreMiSection({
  presentacion = SOBRE_MI.presentacion,
}: {
  presentacion?: string[] | null;
}) {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-titulo"
      className="grid scroll-mt-20 md:grid-sangrado"
    >
      <div className="flex revelar flex-col items-start justify-center px-6 py-20 md:col-[contenido-inicio/mitad] md:py-32 md:pr-16 md:pl-0">
        <p className="text-etiqueta text-muted-foreground uppercase">
          Sobre mí
        </p>
        <h2
          id="sobre-mi-titulo"
          className="mt-6 font-heading text-titulo font-light"
        >
          Hola, soy <em>{nombrePila}</em>.
        </h2>
        {/* En la home basta con el primer párrafo; el resto, en /sobre-mi. */}
        {presentacion ? (
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            {presentacion[0]}
          </p>
        ) : (
          <TextoPendiente className="mt-8 max-w-md">
            Muy pronto, mi historia y mi forma de trabajar.
          </TextoPendiente>
        )}
        <CtaLink href="/sobre-mi" variante="contorno" className="mt-10">
          Conóceme
        </CtaLink>
      </div>

      <Foto
        hueco={FOTOS.sobreMi}
        fundido="izquierda"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="aspect-4/5 md:col-[mitad/borde-fin] md:aspect-auto md:min-h-[36rem]"
      />
    </section>
  );
}
