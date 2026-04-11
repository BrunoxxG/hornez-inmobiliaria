import Footer from "./(pages)/components/Footer";
import Navbar from "./(pages)/components/Navbar";
import PropertyCard from "./(pages)/propiedades/components/PropertyCard";
import { getPropertiesStand } from "./(pages)/propiedades/lib/dataPropertiesView";

export default async function Home() {
  const properties = await getPropertiesStand();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pt-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Encontrá tu lugar en el mundo</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">Te ayudamos a encontrar la propiedad ideal para vos.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/propiedades"
              className="bg-hornez-red text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Ver propiedades
            </a>
            <a
              href="#contacto"
              className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contactanos
            </a>
          </div>
        </div>
      </section>

      {/* Propiedades Destacadas */}
      <section id="propiedades" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Propiedades Destacadas</h2>

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
      </section>

      {/* Quiénes Somos */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-hornez-red font-semibold text-sm uppercase tracking-widest">Quiénes somos</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Tu inmobiliaria de confianza en Villa de Merlo
              </h2>
              <p className="text-gray-600 leading-relaxed">
                En Hornez Inmobiliaria te acompañamos en cada etapa del proceso, ya sea que estés buscando comprar,
                vender o alquilar. Nuestro equipo de profesionales está comprometido con brindarte una experiencia
                personalizada y transparente.
              </p>
              <ul className="space-y-3">
                {[
                  "Asesoramiento personalizado",
                  "Amplio portafolio de propiedades",
                  "Gestión integral de compra y venta",
                  "Proceso simple y transparente",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <i className="pi pi-check-circle text-hornez-red" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="inline-block bg-hornez-red text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                Contactanos
              </a>
            </div>

            {/* Imagen decorativa / placeholder */}
            <div className="relative h-80 lg:h-105 bg-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-center h-full text-gray-300">
                <i className="pi pi-home text-8xl" />
              </div>
              {/* Reemplazar con: <Image src="/img/nosotros.jpg" alt="Equipo Hornez" fill className="object-cover" /> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
