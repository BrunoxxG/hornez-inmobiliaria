import Navbar from "./components/Navbar";
import PropertyCard from "./components/PropertyCard";
import { getFeaturedProperties } from "./lib/dataHome";

export default async function Home() {
  const properties = await getFeaturedProperties();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pt-16">
        <div className="absolute inset-0 bg-[url('/img/hero-placeholder.jpg')] bg-cover bg-center opacity-40" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encontrá tu lugar en el mundo
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Te ayudamos a encontrar la propiedad ideal para vos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#propiedades"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Propiedades Destacadas
          </h2>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Próximamente publicaremos propiedades disponibles.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
