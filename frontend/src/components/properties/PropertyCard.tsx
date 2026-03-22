import { Link } from 'react-router-dom'
import type { Property } from '../../types/property'
import { useFavorites } from '../../context/FavoritesContext'

interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(property.id!)

  const mainImage = property.images && property.images.length > 0 
    ? property.images[0].url 
    : 'https://via.placeholder.com/400x300?text=Sin+imagen'

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite(property.id!)
  }

  return (
    <div className="relative">
      <Link 
        to={`/properties/${property.id}`}
        className="card overflow-hidden hover:border-secondary border-2 border-transparent block"
      >
        {/* Image */}
        <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <span className="text-xl">{favorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{property.title}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

        {/* Info */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-secondary text-white px-3 py-1 rounded text-sm">
            {property.type}
          </span>
          <span className="text-accent font-semibold">${property.price.toLocaleString()}</span>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-500">
          📍 {property.location}
        </p>
      </Link>
    </div>
  )
}

export default PropertyCard
