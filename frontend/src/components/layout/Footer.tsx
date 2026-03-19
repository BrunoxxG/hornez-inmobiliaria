const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hornez Inmobiliaria</h3>
            <p className="text-gray-300">Tu plataforma de confianza para encontrar el hogar perfecto.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-secondary">Inicio</a></li>
              <li><a href="/properties" className="hover:text-secondary">Propiedades</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-gray-300">Email: info@hornez.com</p>
            <p className="text-gray-300">Teléfono: +1 123 456 7890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Hornez Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
