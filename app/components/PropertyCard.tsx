import Image from "next/image";
import Link from "next/link";
import type { FeaturedProperty } from "@/app/lib/dataHome";

const currencyFormat = (price: number, currency: string) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

export default function PropertyCard({ property }: { property: FeaturedProperty }) {
  const image = property.images[0]?.url;

  return (
    <Link
      href={`/propiedad/${property.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <i className="pi pi-image text-4xl" />
          </div>
        )}

        {/* Badge tipo listado */}
        <span className="absolute top-3 left-3 bg-hornez-red text-white text-xs font-semibold px-3 py-1 rounded-full">
          {property.listingType.name}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1 truncate group-hover:text-hornez-red transition-colors">
          {property.title}
        </h3>

        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <i className="pi pi-map-marker text-xs" />
          {property.city}, {property.province}
        </p>

        <p className="text-lg font-bold text-hornez-red mb-3">
          {currencyFormat(property.price, property.currency)}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <i className="pi pi-moon text-xs" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <i className="pi pi-wave-pulse text-xs" />
              {property.bathrooms}
            </span>
          )}
          {property.area != null && (
            <span className="flex items-center gap-1">
              <i className="pi pi-expand text-xs" />
              {property.area} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
