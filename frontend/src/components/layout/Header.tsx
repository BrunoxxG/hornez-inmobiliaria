import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const { favorites } = useFavorites()

  return (
    <header className="bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={logo} alt="Hornez" className="h-10 w-10" />
          <span className="text-2xl font-bold">Hornez Inmobiliaria</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link to="/properties" className="hover:text-secondary transition">
              Propiedades
            </Link>
            <Link to="/contact" className="hover:text-secondary transition">
              Contacto
            </Link>
          </div>

          {/* Favorites & Auth */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="relative hover:text-secondary transition flex items-center gap-2">
                  ⭐ Favoritos
                  {favorites.length > 0 && (
                    <span className="bg-secondary text-primary text-xs font-bold px-2 py-1 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm">👤 {user?.name || user?.email}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-secondary hover:underline"
                  >
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-secondary hover:bg-yellow-500 text-primary font-semibold py-2 px-4 rounded transition"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Social Media Icons & Login */}
          <div className="flex flex-col items-center gap-2">
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:opacity-80 transition text-lg"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:opacity-80 transition text-lg font-bold"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:opacity-80 transition text-lg"
                title="TikTok"
              >
                ♪
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:opacity-80 transition text-lg"
                title="YouTube"
              >
                ▶
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
