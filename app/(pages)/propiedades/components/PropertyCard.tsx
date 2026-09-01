import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";
import { BedDouble, LayoutDashboard, Maximize, Toilet } from "lucide-react";
import Link from "next/link";

// Tarjeta reutilizable de propiedad: se usa tanto en listados como en carruseles relacionados.
const currencyFormat = (price: number, currency: string) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

export default function PropertyCard({ property, compact = false }: { property: PropertyZod; compact?: boolean }) {
  const image = property.images[0]?.url;
  const operation = property.listingType.name;

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className={`group block overflow-hidden rounded-xl bg-white transition-shadow ${compact ? "shadow-sm hover:shadow-md" : "shadow-md hover:shadow-xl"}`}
    >
      {/* Image */}
      <div className={`relative bg-gray-200 overflow-hidden ${compact ? "aspect-[4/2.8]" : "aspect-4/3"}`}>
        <img
          src={image || "/default-image1.webp"}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className={`absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white px-3 py-1 text-hornez-orange ${compact ? "text-[10px]" : "text-xs"}`}>
          <img src="/img/ventaIcon.png" alt="venta logo" className={`h-5 ${operation !== "Venta" ? "hidden" : ""}`} />
          <img src="/img/alquilerIcon.png" alt="alquiler logo" className={`h-5 ${operation !== "Alquiler" ? "hidden" : ""}`} />
          <span className="font-semibold">{property.listingType.name}</span>
        </div>
        <span className={`absolute right-3 top-3 rounded-full bg-white px-3 py-1 font-semibold text-hornez-orange shadow-sm ${compact ? "text-[10px]" : "text-xs"}`}>
          {property.documentation === "DEED" ? "Escritura" : "Derechos posesorios"}
        </span>
      </div>

      {/* Content */}
      <div className={compact ? "p-3" : "p-4"}>
        <h3 className={`mb-1 truncate font-semibold text-gray-900 transition-colors group-hover:text-hornez-blue ${compact ? "text-sm" : "text-base"}`}>
          {property.title}
        </h3>

        <p className={`mb-2 flex items-center gap-1 text-gray-500 ${compact ? "text-[11px]" : "text-sm"}`}>
          <i className="pi pi-map-marker text-[10px]" />
          {property.city}, {property.province}
        </p>

        <p className={`mb-2 font-bold text-hornez-blue ${compact ? "text-base" : "text-lg"}`}>
          {property.price === 0 ? "Consultar precio" : currencyFormat(property.price, property.currency)}
        </p>

        {/* Stats */}
        <div className={`flex items-center text-gray-500 ${compact ? "gap-2 text-[10px]" : "gap-4 text-sm"}`}>
          {property.totalRooms != 0 && (
            <span className="flex items-center gap-1">
              <LayoutDashboard size={compact ? 14 : 20} />
              {property.totalRooms}
            </span>
          )}
          {property.bedrooms != 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={compact ? 14 : 20} />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != 0 && (
            <span className="flex items-center gap-1">
              <Toilet size={compact ? 14 : 20} />
              {property.bathrooms}
            </span>
          )}
          {property.area != 0 && (
            <span className="flex items-center gap-1">
              <Maximize size={compact ? 14 : 20} />
              {property.area} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
