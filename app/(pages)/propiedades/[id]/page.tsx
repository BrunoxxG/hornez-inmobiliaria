import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import PropertyGallery from "./components/PropertyGallery";
import { getPropertyById } from "../lib/dataPropertiesView";
import { BedDouble, Maximize, Toilet } from "lucide-react";

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

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-hornez-red transition-colors">
              Inicio
            </Link>
            <i className="pi pi-chevron-right text-xs" />
            <Link href="/propiedades" className="hover:text-hornez-red transition-colors">
              Propiedades
            </Link>
            <i className="pi pi-chevron-right text-xs" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{property.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda: galería + descripción */}
            <div className="lg:col-span-2 space-y-6">
              {/* Galería */}
              <PropertyGallery images={property.images} />

              {/* Descripción */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Descripción</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Características */}
              {property.features.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Características</h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.features.map(({ feature, value }) => (
                      <li key={feature.id} className="flex items-center gap-2 text-gray-600 text-sm">
                        <i className="pi pi-check-circle text-hornez-red text-sm" />
                        <span>
                          {feature.name}
                          {value && value !== "-" ? `: ${value}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Documentos */}
              {property.documents.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Documentos</h2>
                  <div className="flex flex-col items-start gap-2">
                    {property.documents.map((doc) => (
                      <a
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

            {/* Columna derecha: ficha + contacto */}
            <div className="space-y-6">
              {/* Ficha */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span className="bg-hornez-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {property.listingType.name}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[property.status]}`}>
                    {STATUS_LABEL[property.status]}
                  </span>
                </div>

                <h1 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h1>

                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <i className="pi pi-map-marker text-xs" />
                  {property.address}, {property.city}, {property.province}
                </p>

                <div className="flex items-end mb-5 gap-2">
                  <p className="text-3xl font-bold text-hornez-red m-0">
                    {currencyFormat(property.price, property.currency)}
                  </p>
                  <span className="text-hornez-red font-bold">{property.currency}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  {property.bedrooms != 0 && (
                    <div className="bg-gray-50 rounded-lg py-3 flex flex-col justify-center items-center">
                      <div className="flex items-center gap-2">
                        <BedDouble size={20} />
                        <span className="text-sm font-semibold">{property.bedrooms}</span>
                      </div>
                      <p className="text-xs text-gray-400">Dorm.</p>
                    </div>
                  )}
                  {property.bathrooms != 0 && (
                    <div className="bg-gray-50 rounded-lg py-3 flex flex-col justify-center items-center">
                      <div className="flex items-center gap-2">
                        <Toilet size={20} />
                        <span className="text-sm font-semibold">{property.bathrooms}</span>
                      </div>
                      <p className="text-xs text-gray-400">Baños</p>
                    </div>
                  )}
                  {property.area != 0 && (
                    <div className="bg-gray-50 rounded-lg py-3 flex flex-col justify-center items-center">
                      <div className="flex items-center gap-2">
                        <Maximize size={20} />
                        <span className="text-sm font-semibold">{property.area}</span>
                      </div>
                      <p className="text-xs text-gray-400">m²</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t text-sm text-gray-500 space-y-2">
                  <div className="flex justify-between">
                    <span>Tipo</span>
                    <span className="font-medium text-gray-700">{property.propertyType.name}</span>
                  </div>
                  {property.zipCode && (
                    <div className="flex justify-between">
                      <span>Código postal</span>
                      <span className="font-medium text-gray-700">{property.zipCode}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contacto */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">¿Te interesa?</h2>
                <a
                  href={`https://wa.me/549XXXXXXXXX?text=Hola, me interesa la propiedad: ${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="pi pi-whatsapp text-lg" />
                  Consultar por WhatsApp
                </a>
                <Link
                  href="/#contacto"
                  className="flex items-center justify-center gap-2 w-full mt-3 border-2 border-hornez-red text-hornez-red hover:bg-hornez-red hover:text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="pi pi-envelope" />
                  Enviar consulta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
