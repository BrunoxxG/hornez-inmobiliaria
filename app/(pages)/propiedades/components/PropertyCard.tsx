import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";
import { BedDouble, LayoutDashboard, Maximize, Toilet } from "lucide-react";
import Link from "next/link";

const currencyFormat = (price: number, currency: string) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

export default function PropertyCard({ property }: { property: PropertyZod }) {
  const image = property.images[0]?.url;

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative bg-gray-200 aspect-4/3 overflow-hidden">
        <img
          src={image || "/default-image1.webp"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
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

        <p className="text-lg font-bold text-hornez-red mb-3">{currencyFormat(property.price, property.currency)}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {property.totalRooms != 0 && (
            <span className="flex items-center gap-1">
              <LayoutDashboard size={20}/>
              {property.totalRooms}
            </span>
          )}
          {property.bedrooms != 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={20}/>
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != 0 && (
            <span className="flex items-center gap-1">
              <Toilet size={20}/>
              {property.bathrooms}
            </span>
          )}
          {property.area != 0 && (
            <span className="flex items-center gap-1">
              <Maximize size={20}/>
              {property.area} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
