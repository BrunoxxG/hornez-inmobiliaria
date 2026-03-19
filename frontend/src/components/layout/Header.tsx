import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🏠 Hornez Inmobiliaria
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-secondary transition">
            Inicio
          </Link>
          <Link to="/properties" className="hover:text-secondary transition">
            Propiedades
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
