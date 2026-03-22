import { useState } from 'react'

interface CarouselProps {
  items: Array<{
    id: number
    title: string
    description?: string
    image: string
    url?: string
  }>
}

const Carousel = ({ items }: CarouselProps) => {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % items.length)
  const prev = () => setCurrent((current - 1 + items.length) % items.length)

  if (!items || items.length === 0) return null

  return (
    <div className="relative w-full h-96 md:h-screen bg-gray-900 rounded-lg overflow-hidden">
      {/* Imágenes */}
      <div className="relative w-full h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Contenido */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h2>
                {item.description && (
                  <p className="text-lg md:text-2xl mb-6">{item.description}</p>
                )}
                {item.url && (
                  <a href={item.url} className="btn-secondary inline-block">
                    Ver Detalles
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 text-white rounded-full p-3 transition z-10"
      >
        ❮
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 text-white rounded-full p-3 transition z-10"
      >
        ❯
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? 'bg-secondary' : 'bg-white bg-opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
