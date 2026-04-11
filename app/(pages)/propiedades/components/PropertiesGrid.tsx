import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";
import PropertyCard from "./PropertyCard";

export default function PropertiesGrid({properties}: {properties: PropertyZod[]}) {
  return (
    

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Próximamente publicaremos propiedades disponibles.</p>
      )}
    </div>
      
  );
}
