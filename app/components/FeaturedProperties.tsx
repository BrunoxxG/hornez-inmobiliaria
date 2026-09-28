import PropertyCard from "@/app/(pages)/propiedades/components/PropertyCard";
import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";
import Link from "next/link";

export default function FeaturedProperties({ properties }: { properties: PropertyZod[] }) {
  return (
    <>
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 6).map((property, index) => (
            <div key={property.id} className={index >= 4 ? "hidden sm:block" : ""}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Próximamente publicaremos propiedades disponibles.</p>
      )}

      {properties.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/propiedades"
            className="inline-flex items-center justify-center rounded-md border border-hornez-orange bg-white px-5 py-3 text-sm font-semibold text-hornez-orange transition-colors hover:bg-orange-50"
          >
            Ver más propiedades <span aria-hidden="true">&nbsp;&gt;</span>
          </Link>
        </div>
      )}

      <section className="mt-12 overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-hornez-blue">La Paz, Traslasierra - Córdoba</h2>
        </div>
        <iframe
          title="Ubicación de La Paz, Traslasierra, Córdoba"
          src="https://www.google.com/maps?q=La%20Paz%2C%20Traslasierra%2C%20C%C3%B3rdoba%2C%20Argentina&output=embed"
          className="h-80 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
