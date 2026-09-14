import PropertyCard from "@/app/(pages)/propiedades/components/PropertyCard";
import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";

export default function FeaturedProperties({ properties }: { properties: PropertyZod[] }) {
  if (!properties.length) {
    return <p className="text-center text-lg text-gray-500">Próximamente publicaremos propiedades disponibles.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 6).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/propiedades"
          className="inline-flex items-center justify-center rounded-md border border-hornez-orange bg-white px-5 py-3 text-sm font-semibold text-hornez-orange transition-colors hover:bg-orange-50"
        >
          Ver más propiedades <span aria-hidden="true">&nbsp;&gt;</span>
        </a>
      </div>
    </>
  );
}
