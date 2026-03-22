import { createContext, useContext, useState, ReactNode } from 'react'

interface FavoritesContextType {
  favorites: number[]
  toggleFavorite: (propertyId: number) => void
  isFavorite: (propertyId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  })

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite = (propertyId: number) => favorites.includes(propertyId)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}
