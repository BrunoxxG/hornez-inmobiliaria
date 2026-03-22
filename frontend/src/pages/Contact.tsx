import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la llamada a la API
    console.log('Formulario enviado:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Contactanos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                ✓ Mensaje enviado correctamente
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+54 9..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tu mensaje..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">📍 Ubicación</h3>
                  <p className="text-gray-600">Villa de Merlo, San Luis, Argentina</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">📱 Teléfono</h3>
                  <p className="text-gray-600">
                    <a href="tel:+5492665024444" className="text-secondary hover:underline">
                      +54 266 502 4444
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">📧 Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@hornez.com" className="text-secondary hover:underline">
                      info@hornez.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">💬 WhatsApp</h3>
                  <a
                    href="https://wa.me/5492665024444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
                  >
                    Chatear en WhatsApp
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">🕐 Horarios</h3>
                  <p className="text-gray-600">Lunes - Viernes: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sábado: 10:00 - 14:00</p>
                  <p className="text-gray-600">Domingo: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
