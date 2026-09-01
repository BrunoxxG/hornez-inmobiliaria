import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import PropertyGallery from "./components/PropertyGallery";
import { getPropertyById, getRelatedProperties } from "../lib/dataPropertiesView";
import { BedDouble, Maximize, Toilet } from "lucide-react";
import PropertyUbication from "./components/PropertyUbication";
import Footer from "../../components/Footer";
import RelatedPropertiesCarousel from "./components/RelatedPropertiesCarousel";


const currencyFormat = (price: number, currency: string) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

const STATUS_LABEL: Record<string, string> = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  RENTED: "Alquilado",
};

const STATUS_COLOR: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-800",
  RESERVED: "bg-yellow-100 text-yellow-800",
  SOLD: "bg-red-100 text-red-800",
  RENTED: "bg-blue-100 text-blue-800",
};

// Detalle de propiedad: render principal del producto inmobiliario y sus secciones complementarias.
export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const propertyUrl = `${appUrl.replace(/\/$/, "")}/propiedades/${property.id}`;
  const whatsappMessage = `Hola, me interesa la propiedad: ${property.title}. Link: ${propertyUrl}`;
  const relatedProperties = await getRelatedProperties(property.id, property.city, property.propertyType.id, 3);

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-hornez-blue transition-colors">
              Inicio
            </Link>
            <i className="pi pi-chevron-right text-xs" />
            <Link href="/propiedades" className="hover:text-hornez-blue transition-colors">
              Propiedades
            </Link>
            <i className="pi pi-chevron-right text-xs" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{property.title}</span>
          </nav>

          <div className="space-y-8">
            {/* Galería principal */}
            <PropertyGallery
              images={property.images}
              operation={property.listingType.name}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_1.1fr_1.3fr]">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-hornez-orange">Servicios</h2>
                <div className="space-y-2">
                  {property.features.filter(({ feature }) => feature.category === "SERVICE").length > 0 ? (
                    property.features
                      .filter(({ feature }) => feature.category === "SERVICE")
                      .map(({ feature, value }) => (
                        <div
                          key={feature.id}
                          className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50/60 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm">
                            ✓
                          </span>
                          <span>
                            {feature.name}
                            {value && value !== "-" ? `: ${value}` : ""}
                          </span>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-gray-500">No hay servicios cargados.</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-hornez-orange">Adicionales</h2>
                <div className="space-y-2">
                  {property.features.filter(({ feature }) => feature.category === "ADDITIONAL").length > 0 ? (
                    property.features
                      .filter(({ feature }) => feature.category === "ADDITIONAL")
                      .map(({ feature, value }) => (
                        <div
                          key={feature.id}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-[10px] font-bold text-gray-700 shadow-sm">
                            ✓
                          </span>
                          <span>
                            {feature.name}
                            {value && value !== "-" ? `: ${value}` : ""}
                          </span>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-gray-500">No hay adicionales cargados.</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-hornez-orange">Datos de la propiedad</h2>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-between gap-3">
                    <span>Precio</span>
                    <span className="font-semibold text-hornez-blue">
                      {property.price === 0 ? "Consultar" : currencyFormat(property.price, property.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span>Ubicación</span>
                    <span className="text-right font-medium text-gray-800">{property.city}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span>Tipo</span>
                    <span className="font-medium text-gray-800">{property.propertyType.name}</span>
                  </div>

                  {property.bedrooms != 0 && (
                    <div className="flex items-center justify-between gap-3">
                      <span>Dormitorios</span>
                      <span className="font-medium text-gray-800">{property.bedrooms}</span>
                    </div>
                  )}

                  {property.bathrooms != 0 && (
                    <div className="flex items-center justify-between gap-3">
                      <span>Baños</span>
                      <span className="font-medium text-gray-800">{property.bathrooms}</span>
                    </div>
                  )}

                  {property.area != 0 && (
                    <div className="flex items-center justify-between gap-3">
                      <span>Superficie</span>
                      <span className="font-medium text-gray-800">{property.area} m²</span>
                    </div>
                  )}

                  {property.zipCode && (
                    <div className="flex items-center justify-between gap-3">
                      <span>Código postal</span>
                      <span className="font-medium text-gray-800">{property.zipCode}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Contacto</p>
                  <div className="space-y-2 text-sm font-semibold text-gray-800">
                    <a
                      href="tel:+5493544400903"
                      className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-white transition-colors hover:bg-esmerald-600"
                    >
                      <i className="pi pi-phone" />
                      3544400903 - Oficina
                    </a>
                    <a
                      href="tel:+5493544548602"
                      className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-white transition-colors hover:bg-esmerald-600"
                    >
                      <i className="pi pi-phone" />
                      3544548602 - Bruno
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Descripción</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Ubicación */}
            {property.lat && property.lng && <PropertyUbication lat={property.lat} lng={property.lng} />}

            {/* Carrusel de propiedades relacionadas: mantiene al usuario navegando sin volver al listado. */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <RelatedPropertiesCarousel properties={relatedProperties} />
            </div>

            {/* Documentos */}
            {property.documents.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Documentos</h2>
                <div className="flex flex-col items-start gap-2">
                  {property.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-black/50 text-white px-2 py-1 rounded hover:bg-gray-900"
                    >
                      {doc.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
