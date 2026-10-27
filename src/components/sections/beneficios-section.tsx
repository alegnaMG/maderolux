import { DropletIcon, Flower2Icon, LeafIcon, WavesIcon } from 'lucide-react';

const BENEFICIOS = [
  {
    icono: LeafIcon,
    titulo: 'Técnica natural',
    texto: 'Con instrumentos de madera y maniobras manuales.',
  },
  {
    icono: DropletIcon,
    titulo: 'Sensación de ligereza',
    texto: 'Favorece la circulación y la eliminación de líquidos.',
  },
  {
    icono: WavesIcon,
    titulo: 'Mejora del aspecto de la piel',
    texto: 'Ayuda a suavizar la celulitis y la retención.',
  },
  {
    icono: Flower2Icon,
    titulo: 'Bienestar integral',
    texto: 'Un momento para ti, sin salir de casa.',
  },
] as const;

export function BeneficiosSection() {
  return (
    <section
      id="beneficios"
      aria-labelledby="beneficios-titulo"
      className="border-y border-border bg-muted"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* El mockup no muestra título, pero la sección necesita uno para
            mantener la jerarquía h2 → h3 y que los lectores de pantalla
            puedan saltar a ella. */}
        <h2 id="beneficios-titulo" className="sr-only">
          Beneficios de la maderoterapia
        </h2>
        <ul className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {BENEFICIOS.map(({ icono: Icono, titulo, texto }) => (
            <li
              key={titulo}
              className="flex revelar flex-col items-center px-6 text-center"
            >
              <Icono
                aria-hidden="true"
                strokeWidth={1}
                className="size-9 text-primary"
              />
              <h3 className="mt-5 text-etiqueta text-balance uppercase">
                {titulo}
              </h3>
              <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
                {texto}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
