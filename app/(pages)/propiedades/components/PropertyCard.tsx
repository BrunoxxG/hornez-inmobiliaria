"use client";

import { useState } from "react";
import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";
import { BedDouble, LayoutDashboard, Toilet } from "lucide-react";
import Link from "next/link";

// Tarjeta reutilizable de propiedad: se usa tanto en listados como en carruseles relacionados.
const currencyFormat = (price: number, currency: string) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

export default function PropertyCard({ property, compact = false }: { property: PropertyZod; compact?: boolean }) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const image = property.images[0]?.url;
  const operation = property.listingType.name;
  const propertyUrl = `/propiedades/${property.id}`;
  const publicBaseUrl = typeof window === "undefined" ? process.env.NEXT_PUBLIC_APP_URL || "https://www.hornezinmobiliaria.com" : window.location.origin;
  const absolutePropertyUrl = `${publicBaseUrl.replace(/\/$/, "")}${propertyUrl}`;
  const whatsappMessage = `Hola, me interesa la propiedad: ${property.title}. Cod Ref: ${property.referenceCode}. Link: ${absolutePropertyUrl}`;
  const whatsappUrl = `https://wa.me/5493544400903?text=${encodeURIComponent(whatsappMessage)}`;

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Cod Ref: ${property.referenceCode} - ${property.title}`,
      url: absolutePropertyUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(absolutePropertyUrl);
    setShareStatus("copied");
    window.setTimeout(() => setShareStatus("idle"), 2000);
  };

  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-xl bg-white transition-shadow ${compact ? "shadow-sm hover:shadow-md" : "shadow-md hover:shadow-xl"}`}
    >
      <Link href={propertyUrl} className="block flex-1">
        <div className={`relative overflow-hidden bg-gray-200 ${compact ? "aspect-[4/2.8]" : "aspect-4/3"}`}>
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
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 px-4 pb-4">
        <span className="text-xs font-semibold text-gray-500">Cod Ref: {property.referenceCode}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void handleShare()}
            title={shareStatus === "copied" ? "Enlace copiado" : "Compartir propiedad"}
            aria-label={shareStatus === "copied" ? "Enlace copiado" : "Compartir propiedad"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gray-200 text-gray-800 transition-colors hover:bg-hornez-orange hover:text-white"
          >
            <i className={shareStatus === "copied" ? "pi pi-check" : "pi pi-share-alt"} />
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-hornez-orange hover:text-white active:bg-hornez-orange active:text-white"
          >
            <i className="pi pi-whatsapp" />
            Consultar
          </a>
        </div>
      </div>
    </div>
  );
}
