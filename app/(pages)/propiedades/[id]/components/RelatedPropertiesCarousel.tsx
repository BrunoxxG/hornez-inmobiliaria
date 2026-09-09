"use client";

import { useMemo, useState } from "react";
import PropertyCard from "../../components/PropertyCard";
import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";

// Carrusel de propiedades relacionadas: avanza por grupos de 3 cards dentro de la misma vista.
export default function RelatedPropertiesCarousel({ properties }: { properties: PropertyZod[] }) {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = useMemo(() => {
    const itemsPerPage = 3;
    const chunks: PropertyZod[][] = [];

    for (let index = 0; index < properties.length; index += itemsPerPage) {
      chunks.push(properties.slice(index, index + itemsPerPage));
    }

    return chunks;
  }, [properties]);

  const hasMultiplePages = pages.length > 1;
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;

  const goNext = () => {
    if (!hasMultiplePages || isLastPage) return;
    setPageIndex((current) => Math.min(current + 1, pages.length - 1));
  };

  const goPrev = () => {
    if (!hasMultiplePages || isFirstPage) return;
    setPageIndex((current) => Math.max(current - 1, 0));
  };

  if (!properties.length) {
    return <p className="text-sm text-gray-500">No hay propiedades relacionadas por el momento.</p>;
  }

  return (
    <div className="rounded-xl bg-white">
      <h2 className="mb-5 text-center text-2xl font-bold text-hornez-orange">Búsquedas relacionadas</h2>

      <div className="relative">
        <button
          type="button"
          onClick={goPrev}
          disabled={!hasMultiplePages || isFirstPage}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Propiedades anteriores"
        >
          <i className="pi pi-chevron-left" />
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!hasMultiplePages || isLastPage}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Siguiente grupo de propiedades"
        >
          <i className="pi pi-chevron-right" />
        </button>

        <div className="overflow-hidden px-16 pb-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {pages[pageIndex].map((relatedProperty) => (
              <div key={relatedProperty.id} className="min-w-0">
                <PropertyCard property={relatedProperty} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
