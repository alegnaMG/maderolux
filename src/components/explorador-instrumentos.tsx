'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { Foto } from '@/lib/data/fotos';
import type { Instrumento } from '@/lib/data/instrumentos';

const numero = (i: number) => String(i + 1).padStart(2, '0');

/**
 * "Cada herramienta tiene un propósito", explorable: números sobre la foto de
 * los instrumentos y una ficha con el que está elegido.
 *
 * Accesibilidad: los botones de la lista son los controles reales (teclado y
 * lector de pantalla). Los puntos sobre la foto hacen lo mismo pero solo para
 * ratón y dedo, así que van fuera del orden de tabulación y del árbol
 * accesible: dos botones con el mismo nombre serían ruido.
 */
export function ExploradorInstrumentos({
  foto,
  instrumentos,
}: {
  /** Con su tamaño real: los puntos van en % sobre la foto sin recortar. */
  foto: Foto & { ancho: number; alto: number };
  instrumentos: Instrumento[];
}) {
  const [activoId, setActivoId] = useState(instrumentos[0].id);
  // Los puntos laten hasta que se visitan: invitan a explorar sin insistir.
  const [vistos, setVistos] = useState(() => new Set([instrumentos[0].id]));

  const elegir = (id: string) => {
    setActivoId(id);
    setVistos((anteriores) => new Set(anteriores).add(id));
  };

  const indiceActivo = instrumentos.findIndex((i) => i.id === activoId);
  const activo = instrumentos[indiceActivo];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:gap-14">
      <div className="relative">
        <Image
          src={foto.src}
          alt={foto.alt}
          width={foto.ancho}
          height={foto.alto}
          sizes="(min-width: 1024px) 42rem, 100vw"
          className="block h-auto w-full"
        />
        {instrumentos.map((instrumento, i) => {
          const esActivo = instrumento.id === activoId;
          return (
            <button
              key={instrumento.id}
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => elegir(instrumento.id)}
              style={{
                left: `${instrumento.posicion.x}%`,
                top: `${instrumento.posicion.y}%`,
              }}
              className={cn(
                'absolute grid size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-xs shadow-md transition duration-300 motion-reduce:transition-none',
                esActivo
                  ? 'scale-110 bg-primary text-primary-foreground'
                  : 'bg-background/90 text-foreground hover:scale-110',
              )}
            >
              {!vistos.has(instrumento.id) && (
                <span className="absolute inset-0 animate-ping rounded-full bg-background/60 motion-reduce:animate-none" />
              )}
              <span className="relative">{i + 1}</span>
            </button>
          );
        })}
      </div>

      <div>
        <ol className="grid grid-cols-2 gap-x-6 border-t border-oscuro-foreground/15">
          {instrumentos.map((instrumento, i) => {
            const esActivo = instrumento.id === activoId;
            return (
              <li
                key={instrumento.id}
                className="border-b border-oscuro-foreground/15"
              >
                <button
                  type="button"
                  aria-pressed={esActivo}
                  onClick={() => elegir(instrumento.id)}
                  className={cn(
                    'flex w-full cursor-pointer items-baseline gap-3 py-3 text-left text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oscuro-foreground',
                    esActivo
                      ? 'text-oscuro-foreground'
                      : 'text-oscuro-foreground/70 hover:text-oscuro-foreground',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'text-[0.65rem] tracking-[0.2em]',
                      esActivo ? 'text-miel' : 'text-oscuro-foreground/50',
                    )}
                  >
                    {numero(i)}
                  </span>
                  {instrumento.nombre}
                </button>
              </li>
            );
          })}
        </ol>

        {/* aria-live: al cambiar de instrumento, el lector de pantalla lee la
            ficha nueva. `key` reinicia la animación de entrada en cada cambio. */}
        <div aria-live="polite" className="mt-8 min-h-48">
          <div
            key={activo.id}
            className="animate-in duration-500 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
          >
            <p
              aria-hidden="true"
              className="font-heading text-5xl font-light text-miel"
            >
              {numero(indiceActivo)}
            </p>
            <h3 className="mt-2 font-heading text-3xl">{activo.nombre}</h3>
            <p className="mt-2 text-etiqueta text-oscuro-foreground/75 uppercase">
              {activo.zonas}
            </p>
            <p className="mt-4 leading-relaxed text-oscuro-foreground/85">
              {activo.descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
