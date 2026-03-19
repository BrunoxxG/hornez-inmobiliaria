import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a Hornez Inmobiliaria</h1>
          <p className="text-xl mb-8">Encuentra tu hogar perfecto entre nuestras propiedades excepcionales</p>
          <Link to="/properties" className="btn-secondary">
            Explorar Propiedades
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Propiedades Verificadas</h3>
              <p className="text-gray-600">Todas nuestras propiedades son verificadas y auténticas</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Mejores Precios</h3>
              <p className="text-gray-600">Ofertas competitivas y transparentes sin sorpresas</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Asesoramiento Experto</h3>
              <p className="text-gray-600">Nuestro equipo está aquí para ayudarte en cada paso</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para encontrar tu hogar?</h2>
          <p className="text-gray-600 mb-8">Sabemos que buscar hogar puede ser abrumador.</p>
          <Link to="/properties" className="btn-primary">
            Ver todas las propiedades
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
