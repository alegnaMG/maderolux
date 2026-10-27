import { CtaLink } from '@/components/cta-link';
import { WHATSAPP_URL } from '@/lib/data/contacto';

export function ContactoSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="scroll-mt-20"
    >
      <div className="mx-auto flex max-w-3xl revelar flex-col items-center px-6 py-28 text-center md:py-36">
        <p className="text-etiqueta text-muted-foreground uppercase">
          Contacto
        </p>
        <h2
          id="contacto-titulo"
          className="mt-6 font-heading text-titulo font-light"
        >
          Reserva tu <em>sesión</em>.
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          Escríbeme por WhatsApp, cuéntame qué buscas y te propongo día y hora
          para ir a tu casa.
        </p>
        <CtaLink href={WHATSAPP_URL} externo className="mt-10">
          Reservar por WhatsApp
        </CtaLink>
      </div>
    </section>
  );
}
