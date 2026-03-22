import { Link } from 'react-router-dom'
import Carousel from '../components/common/Carousel'
import heroImage from '../assets/sierras-portada.jpg'

const Home = () => {
  const carouselItems = [
    {
      id: 1,
      title: 'Encontrá tu hogar perfecto',
      description: 'En Hornez Inmobiliaria tenemos las mejores propiedades',
      image: heroImage,
      url: '/properties',
    },
    {
      id: 2,
      title: 'Inversiones Seguras',
      description: 'Propiedades verificadas y listas para invertir',
      image: heroImage,
      url: '/properties',
    },
    {
      id: 3,
      title: '40 años de experiencia',
      description: 'Confianza y profesionalismo en cada transacción',
      image: heroImage,
      url: '/contact',
    },
  ]

  return (
    <div className="w-full overflow-x-hidden">
      {/* Carousel */}
      <Carousel items={carouselItems} />

      {/* Features Section */}
      <section className="w-full py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
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
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
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
