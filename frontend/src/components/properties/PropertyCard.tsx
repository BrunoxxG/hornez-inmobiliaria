import { Link } from 'react-router-dom'
import type { Property } from '../../types/property'

interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const mainImage = property.images && property.images.length > 0 
    ? property.images[0].url 
    : 'https://via.placeholder.com/400x300?text=Sin+imagen'

  return (
    <Link 
      to={`/properties/${property.id}`}
      className="card overflow-hidden hover:border-secondary border-2 border-transparent"
    >
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
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
  )
}

export default PropertyCard
