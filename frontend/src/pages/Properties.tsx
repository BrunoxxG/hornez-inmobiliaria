import { useState } from 'react'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/properties/PropertyCard'
import PropertyFilter from '../components/properties/PropertyFilter'

const Properties = () => {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({})
  const { data, isLoading, error } = useProperties(page, 10)

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters)
    setPage(1) // Reset a página 1 al filtrar
  }

  // Filtrar propiedades en cliente
  const filteredProperties = data?.data?.filter((property: any) => {
    if (filters.minPrice && property.price < filters.minPrice) return false
    if (filters.maxPrice && property.price > filters.maxPrice) return false
    if (filters.type && property.type !== filters.type) return false
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    return true
  }) || []

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-gray-600">Cargando propiedades...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-red-600">Error al cargar las propiedades</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Nuestras Propiedades</h1>

      {/* Filtros */}
      <PropertyFilter onFilter={handleFilter} />

      {/* Resultados */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredProperties.length} de {data?.data?.length || 0} propiedades
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredProperties && filteredProperties.length > 0 ? (
          filteredProperties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-600">No hay propiedades con esos filtros</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {data && data.total > 10 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-primary disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="flex items-center">
            Página {page} de {Math.ceil(data.total / 10)}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(data.total / 10)}
            className="btn-primary disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default Properties
