"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  propertyTypes = [],
  features = [],
}: {
  propertyTypes?: Option[];
  features?: Feature[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [priceCurrency, setPriceCurrency] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setPriceCurrency(searchParams.get("currency") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  const updateParam = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set(key, value);
      else params.delete(key);

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const toggleFeature = (feature: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get("features");
    let values = current ? current.split(",") : [];

    if (values.includes(feature)) values = values.filter((value) => value !== feature);
    else values.push(feature);

    if (values.length > 0) params.set("features", values.join(","));
    else params.delete("features");

    router.push(`?${params.toString()}`);
  };

  const applyPriceFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    const minimum = minPrice ? Number(minPrice) : undefined;
    const maximum = maxPrice ? Number(maxPrice) : undefined;

    if (
      (minimum !== undefined && !Number.isFinite(minimum)) ||
      (maximum !== undefined && !Number.isFinite(maximum)) ||
      (minimum !== undefined && maximum !== undefined && minimum > maximum)
    ) {
      return;
    }

    if (priceCurrency) params.set("currency", priceCurrency);
    else params.delete("currency");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.delete("priceRange");
    router.push(`/propiedades?${params.toString()}`);
    setIsPriceOpen(false);
  };

  const clearFilters = () => {
    router.push("/propiedades");
    setIsPriceOpen(false);
    setPriceCurrency("");
    setMinPrice("");
    setMaxPrice("");
  };

  const priceLabel = priceCurrency || minPrice || maxPrice
    ? `${priceCurrency || "Precio"}${minPrice ? ` desde ${minPrice}` : ""}${maxPrice ? ` hasta ${maxPrice}` : ""}`
    : "Precio";

  return (
    <div className="mt-16 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl space-y-4 p-4">
        <div className="flex flex-nowrap items-start gap-4 overflow-x-auto">
          <select
            value={searchParams.get("tipo") || ""}
            onChange={(event) => updateParam("tipo", event.target.value)}
            className={`min-w-48 flex-1 rounded border p-2 focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange ${
              searchParams.get("tipo") ? "border-hornez-orange bg-orange-50" : ""
            }`}
          >
            <option value="">Tipo propiedad</option>
            {propertyTypes.map((propertyType) => (
              <option key={propertyType.id} value={propertyType.slug}>
                {propertyType.name}
              </option>
            ))}
          </select>

          <div className="relative min-w-48 flex-1">
            <button
              type="button"
              onClick={() => setIsPriceOpen((open) => !open)}
              className={`w-full rounded border p-2 text-left focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange ${
                priceCurrency || minPrice || maxPrice ? "border-hornez-orange bg-orange-50" : ""
              }`}
            >
              {priceLabel}
            </button>

            {isPriceOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-72 rounded border bg-white p-4 shadow-lg">
                <div className="space-y-3">
                  <select
                    value={priceCurrency}
                    onChange={(event) => setPriceCurrency(event.target.value)}
                    className="w-full rounded border p-2 focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange"
                  >
                    <option value="">Moneda</option>
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    placeholder="Desde"
                    value={minPrice}
                    onChange={(event) => setMinPrice(event.target.value)}
                    className="w-full rounded border p-2 focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Hasta"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(event.target.value)}
                    className="w-full rounded border p-2 focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange"
                  />
                  <button
                    type="button"
                    onClick={applyPriceFilters}
                    className="w-full rounded bg-hornez-orange px-4 py-2 font-semibold text-white hover:bg-orange-600"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>

          <select
            value={searchParams.get("bedrooms") || ""}
            onChange={(event) => updateParam("bedrooms", event.target.value)}
            className={`min-w-48 flex-1 rounded border p-2 focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange ${
              searchParams.get("bedrooms") ? "border-hornez-orange bg-orange-50" : ""
            }`}
          >
            <option value="">Dormitorios</option>
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} value={number}>
                {number}+
              </option>
            ))}
          </select>
          <select
            value={searchParams.get("areaRange") || ""}
            onChange={(event) => updateParam("areaRange", event.target.value)}
            className={`min-w-48 flex-1 rounded border p-2 focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange ${
              searchParams.get("areaRange") ? "border-hornez-orange bg-orange-50" : ""
            }`}
          >
            <option value="">Superficie</option>
            <option value="0-50">Hasta 50 m²</option>
            <option value="50-100">50 - 100 m²</option>
            <option value="100-200">100 - 200 m²</option>
            <option value="200-500">200 - 500 m²</option>
            <option value="500-">500+ m²</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="shrink-0 rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 focus:border-hornez-orange focus:bg-hornez-orange focus:text-white active:border-hornez-orange active:bg-hornez-orange active:text-white"
          >
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
                  className={`rounded-full border px-3 py-1 text-sm ${
                    active
                      ? "border-hornez-orange bg-hornez-orange text-white"
                      : "bg-gray-100 hover:border-hornez-orange hover:bg-orange-50"
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
