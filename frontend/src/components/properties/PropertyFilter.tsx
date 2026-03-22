import { useState } from 'react'

interface FilterProps {
  onFilter: (filters: {
    minPrice?: number
    maxPrice?: number
    type?: string
    location?: string
  }) => void
}

const PropertyFilter = ({ onFilter }: FilterProps) => {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')

  const handleFilter = () => {
    onFilter({
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      type: type || undefined,
      location: location || undefined,
    })
  }

  const handleReset = () => {
    setMinPrice('')
    setMaxPrice('')
    setType('')
    setLocation('')
    onFilter({})
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">Filtrar Propiedades</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Precio Mínimo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Precio Mínimo
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Precio Máximo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Precio Máximo
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Tipo de Propiedad */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Todos</option>
            <option value="house">Casa</option>
            <option value="apartment">Departamento</option>
            <option value="land">Terreno</option>
          </select>
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ubicación
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ciudad, zona..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-2 items-end">
          <button
            onClick={handleFilter}
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Filtrar
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyFilter
