import { useFavorites } from '../context/FavoritesContext'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/properties/PropertyCard'

const Favorites = () => {
  const { favorites } = useFavorites()
  const { data } = useProperties(1, 100)

  const favoriteProperties = data?.data?.filter((p: any) => favorites.includes(p.id)) || []

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Mis Favoritos</h1>

      {favoriteProperties.length === 0 ? (
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <p className="text-xl text-gray-600 mb-4">No tienes propiedades favoritas aún</p>
          <a href="/properties" className="text-secondary hover:underline font-semibold">
            Explorar propiedades →
          </a>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">Tienes {favoriteProperties.length} propiedades guardadas</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProperties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Favorites
