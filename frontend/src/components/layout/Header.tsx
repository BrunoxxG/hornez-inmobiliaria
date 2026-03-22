import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <header className="bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={logo} alt="Hornez" className="h-10 w-10" />
          <span className="text-2xl font-bold">Hornez Inmobiliaria</span>
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
