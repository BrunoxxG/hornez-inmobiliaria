"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Option = {
  id: string;
  name: string;
  slug: string;
};

type Feature = {
  id: string;
  name: string;
  slug: string;
};

export default function PropertiesFilters({
  listingTypes = [],
  propertyTypes = [],
  features = [],
}: {
  listingTypes?: Option[];
  propertyTypes?: Option[];
  features?: Feature[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const toggleFeature = (feature: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get("features");

    let values = current ? current.split(",") : [];

    if (values.includes(feature)) {
      values = values.filter((f) => f !== feature);
    } else {
      values.push(feature);
    }

    if (values.length > 0) {
      params.set("features", values.join(","));
    } else {
      params.delete("features");
    }

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/propiedades");
  };

  return (
    <div className="bg-white shadow-sm mt-16">
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <select
            value={searchParams.get("operacion") || ""}
            onChange={(e) => updateParam("operacion", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Operación</option>
            {listingTypes.map((lt) => (
              <option key={lt.id} value={lt.slug}>
                {lt.name}
              </option>
            ))}
          </select>

          <select
            value={searchParams.get("tipo") || ""}
            onChange={(e) => updateParam("tipo", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Tipo propiedad</option>
            {propertyTypes.map((pt) => (
              <option key={pt.id} value={pt.slug}>
                {pt.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Ciudad"
            defaultValue={searchParams.get("city") || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParam("city", (e.target as HTMLInputElement).value);
              }
            }}
            className="border p-2 rounded"
          />

          <select
            value={searchParams.get("priceRange") || ""}
            onChange={(e) => updateParam("priceRange", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Precio</option>
            <option value="0-100000">Hasta 100.000</option>
            <option value="100000-200000">100.000 - 200.000</option>
            <option value="200000-500000">200.000 - 500.000</option>
            <option value="500000-1000000">500.000 - 1.000.000</option>
            <option value="1000000-">1.000.000+</option>
          </select>

          <select
            value={searchParams.get("bedrooms") || ""}
            onChange={(e) => updateParam("bedrooms", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Dormitorios</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <select
            value={searchParams.get("bathrooms") || ""}
            onChange={(e) => updateParam("bathrooms", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Baños</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>

          <select
            value={searchParams.get("areaRange") || ""}
            onChange={(e) => updateParam("areaRange", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Superficie</option>
            <option value="0-50">Hasta 50 m²</option>
            <option value="50-100">50 - 100 m²</option>
            <option value="100-200">100 - 200 m²</option>
            <option value="200-500">200 - 500 m²</option>
            <option value="500-">500+ m²</option>
          </select>

          <button onClick={clearFilters} className="bg-gray-200 hover:bg-gray-300 rounded px-4">
            Limpiar
          </button>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {features.map((feature) => {
              const active = searchParams.get("features")?.split(",").includes(feature.slug);

              return (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.slug)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    active ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {feature.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
