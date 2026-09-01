"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/app/(pages)/propiedades/components/PropertyCard";
import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";

export default function FeaturedProperties({ properties }: { properties: PropertyZod[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const pageSize = 6;

  const visibleProperties = useMemo(
    () => properties.slice(0, visibleCount),
    [properties, visibleCount],
  );

  const hasMore = visibleCount < properties.length;

  const handleLoadMore = () => {
    if (!hasMore) return;
    setVisibleCount((current) => Math.min(current + pageSize, properties.length));
  };

  if (!properties.length) {
    return <p className="text-center text-lg text-gray-500">Próximamente publicaremos propiedades disponibles.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={!hasMore}
          className="inline-flex items-center justify-center rounded-md border border-hornez-orange bg-white px-5 py-3 text-sm font-semibold text-hornez-orange transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Ver más propiedades <span aria-hidden="true">&nbsp;&gt;</span>
        </button>
      </div>
    </>
  );
}
