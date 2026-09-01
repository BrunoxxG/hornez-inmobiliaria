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
  const currentPage = pages[pageIndex] ?? [];

  const goNext = () => {
    if (!hasMultiplePages) return;
    setPageIndex((current) => (current + 1) % pages.length);
  };

  const goPrev = () => {
    if (!hasMultiplePages) return;
    setPageIndex((current) => (current - 1 + pages.length) % pages.length);
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
          disabled={!hasMultiplePages}
          className="absolute left-0 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-hornez-orange text-3xl font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Propiedades anteriores"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!hasMultiplePages}
          className="absolute right-0 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-hornez-orange text-3xl font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Siguiente grupo de propiedades"
        >
          ›
        </button>

        <div className="overflow-hidden px-16 pb-2">
          <div
            className="flex w-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${pageIndex * 100}%)` }}
          >
            {pages.map((page, pageIndexValue) => (
              <div key={`page-${pageIndexValue}`} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {page.map((relatedProperty) => (
                    <PropertyCard key={relatedProperty.id} property={relatedProperty} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
